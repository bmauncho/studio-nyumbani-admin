import prismadb from "@/lib/prismadb";
import CMSClient from "./components/client";
import { CMSColumn } from "./components/cms-column";
import { format } from "date-fns";

const CMSPages = async () => {
  const cms_Pages = await prismadb.cMSPage.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedPages: CMSColumn[] = cms_Pages.map((page) => {
    return {
      id: page.id,
      pageTitle: page.name,
      pageType: page.type.toLowerCase().replaceAll("_", "-"),
      lastUpdated: format(page.createdAt, "MMMM do, yyyy"),
    };
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4">
        <CMSClient data={formattedPages} />
      </div>
    </div>
  );
};

export default CMSPages;
