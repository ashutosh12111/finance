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
import { useOpenAccount } from '@/feature/accounts/hooks/useOpenAccounts';
import { useDeleteAccount } from '@/feature/accounts/api/use-delete-account';
import useConfirm from '@/hooks/use-confirm';
// import { EditAccountSheet } from '@/feature/accounts/components/edit-account-sheet';



const Action = ({ id }: { id: string }) => {
    const { onOpen } = useOpenAccount()
    const deleteMuatation = useDeleteAccount(id);
    const [DialogBox, confirm] = useConfirm("Are you Sure to delete", "Pleaes confirm to delete this accounnt")
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