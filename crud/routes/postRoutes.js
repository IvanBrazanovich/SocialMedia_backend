import express from "express";
import checkAuth from "../middleware/checkAuth.js";

//Functions from controller
import {
  addPost,
  getPost,
  deletePost,
  updatePost,
  addLike,
  removeLike,
} from "../controller/postController.js";

const router = express.Router();

// Add, Delete, Update, View Posts

router.post("/", checkAuth, addPost);
router.get("/:id", checkAuth, getPost);
router.delete("/:id", checkAuth, deletePost);
router.put("/", checkAuth, updatePost);
router.post("/like", checkAuth, addLike);
router.delete("/", checkAuth, removeLike);

// Add,

export default router;
