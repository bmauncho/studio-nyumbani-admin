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
import { OurService, OurWork, WorkCategory } from "@prisma/client";
import axios from "axios";
import { Trash } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { InputGroup, InputGroupTextarea } from "@/components/ui/input-group";

interface ServiceFormProps {
  cmsId: string | null;
  initialData: OurService | null;
}

const formSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
});

type ServiceFormValues = z.infer<typeof formSchema>;

export const ServiceForm = ({ cmsId, initialData }: ServiceFormProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toastMessage = initialData ? "Service updated." : "Service created.";
  const action = initialData ? "Save changes" : "Create";

  const form = useForm<ServiceFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData?.title ?? "",
      description: initialData?.description ?? "",
    },
  });

  const onDelete = async () => {
    try {
      setIsLoading(true);

      await axios.delete(`/api/cms/${cmsId}/ourServices/${initialData?.id}`);

      router.push(`/cms/${cmsId}/our-services`);

      router.refresh();

      toast.success("Service deleted.");
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (values: ServiceFormValues) => {
    setIsLoading(true);
    try {
      if (initialData) {
        await axios.patch(
          `/api/cms/${cmsId}/ourServices/${initialData?.id}`,
          values
        );
      } else {
        await axios.post(`/api/cms/${cmsId}/ourServices`, values);
      }

      router.push(`/cms/${cmsId}/our-services`);

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
                name="title"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Service Title</FieldLabel>
                    <Input
                      {...field}
                      disabled={isLoading}
                      placeholder="Service Title"
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
                  <div className="bg-card rounded-lg border-border">
                    <Field>
                      <FieldLabel>Service Description</FieldLabel>
                      <InputGroup>
                        <InputGroupTextarea
                          {...field}
                          placeholder="Service Description"
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
