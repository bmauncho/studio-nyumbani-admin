"use client";

import { Button } from "./button";
import toast from "react-hot-toast";
import { Copy, Server } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./alert";
import { VariantProps } from "class-variance-authority";
import { Badge, badgeVariants } from "./badge";

interface ApiAlertProps {
  title: string;
  description: string;
  variant: "public" | "admin";
}

type BadgeVariant = VariantProps<typeof badgeVariants>["variant"];

const textMap: Record<ApiAlertProps["variant"], string> = {
  public: "Public",
  admin: "Admin",
};

const variantMap: Record<ApiAlertProps["variant"], BadgeVariant> = {
  public: "secondary",
  admin: "destructive",
};

export const ApiAlert = ({
  title,
  description,
  variant = "public",
}: ApiAlertProps) => {
  const onCopy = () => {
    navigator.clipboard.writeText(description);
    toast.success("API Route copied to clipboard.");
  };

  return (
    <Alert className="w-full pr-2">
      <Server className="h-4 w-4" />
      <AlertTitle className="flex items-center gap-x-2 font-bold">
        {title}
        <Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
      </AlertTitle>
      <AlertDescription className="flex items-center mt-4 justify-between gap-2 overflow-hidden w-full pr-2">
        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold truncate max-w-[70%] flex-1 min-w-0">
          {description}
        </code>
        <Button
          variant="outline"
          size="icon"
          onClick={onCopy}
          className="shrink-0"
        >
          <Copy className="h-4 w-4" />
        </Button>
      </AlertDescription>
    </Alert>
  );
};
