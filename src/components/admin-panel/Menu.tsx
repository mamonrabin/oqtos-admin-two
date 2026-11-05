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
import { useSidebar } from "./sidebar-context";

interface MenuProps {
  isOpen?: boolean;
}

export default function Menu({ isOpen }: MenuProps) {
  const router = useRouter();
  const pathname = usePathname();
  const menuList = getMenuList(pathname);

  const { toggleSidebar } = useSidebar();

  // Close sidebar only on mobile devices
  const handleMenuClick = () => {
    if (window.innerWidth < 768 && isOpen) {
      toggleSidebar();
    }
  };

  const handleLogout = async () => {
    try {
      await singOut();

      handleMenuClick();

      router.replace("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav className={cn("ml-1", isOpen && "md:h-screen")}>
      <ul
        className={cn(
          "flex flex-col space-y-1",
          isOpen ? "px-2" : "px-5",
        )}
      >
        {menuList.map(({ groupLabel, menus }, index) => (
          <li
            className={cn("w-full", groupLabel && "pt-2")}
            key={index}
          >
            {/* GROUP LABEL */}
            {groupLabel ? (
              isOpen ? (
                <p className="max-w-62 truncate px-4 pb-2 text-[12px] font-medium text-secondary/40">
                  {groupLabel}
                </p>
              ) : (
                <TooltipProvider>
                  <Tooltip delayDuration={100}>
                    <TooltipTrigger
                      className="flex w-full -ml-1 items-center justify-center text-secondary/40"
                    >
                      <Ellipsis className="h-5 w-5" />
                    </TooltipTrigger>

                    <TooltipContent side="right">
                      {groupLabel}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )
            ) : (
              <div className="pb-2" />
            )}

            {/* MENU ITEMS */}
            {menus.map(
              (
                { href, label, icon: Icon, active, submenus },
                index,
              ) =>
                submenus.length === 0 ? (
                  <div className="w-full" key={index}>
                    <TooltipProvider disableHoverableContent>
                      <Tooltip delayDuration={100}>
                        <TooltipTrigger asChild>
                          <Button
                            className={cn(
                              "mb-1 h-10 w-full justify-start rounded transition duration-300",
                              "hover:bg-secondary hover:text-primary",
                              !isOpen && "w-10",
                              active
                                ? "bg-secondary text-primary"
                                : "bg-transparent text-secondary",
                            )}
                            asChild
                          >
                            <Link
                              href={href}
                              onClick={handleMenuClick}
                              className={cn(
                                !isOpen && "relative -left-1",
                              )}
                            >
                              <span
                                className={cn(isOpen && "mr-2")}
                              >
                                <Icon size={18} />
                              </span>

                              <p
                                className={cn(
                                  "max-w-50 truncate transition-all duration-200",
                                  !isOpen
                                    ? "-translate-x-96 opacity-0"
                                    : "translate-x-0 opacity-100",
                                )}
                              >
                                {label}
                              </p>
                            </Link>
                          </Button>
                        </TooltipTrigger>

                        {!isOpen && (
                          <TooltipContent side="right">
                            {label}
                          </TooltipContent>
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

        {/* SIGN OUT */}
        <li className="mt-auto w-full text-white">
          <TooltipProvider disableHoverableContent>
            <Tooltip delayDuration={100}>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="mt-2 flex h-10 w-full cursor-pointer items-center justify-center rounded bg-primary text-secondary transition duration-300 hover:bg-secondary hover:text-primary"
                >
                  <LogOut
                    size={18}
                    className={cn(isOpen && "mr-2")}
                  />

                  <span
                    className={cn(
                      !isOpen ? "hidden" : "opacity-100",
                    )}
                  >
                    Sign out
                  </span>
                </button>
              </TooltipTrigger>

              {!isOpen && (
                <TooltipContent side="right">
                  Sign out
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        </li>
      </ul>
    </nav>
  );
}