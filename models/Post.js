import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
});

// Check if model exists already (important for Next.js hot reload)
const PostModel = mongoose.models.Post || mongoose.model("Post", PostSchema);

// ✅ Default export
export default PostModel;
