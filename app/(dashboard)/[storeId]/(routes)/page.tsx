import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import prismadb from "@/lib/prismadb";
import { Params } from "@/types";

interface DashboardPageProps {
  params: Params<{
    storeId: string;
  }>;
}

const DashBoardPage = async ({ params }: DashboardPageProps) => {
  const { storeId } = await params;
  const store = await prismadb.store.findUnique({
    where: {
      id: storeId,
    },
  });
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4">
        <Heading title="Overview" description="Overview of your store" />
        <Separator />
      </div>
    </div>
  );
};

export default DashBoardPage;
