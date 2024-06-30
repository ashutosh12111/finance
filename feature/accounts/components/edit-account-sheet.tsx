import { z } from "zod";
import { useMedia } from "react-use"
import AccountForm from "./account-form"
import { useNewAccount } from "../hooks/useNewAccounts"
import { SheetContent, SheetTrigger, SheetClose, SheetHeader, SheetTitle, Sheet, SheetDescription } from "@/components/ui/sheet"

import { insertAccountsSchema } from "@/db/schema";
import { useCreateAccount } from "../api/use-create-accoounts";

import { useGetAccount } from "../api/use-get-account";
import { useOpenAccount } from "../hooks/useOpenAccounts";
import { Loader2 } from "lucide-react";
import { useEditAccount } from "../api/use-edit-accoounts";
import { useDeleteAccount } from "../api/use-delete-account";
import useConfirm from "@/hooks/use-confirm";
const formSchema = insertAccountsSchema.pick({
    name: true
})

type FormValues = z.input<typeof formSchema>

export const EditAccountSheet = () => {


    const { isOpen, onClose, id } = useOpenAccount();

    const editMutaion = useEditAccount(id)
    const accountQurey = useGetAccount(id)
    const deleteMutation = useDeleteAccount(id)
    const onSubmit = (values: FormValues) => {
        editMutaion.mutate(values, {
            onSuccess: () => {
                onClose()
            },
            onError: () => {

            }
        })
    }
    const [DialogBox, confirm] = useConfirm("Are you Sure to delete", "Pleaes confirm to delete this accounnt")


    const defaultValues = accountQurey.data ? { name: accountQurey.data.name } : { name: "" }
    const handleDelete = async () => {
        const ok = await confirm()
        if (ok) {
            deleteMutation.mutate(undefined, {
                onSuccess: () => {
                    onClose()
                }
            })
        }
    }
    return (
        <>
            <DialogBox />
            <Sheet open={isOpen} onOpenChange={onClose}>
                <SheetContent className="space-y-4">
                    <SheetHeader>
                        <SheetTitle> Edit Account</SheetTitle>
                        <SheetDescription>
                            Edit an Exiting Account
                        </SheetDescription>
                    </SheetHeader>

                    {accountQurey.isLoading || deleteMutation.isPending ?
                        <div className="absolute inset-0 flex justify-center items-center">
                            <Loader2 className="size-4 animate-spin" />
                        </div>
                        :
                        <AccountForm
                            id={id}
                            onSubmit={onSubmit}
                            disabled={editMutaion.isPending}
                            defaultValues={defaultValues}
                            onDelete={handleDelete} />
                    }

                </SheetContent>

            </Sheet>
        </>
    )
}