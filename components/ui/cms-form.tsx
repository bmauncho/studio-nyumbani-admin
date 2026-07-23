import { CMSPage, CMSType } from "@prisma/client";
import { Field, FieldError, FieldGroup, FieldLabel } from "./field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { Controller, useForm } from "react-hook-form";
import { Input } from "./input";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./button";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const formSchema = z.object({
  name: z.string().min(1),
  type: z.enum(CMSType),
});

interface CMSFormProps {
  cmsId: string | null;
  initialData: CMSPage | null;
  isLoading: boolean;
  onConfirm: () => void;
  onRefresh: () => void;
}

type CMSFormValues = z.infer<typeof formSchema>;

export const CMSForm = ({
  cmsId,
  initialData,
  isLoading,
  onConfirm,
  onRefresh,
}: CMSFormProps) => {
  const cmsType = Object.values(CMSType);
  const router = useRouter();

  const form = useForm<CMSFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name ?? "",
      type: initialData?.type,
    },
  });

  const submitAction = initialData ? "Update" : "Create";
  const toastMessage = initialData
    ? "CMS updated successfully."
    : "CMS created successfully.";

  const onSubmit = async (Values: CMSFormValues) => {
    try {
      onConfirm();

      if (initialData) {
        await axios.patch(`/api/cms/${cmsId}`, Values);
      } else {
        await axios.post(`/api/cms`, Values);
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
      <form onSubmit={form.handleSubmit(onSubmit)}>
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
                    disabled={isLoading}
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
                    disabled={isLoading}
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
          <div className="pt-4">
            <Button disabled={isLoading} className="ml-auto" type="submit">
              {submitAction}
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};
