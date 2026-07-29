"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, LucideIcon, SquareStop } from "lucide-react";

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
  const isSubmenuActive = submenus.some((submenu) => submenu.active);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(isSubmenuActive);

  return isOpen ? (
    <Collapsible
      open={isCollapsed}
      onOpenChange={setIsCollapsed}
      className="w-full"
    >
      <CollapsibleTrigger className="" asChild>
        <Button
          // variant={active ? "secondary" : "ghost"}
          className={`w-full rounded bg-transparent text-secondary hover:bg-secondary hover:text-primary duration-300 h-10
            ${isOpen ? "" : "w-12 bg-transparent text-secondary rounded  hover:bg-primary hover:text-secondary"} 
            ${active ? "bg-primary" : "bg-transparent text-secondary"} transition justify-start h-10 mb-1`}

          // w-full cursor-pointer ${isOpen ? "":"w-40! bg-transparent!  hover:bg-primary! hover:text-white"}
          // rounded! hover:bg-primary hover:text-white duration-300
          //
        >
          <div className="w-full items-center flex justify-between cursor-pointer">
            <div className="flex items-center cursor-pointer">
              <span className="mr-4 cursor-pointer">
                <Icon size={18} />
              </span>
              <p
                className={cn(
                  "max-w-[150px] truncate",
                  isOpen
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-96 opacity-0",
                )}
              >
                {label}
              </p>
            </div>
            <div
              className={cn(
                "whitespace-nowrap",
                isOpen
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-96 opacity-0",
              )}
            >
              <ChevronDown
                size={18}
                className="transition-transform duration-200"
              />
            </div>
          </div>
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
        {submenus.map(({ href, label, active,icon: Icon }, index) => (
          <Button
            key={index}
            // variant={active ? "secondary" : "ghost"}
            className={`w-full ${isOpen ? "" : "w-12"} 
            rounded hover:bg-secondary hover:text-primary duration-300 
            ${active ? "bg-secondary text-primary" : "bg-transparent text-secondary"} transition justify-start h-10 mb-1 `}
            asChild
          >
            <Link href={href}>
              <p className="ml-4">
                {/* <Dot size={40} /> */}
                {/* <SquareStop size={12} /> */}
              
                  <span>
                   <Icon size={12} />
                </span>
                
              </p>
              <p
                className={cn(
                  "max-w-[170px] truncate",
                  isOpen
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-96 opacity-0",
                )}
              >
                {label}
              </p>
            </Link>
          </Button>
        ))}
      </CollapsibleContent>
    </Collapsible>
  ) : (
    <DropdownMenu>
      <TooltipProvider disableHoverableContent>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button
                // variant={active ? "secondary" : "ghost"}
                className="w-10 bg-transparent text-secondary hover:bg-secondary hover:text-primary duration-300 cursor-pointer -ml-1 rounded justify-start h-10 mb-1"
              >
                <div className="w-full items-center flex justify-between">
                  <div className="flex items-center">
                    <span className={cn(isOpen === false ? "" : "mr-4")}>
                      <Icon size={18} />
                    </span>
                    <p
                      className={cn(
                        "max-w-[200px] truncate",
                        isOpen === false ? "opacity-0" : "opacity-100",
                      )}
                    >
                      {label}
                    </p>
                  </div>
                </div>
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent side="right" align="start" alignOffset={2}>
            {label}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DropdownMenuContent side="right" sideOffset={25} align="start">
        <DropdownMenuLabel className="max-w-[190px] truncate">
          {label}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {submenus.map(({ href, label }, index) => (
          <DropdownMenuItem key={index} asChild>
            <Link className="cursor-pointer" href={href}>
              <p className="max-w-[180px] truncate">{label}</p>
            </Link>
          </DropdownMenuItem>
        ))}
        <DropdownMenuArrow className="fill-border" />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
