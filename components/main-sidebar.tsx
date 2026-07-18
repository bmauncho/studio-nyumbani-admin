import { cn } from "@/lib/utils";
import {
  BookOpen,
  Calendar,
  LucideIcon,
  MessageSquare,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
  const routes: NavItems[] = [
    {
      href: `/cms`,
      label: "CMS Pages",
      active: pathname === `/cms`,
      icon: BookOpen,
    },
    {
      href: `/messages`,
      label: "Messages",
      active: pathname === `/messages`,
      icon: MessageSquare,
    },
    {
      href: `/bookings`,
      label: "Bookings",
      active: pathname === `/bookings`,
      icon: Calendar,
    },
    {
      href: `/integrations`,
      label: "Integrations",
      active: pathname === `/integrations`,
      icon: Zap,
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
