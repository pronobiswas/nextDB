import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true, minlength: 6 },
    verificationCode: { type: String },
    isVerified: { type: Boolean, default: false },
    role: {
      type: String,
      enum: ["admin", "superadmin", "user"],
      default: "user",
    },
    accessToken: { type: String },
    sessions: [{ type: String }],
    sessionsExpiry: [{ type: Date }],
    // storeId: { type: mongoose.Schema.Types.ObjectId, ref: "Store" },
    picture: { type: String },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
