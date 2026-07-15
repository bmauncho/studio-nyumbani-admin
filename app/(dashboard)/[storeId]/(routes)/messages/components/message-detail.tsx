import { Archive, Trash2 } from "lucide-react";
import { MessageColumn } from "./message-column";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface MessageDetailProps {
  message: MessageColumn;
}

const MessageDetail = ({ message }: MessageDetailProps) => {
  return (
    <>
      <div>
        {message ? (
          <div className="bg-card rounded-lg border border-border p-6 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mt-1">
                  From: {message.customerName}
                </p>
                <p className="text-xs text-muted-foreground">
                  {message.date},{message.time}
                </p>
              </div>
              {!message.read && (
                <Badge className="bg-blue-100 text-blue-800">Unread</Badge>
              )}
            </div>

            <div className="pt-4">
              <p className="text-foreground leading-relaxed">
                {message.message}
              </p>
            </div>
            {/* Actions */}
            <div className="border-t border-border pt-4 flex items-center justify-end gap-2">
              <Button variant="outline" size="sm">
                <Archive className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" className="text-red-500">
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="bg-card rounded-lg border border-border p-6 flex items-center justify-center h-49">
            <p className="text-muted-foreground">Select a message to read</p>
          </div>
        )}
      </div>
    </>
  );
};

export default MessageDetail;
