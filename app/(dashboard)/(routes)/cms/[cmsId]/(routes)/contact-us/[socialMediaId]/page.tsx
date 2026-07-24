import { Params } from "@/types";
import prismadb from "@/lib/prismadb";
import { SocialForm } from "./components/social-form";

const SocialsPage = async ({
  params,
}: {
  params: Params<{ socialMediaId: string; cmsId: string }>;
}) => {
  const { socialMediaId, cmsId } = await params;

  const contactUs = await prismadb.contactUs.findUnique({
    where: {
      cmsPageId: cmsId,
    },
    include: {
      getInTouch: true,
    },
  });

  const socialMedia = await prismadb.socialMedia.findFirst({
    where: {
      id: socialMediaId,
      getInTouchId: contactUs?.getInTouch?.id,
    },
  });
  
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4">
        <SocialForm cmsId={cmsId} initialData={socialMedia} />
      </div>
    </div>
  );
};

export default SocialsPage;
