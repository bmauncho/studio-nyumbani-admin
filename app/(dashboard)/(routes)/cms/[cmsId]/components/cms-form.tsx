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
import { Separator } from "@/components/ui/separator";
import { Controller } from "react-hook-form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { Trash } from "lucide-react";
import toast from "react-hot-toast";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CMSPage, CMSType } from "@prisma/client";

interface CmsFormsProps {
  initialData: CMSPage | null;
  cmsType: CMSType[];
  showHeader?: boolean;
}

const formSchema = z.object({
  name: z.string().min(1),
  type: z.enum(CMSType),
});

type CmsFormValues = z.infer<typeof formSchema>;

export const CmsForm = ({
  initialData,
  cmsType,
  showHeader = true,
}: CmsFormsProps) => {
  const router = useRouter();
  const params = useParams();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<CmsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name ?? "",
      type: initialData?.type,
    },
  });

  const onSubmit = async (data: CmsFormValues) => {
    console.log(data);
    try {
      setLoading(true);

      if (initialData) {
        await axios.patch(`/api/cms/${params.cmsId}`, data);
      } else {
        await axios.post(`/api/cms`, data);
      }

      router.refresh();

      router.push(`/cms`);

      toast.success("CMS page updated.");
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);

      await axios.delete(`/api/cms/${params.cmsId}`);

      router.refresh();

      setTimeout(() => {
        window.location.assign("/");
      }, 500);

      toast.success("CMS page deleted.");
    } catch (error) {
      toast.error("Make sure you remove all products and categories first.");
    } finally {
      setLoading(false);
    }
  };

  const title = initialData
    ? (initialData.name ?? "New CMS Page")
    : "New CMS Page";
  const desc = initialData
    ? `Update your ${initialData.name ?? "CMS"} page`
    : "Create a new cms page.";

  const toastMessage = initialData ? "CmsPage updated" : "CmsPage created";

  const submitAction = initialData ? "Save Changes" : "Create";

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      {showHeader && (
        <>
          <div className="flex items-center justify-between">
            <Heading title={title} description={desc} />
            {initialData && (
              <Button
                disabled={loading}
                variant="destructive"
                size="sm"
                onClick={() => setOpen(true)}
              >
                <Trash className="h-4 w-4" />
              </Button>
            )}
          </div>
          <Separator />
        </>
      )}
      <div>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="">
            <FieldGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Name</FieldLabel>
                    <Input
                      {...field}
                      disabled={loading}
                      placeholder="CMS name"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="type"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>CMS Type</FieldLabel>
                    <Select
                      disabled={loading}
                      onValueChange={field.onChange}
                      value={field.value ?? ""}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a cms type"
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {cmsType.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type.replaceAll("_", "-")}
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
            </FieldGroup>
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {submitAction}
          </Button>
        </form>
      </div>
    </>
  );
};
