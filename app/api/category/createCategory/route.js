
import { authenticateUser } from "@/helper/authMiddlewere";
import { dbConnection } from "@/lib/dbConnection";
import Category from "@/models/categoryModel";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await dbConnection();

    const cookie = request.cookies.get('accessToken');
    const accessToken = cookie ? cookie.value : null;
    
    const logInUser = await authenticateUser(accessToken);
    console.log("Access Token from create category:", logInUser);
    if (!logInUser) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 403 });
    }

    const { name } = await request.json();
    if (!name) {
      return NextResponse.json({ success: false, message: "Category name is required" }, { status: 400 });
    }

    const categoryName = name.trim().toLowerCase();
    const existingCategory = await Category.findOne({ name: categoryName });
    if (existingCategory) {
      return NextResponse.json({ success: false, message: "Category already exists" }, { status: 409 });
    }

    const newCategory = await Category.create({ name: categoryName });

    return NextResponse.json({ success: true, message: "Category created successfully", category: newCategory }, { status: 201 });

  } catch (error) {
    console.error("Error creating category:", error);
    return NextResponse.json({ success: false, message: "Error creating category" }, { status: 500 });
  }
}


export async function GET() {
  try {
    await dbConnection();
    const categories = await Category.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, categories }, { status: 200 });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json({ success: false, message: "Error fetching categories" }, { status: 500 });
  }
}