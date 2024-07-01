"use client"
import { DataTable } from '@/components/data-table'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2, Plus, PlusIcon } from 'lucide-react'
import React from 'react'

import { columns } from './colums';
import { useGetCategories } from '@/feature/categories/api/use-get-categories'
import { useNewCategories } from '@/feature/categories/hooks/useNewCategories'
import { Skeleton } from '@/components/ui/skeleton'
import { useDeleteCategories } from '@/feature/categories/api/use-delete-categories'
import { categories } from '@/db/schema'





const CategoriesPage = () => {
    const newAccount = useNewCategories()
    const categoriesQuery = useGetCategories()
    const deleteAccounts = useDeleteCategories()
    const categories: any = categoriesQuery.data || [];


    const isDisabled = categoriesQuery.isLoading || deleteAccounts.isPending



    if (categoriesQuery.isLoading) {
        return (
            <div className='max-w-screen-2xl mx-auto w-full pb-10 -mt-24'>
                <Card className='w-full border-none drop-shadow-sm'>
                    <CardHeader>
                        <Skeleton className='h-8 w-48' />
                    </CardHeader>
                    <CardContent>
                        <div className='h-[500px] w-full flex items-center justify-center '>
                            <Loader2 className=' size-6 text-slate-300 animate-spin' />

                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }


    return (
        <div className='h-full w-full -mt-24 mx-auto max-w-screen-2xl'>
            <Card className='w-full border-none drop-shadow-sm'>
                <CardHeader className='lg:flex-row lg:justify-between  lg:items-center'>
                    <CardTitle className='text-2xl line-clamp-2'>
                        Categories Page
                    </CardTitle >
                    <Button size="sm" onClick={newAccount?.onOpen}>
                        <Plus className='size-4 mr-2' />
                        Add new
                    </Button>
                </CardHeader>
                <CardContent>
                    <DataTable columns={columns} data={categories} filterKey={"name"} onDelete={async (row: any) => {
                        const ids = row.map((r: any) => r.original.id)
                        deleteAccounts.mutate({ ids })
                    }} disabled={isDisabled} />
                </CardContent>
            </Card>
        </div>
    )
}

export default CategoriesPage