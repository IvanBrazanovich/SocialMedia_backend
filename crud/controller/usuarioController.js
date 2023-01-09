import { json } from "express";
import mongoose from "mongoose";
import { emailRegistro } from "../helpers/emailRegistro.js";
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

const forgetPassword = async (req, res) => {};

const checkToken = async (req, res) => {
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
const newPassword = async (req, res) => {};

export { register, authenticate, forgetPassword, checkToken, newPassword };
