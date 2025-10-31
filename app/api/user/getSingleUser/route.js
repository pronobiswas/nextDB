import { NextResponse } from "next/server";
import User from "@/models/User";
import { dbConnection } from "@/lib/dbConnection";

export async function GET(request) {
    const cookie = request.cookies.get('accessToken');
    const accessToken = cookie ? cookie.value : null;
    const user = await authenticateUser(accessToken);
    try {
        const searchParams = request.nextUrl.searchParams;
        const userId = searchParams.get("id");

        if (!userId) {
            return NextResponse.json(
                { error: "User ID is required" },
                { status: 400 }
            );
        }

        await dbConnection();
        
        const user = await User.findById(userId);
        
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