import { NextResponse } from "next/server";
import { dbConnection } from "@/lib/dbConnection";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    await dbConnection();

    const { emailOrName, password } = await req.json();

    if (!emailOrName || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const user = await User.findOne({
      $or: [{ email: emailOrName }, { name: emailOrName }],
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (!user.isVerified) {
      return NextResponse.json(
        { error: "User not verified" },
        { status: 403 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid credential" },
        { status: 401 }
      );
    }

    // ===== Generate JWT =====
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "365d" } // 1 year
    );

    // ===== Update user's access token in DB =====
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { accessToken: token },
      { new: true }
    );

    // ===== Remove sensitive fields =====
    const responseUser = updatedUser
      ? (() => {
          const obj = updatedUser.toObject();
          delete obj.password;
          return obj;
        })()
      : null;

    // ===== Prepare response =====
    const response = NextResponse.json({
      message: "Login successful",
      user: responseUser,
    });

    // ===== Set HTTP-only cookie =====
    response.cookies.set("accessToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 365 * 24 * 60 * 60, // 1 year in seconds
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Signin Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
