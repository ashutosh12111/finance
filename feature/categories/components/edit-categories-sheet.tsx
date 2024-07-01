import { z } from "zod";
import { useMedia } from "react-use"
import CategoriesForm from "./categories-form"
import { useNewCategories } from "../hooks/useNewCategories"
import { SheetContent, SheetTrigger, SheetClose, SheetHeader, SheetTitle, Sheet, SheetDescription } from "@/components/ui/sheet"

import { insertcategoriesSchema } from "@/db/schema";
import { useCreateCategories } from "../api/use-create-categories";

import { useGetCategoies } from "../api/use-get-category";
import { useOpenCategory } from "../hooks/useOpenCagtegories";
import { Loader2 } from "lucide-react";
import { useEditCategory } from "../api/use-edit-categories";
import { useDeleteCategory } from "../api/use-delete-category";
import useConfirm from "@/hooks/use-confirm";
const formSchema = insertcategoriesSchema.pick({
    name: true
})

type FormValues = z.input<typeof formSchema>

export const EditCategorieSheet = () => {


    const { isOpen, onClose, id } = useOpenCategory();

    const editMutaion = useEditCategory(id)
    const accountQurey = useGetCategoies(id)
    const deleteMutation = useDeleteCategory(id)
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
                        <CategoriesForm
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