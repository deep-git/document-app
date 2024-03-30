import { request } from "http";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/lib/prismadb";
import { useSession } from "next-auth/react";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const { id, name, content }: { id: string, name: string, content: string } = body;

        if (!name) {
            return new NextResponse("Document needs a name!", { status: 400 });
        }

        const user = await getCurrentUser();

        if (!user) {
            return new NextResponse("No user", { status: 400 });
        }

        const document = await prisma.sheet.create({
            data: {
                id: id,
                name,
                userId: user.id,
                data: content
            }
        })

        return NextResponse.json(document);
    } catch (error) {
        console.log("[DOCUMENT_COPY_ERROR]", error);
        return new NextResponse("Internal Error", { status: 400 });
    }
}