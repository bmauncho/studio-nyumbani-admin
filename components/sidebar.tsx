"use client";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import { MainSideBar } from "@/components/main-sidebar";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "fixed md:static left-0 top-0 z-30 md:z-auto h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300 flex flex-col",
        isCollapsed ? "w-auto" : "w-auto"
      )}
    >
      <div
        className={cn(
          "flex items-center h-16 px-4 border-b border-sidebar-border",
          isCollapsed ? "flex justify-center" : "flex justify-end"
        )}
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <Menu />
        </Button>
      </div>
      {/* Sidebar content */}
      <MainSideBar IsCollapsed={isCollapsed} className="px-4 py-4" />
    </aside>
  );
};

export default Sidebar;
