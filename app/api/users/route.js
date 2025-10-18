// app/api/users/route.js
import { dbConnection } from "@/lib/dbConnection";
import UserModel from "@/models/User"; // corrected import
import { NextResponse } from "next/server";



// Example: GET method
export async function GET(req) {
  await dbConnection();

  try {
    const users = await UserModel.find();
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Example: POST method
export async function POST(req) {
  await dbConnection();
  const data = await req.json();

  try {
    const newUser = await UserModel.create(data);
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
