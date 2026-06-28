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
    <div className="flex flex-col h-screen">
      {/* Navbar - full width top */}
      <Navbar />

      {/* Sidebar + Content side by side */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-auto p-4">{children}</main>
      </div>
    </div>
  );
}
