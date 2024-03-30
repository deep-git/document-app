import getCurrentUser from "@/app/actions/getCurrentUser";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import QuillSheet from "@/components/quill-sheet";

const GroupDocumentIdPage = async({ params }: { params: { groupId: string, documentId: string }}) => {

  const user = await getCurrentUser();
  let groupDocument = [];

  if (!user) {
    throw new Error("No current user");
  }

  const group = await prisma.group.findUnique({
    where: {
        id: params.groupId,
        userId: user.id
    }
  });

  if (group) {
    groupDocument = group.sheets.filter((document) => document["id"] === params.documentId);
  }

  return (
      <div className="flex flex-col justify-center items-center pb-40 w-full">
        {!group ? (
          <div className="flex justify-center items-center min-h-screen text-[2em] text-primary text-wrap p-2">This document doesn't seem to exist within your account</div>
        ) : (
          <div className="w-[90%] lg:w-[796.8px] flex flex-col justify-center">
            <h1 className="text-[3em] mt-10">{groupDocument[0]["name"]}</h1>
            <div className="w-full flex items-center justify-center mt-10">
              <QuillSheet groupId={params.groupId} documentId={params.documentId} documentData={groupDocument[0]["data"]} type="groups"/>
            </div>
          </div>
        )}
      </div>
  )
}

export default GroupDocumentIdPage;