"use client";
import { Controller, useForm } from "react-hook-form";
import { Modal } from "../ui/modal";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { InputGroup, InputGroupInput } from "../ui/input-group";
import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import { WorkCategory } from "@prisma/client";

interface PortfolioModalProps {
  initialData: WorkCategory | null;
  isOpen: boolean;
  onClose: () => void;
}

const formSchema = z.object({
  category: z.string().min(1),
});

type PortfolioModalFormValues = z.infer<typeof formSchema>;

export const PortfolioModal = ({
  initialData,
  isOpen,
  onClose,
}: PortfolioModalProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: initialData?.category ?? "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    //TODO: Create portfolio category
    try {
      setIsLoading(true);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const submitActons = initialData ? "Update Category" : "Create Category";

  return (
    <Modal
      title="Portfilio Category"
      description="Create a category to used in creating your portfolio."
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
              </div>
            </FieldGroup>
          </form>
        </div>
      </div>
    </Modal>
  );
};
