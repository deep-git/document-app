import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
    try {
        const body = await req.json();

        const { changeImage }: { changeImage: string } = body;

        if (!changeImage) {
            return new NextResponse("No image set", { status: 400 });
        }

        const user = await getCurrentUser();

        if (!user) {
            return new NextResponse("No user", { status: 400 });
        }

        const userEditImage = await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                image: changeImage
            }
        });

        return NextResponse.json(userEditImage);
    } catch (error) {
        console.log("[USER_IMAGE_ERROR]", error);
        return new NextResponse("Internal Error", { status: 400 });
    }
}