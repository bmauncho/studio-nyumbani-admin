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
import { InputGroup, InputGroupTextarea } from "@/components/ui/input-group";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Testimonial } from "@prisma/client";
import axios from "axios";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

interface TestimonialFormProps {
  cmsId: string | null;
  initialData: Testimonial | null;
}

const formSchema = z.object({
  name: z.string().min(1),
  role: z.string().min(1),
  content: z.string().min(1),
});

type TestimonialFormValues = z.infer<typeof formSchema>;

export const TestimonialForm = ({
  cmsId,
  initialData,
}: TestimonialFormProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toastMessage = initialData
    ? "Testimonial updated."
    : "Testimonial created.";
  const action = initialData ? "Save changes" : "Create";
  const form = useForm<TestimonialFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name ?? "",
      role: initialData?.role ?? "",
      content: initialData?.content ?? "",
    },
  });

  const onDelete = async () => {
    try {
      setIsLoading(true);

      await axios.delete(`/api/cms/${cmsId}/testimonials/${initialData?.id}`);

      router.push(`/cms/${cmsId}/testimonials`);

      router.refresh();

      toast.success("Service deleted.");
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (values: TestimonialFormValues) => {
    setIsLoading(true);
    try {
      if (initialData) {
        await axios.patch(
          `/api/cms/${cmsId}/testimonials/${initialData?.id}`,
          values
        );
      } else {
        await axios.post(`/api/cms/${cmsId}/testimonials`, values);
      }

      router.push(`/cms/${cmsId}/testimonials`);

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
        {initialData && (
          <Button
            disabled={isLoading}
            variant="destructive"
            size="icon"
            onClick={() => setIsOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <div>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Testimonial Name</FieldLabel>
                    <Input
                      {...field}
                      disabled={isLoading}
                      placeholder="Testimonial Name"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="role"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Testimonial Role</FieldLabel>
                    <Input
                      {...field}
                      disabled={isLoading}
                      placeholder="Testimonial Role"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="content"
                control={form.control}
                render={({ field, fieldState }) => (
                  <div className="bg-card rounded-lg border-border">
                    <Field>
                      <FieldLabel>Testimonial</FieldLabel>
                      <InputGroup>
                        <InputGroupTextarea
                          {...field}
                          placeholder="Testimonial"
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
