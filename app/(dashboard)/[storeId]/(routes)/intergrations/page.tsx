"use client";
import { ApiAlert } from "@/components/ui/api-alert";
import { ApiList } from "@/components/ui/api-list";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { useOrigin } from "@/hooks/use-origin";
import { useParams } from "next/navigation";
import { SubHeading } from "@/components/ui/sub-heading";

const IntegrationsPage = () => {
  const origin = useOrigin();
  const params = useParams();
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4">
        <Heading title="Intergrations" description="Manage API connections" />
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
