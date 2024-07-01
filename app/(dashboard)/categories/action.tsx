"use client"
import React from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button';
import { Edit, MoreHorizontal, Trash2 } from 'lucide-react';

import { useOpenCategory } from '@/feature/categories/hooks/useOpenCagtegories';
import { useDeleteCategory } from '@/feature/categories/api/use-delete-category';
import useConfirm from '@/hooks/use-confirm';




const Action = ({ id }: { id: string }) => {
    const { onOpen } = useOpenCategory()
    const deleteMuatation = useDeleteCategory(id);
    const [DialogBox, confirm] = useConfirm("Are you Sure to delete", "Pleaes confirm to delete this Category")
    const handleDelete = async () => {
        const ok = await confirm()
        if (ok) {
            deleteMuatation.mutate()
        }
    }
    return (
        <>
            <DialogBox />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className='size-4 p-0'>
                        <MoreHorizontal className='size-4 ' />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem disabled={deleteMuatation.isPending} onClick={() => onOpen(id)}>
                        <Edit className='size-4 mr-2' />
                        Edit</DropdownMenuItem>
                    <DropdownMenuItem disabled={deleteMuatation.isPending} onClick={handleDelete}>
                        <Trash2 className='size-4 mr-2' />
                        Delete</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}

export default Action