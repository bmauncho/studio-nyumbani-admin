import prismadb from "@/lib/prismadb";
import { Params } from "@/types";
import { SizeForm } from "../../sizes/[sizeId]/components/size-form";
import { ColorForm } from "./components/color-form";

const ColorPage = async ({
  params,
}: {
  params: Params<{ colorId: string }>;
}) => {
  const { colorId } = await params;

  const color = await prismadb.color.findUnique({
    where: {
      id: colorId,
    },
  });
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 ">
        <ColorForm initialData={color} />
      </div>
    </div>
  );
};

export default ColorPage;
