import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SubHeading } from "@/components/ui/sub-heading";
import { Plus } from "lucide-react";
import { OurServicesColumn } from "./our-services-column";
import OurServiceCard from "./our-service-card";
import { useRouter } from "next/navigation";

interface OurServicesProps {
  cmsId: string;
  data: OurServicesColumn[];
  isLoading: boolean;
}

const OurServices = ({ data, isLoading, cmsId }: OurServicesProps) => {
  const router = useRouter();

  const onAddService = () => {
    router.push(`/cms/${cmsId}/our-services/new`);
  };
  return (
    <>
      <div className="flex items-center justify-between">
        <SubHeading title="Services" description="Manage services section." />
        <Button disabled={isLoading} onClick={onAddService}>
          <Plus className="h-4 w-4" />
          <span className="hidden sm:block ml-2">Add New Work(s)</span>
        </Button>
      </div>
      <Separator />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* services */}
        {data.map((service) => (
          <OurServiceCard key={service.id} cmsId={cmsId} service={service} />
        ))}
      </div>
    </>
  );
};

export default OurServices;
