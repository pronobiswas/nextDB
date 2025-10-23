import { NextResponse } from "next/server";
import { dbConnection } from "@/lib/dbConnection";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
  console.log("API hit");
  try {
    await dbConnection();
    console.log("DB connected");

    const { name, email, password } = await req.json();
    console.log("Request body:", name, email, password);

    if (!name || !email || !password)
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });

    const existingUser = await User.findOne({ email });
    console.log("Existing user:", existingUser);

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Password hashed");

    const newUser = await User.create({ name, email, password: hashedPassword });
    console.log("User created:", newUser);

    return NextResponse.json({
      message: "User created successfully",
      user: { id: newUser._id, name: newUser.name, email: newUser.email },
    });
  } catch (error) {
    console.error("Signup Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

