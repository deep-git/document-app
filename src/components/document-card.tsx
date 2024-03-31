"use client";

import axios from 'axios';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { File, Pencil, Text, Trash } from 'lucide-react';
import Link from 'next/link';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Input } from './ui/input';
import { useState } from 'react';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

interface DocumentCardProps {
  document: {
    id: string;
    name: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
  },
  handleRemoveDocumentIds: (documentId: string, clickDelete: boolean) => void
}

const DocumentCard = ({ document, handleRemoveDocumentIds }: DocumentCardProps) => {
  const [rename, setRename] = useState<string>(document.name);
  const [openPopover, setOpenPopover] = useState(false);
  const [clickDelete, setClickDelete] = useState(false);
  const router = useRouter();

  const handleRenameDocument = async (documentId: string) => {
    const response = await axios.patch(`/api/documents/${documentId}`, {
      rename
    });

    setOpenPopover(false);
    router.refresh();
  }

  const handleRemoveDocs = (documentId: string) => {
    setClickDelete(prev => !prev);
    if (clickDelete) {
      handleRemoveDocumentIds(documentId, false);
    } else {
      handleRemoveDocumentIds(documentId, true);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center bg-slate-100/50 min-h-72 rounded-lg p-4">
      <File className="w-32 h-32 text-primary my-2" />
      <Link href={`/document/${document.id}`} className="w-full p-2 bg-blue-600/10 rounded-lg flex justify-center items-center" target="_blank">
        <p className="text-primary line-clamp-1 hover:text-blue-900 font-semibold">{document.name}</p>
      </Link>
      <div className="mt-2"><span className="font-semibold">Last Updated:</span> {document.updatedAt.toUTCString()}</div>
      <div className="flex w-full justify-end gap-5 mt-2">
        <Popover open={openPopover} onOpenChange={() => setOpenPopover(prev => !prev)}>
          <PopoverTrigger>
            <Pencil className="text-zinc-400 hover:text-primary" />
          </PopoverTrigger>
          <PopoverContent side="top" className="w-72">
            <p className="font-semibold text-primary">Rename your document</p>
            <Input placeholder="Rename document" value={rename} onChange={(e) => setRename(e.target.value)} className="mt-2" />
            <div className="flex justify-end w-full">
              <Button onClick={() => handleRenameDocument(document.id)} className="mt-5">Save</Button>
            </div>
          </PopoverContent>
        </Popover>


        <Trash onClick={() => handleRemoveDocs(document.id)} className={`${clickDelete ? 'text-rose-600' : 'text-zinc-400'} ml-auto`} />
      </div>
    </div>
  )
}

export default DocumentCard