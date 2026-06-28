import prismadb from "@/lib/prismadb";
import { Params } from "@/types";

interface DashboardPageProps {
  params: Params<{
    storeId: string;
  }>;
}

const DashBoardPage: React.FC<DashboardPageProps> = async ({ params }) => {
  const { storeId } = await params;
  const store = await prismadb.store.findUnique({
    where: {
      id: storeId,
    },
  });
  return (
    <div>
      <h1>{store?.name}</h1>
    </div>
  );
};

export default DashBoardPage;
