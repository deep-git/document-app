import { request } from "http";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/lib/prismadb";
import { useSession } from "next-auth/react";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function DELETE(req: Request, { params }: { params: { documentId: string }}) {
    try {
        if (!params.documentId) {
            return new NextResponse("Document does not exist", { status: 400 });
        }

        const user = await getCurrentUser();

        if (!user) {
            return new NextResponse("No user", { status: 400 });
        }

        const document = await prisma.sheet.delete({
            where: {
                id: params.documentId
            }
        });

        return NextResponse.json(document);
    } catch (error) {
        console.log("[DOCUMENT_CREATION_ERROR]", error);
        return new NextResponse("Internal Error", { status: 400 });
    }
}

export async function PATCH(req: Request, { params }: { params: { documentId: string }}) {
    try {
        const body = await req.json();

        const { rename } = body;

        if (!params.documentId) {
            return new NextResponse("Document does not exist", { status: 400 });
        }

        const user = await getCurrentUser();

        if (!user) {
            return new NextResponse("No user", { status: 400 });
        }

        const document = await prisma.sheet.update({
            where: {
                id: params.documentId
            },
            data: {
                name: rename
            }
        });

        return NextResponse.json(document);
    } catch (error) {
        console.log("[DOCUMENT_CREATION_ERROR]", error);
        return new NextResponse("Internal Error", { status: 400 });
    }
}