"use client";

import { cn } from "@/lib/utils";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Sidebar } from "./sidebar";
import { useSidebar } from "./sidebar-context";
import Header from "./Header";
import { Toaster } from "sonner";

const queryClient = new QueryClient();

export default function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isOpen } = useSidebar();

  return (
    <>
    
      <Sidebar />
      
      <main
        className={cn(
          "min-h-screen bg-[#F4F4F5] dark:bg-zinc-900 transition-all duration-300 md:px-6",
          isOpen ? "lg:ml-64" : "md:ml-16",
        )}
      >
        
        <QueryClientProvider client={queryClient}>
        
           <Toaster richColors position="top-right" />
             <Header />
          {children}
        </QueryClientProvider>
      </main>
    </>
  );
}
