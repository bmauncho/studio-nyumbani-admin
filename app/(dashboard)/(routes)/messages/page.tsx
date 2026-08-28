import prismadb from "@/lib/prismadb";
import MessagesClient from "./components/client";
import { format } from "date-fns";
import { MessageColumn } from "./components/message-column";

const MessagesPage = async () => {
  const messages = await prismadb.message.findMany({
    orderBy: { createdAt: "desc" },
  });

  const formattedMessages: MessageColumn[] = messages.map((message) => ({
    id: message.id,
    name: message.name,
    email: message.email,
    message: message.message,
    createdAt: format(message.createdAt, "MMMM do, yyyy"),
    time: format(message.createdAt, "h:mm a"),
    archived: message.archived || false,
    read: message.read,
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4">
        <MessagesClient messages={formattedMessages} />
      </div>
    </div>
  );
};

export default MessagesPage;
