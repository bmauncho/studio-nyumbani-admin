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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { OurWork, WorkCategory } from "@prisma/client";
import axios from "axios";
import { Trash } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";
import { useRouter } from "next/navigation";

interface OurWorksFormProps {
  initialData: OurWork | null;
  workCategories: WorkCategory[];
  cmsId: string;
}

const formSchema = z.object({
  title: z.string().min(1),
  subTitle: z.string().min(1),
  imageUrl: z.string().min(1),
  workCategoryId: z.string().min(1),
});

type OurWorkFormValues = z.infer<typeof formSchema>;

export const OurWorkForm = ({
  initialData,
  workCategories,
  cmsId,
}: OurWorksFormProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toastMessage = initialData ? "Work updated." : "Work created.";
  const action = initialData ? "Save changes" : "Create";

  const form = useForm<OurWorkFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData?.title ?? "",
      subTitle: initialData?.subTitle ?? "",
      imageUrl: initialData?.imageUrl ?? "",
      workCategoryId: initialData?.workCategoryId ?? "",
    },
  });

  const onDelete = async () => {
    try {
      setIsLoading(true);

      await axios.delete(`/api/cms/${cmsId}/ourWork/${initialData?.id}`);

      router.push(`/cms/${cmsId}/our-works`);

      router.refresh();

      toast.success("Work deleted.");
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (values: OurWorkFormValues) => {
    setIsLoading(true);
    try {
      if (initialData) {
        await axios.patch(
          `/api/cms/${cmsId}/ourWork/${initialData?.id}`,
          values
        );
      } else {
        await axios.post(`/api/cms/${cmsId}/ourWork`, values);
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
        <Heading title="Our Works" description="Manage our works" />
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
              name="imageUrl"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <div className="bg-card rounded-lg border border-border space-y-2 p-4 overflow-hidden">
                    <FieldLabel>Background Image</FieldLabel>
                    <ImageUpload
                      value={field.value ? [field.value] : []}
                      onChange={field.onChange}
                      onRemove={() => field.onChange("")}
                      billboard={true}
                      disabled={isLoading}
                    />
                    {fieldState.error && (
                      <FieldError>{fieldState.error.message}</FieldError>
                    )}
                  </div>
                </Field>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Controller
                name="title"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Work Title</FieldLabel>
                    <Input
                      {...field}
                      disabled={isLoading}
                      placeholder="Work Title"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="workCategoryId"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Work Category</FieldLabel>
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select work Category"
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {workCategories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.category}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="subTitle"
                control={form.control}
                render={({ field, fieldState }) => (
                  <div className="bg-card rounded-lg border-border">
                    <Field>
                      <FieldLabel>Work Subtitle</FieldLabel>
                      <Input
                        {...field}
                        placeholder="Work subtitle"
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
