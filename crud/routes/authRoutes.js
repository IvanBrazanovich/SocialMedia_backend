import express from "express";
import checkAuth from "../middleware/checkAuth.js";
//Functions from controller
import {
  register,
  authenticate,
  forgetPassword,
  checkToken,
  confirm,
  newPassword,
  profile,
} from "../controller/usuarioController.js";

const router = express.Router();

// Autenticación, registro y confirmación de usuarios

router.post("/", authenticate);

router.post("/register", register);

router.get("/confirm/:token", confirm);

router.post("/forget-password", forgetPassword);

router.get("/forget-password/:token", checkToken);

router.post("/change-password/:token", newPassword);

router.post("/perfil", checkAuth, profile);

export default router;
