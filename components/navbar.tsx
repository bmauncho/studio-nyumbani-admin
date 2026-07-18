import { UserButton } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import StoreSwitcher from "./store-switcher";

const Navbar = async () => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const stores = await prismadb.store.findMany({
    where: {
      userId,
    },
  });


  return (
    <div className="sticky top-0 z-30 border-b">
      <div className="flex h-16 items-center px-4 md:px-4 pl-20 md:pl-4">
        <div className="p-2">
          <StoreSwitcher items={stores} />
        </div>
        <div className="ml-auto flex flex-col space-x-4">
          <UserButton />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
