"use client";

import * as z from "zod";
import { Category, Color, Product, Size } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, Resolver, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import toast from "react-hot-toast";
import { AlertModal } from "@/components/modals/alert-modal";
import { Heading } from "@/components/ui/heading";
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";

interface ProductFormProps {
  initialData:
    | (Omit<Product, "price" | "costPrice" | "discount"> & {
        price: number;
        costPrice: number;
        discount: number;
        description: string;
        images: { url: string }[];
      })
    | null;
  categories: Category[];
  sizes: Size[];
  colors: Color[];
}

const formSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  images: z.object({ url: z.string().min(1) }).array(),
  price: z.coerce.number().min(1),
  costPrice: z.coerce.number().min(1),
  discount: z.coerce.number().min(0).max(100).optional(),
  stock: z.coerce.number().min(0),
  categoryId: z.string().min(1),
  colorId: z.string().min(1),
  sizeId: z.string().min(1),
  isFeatured: z.boolean().default(false).optional(),
  isArchived: z.boolean().default(false).optional(),
  isDiscounted: z.boolean().default(false).optional(),
});

type ProductFormValues = z.infer<typeof formSchema>;

export const ProductForm = ({
  initialData,
  categories,
  sizes,
  colors,
}: ProductFormProps) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Edit product" : "Create product";
  const description = initialData ? "Edit a product" : "Add a new product";
  const toastMessage = initialData ? "Product updated." : "Product created.";
  const action = initialData ? "Save changes" : "Create";

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema) as Resolver<ProductFormValues>,
    defaultValues: initialData
      ? {
          ...initialData,
          price: parseFloat(String(initialData.price)),
          costPrice: parseFloat(String(initialData.costPrice)),
          discount: parseFloat(String(initialData.discount ?? 0)),
          description: initialData.description ?? "",
        }
      : {
          name: "",
          description: "",
          images: [],
          price: 9.99,
          costPrice: 9.99,
          discount: 20,
          stock: 10,
          categoryId: "",
          colorId: "",
          sizeId: "",
          isFeatured: false,
          isArchived: false,
          isDiscounted: false,
        },
  });
  // submit handler
  const onSubmit = async (data: ProductFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/products/${params.productId}`,
          data
        );
      } else {
        await axios.post(`/api/${params.storeId}/products`, data);
      }

      router.refresh();

      router.push(`/${params.storeId}/products`);

      toast.success(toastMessage);
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };
  // delete handler
  const onDelete = async () => {
    try {
      setLoading(true);

      await axios.delete(`/api/${params.storeId}/products/${params.productId}`);

      router.refresh();

      router.push(`/${params.storeId}/products`);

      toast.success("Product deleted.");
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="icon"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <div>
        <form onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full">
          <FieldGroup>
            {/* ----- Products Images ----- */}
            <Controller
              name="images"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Images</FieldLabel>
                  <ImageUpload
                    value={(field.value || []).map((image) => image.url)}
                    disabled={loading}
                    billboard={false}
                    onChange={(url: string) => {
                      const current = form.getValues("images") || [];

                      const updated = [...current, { url }];

                      //console.log("Before:", current);
                      //console.log("Added:", url);

                      field.onChange(updated);
                    }}
                    onRemove={(url) => {
                      const current = form.getValues("images") || [];

                      const updated = current.filter(
                        (image) => image.url !== url
                      );

                      field.onChange(updated);
                    }}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <div className="grid grid-cols-3 gap-8">
              {/* product name */}
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Name</FieldLabel>
                    <Input
                      {...field}
                      disabled={loading}
                      placeholder="Product name"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              {/* product price */}
              <Controller
                name="price"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Price</FieldLabel>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder="9.99"
                      {...field}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              {/* Cost price */}
              <Controller
                name="costPrice"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Cost Price</FieldLabel>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder="9.99"
                      {...field}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* product stock */}
              <Controller
                name="stock"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Stock</FieldLabel>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder="10"
                      {...field}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              {/* category */}
              <Controller
                name="categoryId"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Category</FieldLabel>
                    <Select
                      disabled={loading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a category"
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {categories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
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
              {/* size */}
              <Controller
                name="sizeId"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Size</FieldLabel>
                    <Select
                      disabled={loading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a size"
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {sizes.map((size) => (
                            <SelectItem key={size.id} value={size.id}>
                              {size.name}
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
              {/* color */}
              <Controller
                name="colorId"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Color</FieldLabel>
                    <Select
                      disabled={loading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a color"
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {colors.map((color) => (
                            <SelectItem key={color.id} value={color.id}>
                              {color.name}
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

              {/* featured */}
              <Controller
                name="isFeatured"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    orientation={"horizontal"}
                    className="flex flex-row space-x-3 space-y-0 items-start rounded-md border p-4"
                  >
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="shrink-0 mt-1"
                    />
                    <div className="space-y-1 leading-none">
                      <FieldLabel>Featured</FieldLabel>
                      <FieldDescription>
                        This product will appear on the home page.
                      </FieldDescription>
                    </div>

                    {fieldState.invalid && (
                      <div className="shrink-0">
                        <FieldError errors={[fieldState.error]} />
                      </div>
                    )}
                  </Field>
                )}
              />
              {/* archived */}
              <Controller
                name="isArchived"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    orientation={"horizontal"}
                    className="flex flex-row space-x-3 space-y-0 items-start rounded-md border p-4"
                  >
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="shrink-0 mt-1"
                    />
                    <div className="space-y-1 leading-none">
                      <FieldLabel>Archived</FieldLabel>
                      <FieldDescription>
                        This product will not appear anywhere on the store.
                      </FieldDescription>
                    </div>

                    {fieldState.invalid && (
                      <div className="shrink-0">
                        <FieldError errors={[fieldState.error]} />
                      </div>
                    )}
                  </Field>
                )}
              />
              {/* Discount */}
              <Controller
                name="isDiscounted"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    orientation="horizontal"
                    className="flex flex-row space-x-3 space-y-0 items-start rounded-md border p-4"
                  >
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="shrink-0 mt-1"
                    />
                    <div className="space-y-1 leading-none">
                      <FieldLabel>Discounted</FieldLabel>
                      <FieldDescription>
                        This product is on discount.
                      </FieldDescription>
                    </div>
                    {fieldState.invalid && (
                      <div className="shrink-0">
                        <FieldError errors={[fieldState.error]} />
                      </div>
                    )}
                  </Field>
                )}
              />

              {/* Only show discount field when isDiscounted is true */}
              {form.watch("isDiscounted") && (
                <Controller
                  name="discount"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel>Discount (%)</FieldLabel>
                      <Input
                        type="number"
                        disabled={loading}
                        placeholder="20"
                        {...field}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              )}
            </div>
            {/* description */}
            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Description</FieldLabel>
                  <Textarea
                    {...field}
                    disabled={loading}
                    placeholder="Product description"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
          <div className="pt-4">
            <Button disabled={loading} className="ml-auto" type="submit">
              {action}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};
