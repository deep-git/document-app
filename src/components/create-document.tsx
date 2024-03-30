"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'sonner';
import { Prisma } from '@prisma/client';

interface CreateDocumentProps {
    type?: string,
    group?: {
        id: string;
        name: string;
        sheetId: string[];
        sheets: Prisma.JsonValue[];
        userId: string;
        createdAt: Date;
        updatedAt: Date;
    }
}

const CreateDocument = ({ type, group }: CreateDocumentProps) => {

    const [dialogChange, setDialogChange] = useState(false);
    const [name, setName] = useState<string>("New Document");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const createDocument = async() => {
      setIsLoading(true);
      if (type === "documents") {
        const response = await axios.post("/api/documents", {
          name
        });
      }

        if (type === "groups") {
            const groupAddDocument = await axios.patch(`/api/groups/${group.id}/documents/create`, {
              name
            });
        }
    
        setDialogChange(false);
        setIsLoading(false);

        router.refresh();
        toast(`Document '${name}' has been created`, {
          description: "Latest Blank Document"
        });
      }

  return (
    <Dialog open={dialogChange} onOpenChange={() => setDialogChange(prev => !prev)}>
                <DropdownMenu>
                  <DropdownMenuTrigger className="bg-primary text-white px-4 py-2 rounded-lg">Create</DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Pages</DropdownMenuLabel>
                    <DropdownMenuSeparator/>   
                    <DropdownMenuItem>
                      <DialogTrigger>
                        Blank Page
                      </DialogTrigger>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Name your document</DialogTitle>
                      <DialogDescription>Enter a name for your document, default will be set to &apos;New Document&apos;</DialogDescription>
                    </DialogHeader>
                    <div>
                      <Label>Name</Label>
                      <Input placeholder="New Document" type="text" className="mt-2" value={name} onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button type="button" variant="ghost">
                          Close
                        </Button>
                      </DialogClose>
                      <Button disabled={isLoading} onClick={() => createDocument()}>Create</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
  )
}

export default CreateDocument