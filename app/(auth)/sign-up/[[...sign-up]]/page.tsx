import React from "react";
import { Loader2 } from "lucide-react";
import { SignUp, ClerkLoading, ClerkLoaded } from "@clerk/nextjs";
import Image from "next/image";

const Page = () => {
  return (
    <div className="min-h-full grid grid-cols-1 lg:grid-cols-2">
      <div className="h-full lg:flex flex-col items-center justify-center">
        <div className="text-center space-y-5 pt-16">
          <h1 className="font-bold text-3xl text-[#2E2A47]">Welcome Back</h1>
          <p className="text-base text-[7E8CA0]">
            Log in or Create account to get back to your account
          </p>
        </div>
        <div className="flex items-center justify-center mt-8">
          <ClerkLoaded>
            <SignUp path="/sign-up" />
          </ClerkLoaded>
          <ClerkLoading>
            <Loader2 className="animate-spin text-muted-foreground" />
          </ClerkLoading>
        </div>
      </div>
      <div className="h-full bg-blue-600 hidden lg:flex items-center justify-center">
        <Image src="/assets/logo.svg" alt="logo" width={100} height={100} />
      </div>
    </div>
  );
};

export default Page;
