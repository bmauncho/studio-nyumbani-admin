import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashBoardPage({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();

  const cookieStore = await cookies();
  const selectedStoreId = cookieStore.get("selectedStoreId")?.value;

  if (!userId) redirect("/sign-in");

  // 👇 fetch store here
  const stores = await prismadb.store.findMany({
    where: { userId },
  });

  const store = selectedStoreId
    ? (stores.find((s) => s.id === selectedStoreId) ?? stores[0])
    : stores[0];

  return (
    <>
      <div className="flex h-screen">
        {/* Sidebar - left */}
        <Sidebar isStore={!!store} storeId={store?.id} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Navbar />
          <main className="flex-1 overflow-y-auto">
            <div className="p-4 pl-24 md:p-7">{children}</div>
          </main>
        </div>
      </div>
    </>
  );
}
