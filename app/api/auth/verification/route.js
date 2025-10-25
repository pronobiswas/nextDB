import { NextResponse } from "next/server";
import { dbConnection } from "@/lib/dbConnection";
import User from "@/models/User";

export async function POST(req) {
  try {
    await dbConnection();
    const { email, code } = await req.json();
    console.log("verification route",email,code);
    

    if (!email || !code) {
      return NextResponse.json({ success: false, message: "Email and OTP are required" }, { status: 400 });
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    // Mark user as verified and remove OTP
    user.isVerified = true;
    user.verificationCode = null;
    await user.save();

    // =====create access token with jwt=====
    

    return NextResponse.json({ success: true, message: "Email verified successfully" }, { status: 200 });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
