import { cloudinary } from "../helpers/cloudinary.js";
import Post from "../models/Post.js";

const addPost = async (req, res) => {
  try {
    // Upload image

    const fileStr = req.body.file;
    const uploadResponse = await cloudinary.uploader.upload(fileStr, {
      folder: "SocialMedia",
    });

    // Create Post
    const data = {
      caption: req.body.caption || "",
      urlDirection: uploadResponse.public_id,
    };

    const post = new Post(data);

    post.save();

    return res
      .status(200)
      .json({ msg: "The post has been succesfully uploaded" });
  } catch (err) {
    res.status(500).json({ err: "Something went wrong" });
  }
};

const deletePost = async (req, res) => {};

const getPost = async (req, res) => {};

const updatePost = async (req, res) => {};

const addLike = async (req, res) => {};

const removeLike = async (req, res) => {};

export { addPost, getPost, deletePost, updatePost, addLike, removeLike };
