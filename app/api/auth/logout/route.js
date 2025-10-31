import { authenticateUser } from "@/helper/authMiddlewere";
import { dbConnection } from "@/lib/dbConnection";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const logInUser = await authenticateUser(req);
    console.log( "currentuser", logInUser);
    const db = dbConnection();
    
    
    // ====Clear the access token cookie=========
    const response = NextResponse.json({ success: true, message: "Logged out successfully", user: logInUser});

    response.cookies.set("accessToken", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 0,
    });
    return response;
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, message: "Logout failed" }, { status: 500 });
  }
}
