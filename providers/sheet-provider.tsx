"use client"

import { EditAccountSheet } from "@/feature/accounts/components/edit-account-sheet"
import { NewAccountSheet } from "@/feature/accounts/components/new-account-sheet"
import { useMountedState } from "react-use"

export const SheetProvider = () => {
    const isMounted = useMountedState()
    if (!isMounted) return null

    return (
        <>
            <NewAccountSheet />
            <EditAccountSheet />
        </>
    )

}