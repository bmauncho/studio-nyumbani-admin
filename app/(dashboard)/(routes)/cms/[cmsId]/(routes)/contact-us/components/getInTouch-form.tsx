import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { SubHeading } from "@/components/ui/sub-heading";
import { zodResolver } from "@hookform/resolvers/zod";
import { GetInTouch } from "@prisma/client";
import { Phone } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

interface GetInTouchFormProps {
  cmsId: string;
  initialData: GetInTouch | null;
  isLoading: boolean;
}

const formSchema = z.object({
  title: z.string().min(1),
  subtitle: z.string().min(1),
  email: z.string().min(1),
  phone: z.string().min(1),
});

type GetInTouchFormValues = z.infer<typeof formSchema>;

export const GetInTouchForm = ({
  cmsId,
  initialData,
  isLoading,
}: GetInTouchFormProps) => {
  const submitAction = initialData ? "Update" : "Create";
  const form = useForm<GetInTouchFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData?.title ?? "",
      subtitle: initialData?.subtitle ?? "",
      email: initialData?.email ?? "",
      phone: initialData?.phone ?? "",
    },
  });
  return (
    <>
      <div className="flex items-center justify-between pt-4">
        <SubHeading
          title="Get In Touch"
          description="Manage the get in touch info."
        />
      </div>
      <Separator />
      <div>
        <form onSubmit={form.handleSubmit(() => {})}>
          <FieldGroup>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Controller
                name="title"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Get In Touch Title</FieldLabel>
                    <Input
                      {...field}
                      disabled={isLoading}
                      placeholder="Title"
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
                  <div className="bg-card rounded-lg border-border">
                    <Field>
                      <FieldLabel>Get In Touch Subtitle</FieldLabel>
                      <Input
                        {...field}
                        placeholder="Subtitle"
                        disabled={isLoading}
                      />
                      {fieldState.error && (
                        <FieldError>{fieldState.error.message}</FieldError>
                      )}
                    </Field>
                  </div>
                )}
              />
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <div className="bg-card rounded-lg border-border">
                    <Field>
                      <FieldLabel>Work Subtitle</FieldLabel>
                      <Input
                        {...field}
                        placeholder="email"
                        disabled={isLoading}
                      />
                      {fieldState.error && (
                        <FieldError>{fieldState.error.message}</FieldError>
                      )}
                    </Field>
                  </div>
                )}
              />
              <Controller
                name="phone"
                control={form.control}
                render={({ field, fieldState }) => (
                  <div className="bg-card rounded-lg border-border">
                    <Field>
                      <FieldLabel>Work Subtitle</FieldLabel>
                      <Input
                        {...field}
                        placeholder="phone"
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
                {submitAction}
              </Button>
            </div>
          </FieldGroup>
        </form>
      </div>
    </>
  );
};
