import mongoose from "mongoose";

const commentSchema = mongoose.Schema(
  {
    text: {
      type: String,
      trim: true,
      required: true,
    },
    post: {
      type: mongoose.Schema.Type.ObjectId,
      ref: "Post",
    },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;
