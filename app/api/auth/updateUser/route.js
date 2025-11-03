import { NextResponse } from "next/server";
import { dbConnection } from "@/lib/dbConnection";
import User from "@/models/User";

export async function POST(req) {
  try {
    await dbConnection();

    const requestData = await req.json();
    console.log("✅ Received update data:", requestData);

    const updatedUser = await User.findOneAndUpdate(
      { email: requestData.email }, // filter
      {
        name: requestData.name,
        picture: requestData.picture,
      },
      { new: true } // return updated document
    );

    if (!updatedUser) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error("❌ UpdateUser Error:", error.message, error.stack);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
