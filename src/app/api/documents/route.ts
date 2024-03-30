import { request } from "http";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/lib/prismadb";
import { useSession } from "next-auth/react";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const { name }: { name: string } = body;

        if (!name) {
            return new NextResponse("Document needs a name!", { status: 400 });
        }

        const user = await getCurrentUser();

        if (!user) {
            return new NextResponse("No user", { status: 400 });
        }

        const document = await prisma.sheet.create({
            data: {
                name,
                userId: user.id,
                data: ""
            }
        })

        return NextResponse.json(document);
    } catch (error) {
        console.log("[DOCUMENT_CREATION_ERROR]", error);
        return new NextResponse("Internal Error", { status: 400 });
    }
}

export async function PATCH(req: Request) {
    try {
        const body = await req.json();

        const { deleteDocumentIds }: { deleteDocumentIds: string[] } = body;

        if (!deleteDocumentIds) {
            return new NextResponse("No requested documents to be deleted!", { status: 400 });
        }

        const user = await getCurrentUser();

        if (!user) {
            return new NextResponse("No user", { status: 400 });
        }

        const document = await prisma.sheet.deleteMany({
            where: {
                id: {
                    in: deleteDocumentIds
                }
            }
        })

        return NextResponse.json(document);
    } catch (error) {
        console.log("[DOCUMENT_DELETION_ERROR]", error);
        return new NextResponse("Internal Error", { status: 400 });
    }
}