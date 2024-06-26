// "use client"
import { client } from "@/lib/hono"
import { useQuery } from "@tanstack/react-query"

export const useGetCategoies = (id?: string) => {
    const query = useQuery({
        enabled: !!id,
        queryKey: ["categories", { id }],
        queryFn: async () => {
            const response = await client.api.categories[":id"].$get({
                param: { id }
            });
            if (!response.ok) {
                throw new Error("Failed to fetch categories")
            }

            const { data } = await response.json()
            return data
        }
    })
    return query
}