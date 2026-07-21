import { Image as ImageType } from "@/types";
import { Tabs } from "../ui/tabs";

interface GalleryTabProps {
  image: ImageType;
}

export const GalleryTab = ({ image }: GalleryTabProps) => {
  return (
    <>
      <Tabs></Tabs>
    </>
  );
};
