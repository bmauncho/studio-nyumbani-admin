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
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Billboard } from "@prisma/client";
import { Trash } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";
import axios from "axios";

interface BillboardFormProps {
  initialData: Billboard | null;
}

type BillboardFormValues = z.infer<typeof formSchema>;

const formSchema = z.object({
  label: z.string().min(1),
  imageUrl: z.string().min(1),
});

export const BillboardForm = ({ initialData }: BillboardFormProps) => {
  const params = useParams();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const title = initialData ? "Edit Billboard" : "Create Billboard";
  const description = initialData ? "Edit a billboard" : "Add a new billboard";

  const toastMessage = initialData ? "Billboard updated" : "Billboard created";

  const submitAction = initialData ? "Save Changes" : "Create";

  const form = useForm<BillboardFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      label: "",
      imageUrl: "",
    },
  });

  const onSubmit = async (data: BillboardFormValues) => {
    try {
      setIsLoading(true);

      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/billboards/${params.billboardId}`,
          data
        );
      } else {
        await axios.post(`/api/${params.storeId}/billboards`, data);
      }

      router.refresh();

      router.push(`/${params.storeId}/billboards`);

      toast.success(toastMessage);
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
      setIsOpen(false);
    }
  };

  const onDelete = async () => {
    try {
      setIsLoading(true);

      await axios.delete(
        `/api/${params.storeId}/billboards/${params.billboardId}`
      );

      router.refresh();

      router.push(`/${params.storeId}/billboards`);

      toast.success("Billboard deleted.");
    } catch (error) {
      toast.error(
        "Make sure you remove all categories using this billboard first."
      );
    } finally {
      setIsLoading(false);
      setIsOpen(false);
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
        <Heading title={title} description={description} />
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
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
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
                  </div>
                </Field>
              )}
            />
            <div className="grid grid-cols-3 gap-8">
              <Controller
                name="label"
                control={form.control}
                render={({ field, fieldState }) => (
                  <div className="bg-card rounded-lg border-border ">
                    <Field>
                      <FieldLabel>Label</FieldLabel>
                      <Input {...field} placeholder="Billboard label" />
                      {fieldState.error && (
                        <FieldError>{fieldState.error.message}</FieldError>
                      )}
                    </Field>
                  </div>
                )}
              />
            </div>
          </FieldGroup>
          <Button disabled={isLoading} type="submit" className="ml-auto">
            {submitAction}
          </Button>
        </form>
      </div>
    </>
  );
};
