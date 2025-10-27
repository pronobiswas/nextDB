import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function authenticateUser(req) {
  try {
    // ====Get token from cookies====
    const token = req.cookies.get("accessToken")?.value;

    if (!token) {
      // ====Unauthorized response====
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    // ===Verify token===
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decoded", decoded);
    

    // ===Return decoded user info===
    return decoded;
  } catch (err) {
    return NextResponse.json({ success: false, message: "Invalid token" }, { status: 401 });
  }
}
