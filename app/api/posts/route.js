// app/api/posts/route.js
import { NextResponse } from "next/server";
import { dbConnection } from "@/lib/dbConnection";
import PostModel from "@/models/Post";

// GET all posts
export async function GET(req) {
  await dbConnection();

  try {
    const posts = await PostModel.find().populate("author", "name email");
    // .populate will include the author's name and email
    return NextResponse.json(posts);
  } catch (err) {
    console.error("GET /api/posts error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// POST a new post
export async function POST(req) {
  await dbConnection();
  const data = await req.json();

  try {
    const newPost = await PostModel.create(data);
    return NextResponse.json(newPost, { status: 201 });
  } catch (err) {
    console.error("POST /api/posts error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
