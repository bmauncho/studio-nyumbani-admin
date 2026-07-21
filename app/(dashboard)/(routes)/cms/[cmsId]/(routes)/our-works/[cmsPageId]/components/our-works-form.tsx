"use client";
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
import { InputGroup, InputGroupTextarea } from "@/components/ui/input-group";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { OurWork } from "@prisma/client";
import { Trash } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

interface OurWorksFormProps {
  initialData: OurWork | null;
}

const formSchema = z.object({
  title: z.string().min(1),
  subTitle: z.string().min(1),
  imageUrl: z.string().min(1),
});

type OurWorkFormValues = z.infer<typeof formSchema>;

export const OurWorkForm = ({ initialData }: OurWorksFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<OurWorkFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData?.title ?? "",
      subTitle: initialData?.subTitle ?? "",
      imageUrl: initialData?.imageUrl ?? "",
    },
  });
  return (
    <>
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
        <form onSubmit={form.handleSubmit(() => {})}>
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
                name="subTitle"
                control={form.control}
                render={({ field, fieldState }) => (
                  <div className="bg-card rounded-lg border-border">
                    <Field>
                      <FieldLabel>Work Subtitle</FieldLabel>
                      <InputGroup>
                        <InputGroupTextarea
                          {...field}
                          placeholder="Work subtitle"
                          disabled={isLoading}
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
          </FieldGroup>
        </form>
      </div>
    </>
  );
};
