"use client";

import React, { useState } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'
import MaxWidthWrapper from './MaxWidthWrapper'
import axios from "axios";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Checkbox } from './ui/checkbox';
import { ScrollArea } from './ui/scroll-area';
import { toast } from 'sonner';
import CreateDocument from './create-document';

interface DocumentProps {
  type: string,
  documents?: {
    id: string;
    name: string;
    data: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
  }[]
}

const PageHeading = ({ type, documents }: DocumentProps) => {
  const [name, setName] = useState<string>("New Document");
  const [groupName, setGroupName] = useState<string>("New Group");
  const [dialogChange, setDialogChange] = useState(false);
  const router = useRouter();
  const [documentAddGroup, setDocumentAddGroup] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  const createGroup = async() => {
    setIsLoading(true);

    const response = await axios.post("/api/groups", {
      groupName,
      documents: documents.filter((document) => documentAddGroup.includes(document.id))
    })

    setDialogChange(false);
    setIsLoading(false);
    router.refresh();
    toast(`Group '${groupName}' has been created`, {
      description: "Latest Group"
    });
  }

  const addDocToGroup = (e: any, documentId: string) => {

    if (e) {
      setDocumentAddGroup(prev => [...prev, documentId]);
    } else {
      const filterDocument = documentAddGroup.filter((document) => document !== documentId);
      setDocumentAddGroup(filterDocument);
    }
  }

  console.log(documentAddGroup);

  return (
        <div className="flex justify-between items-center h-40 flex-wrap">
          <h1 className="text-[2em] sm:text-[3em] md:text-[4em] lg:text-[6em] text-primary capitalize">{type}</h1>

          <div className="w-max">
            {type === "dashboard" && (
              
              <CreateDocument type="documents"/>
                
            )}
            {type === "groups" && (
              <Dialog open={dialogChange} onOpenChange={() => setDialogChange(prev => !prev)}>
                <DialogTrigger className="bg-primary text-white px-4 py-2 rounded-lg">
                  Create Group
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create Group</DialogTitle>
                    <DialogDescription>Enter a name for your group, default will be set to 'New Group'</DialogDescription>
                  </DialogHeader>
                  <div>
                    <Label>Name</Label>
                    <Input placeholder="New Document" type="text" className="mt-2" value={groupName} onChange={(e) => setGroupName(e.target.value)}/>
                  </div>
                  <div>
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
                        {documents.map((document) => (
                          <TableRow key={document.id}>
                            <TableCell><Checkbox onCheckedChange={(e) => addDocToGroup(e, document.id)}/></TableCell>
                            <TableCell>{document.name}</TableCell>
                            <TableCell>{document.updatedAt.toString()}</TableCell>
                          </TableRow>
                        ))}
            
                      </TableBody>
                    </Table>
                    </ScrollArea>
                  </div>
                  <DialogFooter>
                      <DialogClose asChild>
                        <Button type="button" variant="ghost">
                          Close
                        </Button>
                      </DialogClose>
                      <Button disabled={isLoading} onClick={() => createGroup()}>Create</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}

          </div>
        </div>
  )
}

export default PageHeading