import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: { params: { groupId: string, documentId: string }}) {
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

        const group = await prisma.group.findUnique({
            where: {
                id: params.groupId
            }
        });

        const groupDocument = group.sheets.filter((document) => document["id"] === params.documentId);

        if (groupDocument.length > 0) {

            groupDocument[0]["data"] = quill.ops[0].insert;

            const removePreviousDocument = group.sheets.filter((document) => document["id"] !== params.documentId);

            removePreviousDocument.push(groupDocument[0]);

            const saveGroup = await prisma.group.update({
                where: {
                    id: params.groupId,
                }, 
                data: {
                    sheets: removePreviousDocument
                }
            })

            return NextResponse.json(saveGroup);
        }
    } catch (error) {
        console.log("[DOCUMENT_EDIT_ERROR]", error);
        return new NextResponse("Internal Error", { status: 400 });
    }
}