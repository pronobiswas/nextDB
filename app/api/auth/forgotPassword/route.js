// app/api/forgotPassword/route.js
import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { dbConnection } from "@/lib/dbConnection";
import User from "@/models/User";

export async function POST(req, code) {
    try {
        const { email, code } = await req.json();
        // ====connect db===
        await dbConnection();
        //  ===find user===
        const user = await User.findOne({ email: email });
        if (!user) {
            return NextResponse.json(
                { success: false, message: "User not registered" },
                { status: 404 }
            );
        }
        // =====Update user with verification code====
        const updateUser = await User.findByIdAndUpdate(user._id, { verificationCode: code });
        if (!updateUser) return;
        // ====Create transporter===
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.SERVICE_MAIL,
                pass: process.env.APP_PASSWORD,
            },
        });
        // ====Email options===
        const mailOptions = {
            from: `"Your App Name" <${process.env.SERVICE_MAIL}>`,
            to: email,
            subject: "Your Verification Code",
            html: `
                    <div style="font-family: Arial, sans-serif; padding: 20px;">
                    <h2>Your Verification Code</h2>
                    <p>Use this code to verify your email:</p>
                    <div style="font-size: 24px; font-weight: bold; color: #007bff;">
                        ${code}
                    </div>
                    </div>
                `,
        };

        // ====Send mail====
        await transporter.sendMail(mailOptions);

        return NextResponse.json({ success: true, message: "Email sent successfully!" });

        // ***********catch error********
    } catch (error) {
        console.error("Email sending failed:", error);
        return NextResponse.json({ success: false, message: "Failed to send email" }, { status: 500 });
    }
}
