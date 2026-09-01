import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SubHeading } from "@/components/ui/sub-heading";
import { useRouter } from "next/navigation";
import WorkCard from "./work-card";
import { WorksColumn } from "./works-column";

interface WorksProps {
  cmsId: string;
  work: WorksColumn[] | null;
}

const Works = ({ cmsId, work }: WorksProps) => {
  const router = useRouter();
  return (
    <>
      <div className="flex items-center justify-between pt-4">
        <SubHeading
          title="Portfolio works."
          description="Manage your portfolio works found in each collections"
        />
      </div>
      <Separator />
      <div>
        <div className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {work?.map((item) =>
              item?.works?.map((w) => (
                <WorkCard key={w.id} cmsId={cmsId} ourWorkId={w.id} work={w} />
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Works;
