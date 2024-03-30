"use client";

import "quill/dist/quill.snow.css";
import dynamic from 'next/dynamic';
import { useCallback, useEffect, useState } from "react";
import Quill from "quill";
import axios from "axios";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { Delta } from "quill/core";
const QuillEditor = dynamic(() => import("react-quill"), { ssr: false });

const QuillSheet = ({ groupId, documentId, documentData, type }: { groupId?: string, documentId: string, documentData: string, type?: string }) => {
    const [quill, setQuill] = useState<Quill>();
    const router = useRouter();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const saveData = async () => {
        if (type === "document") {
            const response = await axios.patch(`/api/documents/${documentId}/edit`, {
                quill: quill.getContents()
            });
        }

        if (type === "groups") {
            const responseGroup = await axios.patch(`/api/groups/${groupId}/documents/${documentId}/edit`, {
                quill: quill.getContents()
            })
        }

        router.refresh();
    }

    const ops = new Delta().insert(documentData);

    const wrapperRef = useCallback(wrapper => {
        if (wrapper == null) return;

        wrapper.innerHTML = "";

        const editor = document.createElement("div");
        wrapper.append(editor);
        const q = new Quill(editor, { theme: "snow" });
        q.setContents(ops);
        setQuill(q)
    }, [ops]);

    if (!isMounted) {
        return null;
    }

  return (
    <div className="flex w-full flex-col justify-center items-center md:items-start">
        <Button className="mb-5 md:mr-auto" onClick={() => saveData()}>Save</Button>
        <div id="container" ref={wrapperRef} className="w-full"></div>
    </div>
  )
}

export default QuillSheet