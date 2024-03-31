import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/lib/prismadb";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const { username, email, password } = body;

        if (!email || !username || !password) {
            return new NextResponse("Missing info", { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                username,
                email,
                hashedPassword,
                image: "/default_profile_image.png",
            }
        });

        return NextResponse.json(user);

    } catch (error) {
        console.log("[REGISTRATION_ERROR]", error);
        return new NextResponse("Internal Error", { status: 400 });
    }
}