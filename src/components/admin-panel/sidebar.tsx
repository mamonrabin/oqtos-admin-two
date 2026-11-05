"use client";

import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logo/pickaboo.svg";
import responsiveLogo from "@/assets/logo/respomsive_logo.webp";
import { ChevronRight } from "lucide-react";

import { useSidebar } from "./sidebar-context";
import { cn } from "@/lib/utils";
import Menu from "./Menu";

export function Sidebar() {
  const { isOpen, toggleSidebar } = useSidebar();

  return (
    <aside
      className={cn(
        "fixed top-0 left-0 z-50 h-screen border-r bg-[#1C2C3F] shadow-md transition-all duration-300 dark:bg-zinc-950",
        "hidden md:block",
        isOpen ? "w-64" : "w-20",
      )}
    >
      {/* HEADER AREA */}
      <div className="relative flex items-center justify-center border-b border-[#ffffff1f] py-2">
        <Link href="/dashboard">
          <div
            className={cn(
              "relative z-50 flex items-center justify-center bg-[#1C2C3F] transition-all duration-200 ease-in-out",
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
          aria-label="Toggle sidebar"
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
        className={cn(
          "custom-scrollbar overflow-y-auto pt-4",
          isOpen ? "h-[calc(100vh-100px)]" : "h-screen pb-12",
        )}
      >
        <Menu isOpen={isOpen} />
      </div>
    </aside>
  );
}