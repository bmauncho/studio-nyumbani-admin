import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";
import { Params } from "@/types";
import { auth } from "@clerk/nextjs/server";

export default async function DashBoardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Params<{ storeId: string }>;
}) {
  const { userId } = await auth();
  const { storeId } = await params;

  if (!userId) redirect("/sign-in");

  const store = await prismadb.store.findUnique({
    where: { id: storeId, userId: userId! },
  });

  if (!store) redirect("/");

  return <>{children}</>;
}
