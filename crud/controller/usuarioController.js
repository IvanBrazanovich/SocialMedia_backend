import { json } from "express";
import mongoose from "mongoose";
import {
  emailForgetPassword,
  emailRegistro,
} from "../helpers/emailRegistro.js";
import generarJWT from "../helpers/generarJWT.js";
import generarToken from "../helpers/generarToken.js";
import Usuario from "../models/Usuario.js";

const register = async (req, res) => {
  // Check if email is already used
  const { email } = req.body;

  const emailUsed = await Usuario.findOne({ email });

  if (emailUsed) {
    const error = new Error("An account with that email already exits");

    return res.status(400).json({ msg: error.message });
  }

  // Add user

  try {
    //Create user
    const usuarioAlmacenado = new Usuario(req.body);

    //Generate Token
    usuarioAlmacenado.token = generarToken();

    //Save
    await usuarioAlmacenado.save();

    // Send Email
    const { name, token, email } = usuarioAlmacenado;

    emailRegistro({
      name,
      token,
      email,
    });
    //Return response
    return res.status(200).json({
      msg: "User was created succesfully, check your email to confirm account",
    });
  } catch (err) {
    console.log(err);
  }
};

const authenticate = async (req, res) => {
  try {
    //Destructuring
    const { email, password } = req.body;

    //Check if email exists
    const user = await Usuario.findOne({ email });

    if (!user) {
      const error = new Error("User doesn't exist");

      return res.status(404).json({ msg: error.message });
    }

    //If email exists, check if the passwords match
    const passwordMatch = await user.checkPassword(password);

    if (passwordMatch) {
      return res.json({
        name: user.name,
        _id: user._id,
        email: user.email,
        token: generarJWT(user._id),
      });
    } else {
      const error = new Error("Passwords do not match");
      return res.status(403).json({ msg: error.message });
    }
  } catch (err) {
    console.log(err);
  }
};

const forgetPassword = async (req, res) => {
  //Find User
  const user = await Usuario.findOne(req.body);

  if (!user) {
    const error = new Error("User doesn't exist");

    return res.status(404).json({ msg: error.message });
  }

  try {
    // Create Token
    user.token = generarToken();
    await user.save();

    //Send email
    const { email, token, name } = user;
    emailForgetPassword({
      email,
      token,
      name,
    });

    // Respond

    return res.status(200).json({ msg: "Check your email to change password" });
  } catch (err) {
    console.log(err);
  }
};

const confirm = async (req, res) => {
  const token = req.params.token;

  const user = await Usuario.findOne({ token });

  if (!user) {
    const error = new Error("You do not have permission to this page");

    return res.status(403).json({ msg: error.message });
  }

  // Reset token and respond ok
  try {
    user.token = "";
    user.confirmed = true;

    await user.save();

    res.status(200).json({ msg: "Your account has been confirmed" });
  } catch (err) {
    console.log(err);
  }
};

const checkToken = async (req, res) => {
  const token = req.params.token;

  const user = await Usuario.findOne({ token });

  if (!user) {
    const error = new Error("You do not have permission to this page");

    return res.status(403).json({ msg: error.message });
  }

  res.status(200).json({ msg: "Correct Token" });
};

const newPassword = async (req, res) => {
  const { token } = req.params;

  // Get user
  const user = await Usuario.findOne({ token });

  if (!user) {
    const error = new Error("You do not have permission to this page");

    return res.status(403).json({ msg: error.message });
  }

  // change password

  try {
    user.token = "";

    user.password = req.body.password;

    await user.save();

    res.status(200).json({ msg: "Password has been changed" });
  } catch (err) {
    console.log(err);
  }
};

const profile = (req, res) => {
  const { usuario } = req;

  res.json(usuario);
};

export {
  register,
  authenticate,
  forgetPassword,
  confirm,
  checkToken,
  newPassword,
  profile,
};
