import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SubHeading } from "@/components/ui/sub-heading";
import { Plus } from "lucide-react";

interface OurServicesProps {
  isLoading: boolean;
}

const OurServices = ({ isLoading }: OurServicesProps) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <SubHeading title="Services" description="Manage services section." />
        <Button disabled={isLoading} onClick={() => {}}>
          <Plus className="h-4 w-4" />
          <span className="hidden sm:block ml-2">Add New Work(s)</span>
        </Button>
      </div>
      <Separator />
    </>
  );
};

export default OurServices;
