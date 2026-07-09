import { cn } from "@/lib/utils";
import { Calendar, LucideIcon } from "lucide-react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

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
      href: `/${params.storeId}/bookings`,
      label: "Bookings",
      active: pathname === `/${params.storeId}/bookings`,
      icon: Calendar,
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
