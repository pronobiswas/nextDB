// api/category/subcategory/route.js

import { authenticateUser } from "@/helper/authMiddlewere";
import { dbConnection } from "@/lib/dbConnection";
import SubCategory from "@/models/subCategoryModel";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await dbConnection();

    const cookie = request.cookies.get("accessToken");
    const accessToken = cookie ? cookie.value : null;
    const logInUser = await authenticateUser(accessToken);

    console.log("Access Token from SubCategory:", logInUser);

    if (!logInUser) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 403 }
      );
    }

    const { name, parentCategory } = await request.json();
    console.log("SubCategory Data:", name, parentCategory);

    if (!name || !parentCategory) {
      return NextResponse.json(
        { success: false, message: "Both name and parentCategory are required" },
        { status: 400 }
      );
    }

    const formattedName = name.trim().toLowerCase();

    // --- 🎯 FIX APPLIED HERE ---
    // Now checks for existing subcategories with the same name AND the same parent category.
    const existingSubCategory = await SubCategory.findOne({ 
      name: formattedName,
      parentCategory: parentCategory, // Check uniqueness within the parent category
    });
    
    if (existingSubCategory) {
      return NextResponse.json(
        { success: false, message: "SubCategory already exists under this parent category" },
        { status: 409 }
      );
    }
    // ---------------------------

    const newSubCategory = await SubCategory.create({
      name: formattedName,
      parentCategory,
    });

    return NextResponse.json(
      {
        success: true,
        message: "SubCategory created successfully",
        subCategory: newSubCategory,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating subCategory:", error);
    return NextResponse.json(
      { success: false, message: "Error creating subCategory" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await dbConnection();

    // Populate parent category names for better readability
    const subCategories = await SubCategory.find()
      .populate("parentCategory", "name")
      .sort({ createdAt: -1 });

    return NextResponse.json({ success: true, subCategories }, { status: 200 });
  } catch (error) {
    console.error("Error fetching subCategories:", error);
    return NextResponse.json(
      { success: false, message: "Error fetching subCategories" },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    await dbConnection();

    const cookie = request.cookies.get("accessToken");
    const accessToken = cookie ? cookie.value : null;
    const logInUser = await authenticateUser(accessToken);

    if (!logInUser) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 403 }
      );
    }

    const { id } = await request.json();
    console.log("Deleting SubCategory ID:", id);

    if (!id) {
      return NextResponse.json(
        { success: false, message: "SubCategory ID is required" },
        { status: 400 }
      );
    }

    const deletedSubCategory = await SubCategory.findByIdAndDelete(id);

    if (!deletedSubCategory) {
      return NextResponse.json(
        { success: false, message: "SubCategory not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "SubCategory deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting subCategory:", error.message);
    return NextResponse.json(
      { success: false, message: error.message || "Error deleting subCategory" },
      { status: 500 }
    );
  }
}