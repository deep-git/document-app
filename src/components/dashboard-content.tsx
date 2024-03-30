"use client";

import { Search } from 'lucide-react'
import React, { useState } from 'react'
import { Input } from './ui/input'
import { Separator } from './ui/separator'
import DashboardSidebar from './navbar/dashboard-sidebar'
import DocumentCard from './document-card'
import { Button } from './ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface DocumentCardProps {
    documents: {
        id: string;
        name: string;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
    }[]
}

const DashboardContent = ({ documents }: DocumentCardProps) => {

    const [title, setTitle] = useState("");
    const [deleteDocumentIds, setDeleteDocumentIds] = useState([]);
    const router = useRouter();

    const handleRemoveDocumentIds = (documentId: string, clickDelete: boolean) => {
      if (clickDelete) {
        setDeleteDocumentIds(prev => [...prev, documentId]);
      } else {
        const filterDocuments = deleteDocumentIds.filter((document) => document !== documentId);
        setDeleteDocumentIds(filterDocuments);
      }
    }

    const handleDeleteDocuments = async () => {
      const response = await axios.patch("/api/documents", {
        deleteDocumentIds
      });

      setDeleteDocumentIds([]);
      router.refresh();
    }

  return (
    <div>
    <div className="flex justify-between">
      <div className="flex justify-center items-center mb-5 gap-2 w-96">
          <Search className="text-primary"/>
          <Input placeholder="Search Documents" value={title} onChange={(e) => setTitle(e.target.value)}/>
          </div>
          {deleteDocumentIds.length > 0 && (
          <div className="flex justify-center items-center gap-2">
            <span className="text-zinc-500">{deleteDocumentIds.length} document selected</span>
            
            <Dialog>
              <DialogTrigger>
                <Button variant="destructive">Remove</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Delete Documents</DialogTitle>
                  <DialogDescription>Are you sure you would like to delete a total of {deleteDocumentIds.length} documents?</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="ghost">Close</Button>
                  </DialogClose>
                  <Button onClick={() => handleDeleteDocuments()} variant="destructive">Delete</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            
          </div>
        )}
        </div>

        <Separator/>

        <div className="relative flex flex-col">
          <div className="sticky top-16">
            <DashboardSidebar/>
          </div>
          
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mt-10">
            {documents.filter((document) => document.name.toLowerCase().includes(title.toLowerCase())).map((document) => (
              <DocumentCard key={document.id} document={document} handleRemoveDocumentIds={handleRemoveDocumentIds}/>     
            ))}
          </div>
        </div>
        </div>
  )
}

export default DashboardContent