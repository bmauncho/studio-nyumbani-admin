import { useOrigin } from "@/hooks/use-origin";
import { useParams } from "next/navigation";
import { Heading } from "./heading";
import { Separator } from "./separator";
import { ApiAlert } from "./api-alert";
import { cn } from "@/lib/utils";
import { SubHeading } from "./sub-heading";

interface ApiListProps {
  title: string;
  description: string;
  entityName: string;
  entityIdName: string;
  className?: string;
}

export const ApiList = ({
  title,
  description,
  entityName,
  entityIdName,
  className,
}: ApiListProps) => {
  const params = useParams();
  const origin = useOrigin();

  const baseUrl = `${origin}/api/${params.storeId}`;

  return (
    <>
      <div className={cn("space-y-4", className)}>
        <div>
          <SubHeading title={title} description={description} />
        </div>
        <Separator />
        <ApiAlert
          title="GET"
          description={`${baseUrl}/${entityName}`}
          variant="public"
        />
        <ApiAlert
          title="GET"
          description={`${baseUrl}/${entityName}/{${entityIdName}}`}
          variant="public"
        />
        <ApiAlert
          title="POST"
          description={`${baseUrl}/${entityName}`}
          variant="admin"
        />
        <ApiAlert
          title="PATCH"
          description={`${baseUrl}/${entityName}/{${entityIdName}}`}
          variant="admin"
        />
        <ApiAlert
          title="DELETE"
          description={`${baseUrl}/${entityName}/{${entityIdName}}`}
          variant="admin"
        />
      </div>
    </>
  );
};
