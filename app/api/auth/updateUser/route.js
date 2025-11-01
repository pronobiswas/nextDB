// http://localhost:3000/api/auth/signup
import { NextResponse } from "next/server";
import { dbConnection } from "@/lib/dbConnection";
import User from "@/models/User";
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
    
  

    
    // ===send response===
    return NextResponse.json(
      {
        success: true,
        message: 'user updated successfully ',
      },
      { status: 201 },
    );

    // *********catch error********
  } catch (error) {
    console.error("Signup Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
