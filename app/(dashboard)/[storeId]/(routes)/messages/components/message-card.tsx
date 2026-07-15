import { Separator } from "@/components/ui/separator";
import { Calendar, Clock, Mail } from "lucide-react";
import { MessageColumn } from "./message-column";
import { cn } from "@/lib/utils";

interface MessageCardProps {
  data: MessageColumn;
  isSelected?: boolean;
  onClick?: () => void;
}

const MessageCard = ({ data, isSelected, onClick }: MessageCardProps) => {
  return (
    <div
      onClick={onClick} // 👈 clickable
      className={cn(
        "bg-card rounded-lg border border-border p-4 cursor-pointer hover:shadow-lg transition-all",
        isSelected && "border-primary bg-accent" // 👈 highlight selected
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-foreground">
              {data.customerName}
            </h3>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{data.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{data.time}</span>
            </div>
          </div>
        </div>
        {!data.read && (
          <div className="w-2 h-2 rounded-full bg-blue-500 mt-1 shrink-0" /> // 👈 unread dot
        )}
      </div>
    </div>
  );
};

export default MessageCard;
