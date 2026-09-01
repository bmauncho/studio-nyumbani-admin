import prismadb from "@/lib/prismadb";
import CMSClient from "./components/client";
import { CMSColumn } from "./components/cms-column";
import { format } from "date-fns";
import { CMSType } from "@prisma/client";

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

  // All possible enum values, e.g. ["HOME", "ABOUT", "CONTACT", ...]
  const allPageTypes = Object.values(CMSType);

  // Types that currently exist in the DB
  const existingTypes = new Set(cms_Pages.map((p) => p.type));

  // Types that are missing
  const missingTypes = allPageTypes.filter((t) => !existingTypes.has(t));

  const allTypesCreated = missingTypes.length === 0;

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4">
        <CMSClient data={formattedPages} allTypesCreated={allTypesCreated}/>
      </div>
    </div>
  );
};

export default CMSPages;
