import getCurrentUser from "@/app/actions/getCurrentUser";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import QuillSheet from "@/components/quill-sheet";

const DocumentIdPage = async({ params }: { params: { documentId: string }}) => {

  const user = await getCurrentUser();

  if (!user) {
    throw new Error("No current user");
  }

  const document = await prisma.sheet.findUnique({
    where: {
      userId: user.id,
      id: params.documentId
    }
  });

  return (
      <div className="flex flex-col justify-center items-center pb-40 w-full">
        {!document ? (
          <div className="flex justify-center items-center min-h-screen text-[2em] text-primary text-wrap p-2">This document doesn't seem to exist within your account</div>
        ) : (
          <div className="w-[90%] lg:w-[796.8px] flex flex-col justify-center">
            <h1 className="text-[3em] mt-10">{document.name}</h1>
            <div className="w-full flex items-center justify-center mt-10">
              <QuillSheet documentId={document.id} documentData={document.data} type="document"/>
            </div>
          </div>
        )}
      </div>
  )
}

export default DocumentIdPage;