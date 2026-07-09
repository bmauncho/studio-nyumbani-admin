import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { InventoryTable } from "./inventory-table";
import { InventoryColumn } from "./inventory-column";

interface InventoryClientProps {
  data: InventoryColumn[];
  currentPage: number;
  totalPages: number;
}

const InventoryClient = ({
  data,
  currentPage,
  totalPages,
}: InventoryClientProps) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title="Inventory"
          description="Manage inventory for your store"
        />
      </div>
      <Separator />
      <div>
        <InventoryTable
          data={data}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </div>
    </>
  );
};
export default InventoryClient;
