import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: { params: { groupId: string }}) {
    try {
        const body = await req.json();

        const { documentRemove }: { documentRemove: String[] } = body;

        if (!params.groupId) {
            return new NextResponse("Document does not exist", { status: 400 });
        }

        const user = await getCurrentUser();

        if (!user) {
            return new NextResponse("No user", { status: 400 });
        }

        const specificGroup = await prisma.group.findUnique({
            where: {
                id: params.groupId
            }
        });

        const updateDocuments = specificGroup.sheetId.filter((sheet) => {
            return !documentRemove.includes(sheet);
        });

        const actualDocuments = specificGroup.sheets.filter((sheet) => {
            return !documentRemove.includes(sheet["id"])
        })

        const group = await prisma.group.update({
            where: {
                id: params.groupId
            },
            data: {
                sheetId: updateDocuments,
                sheets: actualDocuments
            }
        });
    
        return NextResponse.json(group);
    } catch (error) {
        console.log("[GROUP_DELETE_DOCUMENTS_ERROR]", error);
        return new NextResponse("Internal Error", { status: 400 });
    }
}