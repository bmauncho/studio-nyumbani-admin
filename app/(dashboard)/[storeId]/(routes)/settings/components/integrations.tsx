"use client";
import { ApiList } from "@/components/ui/api-list";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { useOrigin } from "@/hooks/use-origin";
import { useParams } from "next/navigation";
import { Store } from "@prisma/client";

interface IntergrationProps {
  store: Store;
}

const IntegrationsPage = ({ store }: IntergrationProps) => {
  const hasStore = (str: string) =>
    str
      .toLowerCase()
      .split(/[\s-_]/)
      .includes("store");

  const store_name = hasStore(store.name)
    ? store.name // already has "store" → use as is
    : `${store.name} Store`; // missing "store" → append it

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4">
        <Heading
          title="Integrations"
          description={`Manage ${store_name} API connections`}
        />
        <Separator />
        <div className="space-y-4">
          <ApiList title="Store-Api" description="Api calls for store." />
          <ApiList
            title="Products"
            description="Api calls for products."
            entityName="products"
            entityIdName="productId"
          />
          <ApiList
            title="Categories"
            description="Api calls for categories."
            entityName="categories"
            entityIdName="categoryId"
          />
          <ApiList
            title="Billboards"
            description="Api calls for billboards."
            entityName="billboards"
            entityIdName="billboardId"
          />
          <ApiList
            title="Sizes"
            description="Api calls for sizes."
            entityName="sizes"
            entityIdName="sizeId"
          />
          <ApiList
            title="Colors"
            description="Api calls for colors."
            entityName="colors"
            entityIdName="colorId"
          />
        </div>
      </div>
    </div>
  );
};
export default IntegrationsPage;
