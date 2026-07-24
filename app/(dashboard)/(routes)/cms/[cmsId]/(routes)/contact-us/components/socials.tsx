import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SubHeading } from "@/components/ui/sub-heading";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { SocialMediaColumn } from "./socials-column";

interface SocialsProps {
  cmsId: string;
  socials: SocialMediaColumn[] | null;
}

const Socials = ({ cmsId, socials }: SocialsProps) => {
  const router = useRouter();
  const onAddSocials = () => {
    router.push(`/cms/${cmsId}/contact-us/new`);
  };

  return (
    <>
      <div className="flex items-center justify-between pt-4">
        <SubHeading title="Socials" description="Manage the socials info." />
        <Button onClick={onAddSocials}>
          <Plus className="h-4 w-4" />
          <span className="hidden sm:block ml-2">Add New Social</span>
        </Button>
      </div>
      <Separator />
      <div>{/*  */}</div>
    </>
  );
};

export default Socials;
