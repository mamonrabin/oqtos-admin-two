"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { DropdownMenuArrow } from "@radix-ui/react-dropdown-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { TSubmenu } from "@/types";
import { useSidebar } from "./sidebar-context";

interface CollapseMenuButtonProps {
  icon: LucideIcon;
  label: string;
  active: boolean;
  submenus: TSubmenu[];
  isOpen: boolean | undefined;
}

export function CollapseMenuButton({
  icon: Icon,
  label,
  active,
  submenus,
  isOpen,
}: CollapseMenuButtonProps) {
  const { toggleSidebar } = useSidebar();

  const isSubmenuActive = submenus.some((submenu) => submenu.active);

  const [isCollapsed, setIsCollapsed] = useState<boolean>(isSubmenuActive);

  // Close sidebar only on mobile
  const handleMenuClick = () => {
    if (window.innerWidth < 768 && isOpen) {
      toggleSidebar();
    }
  };

  return isOpen ? (
    <Collapsible
      open={isCollapsed}
      onOpenChange={setIsCollapsed}
      className="w-full"
    >
      <CollapsibleTrigger asChild>
        <Button
          className={cn(
            "mb-1 h-10 w-full justify-start rounded bg-transparent text-secondary transition duration-300",
            "hover:bg-secondary hover:text-primary",
            active && "bg-primary",
          )}
        >
          <div className="flex w-full cursor-pointer items-center justify-between">
            <div className="flex cursor-pointer items-center">
              <span className="mr-4">
                <Icon size={18} />
              </span>

              <p className="max-w-[150px] truncate">
                {label}
              </p>
            </div>

            <ChevronDown
              size={18}
              className={cn(
                "transition-transform duration-200",
                isCollapsed && "rotate-180",
              )}
            />
          </div>
        </Button>
      </CollapsibleTrigger>

      <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
        {submenus.map(
          ({ href, label, active, icon: SubIcon }, index) => (
            <Button
              key={index}
              className={cn(
                "mb-1 h-10 w-full justify-start rounded transition duration-300",
                "hover:bg-secondary hover:text-primary",
                active
                  ? "bg-secondary text-primary"
                  : "bg-transparent text-secondary",
              )}
              asChild
            >
              <Link
                href={href}
                onClick={handleMenuClick}
              >
                <span className="ml-4">
                  <SubIcon size={12} />
                </span>

                <p className="max-w-[170px] truncate">
                  {label}
                </p>
              </Link>
            </Button>
          ),
        )}
      </CollapsibleContent>
    </Collapsible>
  ) : (
    <DropdownMenu>
      <TooltipProvider disableHoverableContent>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button
                className="mb-1 -ml-1 h-10 w-10 cursor-pointer justify-start rounded bg-transparent text-secondary transition duration-300 hover:bg-secondary hover:text-primary"
              >
                <Icon size={18} />
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>

          <TooltipContent
            side="right"
            align="start"
            alignOffset={2}
          >
            {label}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DropdownMenuContent
        side="right"
        sideOffset={25}
        align="start"
      >
        <DropdownMenuLabel className="max-w-[190px] truncate">
          {label}
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {submenus.map(({ href, label }, index) => (
          <DropdownMenuItem key={index} asChild>
            <Link
              href={href}
              onClick={handleMenuClick}
              className="cursor-pointer"
            >
              <p className="max-w-[180px] truncate">
                {label}
              </p>
            </Link>
          </DropdownMenuItem>
        ))}

        <DropdownMenuArrow className="fill-border" />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}