import { Separator } from "@/components/ui/separator";
import { Archive, Calendar, Clock, Mail, Trash2 } from "lucide-react";
import { MessageColumn } from "./message-column";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface MessageCardProps {
  data: MessageColumn;
  isSelected?: boolean;
  onClick?: () => void;
  onArchive?: () => void;
  onDelete?: () => void;
}

const MessageCard = ({
  data,
  isSelected,
  onClick,
  onArchive,
  onDelete,
}: MessageCardProps) => {
  return (
    <div
      onClick={onClick} // 👈 clickable
      className={cn(
        "bg-card rounded-lg border border-border p-4 cursor-pointer hover:shadow-lg transition-all",
        isSelected && "border-primary bg-accent" // 👈 highlight selected
      )}
    >
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-foreground">{data.name}</h3>
            </div>
          </div>
          {!data.read && (
            <div className="w-2 h-2 rounded-full bg-blue-500 mt-1 shrink-0" />
          )}
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{data.createdAt}</span>
          </div>

          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{data.time}</span>
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onArchive?.();
              }}
            >
              <Archive className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-red-500"
              onClick={(e) => {
                e.stopPropagation();
                onDelete?.();
              }}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageCard;
