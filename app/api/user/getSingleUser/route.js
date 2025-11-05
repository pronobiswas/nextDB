// api/user/getSingleUser

import { NextResponse } from "next/server";
import User from "@/models/User";
import { dbConnection } from "@/lib/dbConnection";
import { authenticateUser } from "@/helper/authMiddlewere";

export async function GET(request) {
    const cookie = request.cookies.get('accessToken');
    const accessToken = cookie ? cookie.value : null;
    
    const authenticatedUser  = await authenticateUser(accessToken);
    console.log("authenticatedUser from middlewere",authenticatedUser);
    
    try {
        const searchParams = request.nextUrl.searchParams;
        const uidFromToken = authenticatedUser?.id;
        const userId = searchParams?.get("id");
        const idToFetch = userId || uidFromToken;

        if (!idToFetch) {
            return NextResponse.json(
                { error: "User ID is required" },
                { status: 400 }
            );
        }

        await dbConnection();

        const user = await User.findById(idToFetch);

        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(user);

    } catch (error) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}