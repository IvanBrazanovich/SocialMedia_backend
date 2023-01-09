import express from "express";

//Functions from controller
import {
  register,
  authenticate,
  forgetPassword,
  checkToken,
  newPassword,
} from "../controller/usuarioController.js";

const router = express.Router();

// Autenticación, registro y confirmación de usuarios

router.post("/", authenticate);

router.post("/register", register);

router.get("/confirm/:token", checkToken);

router.post("/forget-password", forgetPassword);

router.get("/forget-password/:token", checkToken);

router.post("/change-password/:token", newPassword);

export default router;
