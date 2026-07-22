"use client";
import { Controller, useForm } from "react-hook-form";
import { Modal } from "../ui/modal";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { InputGroup, InputGroupInput } from "../ui/input-group";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import { WorkCategory } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";

interface PortfolioModalProps {
  cmsId: string;
  initialData: WorkCategory | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const formSchema = z.object({
  category: z.string().min(1),
});

type PortfolioModalFormValues = z.infer<typeof formSchema>;

export const PortfolioModal = ({
  cmsId,
  initialData,
  isOpen,
  onClose,
  onConfirm,
}: PortfolioModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<PortfolioModalFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: initialData?.category ?? "",
    },
  });

  useEffect(() => {
    form.reset({
      category: initialData?.category ?? "",
    });
  }, [initialData, form]);

  const onSubmit = async (values: PortfolioModalFormValues) => {
    try {
      setIsLoading(true);
      if (initialData?.category) {
        await axios.patch(
          `/api/cms/${cmsId}/workCategory/${initialData?.id}`,
          values
        );
      } else {
        await axios.post(`/api/cms/${cmsId}/workCategory`, values);
      }

      router.refresh();

      toast.success("Category created successfully");
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
      toast.error("No category selected");
      return;
    }

    try {
      setIsLoading(true);

      await axios.delete(`/api/cms/${cmsId}/workCategory/${initialData.id}`);

      router.refresh();
      toast.success("Category deleted successfully");
      onConfirm();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const submitActons = initialData ? "Update Category" : "Create Category";
  const title = initialData
    ? "Update Portfolio Category"
    : "Create Portfolio Category";
  const subTitle = initialData
    ? "Update the portfolio category to used in creating your portfolio."
    : "Create a category to used in creating your portfolio.";

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
                name="category"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Portfolio Category name</FieldLabel>
                    <InputGroup>
                      <InputGroupInput
                        disabled={isLoading}
                        placeholder="Portfolio Category name"
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
