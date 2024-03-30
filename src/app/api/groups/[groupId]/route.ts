import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: { params: { groupId: string }}) {
    try {
        const body = await req.json();

        const { rename } = body;

        if (!params.groupId) {
            return new NextResponse("Document does not exist", { status: 400 });
        }

        const user = await getCurrentUser();

        if (!user) {
            return new NextResponse("No user", { status: 400 });
        }

        const group = await prisma.group.update({
            where: {
                id: params.groupId
            },
            data: {
                name: rename
            }
        });

        return NextResponse.json(group);
    } catch (error) {
        console.log("[GROUP_RENAME_ERROR]", error);
        return new NextResponse("Internal Error", { status: 400 });
    }
}

export async function DELETE(req: Request, { params }: { params: { groupId: string }}) {
    try {
        if (!params.groupId) {
            return new NextResponse("Document does not exist", { status: 400 });
        }

        const user = await getCurrentUser();

        if (!user) {
            return new NextResponse("No user", { status: 400 });
        }

        const group = await prisma.group.delete({
            where: {
                id: params.groupId
            },
        });

        return NextResponse.json(group);
    } catch (error) {
        console.log("[GROUP_DELETE_ERROR]", error);
        return new NextResponse("Internal Error", { status: 400 });
    }
}