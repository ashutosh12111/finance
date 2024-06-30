"use client"
import { DataTable } from '@/components/data-table'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2, Plus, PlusIcon } from 'lucide-react'
import React from 'react'

import { columns } from './colums';
import { useGetAccounts } from '@/feature/accounts/api/use-get-accounts'
import { useNewAccount } from '@/feature/accounts/hooks/useNewAccounts'
import { Skeleton } from '@/components/ui/skeleton'
import { useDeleteAccounts } from '@/feature/accounts/api/use-delete-accounts'




// const data: Payment[] = [
//     {
//         id: "728ed52f",
//         amount: 100,
//         status: "pending",
//         email: "m@example.com",
//     },
//     {
//         id: "728ed522",
//         amount: 200,
//         status: "success",
//         email: "ashu@example.com",
//     },
//     {
//         id: "728ed5223",
//         amount: 23,
//         status: "processing",
//         email: "m@example.com",
//     },
// ]


const AccountsPage = () => {
    const newAccount = useNewAccount()
    const accoountsQuery = useGetAccounts()
    const deleteAccounts = useDeleteAccounts()
    const accounts = accoountsQuery.data || [];


    const isDisabled = accoountsQuery.isLoading || deleteAccounts.isPending



    if (accoountsQuery.isLoading) {
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
                        Account Page
                    </CardTitle >
                    <Button size="sm" onClick={newAccount?.onOpen}>
                        <Plus className='size-4 mr-2' />
                        Add new
                    </Button>
                </CardHeader>
                <CardContent>
                    <DataTable columns={columns} data={accounts} filterKey={"name"} onDelete={async (row: any) => {
                        const ids = row.map((r: any) => r.original.id)
                        deleteAccounts.mutate({ ids })
                    }} disabled={isDisabled} />
                </CardContent>
            </Card>
        </div>
    )
}

export default AccountsPage