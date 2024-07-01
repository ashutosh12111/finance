"use client"

import { EditAccountSheet } from "@/feature/accounts/components/edit-account-sheet"
import { NewAccountSheet } from "@/feature/accounts/components/new-account-sheet"
import { EditCategorieSheet } from "@/feature/categories/components/edit-categories-sheet"
import { NewCategoriesShet } from "@/feature/categories/components/new-categories-sheet"
import { useMountedState } from "react-use"

export const SheetProvider = () => {
    const isMounted = useMountedState()
    if (!isMounted) return null

    return (
        <>
            <NewAccountSheet />
            <EditAccountSheet />
            <NewCategoriesShet />
            <EditCategorieSheet />

        </>
    )

}