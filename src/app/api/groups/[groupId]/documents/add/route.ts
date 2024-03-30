import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: { params: { groupId: string }}) {
    try {
        const body = await req.json();

        const { documentAddGroup, actualDocuments }: { documentAddGroup: String[], 
            actualDocuments: {
                id: string;
                name: string;
                data: string;
                userId: string;
                createdAt: Date;
                updatedAt: Date;
            }[] } = body;

        let updateGroup
        let updateDocumentsGroup = [];

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

        updateGroup = specificGroup.sheetId;

        for (let i = 0; i < specificGroup.sheets.length; i++) {
            updateDocumentsGroup.push(specificGroup.sheets[i]);
        }

        for (let i = 0; i < actualDocuments.length; i++) {
            updateDocumentsGroup.push(actualDocuments[i]);
        }

        for(let i = 0; i < documentAddGroup.length; i++) {
            updateGroup.push(documentAddGroup[i]);
        }

        const group = await prisma.group.update({
            where: {
                id: params.groupId
            },
            data: {
                sheetId: updateGroup,
                sheets: updateDocumentsGroup
            }
        });
    
        return NextResponse.json(group);
    } catch (error) {
        console.log("[GROUP_ADD_DOCUMENTS_ERROR]", error);
        return new NextResponse("Internal Error", { status: 400 });
    }
}

