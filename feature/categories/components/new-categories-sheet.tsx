import { z } from "zod";
import { useMedia } from "react-use"
import CategoriesForm from "./categories-form"
import { useNewCategories } from "../hooks/useNewCategories"
import { SheetContent, SheetTrigger, SheetClose, SheetHeader, SheetTitle, Sheet, SheetDescription } from "@/components/ui/sheet"

import { insertAccountsSchema } from "@/db/schema";
import { useCreateCategories } from "../api/use-create-categories";
const formSchema = insertAccountsSchema.pick({
    name: true
})

type FormValues = z.input<typeof formSchema>

export const NewCategoriesShet = () => {



    const { isOpen, onClose } = useNewCategories();
    const mutation = useCreateCategories()
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
                        Create a new Category.
                    </SheetDescription>
                </SheetHeader>
                <CategoriesForm onSubmit={onSubmit} disabled={mutation.isPending} defaultValues={{ name: "" }} />

            </SheetContent>

        </Sheet>
    )
}