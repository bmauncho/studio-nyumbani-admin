import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";
import { Params } from "@/types";
import { auth } from "@clerk/nextjs/server";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";

export default async function DashBoardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Params<{ storeId: string }>;
}) {
  const { userId } = await auth();
  const { storeId } = await params;

  if (!userId) {
    redirect("/sign-in");
  }

  const storedata = await prismadb.store.findUnique({
    where: {
      id: storeId,
      userId: userId!,
    },
  });

  if (!storedata) {
    redirect("/");
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar - left */}
      <Sidebar />

      {/* Navbar + Content - right */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-auto">
          <div className="p-4 pl-24 md:p-7">{children}</div>
        </main>
      </div>
    </div>
  );
}
