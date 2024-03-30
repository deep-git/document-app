import { request } from "http";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/lib/prismadb";
import { useSession } from "next-auth/react";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { Prisma } from "@prisma/client";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const { groupName, documents }: { groupName: string, documents: {
            id: string;
            name: string;
            data: string;
            userId: string;
            createdAt: Date;
            updatedAt: Date;
        }[] } = body;

        if (!groupName) {
            return new NextResponse("Group needs a name!", { status: 400 });
        }

        const user = await getCurrentUser();

        if (!user) {
            return new NextResponse("No user", { status: 400 });
        }

        const documentIds = [];

        for(let i = 0; i < documents.length; i++) {
            documentIds.push(documents[i].id);
        }

        const group = await prisma.group.create({
            data: {
                name: groupName,
                userId: user.id,
                sheetId: documentIds,
                sheets: documents
            }
        })

        return NextResponse.json(group);

    } catch (error) {
        console.log("[DOCUMENT_CREATION_ERROR]", error);
        return new NextResponse("Internal Error", { status: 400 });
    }
}