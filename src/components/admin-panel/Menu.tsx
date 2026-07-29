"use client";

import Link from "next/link";
import { Ellipsis, LogOut } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";

import { Button } from "@/components/ui/button";
import { getMenuList } from "@/utils/menu-list";
import { cn } from "@/lib/utils";
import { CollapseMenuButton } from "./collapse-menu-button";
import { singOut } from "@/services/auth.api";

interface MenuProps {
  isOpen?: boolean;
}

export default function Menu({ isOpen }: MenuProps) {
  const router = useRouter();
  const pathname = usePathname();
  const menuList = getMenuList(pathname);

  const handleLogout = async () => {
    try {
      await singOut();
      router.replace("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav className={`ml-1 ${isOpen ? "md:h-screen" : ""}`}>
      <ul className={`flex flex-col  space-y-1 ${isOpen ? "px-2" : "px-5"} `}>
        {menuList.map(({ groupLabel, menus }, index) => (
          <li className={cn("w-full", groupLabel && "pt-2")} key={index}>
            {/* Group Label */}
            {groupLabel ? (
              isOpen ? (
                <p className="text-[12px] font-medium text-secondary/40 px-4 pb-2 max-w-62 truncate">
                  {groupLabel}
                </p>
              ) : (
                <TooltipProvider>
                  <Tooltip delayDuration={100}>
                    <TooltipTrigger className="w-full flex text-secondary/40 justify-center items-center -ml-1">
                      <Ellipsis className="h-5 w-5" />
                    </TooltipTrigger>
                    <TooltipContent side="right">{groupLabel}</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )
            ) : (
              <div className="pb-2" />
            )}

            {/* Menu Items */}
            {menus.map(
              ({ href, label, icon: Icon, active, submenus }, index) =>
                submenus.length === 0 ? (
                  <div className="w-full" key={index}>
                    <TooltipProvider disableHoverableContent>
                      <Tooltip delayDuration={100}>
                        <TooltipTrigger asChild>
                          <Button
                            // variant={active ? "secondary" : "ghost"}
                            className={`w-full ${isOpen ? "" : "w-10"} rounded hover:bg-secondary hover:text-primary duration-300 ${active ? "bg-secondary text-primary" : "bg-transparent text-secondary"} transition justify-start h-10 mb-1 `}
                            asChild
                          >
                            <Link
                              href={href}
                              className={`${isOpen ? "" : "-left-1 relative"}`}
                            >
                              <span
                                className={cn(isOpen === false ? "" : "mr-2")}
                              >
                                <Icon size={18} />
                              </span>
                              <p
                                className={cn(
                                  "max-w-50 truncate",
                                  isOpen === false
                                    ? "-translate-x-96 opacity-0"
                                    : "translate-x-0 opacity-100",
                                )}
                              >
                                {label}
                              </p>
                            </Link>
                          </Button>
                        </TooltipTrigger>
                        {isOpen === false && (
                          <TooltipContent side="right">{label}</TooltipContent>
                        )}
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                ) : (
                  <div className="w-full" key={index}>
                    <CollapseMenuButton
                      icon={Icon}
                      label={label}
                      active={active}
                      submenus={submenus}
                      isOpen={isOpen}
                    />
                  </div>
                ),
            )}
          </li>
        ))}

        {/* Sign Out */}
        <li className="w-full text-white mt-auto">
          <TooltipProvider disableHoverableContent>
            <Tooltip delayDuration={100}>
              <TooltipTrigger asChild>
                <button
                  onClick={handleLogout}
                  className="w-full cursor-pointer flex items-center justify-center h-10 mt-2 bg-primary text-secondary hover:bg-secondary hover:text-primary duration-300 rounded"
                >
                  <LogOut size={18} className={cn(!isOpen ? "" : "mr-2")} />
                  <span className={cn(!isOpen ? "hidden" : "opacity-100")}>
                    Sign out
                  </span>
                </button>
              </TooltipTrigger>
              {!isOpen && (
                <TooltipContent side="right">Sign out</TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        </li>
      </ul>
    </nav>
  );
}
