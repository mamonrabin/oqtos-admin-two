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
        "fixed md:block hidden top-0 left-0  z-50 bg-[#1C2C3F]  h-screen border-r dark:bg-zinc-950 shadow-md transition-all duration-300",
        isOpen ? "w-64" : "w-20",
      )}
    >
      {/* HEADER AREA */}
      <div className="relative flex items-center justify-center py-2 border-b border-[#ffffff1f]">
        <Link href="/dashboard" className="">
          <div
            className={`flex items-center  justify-center bg-[#1C2C3F] 
            ${isOpen ? "pt-4.5" : "pt-4.25"} transition-all duration-200 ease-in-out  relative z-50`}
          >
            {isOpen ? (
              <Image
                src={logo}
                alt="Logo"
                width={500}
                height={500}
                className="w-32 h-auto mb-5"
                priority
              />
            ) : (
              <Image
                src={responsiveLogo}
                alt="responsiveLogo"
                width={300}
                height={300}
                className="w-10 h-auto mb-5"
              />
            )}
          </div>
        </Link>

        {/* TOGGLE BUTTON */}
        <button
          onClick={toggleSidebar}
          className={`  ${isOpen ? "-right-4 top-5 p-1" : "-right-3 top-4 p-0.5 rotate-180"} absolute  bg-secondary text-primary rounded border border-primary/20 transition`}
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* MENU AREA */}
      <div
        className={` ${isOpen ? "h-[calc(100vh-100px)]" : "h-screen pb-12"} overflow-y-auto custom-scrollbar pt-4`}
      >
        <Menu isOpen={isOpen} />
      </div>
    </aside>
  );
}
