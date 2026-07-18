import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

const DashBoardPage = async () => {
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4">
        <Heading
          title="Overview"
          description="Overview of your portfolio/store website."
        />
        <Separator />
      </div>
    </div>
  );
};

export default DashBoardPage;
