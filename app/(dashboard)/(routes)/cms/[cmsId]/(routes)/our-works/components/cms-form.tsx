import { CMSForm } from "@/components/ui/cms-form";
import { CMSPage } from "@prisma/client";

interface CMSpageFormProps {
  cmsId: string;
  initialData: CMSPage | null;
  disable: boolean;
};

export const CMSpageForm = ({
  cmsId,
  initialData,
  disable,
}: CMSpageFormProps) => {
  return (
    <>

    </>
  );
};
