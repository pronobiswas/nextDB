// http://localhost:3000/api/auth/signup
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { dbConnection } from "@/lib/dbConnection";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req) {

  try {
    await dbConnection();
    // ===distruct data===
    const { name, email, password } = await req.json();
    // ====validate====
    if (!name || !email || !password)
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    // ===check user===
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "User already exists",
        },
        { status: 409 }
      );
    }
    // ====password hash===
    const hashedPassword = await bcrypt.hash(password, 10);
    // ====craete user====
    const newUser = await User.create({ name, email: email.toLowerCase(), password: hashedPassword });
    // ====generate code====
    const code = Math.floor(10000 + Math.random() * 90000);
    const updateUser = await User.findByIdAndUpdate(newUser._id, { verificationCode: code,}, { new: true });
    console.log(updateUser);
    // ====Create transporter===
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SERVICE_MAIL,
        pass: process.env.APP_PASSWORD,
      },
    });
    // ====Email options===
    const mailOptions = {
      from: `"Your App Name" <${process.env.SERVICE_MAIL}>`,
      to: email,
      subject: "Your Verification Code",
      html: `
                    <div style="font-family: Arial, sans-serif; padding: 20px;">
                    <h2>Your Verification Code</h2>
                    <p>Use this code to verify your email:</p>
                    <div style="font-size: 24px; font-weight: bold; color: #007bff;">
                        ${code}
                    </div>
                    </div>
                `,
    };

    // ====Send mail====
    await transporter.sendMail(mailOptions);
    // ===send response===
    return NextResponse.json(
      {
        success: true,
        message: 'user register successfully check email',
        user: { id: newUser._id, name: newUser.name, email: newUser.email },
      },
      { status: 201 },
    );

    // *********catch error********
  } catch (error) {
    console.error("Signup Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

