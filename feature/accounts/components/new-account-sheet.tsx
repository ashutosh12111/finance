import { z } from "zod";
import { useMedia } from "react-use"
import AccountForm from "./account-form"
import { useNewAccount } from "../hooks/useNewAccounts"
import { SheetContent, SheetTrigger, SheetClose, SheetHeader, SheetTitle, Sheet, SheetDescription } from "@/components/ui/sheet"

import { insertAccountsSchema } from "@/db/schema";
import { useCreateAccount } from "../api/use-create-accoounts";
const formSchema = insertAccountsSchema.pick({
    name: true
})

type FormValues = z.input<typeof formSchema>

export const NewAccountSheet = () => {



    const { isOpen, onClose } = useNewAccount();
    const mutation = useCreateAccount()
    const onSubmit = (values: FormValues) => {
        mutation.mutate(values, {
            onSuccess: () => {
                onClose()
            },
            onError: () => {

            }
        })

    }

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="space-y-4">
                <SheetHeader className="mb-5">
                    <SheetTitle> New Header</SheetTitle>
                    <SheetDescription>
                        Create a new Account to track your transection.
                    </SheetDescription>
                </SheetHeader>
                <AccountForm onSubmit={onSubmit} disabled={mutation.isPending} defaultValues={{ name: "" }} />

            </SheetContent>

        </Sheet>
    )
}