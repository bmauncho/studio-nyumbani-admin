import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SubHeading } from "@/components/ui/sub-heading";
import { Plus } from "lucide-react";

const Socials = () => {
  return (
    <>
      <div className="flex items-center justify-between pt-4">
        <SubHeading title="Socials" description="Manage the socials info." />
        <Button onClick={()=>{}}>
          <Plus className="h-4 w-4" />
          <span className="hidden sm:block ml-2">Add New Work(s)</span>
        </Button>
      </div>
      <Separator />
    </>
  );
};

export default Socials;
