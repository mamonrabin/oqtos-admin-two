/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, MenuIcon } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";

import Menu from "./Menu";
import { useSidebar } from "./sidebar-context";
import { cn } from "@/lib/utils";

import logo from "@/assets/logo/pickaboo.svg";
import responsiveLogo from "@/assets/logo/respomsive_logo.webp";

const Responsibebar = () => {
  const [open, setOpen] = useState(false);
  const { isOpen, toggleSidebar } = useSidebar();
  const pathname = usePathname();

  // Close mobile sidebar when route changes
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Close Sheet when any navigation link is clicked
  const handleMenuClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;

    if (target.closest("a[href]")) {
      setOpen(false);
    }
  };

  return (
    <div className="md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        {/* MOBILE TRIGGER */}
        <SheetTrigger asChild>
          <button
            type="button"
            aria-label="Open sidebar"
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg bg-primary text-white"
          >
            <MenuIcon size={20} />
          </button>
        </SheetTrigger>

        {/* MOBILE SIDEBAR */}
        <SheetContent
          side="left"
          showCloseButton={false}
          className={cn(
            "top-0 left-0 z-50 h-dvh border-r-0 bg-[#1C2C3F] p-0 shadow-md transition-all duration-300 dark:bg-zinc-950",
            isOpen ? "w-64!" : "w-20!",
          )}
        >
          <SheetTitle className="sr-only">
            Dashboard navigation
          </SheetTitle>

          <aside className="flex h-full w-full flex-col bg-[#1C2C3F]">
            {/* HEADER AREA */}
            <div className="relative flex items-center justify-center border-b border-[#ffffff1f] py-2">
              <Link
                href="/dashboard"
                onClick={() => setOpen(false)}
              >
                <div
                  className={cn(
                    "relative z-50 flex items-center justify-center bg-[#1C2C3F] transition-all duration-200",
                    isOpen ? "pt-4.5" : "pt-4.25",
                  )}
                >
                  {isOpen ? (
                    <Image
                      src={logo}
                      alt="Logo"
                      width={500}
                      height={500}
                      className="mb-5 h-auto w-32"
                      priority
                    />
                  ) : (
                    <Image
                      src={responsiveLogo}
                      alt="Responsive Logo"
                      width={300}
                      height={300}
                      className="mb-5 h-auto w-10"
                    />
                  )}
                </div>
              </Link>

              {/* TOGGLE BUTTON */}
              <button
                type="button"
                onClick={toggleSidebar}
                aria-label="Toggle sidebar width"
                className={cn(
                  "absolute rounded border border-primary/20 bg-secondary text-primary transition",
                  isOpen
                    ? "-right-4 top-5 p-1"
                    : "-right-3 top-4 rotate-180 p-0.5",
                )}
              >
                <ChevronRight size={18} />
              </button>
            </div>

            {/* MENU AREA */}
            <div
              onClickCapture={handleMenuClick}
              className="custom-scrollbar min-h-0 flex-1 overflow-y-auto pt-4 pb-8"
            >
              <Menu isOpen={isOpen} />
            </div>
          </aside>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Responsibebar;