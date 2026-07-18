"use client";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import { StoreSideBar } from "@/components/store-sidebar";
import { MainSideBar } from "./main-sidebar";

interface SideBarProps {
  isStore: boolean;
  storeId?: string;
}

const Sidebar = ({
  isStore,
  storeId,
}: {
  isStore: boolean;
  storeId?: string;
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <aside
      className={cn(
        "fixed md:static left-0 top-0 z-40 md:z-auto h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300 flex flex-col",
        isCollapsed ? "w-auto" : "w-auto"
      )}
    >
      <div
        className={cn(
          "flex items-center h-16 px-4 border-b border-sidebar-border",
          isCollapsed ? "flex justify-center" : "flex justify-start"
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
      <div className="flex-1 overflow-y-auto">
        <StoreSideBar
          IsCollapsed={isCollapsed}
          IsStore={isStore}
          storeId={storeId}
          className="px-4 py-4"
        />
      </div>
      {/* Global routes - pinned to bottom */}
      <div className="shrink-0 border-t border-sidebar-border">
        <MainSideBar IsCollapsed={isCollapsed} className="px-4 py-4" />
      </div>

      {/* Footer */}
      <div className="shrink-0 p-4 border-t border-sidebar-border">
        {!isCollapsed && (
          <p className="text-xs text-sidebar-foreground/60">
            © 2026 Studio Nyumbani Admin
          </p>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
