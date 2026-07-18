import prismadb from "@/lib/prismadb";
import { Params } from "@/types";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { SettingsForm } from "./components/settings-form";
import IntegrationsPage from "./components/integrations";

interface SettingsPageProps {
  params: Params<{
    storeId: string;
  }>;
}

const SettingsPage = async ({ params }: SettingsPageProps) => {
  const { userId } = await auth();
  const { storeId } = await params;

  if (!userId) {
    redirect("/sign-in");
  }

  const store = await prismadb.store.findFirst({
    where: {
      id: storeId,
      userId: userId!,
    },
  });

  if (!store) {
    redirect("/");
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4">
        <SettingsForm initialData={store} />
      </div>
      <div className="pt-4">
        <IntegrationsPage store={store} />
      </div>
    </div>
  );
};

export default SettingsPage;
