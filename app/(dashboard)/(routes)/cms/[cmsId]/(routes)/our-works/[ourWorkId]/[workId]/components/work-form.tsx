"use client";
import { AlertModal } from "@/components/modals/alert-modal";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Heading } from "@/components/ui/heading";
import ImageUpload from "@/components/ui/image-upload";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Work } from "@prisma/client";
import axios from "axios";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

interface WorkFormProps {
  cmsId: string;
  ourWorkId: string;
  initialData: {
    id: string;
    title: string;
    description: string | null;
    images: { url: string }[];
  } | null;
}

const formSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  images: z.object({ url: z.string().min(1) }).array(),
});

type WorkFormValues = z.infer<typeof formSchema>;

export const WorkForm = ({ cmsId, ourWorkId, initialData }: WorkFormProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toastMessage = initialData ? "Work updated." : "Work created.";
  const action = initialData ? "Save work changes" : "Create work";

  const form = useForm<WorkFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData?.title ?? "",
      description: initialData?.description ?? "",
      images: initialData?.images ?? [],
    },
  });

  const onDelete = async () => {
    try {
      setIsLoading(true);

      await axios.delete(
        `/api/cms/${cmsId}/ourWork/${ourWorkId}/work/${initialData?.id}`
      );

      router.push(`/cms/${cmsId}/our-works`);

      router.refresh();

      toast.success("Work deleted.");
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (values: WorkFormValues) => {
    setIsLoading(true);
    try {
      if (initialData) {
        await axios.patch(
          `/api/cms/${cmsId}/ourWork/${ourWorkId}/work${initialData?.id}`,
          values
        );
      } else {
        await axios.post(`/api/cms/${cmsId}/ourWork/${ourWorkId}/work`, values);
      }

      router.push(`/cms/${cmsId}/our-works`);

      router.refresh();

      toast.success(toastMessage);
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={onDelete}
        loading={isLoading}
      />
      <div className=" flex items-center justify-between">
        <Heading title="Our Work" description="Manage our work" />
        <Button
          disabled={isLoading}
          variant="destructive"
          size="icon"
          onClick={() => setIsOpen(true)}
        >
          <Trash className="h-4 w-4" />
        </Button>
      </div>
      <Separator />
      <div>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="images"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <div className="bg-card rounded-lg border border-border space-y-2 p-4 overflow-hidden">
                    <FieldLabel>Work Images</FieldLabel>
                    <ImageUpload
                      value={(field.value || []).map((image) => image.url)}
                      onChange={(url: string) => {
                        const current = form.getValues("images") || [];

                        const updated = [...current, { url }];

                        //console.log("Before:", current);
                        //console.log("Added:", url);

                        field.onChange(updated);
                      }}
                      onRemove={(url) => {
                        const current = form.getValues("images") || [];

                        const updated = current.filter(
                          (image) => image.url !== url
                        );

                        field.onChange(updated);
                      }}
                      billboard={false}
                      disabled={isLoading}
                    />
                    {fieldState.error && (
                      <FieldError>{fieldState.error.message}</FieldError>
                    )}
                  </div>
                </Field>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8">
              <Controller
                name="title"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Work Collection Title</FieldLabel>
                    <Input
                      {...field}
                      disabled={isLoading}
                      placeholder="Work collection Title"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="description"
                control={form.control}
                render={({ field, fieldState }) => (
                  <div className="bg-card rounded-lg border-border md:col-span-2 lg:col-span-2">
                    <Field>
                      <FieldLabel>Work description</FieldLabel>
                      <Input
                        {...field}
                        placeholder="Work description"
                        disabled={isLoading}
                      />
                      {fieldState.error && (
                        <FieldError>{fieldState.error.message}</FieldError>
                      )}
                    </Field>
                  </div>
                )}
              />
            </div>
            <div className="pt-4">
              <Button disabled={isLoading} className="ml-auto" type="submit">
                {action}
              </Button>
            </div>
          </FieldGroup>
        </form>
      </div>
    </>
  );
};
