import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: { params: { documentId: string }}) {
    try {
        const body = await req.json();

        const { quill } = body;

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
                data: quill.ops[0].insert
            }
        }).catch((error) => {
            console.log("Document object does not exist here");
        })

        return NextResponse.json(document);
    } catch (error) {
        console.log("[DOCUMENT_EDIT_ERROR]", error);
        return new NextResponse("Internal Error", { status: 400 });
    }
}