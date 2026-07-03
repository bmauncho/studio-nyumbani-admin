import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyMedia,
} from "./empty";
import { File } from "lucide-react";

interface EmptyPageProps {
  title?: string;
  description?: string;
}

const EmptyPage = ({ title, description }: EmptyPageProps) => {
  return (
    <div className="w-full h-full flex items-center justify-center space-y-4 p-2">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <File className="h-4 w-4" />
          </EmptyMedia>
          <EmptyTitle>{title}</EmptyTitle>
          <EmptyDescription>{description}</EmptyDescription>
        </EmptyHeader>
      </Empty>
    </div>
  );
};

export default EmptyPage;
