import { useOrigin } from "@/hooks/use-origin";
import { useParams } from "next/navigation";
import { Separator } from "./separator";
import { ApiAlert } from "./api-alert";
import { cn } from "@/lib/utils";
import { SubHeading } from "./sub-heading";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { Button } from "./button";

interface ApiListProps {
  title: string;
  description: string;
  entityName?: string;
  entityIdName?: string;
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
  const [isOpen, setIsOpen] = useState(false);

  const baseUrl = `${origin}/api/${params.storeId}`;

  return (
    <div className={cn("space-y-4", className)}>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <div className="flex items-center justify-between space-y-4">
          <SubHeading title={title} description={description} />
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="icon">
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform duration-200",
                  isOpen && "rotate-180" // 👈 rotates when open
                )}
              />
            </Button>
          </CollapsibleTrigger>
        </div>
        <Separator />
        <CollapsibleContent className="space-y-4 pt-4">
          {/* Always show GET all if entityName exists */}
          {!entityName && (
            <ApiAlert title="GET" description={`${baseUrl}`} variant="public" />
          )}

          {/* Only show these if both entityName and entityIdName exist */}
          {entityName && entityIdName && (
            <>
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
            </>
          )}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};
