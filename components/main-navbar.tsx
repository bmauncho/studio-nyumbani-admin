import { Store } from "@prisma/client";
import StoreSwitcher from "@/components/store-switcher";
import { cn } from "@/lib/utils";

interface MainNavbarProps {
  stores: Store[];
  className?: string;
}

const MainNavbar = ({ stores, className }: MainNavbarProps) => {
  return (
    <div className={cn("", className)}>
      <StoreSwitcher items={stores} />
    </div>
  );
};

export default MainNavbar;
