import { NextResponse } from "next/server";
import { dbConnection } from "@/lib/dbConnection";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(req) {
  try {
    // ===connect database===
    await dbConnection();
    // ====distruct data from request====
    const { emailOrName, password } = await req.json();
    // ====validate email and password=====
    if (!emailOrName || !password)
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    // =====check the user=====
    const user = await User.findOne({
      $or: [{ email: emailOrName }, { name: emailOrName }],
    });
    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    if (!user.isVerified)
      return NextResponse.json({ error: "User not verified " }, { status: 404 });
    // ====check the password====
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return NextResponse.json({ error: "Invalid creeadential" }, { status: 401 });
    // === Generate JWT ===
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    const updateUser = await User.findOneAndUpdate({ _id: user._id }, { accessToken: token }, { new: true });
    
    const responseUser = updateUser
      ? (() => {
        const obj = updateUser.toObject ? updateUser.toObject() : JSON.parse(JSON.stringify(updateUser));
        delete obj.password;
        return obj;
      })()
      : null;

    // ====return success message====
    const response = NextResponse.json({
      message: "Login successful",
      user: responseUser,
    });
    // ===set token on cookies===
    response.cookies.set("accessToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 5,
      path: "/",
    });
    return response;
    // ******catch error******
    // ******catch error******
  } catch (error) {
    console.error("Signin Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
