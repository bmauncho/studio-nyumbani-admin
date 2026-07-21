import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SubHeading } from "@/components/ui/sub-heading";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

interface WorksPageProps {
  cmsId: string | "";
}

const WorksPage = ({ cmsId }: WorksPageProps) => {
  const router = useRouter();
  const onAddWorks = () => {
    router.push(`/cms/${cmsId}/our-works/new`);
    console.log(`/cms/${cmsId}/our-works/new`);
  };
  return (
    <>
      <div className="flex items-center justify-between pt-4">
        <SubHeading
          title="Portfolio Works"
          description="Manage your portfolio"
        />
        <Button onClick={onAddWorks}>
          <Plus className="h-4 w-4" />
          <span className="hidden sm:block ml-2">Add New Work(s)</span>
        </Button>
      </div>
      <Separator />
    </>
  );
};

export default WorksPage;
