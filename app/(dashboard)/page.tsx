"use client"
import { Button } from "@/components/ui/button";
import { useGetAccounts } from "@/feature/accounts/api/use-get-account";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  const {data, isLoading} = useGetAccounts()
  console.log(isLoading)

  return (
    <div>
      <UserButton afterSignOutUrl="/" />
      This is authenticated route.
    </div>
  );
}
