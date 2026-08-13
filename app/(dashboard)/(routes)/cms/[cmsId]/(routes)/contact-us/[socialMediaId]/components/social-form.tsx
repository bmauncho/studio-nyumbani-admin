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
import { SocialMedia, SocialMediaPlatform } from "@prisma/client";
import axios from "axios";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

interface SocialFormProps {
  cmsId: string | null;
  initialData: SocialMedia | null;
  platforms: SocialMediaPlatform[] | null;
  page: string;
  socialMediaPage: string;
}

const formSchema = z.object({
  userName: z.string().min(1),
  url: z.string().min(1),
  platformId: z.string().min(1),
});

type SocialsPageValues = z.infer<typeof formSchema>;

export const SocialForm = ({
  cmsId,
  initialData,
  platforms,
  page,
  socialMediaPage,
}: SocialFormProps) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<SocialsPageValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userName: initialData?.userName || "",
      url: initialData?.url || "",
      platformId: initialData?.platformId || "",
    },
  });

  const toastMessage = initialData
    ? `Our Social is updated.`
    : `Our Social is created.`;

  const action = initialData ? "Update" : "Create";

  const onSubmit = async (Values: SocialsPageValues) => {
    try {
      setIsLoading(true);
      if (initialData) {
        console.log("patch");
        await axios.patch(
          `/api/cms/${cmsId}/${page}/${socialMediaPage}/${initialData?.id}`,
          Values
        );
      } else {
        console.log("post");
        await axios.post(
          `/api/cms/${cmsId}/${page}/${socialMediaPage}`,
          Values
        );
      }

      router.refresh();

      toast.success(toastMessage);
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setIsLoading(true);

      await axios.delete(
        `/api/cms/${cmsId}/${page}/${socialMediaPage}/${initialData?.id}`
      );

      router.push(`/cms/${cmsId}}/${page}`);

      router.refresh();

      toast.success("Social deleted.");
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
          <FieldGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Controller
              name="platformId"
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
                        {platforms?.map((platform) => (
                          <SelectItem key={platform.id} value={platform.id}>
                            {platform.platform}
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
              name="userName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Platform Username</FieldLabel>
                  <Input
                    {...field}
                    disabled={isLoading}
                    placeholder="Username"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="url"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Url</FieldLabel>
                  <Input
                    {...field}
                    disabled={isLoading}
                    placeholder="Platform Url"
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
