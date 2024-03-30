import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
    try {
        const body = await req.json();

        const { rename }: { rename: string } = body;

        if (!rename) {
            return new NextResponse("No username change set", { status: 400 });
        }

        const user = await getCurrentUser();

        if (!user) {
            return new NextResponse("No user", { status: 400 });
        }

        const userEditUsername = await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                username: rename
            }
        })

        return NextResponse.json(userEditUsername);
    } catch (error) {
        console.log("[USER_RENAME_ERROR]", error);
        return new NextResponse("Internal Error", { status: 400 });
    }
}

export async function DELETE(req: Request) {
    try {
        const user = await getCurrentUser();

        if (!user) {
            return new NextResponse("No user", { status: 400 });
        }

        const response = await prisma.user.delete({
            where: {
                id: user.id
            },
        })

        return NextResponse.json(response);
    } catch (error) {
        console.log("[USER_DELETE_ERROR]", error);
        return new NextResponse("Internal Error", { status: 400 });
    }
}