import { NextResponse } from "next/server";
import { dbConnection } from "@/lib/dbConnection";
import User from "@/models/User";
import bcrypt from "bcryptjs";

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
    // ====check the password====
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return NextResponse.json({ error: "Invalid creeadential" }, { status: 401 });
    // ====return success message====
    return NextResponse.json({
      message: "Login successful",
      user: { id: user._id, name: user.name, email: user.email },
    });
    // ******catch error******
    // ******catch error******
  } catch (error) {
    console.error("Signin Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
