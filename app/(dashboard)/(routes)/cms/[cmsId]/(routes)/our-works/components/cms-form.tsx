import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { CMSPage, CMSType } from "@prisma/client";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

interface CMSpageFormProps {
  initialData: CMSPage | null;
  disable: boolean;
}

const formSchema = z.object({
  name: z.string().min(1),
  type: z.enum(CMSType),
});

type CMSpageFormValues = z.infer<typeof formSchema>;

export const CMSpageForm = ({ initialData, disable }: CMSpageFormProps) => {
  const cmsType = Object.values(CMSType);

  const form = useForm<CMSpageFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name ?? "",
      type: initialData?.type,
    },
  });
  return (
    <>
      <form onSubmit={form.handleSubmit(() => {})}>
        <div className="">
          <FieldGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Name</FieldLabel>
                  <Input {...field} disabled={disable} placeholder="CMS name" />
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
                    disabled={disable}
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
      </form>
    </>
  );
};
