import { cn } from "@/lib/utils";
import {
  Droplet,
  LayoutDashboard,
  Palette,
  Ruler,
  Settings,
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
}

export function MainSideBar({
  className,
  IsCollapsed,
  ...props
}: MainSideBarProps) {
  const pathname = usePathname();
  const params = useParams();

  const routes: NavItems[] = [
    {
      href: `/${params.storeId}`,
      label: "Overview",
      active: pathname === `/${params.storeId}`,
      icon: LayoutDashboard,
    },
    {
      href: `/${params.storeId}/categories`,
      label: "Categories",
      active: pathname === `/${params.storeId}/categories`,
      icon: Tag,
    },
    {
      href: `/${params.storeId}/billboards`,
      label: "Billboards",
      active: pathname === `/${params.storeId}/billboards`,
      icon: Palette,
    },
    {
      href: `/${params.storeId}/sizes`,
      label: "Sizes",
      active: pathname === `/${params.storeId}/sizes`,
      icon: Ruler,
    },
    {
      href: `/${params.storeId}/colors`,
      label: "Colors",
      active: pathname === `/${params.storeId}/colors`,
      icon: Droplet,
    },
    {
      href: `/${params.storeId}/intergrations`,
      label: "Intergrations",
      active: pathname === `/${params.storeId}/intergrations`,
      icon: Zap,
    },
    {
      href: `/${params.storeId}/settings`,
      label: "Settings",
      active: pathname === `/${params.storeId}/settings`,
      icon: Settings,
    },
  ];

  return (
    <nav className={cn("flex flex-col gap-1", className)} {...props}>
      {routes.map((route) => (
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
    </nav>
  );
}
