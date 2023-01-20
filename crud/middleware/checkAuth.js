import jwt from "jsonwebtoken";

import Usuario from "../models/Usuario.js";

const checkAuth = async (req, res, next) => {
  let token;

  //Check if there is a jwt
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // Decodificar
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // fijar el user
      req.usuario = await Usuario.findOne({ _id: decoded.id }).select(
        "-password -token -updatedAt -createdAt -__v -confirmado"
      );

      return next();
    } catch (err) {
      return res.status(404).json({ msg: "Hubo un error" });
    }
  }
};

export default checkAuth;
