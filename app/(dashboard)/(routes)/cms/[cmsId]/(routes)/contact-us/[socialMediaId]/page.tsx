import { Params } from "@/types";
import prismadb from "@/lib/prismadb";
import { SocialForm } from "./components/social-form";

const SocialsPage = async ({
  params,
}: {
  params: Params<{ socialMediaId: string; cmsId: string }>;
}) => {
  const { socialMediaId, cmsId } = await params;

  const cmsPage = await prismadb.cMSPage.findUnique({
    where: {
      id: cmsId,
    },
    include: {
      socialMediaPlatforms: true,
    },
  });

  const contactUs = await prismadb.contactUs.findUnique({
    where: {
      cmsPageId: cmsId,
    },
  });

  const platforms = cmsPage?.socialMediaPlatforms;

  const socialMedia = await prismadb.socialMedia.findFirst({
    where: {
      id: socialMediaId,
      contactUsId: contactUs?.id,
    },
    include: {
      platform: true,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4">
        <SocialForm
          cmsId={cmsId}
          initialData={socialMedia}
          platforms={platforms ?? null}
          page="contactUs"
          socialMediaPage="social-media"
        />
      </div>
    </div>
  );
};

export default SocialsPage;
