import { PortfolioModal } from "@/components/modals/portfolio-modal";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SubHeading } from "@/components/ui/sub-heading";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface WorkCategoriesProps {}

const WorksCatagories = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <>
      <PortfolioModal
        initialData={null}
        isOpen={open}
        onClose={() => setOpen(false)}
      />
      <div className="flex items-center justify-between pt-4">
        <SubHeading
          title="Portfolio Works categories"
          description="Manage your portfolio categoreis"
        />
        <Button onClick={() => setOpen(true)}>
          <Plus className="h-4 w-4" />
          <span className="hidden sm:block ml-2">Add Portfolio Category</span>
        </Button>
      </div>
      <Separator />
    </>
  );
};

export default WorksCatagories;
