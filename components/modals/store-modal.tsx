"use client";
// Hooks
import { useStoreModal } from "@/hooks/use-store-modal";
// UI
import { Modal } from "@/components/ui/modal";
// Form imports
import * as z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { InputGroup, InputGroupInput } from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useState } from "react";

const formSchema = z.object({
  name: z.string().min(1),
});

export const StoreModal = () => {
  const storeModal = useStoreModal();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    //TODO: Create store
    try {
      setIsLoading(true);

      const response = await axios.post("/api/stores", values);

      window.location.assign(`/stores/${response.data.id}`);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title="Create store"
      description="Add a new store to manage products and categories"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Store name</FieldLabel>
                    <InputGroup>
                      <InputGroupInput
                        disabled={isLoading}
                        placeholder="Store name"
                        {...field}
                      />
                    </InputGroup>
                    {fieldState.invalid && (
                      <FieldError>{fieldState.error?.message}</FieldError>
                    )}
                  </Field>
                )}
              />
              <>
                <Field>
                  <div className="space-x-2 flex items-center justify-end">
                    <Button
                      disabled={isLoading}
                      variant="outline"
                      onClick={storeModal.onClose}
                    >
                      Cancel
                    </Button>
                    <Button disabled={isLoading} type="submit">
                      Create
                    </Button>
                  </div>
                </Field>
              </>
            </FieldGroup>
          </form>
        </div>
      </div>
    </Modal>
  );
};
