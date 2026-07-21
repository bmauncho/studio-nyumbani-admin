import { Image as ImageType } from "@/types";

interface GalleryProps {
  images: ImageType[];
}

export const Gallery = ({ images }: GalleryProps) => {
  return (
    <>
      <div className="grid grid-cols-2 gap-4"></div>
    </>
  );
};
