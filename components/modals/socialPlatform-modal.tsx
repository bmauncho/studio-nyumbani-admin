import { SocialMediaPlatform } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Modal } from "../ui/modal";
import * as z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import toast from "react-hot-toast";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Button } from "../ui/button";
import { InputGroup, InputGroupInput } from "../ui/input-group";

interface SocialPlatformModalProps {
  cmsId: string;
  initialData: SocialMediaPlatform | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const formSchema = z.object({
  platform: z.string().min(1),
});

type SocialPlatformModalFormValues = z.infer<typeof formSchema>;

export const SocialPlatformModal = ({
  cmsId,
  initialData,
  isOpen,
  onClose,
  onConfirm,
}: SocialPlatformModalProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<SocialPlatformModalFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      platform: initialData?.platform ?? "",
    },
  });

  useEffect(() => {
    form.reset({
      platform: initialData?.platform ?? "",
    });
  }, [initialData, form]);

  const title = initialData
    ? "Update Contact Platform"
    : "Create Contact Platform";
  const subTitle = initialData
    ? "Update the contact platform to used in creating your contact info."
    : "Create a platform to used in creating your contact info.";

  const toastMessage = initialData
    ? "Platform updated successfully"
    : "Platform created successfully";

  const submitActons = initialData ? "Update Platform" : "Create Platform";

  const onSubmit = async (values: SocialPlatformModalFormValues) => {
    try {
      setIsLoading(true);
      if (initialData?.platform) {
        await axios.patch(
          `/api/cms/${cmsId}/socialMedia/${initialData?.id}`,
          values
        );
      } else {
        await axios.post(`/api/cms/${cmsId}/socialMedia`, values);
      }

      router.refresh();

      toast.success(toastMessage);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
      onConfirm();
    }
  };

  const onDelete = async () => {
    if (!initialData) {
      toast.error("No Platform selected");
      return;
    }

    try {
      setIsLoading(true);

      await axios.delete(`/api/cms/${cmsId}/socialMedia/${initialData?.id}`);

      router.refresh();
      toast.success("Platform deleted successfully");
      onConfirm();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title={title}
      description={subTitle}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div>
        <div className="space-y-4">
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="platform"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Platform name</FieldLabel>
                    <InputGroup>
                      <InputGroupInput
                        disabled={isLoading}
                        placeholder="Platform name"
                        {...field}
                      />
                    </InputGroup>
                    {fieldState.invalid && (
                      <FieldError>{fieldState.error?.message}</FieldError>
                    )}
                  </Field>
                )}
              />
              <div className="space-x-2 flex items-center justify-end">
                <Button disabled={isLoading} variant="outline">
                  {submitActons}
                </Button>
                {initialData && (
                  <Button
                    disabled={isLoading}
                    variant="destructive"
                    onClick={onDelete}
                  >
                    Delete Category
                  </Button>
                )}
              </div>
            </FieldGroup>
          </form>
        </div>
      </div>
    </Modal>
  );
};
