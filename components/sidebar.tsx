"use client";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import { is } from "zod/v4/locales";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "fixed md:static left-0 top-0 z-40 md:z-auto h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300 flex flex-col",
        isCollapsed ? "w-16" : "w-64" // 👈 dynamic width
      )}
    >
      <div className="flex items-center justify-end p-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)} // 👈 toggle
        >
          <Menu />
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
