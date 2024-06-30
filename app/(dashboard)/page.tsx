"use client"
import { Button } from "@/components/ui/button";

import { useNewAccount } from "@/feature/accounts/hooks/useNewAccounts";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
const {onOpen} =   useNewAccount()


  return (
    <div>
      {/* <UserButton afterSignOutUrl="/" /> */}
<Button onClick={onOpen}> Add new account</Button>
    </div>
  );
}
