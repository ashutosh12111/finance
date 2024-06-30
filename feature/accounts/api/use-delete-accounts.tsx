import { InferRequestType, InferResponseType } from "hono";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/hono"
import { toast } from "sonner"


type ResponseType = InferResponseType<typeof client.api.accounts["deleteMultipleId"]["$post"]>
type RequestType = InferRequestType<typeof client.api.accounts["deleteMultipleId"]["$post"]>["json"]


export const useDeleteAccounts = () => {
    const queryClient = useQueryClient()
    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async (json) => {
            const response = await client.api.accounts["deleteMultipleId"]["$post"]({
                json
            })
            return await response.json()
        },
        onSuccess: () => {
            toast.success("Account Deleted Sucessfully")
            queryClient.invalidateQueries({ queryKey: ["accounts"] })
        },
        onError: () => {
            toast.error("Failed to delete account")

        }
    })
    return mutation
}