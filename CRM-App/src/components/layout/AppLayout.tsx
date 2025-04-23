
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import AppHeader from "./AppHeader";
import AppSidebar from "./AppSidebar";

export default function AppLayout() {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />
      <AppHeader />
      <main
        className={cn(
          "ml-56 mt-14 p-6 transition-opacity duration-500",
          isMounted ? "opacity-100" : "opacity-0"
        )}
      >
        <div className="container max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
