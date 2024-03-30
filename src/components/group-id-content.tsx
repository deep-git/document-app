"use client";

import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import Link from 'next/link';
import axios from 'axios';
import { redirect, useRouter } from 'next/navigation';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { ScrollArea } from './ui/scroll-area';
import { Prisma } from '@prisma/client';
import CreateDocument from './create-document';
import { Copy, Pencil } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Label } from './ui/label';
import { Input } from './ui/input';
import GroupRowContent from './group-row-content';

interface GroupIdContentProps {
    group: {
        id: string;
        name: string;
        sheetId: string[];
        sheets: Prisma.JsonValue[];
        userId: string;
        createdAt: Date;
        updatedAt: Date;
    },
    documentArray: any[],
    documents: {
        id: string;
        name: string;
        data: string;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
    }[]
}

const GroupIdContent = ({ group, documentArray, documents }: GroupIdContentProps) => {

    const [removeSelect, setRemoveSelect] = useState(true);
    const [documentRemove, setDocumentRemove] = useState([]);
    const [deleted, setDeleted] = useState(false);
    const router = useRouter();
    const [isMounted, setIsMounted] = useState(false);
    const [documentAddGroup, setDocumentAddGroup] = useState([]);
    const [dialogOpen, setDialogOpen] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, [])

    const handleDocumentRemoveProps = (e: any, documentRemoveId: string) => {
        if (e) {
            setDocumentRemove(prev => [...prev, documentRemoveId]);
        } else {
            const filterDocument = documentRemove.filter((document) => document !== documentRemoveId);
            setDocumentRemove(filterDocument);
        }
    }

    const handleRemoveDocuments = async () => {
        const response = await axios.patch(`/api/groups/${group.id}/documents`, {
            documentRemove
        });

        setRemoveSelect(true);
        router.refresh();
        setDeleted(prev => !prev);
    }

    const handleDeleteGroup = async () => {
        const response = await axios.delete(`/api/groups/${group.id}`);

        router.push("/groups");
    }

    const handleAddDocuments = async () => {
        const response = await axios.patch(`/api/groups/${group.id}/documents/add`, {
            documentAddGroup,
            actualDocuments: documents.filter((document) => {
                return documentAddGroup.includes(document.id)
            })
        });

        setDialogOpen(false);
        setDocumentAddGroup([]);
        router.refresh();
    }

    const addDocToGroup = (e: any, documentId: string) => {
        if (e) {
          setDocumentAddGroup(prev => [...prev, documentId]);
        } else {
          const filterDocument = documentAddGroup.filter((document) => document !== documentId);
          setDocumentAddGroup(filterDocument);
        }
    }

    if (!isMounted) {
        return null;
    }

  return (
    <div>
    <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="flex justify-center items-center mt-5 gap-5">
                <h2 className="text-[2em] lg:text-[4em] text-primary">{group.name}</h2>
                <span className="flex justify-center items-center w-10 h-10 bg-slate-100 text-primary font-semibold rounded-full">{group.sheetId.length}</span>
                </div>
                <div className="flex flex-col md:flex-row mt-5 md:mt-0 justify-center md:items-center gap-5">

                    <CreateDocument type="groups" group={group}/>
                    
                    <Dialog open={dialogOpen} onOpenChange={() => setDialogOpen(prev => !prev)}>
                        <DialogTrigger><Button>Add Documents</Button></DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Add Documents to Group</DialogTitle>
                            </DialogHeader>

                            <ScrollArea className="w-full h-96">
                                <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Add</TableHead>
                                        <TableHead>Document</TableHead>
                                        <TableHead>Last Updated</TableHead>
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    {documents.filter((document) => {
                                        return !group.sheetId.includes(document.id);
                                    }).map((document) => (
                                    <TableRow key={document.id}>
                                        <TableCell><Checkbox onCheckedChange={(e) => addDocToGroup(e, document.id)}/></TableCell>
                                        <TableCell>{document.name}</TableCell>
                                        <TableCell>{document.updatedAt.toString()}</TableCell>
                                    </TableRow>
                                    ))}
                        
                                </TableBody>
                                </Table>
                            </ScrollArea>

                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button variant="ghost">Close</Button>
                                </DialogClose>
                                <Button onClick={() => handleAddDocuments()}>Update</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                    
                    <Button variant="destructive" disabled={documentRemove.length > 0 ? false : true} onClick={() => handleRemoveDocuments()}>Remove</Button>
                </div>
            </div>

            <div className="mt-5">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-center">Remove <span className="hidden md:inline-flex">from Group</span></TableHead>
                            <TableHead className="text-center">Document Name</TableHead>
                            <TableHead className="text-center">Edit</TableHead>
                            <TableHead className="text-center">Last updated</TableHead>
                            <TableHead className="text-center hidden md:flex">Copy to Own Documents</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {group.sheets.map((document) => (
                            <GroupRowContent key={document["id"]} groupId={group.id} document={document} documents={documents} handleDocumentRemoveProps={handleDocumentRemoveProps}/>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <div className="mt-10 ml-auto w-max">
                <Dialog>
                    <DialogTrigger>
                        <Button variant="destructive" className="ml-auto">Delete Group</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Delete Group: {group.name}</DialogTitle>
                            <DialogDescription>Are you sure you would like to delete this group? This is an unreversible action.</DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="ghost">Close</Button>
                            </DialogClose>
                            <Button variant="destructive" onClick={() => handleDeleteGroup()}>
                                Delete Group
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
                
            </div>
            </div>
  )
}

export default GroupIdContent