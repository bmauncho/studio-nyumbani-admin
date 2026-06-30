import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

const IntegrationsPage = () => {
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4">
        <Heading title="Intergrations" description="Manage API connections" />
        <Separator />
      </div>
    </div>
  );
};
export default IntegrationsPage;
