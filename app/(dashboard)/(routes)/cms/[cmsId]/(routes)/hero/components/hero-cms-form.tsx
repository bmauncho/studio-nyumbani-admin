import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import ImageUpload from "@/components/ui/image-upload";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupTextarea } from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { SubHeading } from "@/components/ui/sub-heading";
import { zodResolver } from "@hookform/resolvers/zod";
import { CMSPage, CMSType, Hero } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

interface HeroCmsFormProps {
  cmsData:
    | (CMSPage & {
        hero: Hero | null;
      })
    | null;
  cmsType: CMSType[];
  isDelete: boolean;
}

const formSchema = z.object({
  name: z.string().min(1),
  type: z.enum(CMSType),
  title: z.string().min(1),
  subtitle: z.string().min(1),
  imageUrl: z.string().min(1),
});

type HeroCmsFormValues = z.infer<typeof formSchema>;

export const HeroCMSForm = ({
  cmsData,
  cmsType,
  isDelete,
}: HeroCmsFormProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<HeroCmsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: cmsData
      ? {
          name: cmsData?.name ?? "",
          type: cmsData?.type,
          title: cmsData?.hero?.title ?? "",
          subtitle: cmsData?.hero?.subtitle ?? "",
          imageUrl: cmsData?.hero?.imageUrl ?? "",
        }
      : {
          title: "",
          subtitle: "",
          imageUrl: "",
        },
  });

  const onSubmit = async (data: HeroCmsFormValues) => {
    console.log(data);
    try {
      setIsLoading(true);

      if (cmsData?.hero) {
        await axios.patch(
          `/api/cms/${cmsData?.id}/hero/${cmsData?.hero?.id}`,
          data
        );
      } else {
        await axios.post(`/api/cms/${cmsData!.id}/hero`, data);
      }

      router.refresh();

      router.push(`/cms`);

      toast.success("Hero CMS updated.");
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          {/*  */}
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
                      disabled={isLoading || isDelete}
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
                      disabled={isLoading || isDelete}
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
          {/*  */}
          <div className="flex items-center justify-between pt-4">
            <SubHeading title="Hero CMS" description="Manage the content" />
          </div>
          <Separator />

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
                      disabled={isLoading || isDelete}
                    />
                    {fieldState.error && (
                      <FieldError>{fieldState.error.message}</FieldError>
                    )}
                  </div>
                </Field>
              )}
            />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Title - 1 col */}
              <Controller
                name="title"
                control={form.control}
                render={({ field, fieldState }) => (
                  <div className="bg-card rounded-lg border-border">
                    <Field>
                      <FieldLabel>Title</FieldLabel>
                      <Input
                        {...field}
                        placeholder="Hero title"
                        disabled={isLoading || isDelete}
                      />
                      {fieldState.error && (
                        <FieldError>{fieldState.error.message}</FieldError>
                      )}
                    </Field>
                  </div>
                )}
              />

              {/* Subtitle - 2 cols */}
              <div className="lg:col-span-2">
                <Controller
                  name="subtitle"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <div className="bg-card rounded-lg border-border">
                      <Field>
                        <FieldLabel>Subtitle</FieldLabel>
                        <InputGroup>
                          <InputGroupTextarea
                            {...field}
                            placeholder="Hero subtitle"
                            disabled={isLoading || isDelete}
                          />
                        </InputGroup>
                        {fieldState.error && (
                          <FieldError>{fieldState.error.message}</FieldError>
                        )}
                      </Field>
                    </div>
                  )}
                />
              </div>
            </div>
          </FieldGroup>
          <Button
            disabled={isLoading || isDelete}
            type="submit"
            className="ml-auto"
          >
            Submit
          </Button>
        </form>
      </div>
    </>
  );
};
