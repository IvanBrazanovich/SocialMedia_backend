import express from "express";

import checkAuth from "../middleware/checkAuth.js";

import { searchUser } from "../controller/utilsController.js";

const router = express.Router();

// Buscar Usuario

router.get("/search-user/:name", checkAuth, searchUser);

export default router;
