import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  verificationCode : {type:String},
  isVerified:{type:String},
  role: {
    type: String,
    enum: ["admin", "superadmin", "user"],
    default: "user",
  },
  
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
