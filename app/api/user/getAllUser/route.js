
// api/user/getAllUser

import { NextResponse } from "next/server";
import { dbConnection } from "@/lib/dbConnection";
import User from "@/models/User";
import { authenticateUser } from "@/helper/authMiddlewere";

export async function GET(request) {
  try {
    const cookie = request.cookies.get('accessToken');
    const accessToken = cookie ? cookie.value : null;
    console.log("Access Token:", accessToken);

    const logInUser = await authenticateUser(accessToken);
    if (!logInUser) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    
    await dbConnection();

    // Fetch all users, exclude passwords
    const users = await User.find({}, { password: 0, __v: 0 }).lean();

    return NextResponse.json({ success: true, users }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
