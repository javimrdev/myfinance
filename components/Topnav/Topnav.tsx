"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { Logo } from "../Logo/Logo";
import { UserAvatar } from "../UserAvatar/UserAvatar";

export const Topnav = () => {
  return (
    <div className="w-full grid grid-cols-3 items-center gap-2 py-6 px-3 border-b border-b border-green-500">
      <div className="flex flex-start">
        <Logo />
      </div>
      <div className="flex justify-center">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link href="/">Dashboard</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className="flex justify-end">
        <UserAvatar />
      </div>
    </div>
  );
};
