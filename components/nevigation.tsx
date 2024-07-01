"use client";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { useMedia } from "react-use"

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import NavButton from "./nav-button";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";


const routes = [
  {
    href: "/",
    label: "Overview",
  },
  {
    href: "/trasections",
    label: "Trasections",
  },
  { href: "/accounts", label: "Accounts" },
  { href: "/categories", label: "Categories" },
  { href: "/settings", label: "Settings" },
];


const Navigation = () => {
  const pathName = usePathname();
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const isMobile = useMedia("(max-width:1024px)", false)
  const onClick = (href: string) => {
    router.push(href)
    setIsOpen(false)
  }
  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger>
          <Button variant='outline' size='sm' className="font-normal bg-white/10 hover:bg-white  focus-visible:ring-offset-0 focus-visible:ring-transparent
            outline-none text-white focus:bg-white/30 transition border-none">
            <Menu className="size-4" />
          </Button>
        </SheetTrigger>

        <SheetContent side='left' className="px-2">
          <nav className="flex flex-col gap-y-2 pt-6 ">
            {routes.map((route, index) => (
              <Button variant={route.href === pathName ? "secondary" : "ghost"} key={route.href}
                onClick={() => onClick(route.href)}
                className="w-full justify-start"
              >
                {route.label}
              </Button>
            ))}
          </nav>

        </SheetContent>
      </Sheet>
    )
  }


  return (
    <nav className="hidden lg:flex items-center gap-x-2 overflow-x-auto col-span-7 ">
      {routes.map((route) => (
        <NavButton
          key={route.href}
          href={route.href}
          label={route.label}
          isActive={pathName === route.href}
        />
      ))}
    </nav>

  );
};

export default Navigation;
