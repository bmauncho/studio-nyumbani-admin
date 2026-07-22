import { PortfolioModal } from "@/components/modals/portfolio-modal";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SubHeading } from "@/components/ui/sub-heading";
import { WorkCategory } from "@prisma/client";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import WorkCategoryCard from "./work-category-card";
import toast from "react-hot-toast";
import axios from "axios";

interface WorkCategoriesProps {
  cmsId: String;
  workCategories: WorkCategory[] | null;
}

const WorksCatagories = ({ workCategories, cmsId }: WorkCategoriesProps) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<WorkCategory | null>(
    null
  );

  const OnEdit = () => {
    setOpen(true);
  };

  const onDelete = async (category: WorkCategory) => {
    try {
      setLoading(true);

      await axios.delete(`/api/cms/${cmsId}/workCategory/${category.id}`);

      router.refresh();
      toast.success("Category deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      
      <PortfolioModal
        cmsId={cmsId as string}
        initialData={selectedCategory}
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={() => setOpen(false)}
      />
      <div className="flex items-center justify-between pt-4">
        <SubHeading
          title="Portfolio Works categories"
          description="Manage your portfolio categoreis"
        />
        <Button
          onClick={() => {
            setOpen(true);
            setSelectedCategory(null);
          }}
        >
          <Plus className="h-4 w-4" />
          <span className="hidden sm:block ml-2">Add Portfolio Category</span>
        </Button>
      </div>
      <Separator />
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {workCategories?.map((category) => (
          <WorkCategoryCard
            key={category.id}
            data={category}
            onEdit={() => {
              OnEdit();
              setSelectedCategory(category);
            }}
            onDelete={() => {
              onDelete(category);
            }}
            loading={loading}
          />
        ))}
      </div>
    </>
  );
};

export default WorksCatagories;
