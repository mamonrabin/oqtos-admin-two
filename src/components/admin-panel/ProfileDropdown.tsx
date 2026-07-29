"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useSingOut, useSupperAdmin } from "@/hooks/auth.hook";

const ProfileDropdown = () => {
  const { data: superAdminInfo } = useSupperAdmin();
  const superAdmin = superAdminInfo?.data;

  const { mutate: logout, isPending } = useSingOut();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-2 rounded-lg px-2 py-6 hover:bg-transparent! outline-none"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-sm font-semibold text-white">
            {superAdmin?.name?.slice(0, 1) || "D"}
          </div>

          <div className="hidden text-left sm:block">
            <p className="text-sm font-medium text-gray-800">
              {superAdmin?.name || "Demo"}
            </p>
            <p className="text-xs text-gray-500">
              {superAdmin?.email || "demo@gmail.com"}
            </p>
          </div>

          <ChevronDown className="h-4 w-4 text-gray-500" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="hover:bg-transparent!">
          <p className="text-sm font-medium text-gray-800">
            {superAdmin?.name || "Demo"}
          </p>
          <p className="text-xs font-normal text-gray-500">
            {superAdmin?.email || "demo@gmail.com"}
          </p>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {/* <DropdownMenuItem className="hover:bg-transparent!">
          Profile
        </DropdownMenuItem>

        <DropdownMenuItem className="hover:bg-transparent!">
          Settings
        </DropdownMenuItem> */}

        <DropdownMenuSeparator />

        <DropdownMenuItem
          disabled={isPending}
          onClick={() => logout()}
          className="text-red-600 focus:text-red-600 hover:bg-transparent! cursor-pointer"
        >
          {isPending ? "Logging out..." : "Logout"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
