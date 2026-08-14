import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SubHeading } from "@/components/ui/sub-heading";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { SocialMediaColumn } from "./socials-column";
import SocialsCard from "./socials-card";
import { format } from "date-fns";

interface SocialsProps {
  cmsId: string;
  socials: SocialMediaColumn[] | null;
}

const Socials = ({ cmsId, socials }: SocialsProps) => {
  const router = useRouter();
  const onAddSocials = () => {
    router.push(`/cms/${cmsId}/contact-us/new`);
  };

  const onEdit=(id: string)=>{
    router.push(`/cms/${cmsId}/contact-us/${id}`);
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
      <div className="pt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {socials?.map((social) => (
            <SocialsCard
              key={social.id}
              cmsId={cmsId}
              social={social}
              onEdit={() => onEdit(social.id)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Socials;
