import prismadb from "@/lib/prismadb";
import { Params } from "@/types";
import { SocialMediaColumn } from "./components/socials-column";
import { format } from "date-fns";
import ContactUsClient from "./components/client";

const ContactUsPage = async ({
  params,
}: {
  params: Params<{ cmsId: string }>;
}) => {
  const { cmsId } = await params;

  const cmsPage = await prismadb.cMSPage.findUnique({
    where: {
      id: cmsId,
    },
    include: {
      contactUs: true,
    },
  });

  const contactUs = await prismadb.contactUs.findUnique({
    where: {
      cmsPageId: cmsId,
    },
    include: {
      getInTouch: true,
    },
  });

  const socials = await prismadb.socialMedia.findMany({
    where: {
      getInTouchId: contactUs?.getInTouch?.id,
    },
  });

  const formattedSocials: SocialMediaColumn[] =
    socials?.map((social) => ({
      id: social.id,
      platform: social.platform,
      url: social.url,
      createdAt: format(social.createdAt, "MMMM do yyyy"),
    })) || [];

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4">
        <ContactUsClient
          data={cmsPage}
          socials={formattedSocials}
          getInTouch={contactUs?.getInTouch ?? null}
        />
      </div>
    </div>
  );
};

export default ContactUsPage;
