import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SubHeading } from "@/components/ui/sub-heading";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { WorksColumn } from "./works-column";
import WorksCard from "./works-card";
import PaginationControls from "@/components/ui/pagination-controls";

interface WorksPageProps {
  cmsId: string | "";
  ourWorks: WorksColumn[];
  currentPage: number;
  totalPages: number;
}

const WorksPage = ({
  cmsId,
  ourWorks,
  currentPage,
  totalPages,
}: WorksPageProps) => {
  const router = useRouter();
  const onAddWorks = () => {
    router.push(`/cms/${cmsId}/our-works/new`);
  };
  const path = `/cms/${cmsId}/our-works`;
  console.log(totalPages)
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
      <div>
        <div className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ourWorks.map((work) => (
              <WorksCard key={work.id} work={work} cmsId={cmsId as string} />
            ))}
          </div>
        </div>
        <div className="pt-4">
          <PaginationControls
            totalPages={totalPages}
            currentPage={currentPage}
            path={path}
          />
        </div>
      </div>
    </>
  );
};

export default WorksPage;
