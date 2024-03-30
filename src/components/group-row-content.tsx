"use client";

import React, { useState } from 'react'
import { TableCell, TableRow } from './ui/table'
import Link from 'next/link'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Copy, Pencil } from 'lucide-react'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Checkbox } from './ui/checkbox'
import { Prisma } from '@prisma/client'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';

interface GroupRowContentProps {
    groupId: string;
    document: Prisma.JsonValue;
    documents: {
        id: string;
        name: string;
        data: string;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
    }[];
    handleDocumentRemoveProps: (e: any, documentRemoveId: string) => void;
}

const GroupRowContent = ({ groupId, document, documents, handleDocumentRemoveProps }: GroupRowContentProps) => {

    const [documentRemove, setDocumentRemove] = useState([]);
    const [renameDocument, setRenameDocument] = useState(document["name"]);
    const router = useRouter();

    const handleCheckRemove = (e: any, documentId: string) => {
        if (e) {
            setDocumentRemove(prev => [...prev, documentId]);
        } else {
            const filterDocument = documentRemove.filter((document) => document !== documentId);
            setDocumentRemove(filterDocument);
        }

        handleDocumentRemoveProps(e, documentId);
    }

    const handleCopyToDocuments = async (document: Prisma.JsonValue) => {
        const response = await axios.post(`/api/documents/copy`, {
            id: document["id"],
            name: document["name"],
            content: document["data"]
        });

        router.refresh();
    }

    const handleSaveEdit = async() => {
        const response = await axios.patch(`/api/groups/${groupId}/documents/${document["id"]}/rename`, {
            renameDocument
        });

        router.refresh();
    }

  return (
    <TableRow key={document["id"]}>
                                <TableCell className="text-center"><Checkbox onCheckedChange={(e) => handleCheckRemove(e, document["id"])}/></TableCell>
                                <TableCell className="text-center w-20 sm:w-44 md:w-96">
                                    <Link href={`/groups/${groupId}/document/${document["id"]}`} target="_blank" className="hover:text-primary line-clamp-1">
                                        {document["name"]}
                                    </Link>
                                </TableCell>
                                <TableCell className="flex justify-center items-center">
                                    <Popover>
                                        <PopoverTrigger className="flex justify-center items-center">
                                            <Pencil/>
                                        </PopoverTrigger>
                                        <PopoverContent>
                                            <Label>Rename Document</Label>
                                            <Input placeholder="Rename Document" value={renameDocument} onChange={(e) => setRenameDocument(e.target.value)} className="mt-2"/>
                                            <div className="w-max ml-auto mt-3">
                                                <Button onClick={() => handleSaveEdit()}>Save</Button>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                    
                                </TableCell>
                                <TableCell className="text-center">{new Date(document["updatedAt"]).toUTCString()}</TableCell>
                                <TableCell className="text-center">
                                    {documents.filter((sheet) => sheet.id === document["id"]).length === 0 && (
                                        <div className="flex justify-center items-center">
                                            <Copy onClick={() => handleCopyToDocuments(document)}/>
                                        </div>
                                    )}
                                </TableCell>
                            </TableRow>
  )
}

export default GroupRowContent