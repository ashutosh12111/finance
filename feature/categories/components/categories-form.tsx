import React from 'react'
import { TypeOf, z } from "zod"
import { ControllerFieldState, ControllerRenderProps, FieldValues, UseFormStateProps, UseFormStateReturn, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { insertAccountsSchema } from '@/db/schema';
import {
    useFormField,
    Form,
    FormItem,
    FormLabel,
    FormControl,
    FormDescription,
    FormMessage,
    FormField
} from "@/components/ui/form"
import { Trash } from 'lucide-react';
import useConfirm from '@/hooks/use-confirm';

const formSchema = insertAccountsSchema.pick({
    name: true
})

type FormValues = z.input<typeof formSchema>
type Props = {
    id?: string,
    defaultValues?: FormValues,
    onSubmit: (values: FormValues) => void
    onDelete?: () => void
    disabled?: boolean
}

const CategoryForm = ({ id, defaultValues, onSubmit, onDelete, disabled }: Props) => {
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: defaultValues,
    })
    const hadndleSubmit = (values: FormValues) => {
        onSubmit(values)

    }

    const handleDelete = () => {
        onDelete?.()
    }
    return (
        <Form  {...form}>
            <form onSubmit={form.handleSubmit(hadndleSubmit)} className='space-y-4 pt-4 !mt-5' >
                <FormField
                    name="name"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem className='mb-4'>
                            <FormLabel>
                                Name
                            </FormLabel>
                            <FormControl>
                                <Input disabled={disabled} placeholder='e.g. Cash, Bank ,Credit Card' {...field} />
                            </FormControl>
                        </FormItem>
                    )}

                />
                <Button className='w-full mb-[20px] ' disabled={disabled}>
                    {id ? "Save CHanges" : "Create Category"}
                </Button>

                {!!id &&
                    <Button type='button' onClick={handleDelete} disabled={disabled} variant={"outline"} className='w-full' style={{
                        marginTop: "20px"
                    }}>
                        <Trash className='size-4 mr-2' style={{
                            marginRight: '8px'
                        }} />
                        Delete Category
                    </Button>
                }

            </form>
        </Form>
    )
}

export default CategoryForm