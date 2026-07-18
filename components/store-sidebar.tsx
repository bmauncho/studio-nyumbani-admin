import { cn } from "@/lib/utils";
import {
  Droplet,
  Grid3x3,
  Home,
  LayoutDashboard,
  Package,
  Palette,
  Ruler,
  Settings,
  ShoppingCart,
  Tag,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { LucideIcon } from "lucide-react";

interface NavItems {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon;
}

interface MainSideBarProps extends React.HTMLAttributes<HTMLElement> {
  IsCollapsed: boolean;
  IsStore: boolean;
  storeId?: string;
}

export function StoreSideBar({
  className,
  IsCollapsed,
  IsStore,
  storeId,
  ...props
}: MainSideBarProps) {
  const pathname = usePathname();

  const storeRoutes: NavItems[] = [
    {
      href: `/${storeId}`,
      label: "Dashboard",
      active: pathname === `/${storeId}`,
      icon: LayoutDashboard,
    },
    {
      href: `/${storeId}/products`,
      label: "Products",
      active: pathname === `/${storeId}/products`,
      icon: Package,
    },
    {
      href: `/${storeId}/categories`,
      label: "Categories",
      active: pathname === `/${storeId}/categories`,
      icon: Tag,
    },
    {
      href: `/${storeId}/billboards`,
      label: "Billboards",
      active: pathname === `/${storeId}/billboards`,
      icon: Palette,
    },
    {
      href: `/${storeId}/sizes`,
      label: "Sizes",
      active: pathname === `/${storeId}/sizes`,
      icon: Ruler,
    },
    {
      href: `/${storeId}/colors`,
      label: "Colors",
      active: pathname === `/${storeId}/colors`,
      icon: Droplet,
    },
    {
      href: `/${storeId}/inventory`,
      label: "Inventory",
      active: pathname === `/${storeId}/inventory`,
      icon: Grid3x3,
    },
    {
      href: `/${storeId}/orders`,
      label: "Orders",
      active: pathname === `/${storeId}/orders`,
      icon: ShoppingCart,
    },
    {
      href: `/${storeId}/settings`,
      label: "Settings",
      active: pathname === `/${storeId}/settings`,
      icon: Settings,
    },
  ];

  const overview: NavItems = {
    href: `/`,
    label: "Overview",
    active: pathname === `/`,
    icon: Home,
  };

  return (
    <nav className={cn("flex flex-col gap-1", className)} {...props}>
      <Link
        href={overview.href}
        className={cn(
          "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
          overview.active
            ? "bg-sidebar-accent text-sidebar-accent-foreground"
            : "text-sidebar-foreground hover:bg-sidebar-accent"
        )}
      >
        <div
          className={cn(
            "flex items-center gap-3",
            IsCollapsed && "justify-center"
          )}
        >
          <overview.icon className="h-5 w-5 shrink-0" />
          {!IsCollapsed && <span>{overview.label}</span>}
        </div>
      </Link>
      {IsStore && (
        <>
          {storeRoutes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                route.active
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent"
              )}
            >
              <div
                className={cn(
                  "flex items-center gap-3",
                  IsCollapsed && "justify-center"
                )}
              >
                <route.icon className="h-5 w-5 shrink-0" />
                {!IsCollapsed && <span>{route.label}</span>}
              </div>
            </Link>
          ))}
        </>
      )}
    </nav>
  );
}
