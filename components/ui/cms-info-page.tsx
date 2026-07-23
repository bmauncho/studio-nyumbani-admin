import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";
import { Button } from "./button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { SubHeading } from "./sub-heading";
import { Separator } from "./separator";
import { Input } from "./input";

interface CMSInfoPageProps {
  cmsId: string;
  info: any;
  page: string;
  pagetitle: string;
  isLoading: boolean;
  onConfirm: () => void;
  onRefresh: () => void;
}

const formSchema = z.object({
  title: z.string().min(1),
  subtitle: z.string().min(1),
});

type CMSInfoPageValues = z.infer<typeof formSchema>;

export const CmsInfoPage = ({
  cmsId,
  info,
  page,
  pagetitle,
  isLoading,
  onConfirm,
  onRefresh,
}: CMSInfoPageProps) => {
  const router = useRouter();
  console.log(info?.title);
  const form = useForm<CMSInfoPageValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: info?.title || "",
      subtitle: info?.subtitle || "",
    },
  });

  const toastMessage = info
    ? `Our ${pagetitle} is updated.`
    : `Our ${pagetitle} is created.`;

  const action = info ? "Update" : "Create";

  const onSubmit = async (Values: CMSInfoPageValues) => {
    try {
      onConfirm();

      if (info) {
        await axios.patch(`/api/cms/${cmsId}/${page}/${info?.id}`, Values);
      } else {
        await axios.post(`/api/cms/${cmsId}/${page}`, Values);
      }

      router.refresh();

      toast.success(toastMessage);
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      onRefresh();
    }
  };

  return (
    <>
      <div className="flex items-center justify-between pt-4">
        <SubHeading
          title={`${pagetitle} Page`}
          description="Manage the title and subtitle."
        />
      </div>
      <Separator />
      <div>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Page Title</FieldLabel>
                  <Input
                    {...field}
                    disabled={isLoading}
                    placeholder="CMS Page Title"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="subtitle"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Page Subtitle</FieldLabel>
                  <Input
                    {...field}
                    disabled={isLoading}
                    placeholder="CMS  page subtitle"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
          <div className="pt-4">
            <Button disabled={isLoading} className="ml-auto" type="submit">
              {action}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};
