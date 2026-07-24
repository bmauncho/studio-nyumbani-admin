import { SocialMedia } from "@prisma/client";
import * as z from "zod";

interface SocialFormProps {
  cmsId: string | null;
  initialData: SocialMedia | null;
}

const formSchema = z.object({
  userName: z.string().min(1),
  url: z.string().min(1),
});

export const SocialForm = ({ cmsId, initialData }: SocialFormProps) => {
  return <></>;
};
