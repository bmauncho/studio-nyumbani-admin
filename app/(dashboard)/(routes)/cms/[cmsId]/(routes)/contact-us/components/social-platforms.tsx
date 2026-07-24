import { SocialPlatformModal } from "@/components/modals/socialPlatform-modal";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SubHeading } from "@/components/ui/sub-heading";
import { SocialMediaPlatform } from "@prisma/client";
import { Plus } from "lucide-react";
import { useState } from "react";
import SocialPlatformCard from "./social-platform-card";

interface SocialPlatformsProps {
  cmsId: string;
  socials: SocialMediaPlatform[] | null;
}

const SocialPlatforms = ({ cmsId, socials }: SocialPlatformsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPlatform, setSelectedPlatform] =
    useState<SocialMediaPlatform | null>(null);
  return (
    <>
      <SocialPlatformModal
        cmsId={cmsId}
        initialData={selectedPlatform}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={() => setIsOpen(false)}
      />
      <div className="flex items-center justify-between pt-4">
        <SubHeading
          title="Social Platforms"
          description="Manage the socials platforms info."
        />
        <Button
          onClick={() => {
            setIsOpen(true);
            setSelectedPlatform(null);
          }}
        >
          <Plus className="h-4 w-4" />
          <span className="hidden sm:block ml-2">Add New Social Platform</span>
        </Button>
      </div>
      <Separator />
      <div className="pt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {socials?.map((platform) => (
            <SocialPlatformCard
              key={platform.id}
              cmsId={cmsId}
              platform={platform}
              onEdit={() => {
                setSelectedPlatform(platform);
                setIsOpen(true);
              }}
              onRefresh={() => {
                setIsOpen(false);
              }}
              onClick={() => setSelectedPlatform(platform)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default SocialPlatforms;
