"use client";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { useState } from "react";
import { MessageColumn } from "./message-column";
import MessageCard from "./message-card";
import MessageDetail from "./message-detail";

const MessagesClient = () => {
  const [selectedMessage, setSelectedMessage] = useState<MessageColumn | null>(
    null
  );
  const mockMessages: MessageColumn[] = [
    {
      id: "1",
      customerName: "John Doe",
      customerEmail: "john@example.com",
      message: "I need a custom suit",
      date: "July 4th, 2026",
      time: "2:30 PM",
      read: false,
    },
    {
      id: "2",
      customerName: "Jane Smith",
      customerEmail: "jane@example.com",
      message: "I need a custom suit",
      date: "July 5th, 2026",
      time: "4:30 PM",
      read: false,
    },
  ];
  return (
    <>
      <>
        <div>
          <Heading
            title="Messages"
            description="View and manage customer messages and inquiries."
          />
        </div>
        <Separator />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-150">
          {/* Left - message list */}
          <div className="lg:col-span-1 space-y-2 overflow-y-auto">
            {mockMessages.map((message) => (
              <MessageCard
                key={message.id}
                data={message}
                isSelected={selectedMessage?.id === message.id}
                onClick={() => setSelectedMessage(message)} // 👈 select on click
              />
            ))}
          </div>

          {/* Right - message detail */}
          <div className="lg:col-span-2">
            <MessageDetail message={selectedMessage!} />
          </div>
        </div>
      </>
    </>
  );
};

export default MessagesClient;
