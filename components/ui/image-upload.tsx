"use client";

import { useEffect, useState } from "react";
import { CldImage, CldUploadWidget } from "next-cloudinary";
import { ImagePlus, Trash } from "lucide-react";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface ImageUploadProps {
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
  billboard?: boolean;
  disabled?: boolean;
}

const ImageUpload = ({
  onChange,
  onRemove,
  value,
  billboard,
  disabled,
}: ImageUploadProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        {value.map((url) => (
          <div
            key={url}
            className={cn(
              billboard
                ? "relative w-full h-50 aspect-video rounded-md overflow-hidden"
                : "relative w-50 h-50 rounded-md overflow-hidden"
            )}
          >
            <div className={cn("z-10 absolute top-2 right-2")}>
              <Button
                type="button"
                variant="destructive"
                onClick={() => onRemove(url)}
                size="icon"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <CldImage
              fill
              alt="Image"
              className="object-cover"
              src={url}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {/* <Image fill className="object-cover" alt="Image" src={url} /> */}
          </div>
        ))}
      </div>
      <CldUploadWidget onSuccess={onUpload} uploadPreset="studio-nyumbani">
        {({ open }) => {
          const onClick = () => {
            if (!open) return; // 👈 guard against undefined
            open();
          };
          return (
            <Button
              type="button"
              disabled={disabled}
              variant="secondary"
              onClick={onClick}
            >
              <ImagePlus className="h-4 w-4 mr-2" />
              Upload an image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;
