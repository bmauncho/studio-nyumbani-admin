"use client";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { useState } from "react";
import { MessageColumn } from "./message-column";
import MessageCard from "./message-card";
import MessageDetail from "./message-detail";
import axios from "axios";
import toast from "react-hot-toast";
import EmptyPage from "@/components/ui/empty-page";

interface MessageClientProps {
  messages: MessageColumn[] | null;
}

const MessagesClient = ({ messages: initialMessages }: MessageClientProps) => {
  const [messages, setMessages] = useState<MessageColumn[]>(
    initialMessages ?? []
  );

  const [selectedMessage, setSelectedMessage] = useState<MessageColumn | null>(
    null
  );

  const handleSelectMessage = async (message: MessageColumn) => {
    setSelectedMessage(message);

    if (!message.read) {
      // optimistic update
      setMessages((prev) =>
        prev.map((m) => (m.id === message.id ? { ...m, read: true } : m))
      );

      try {
        await axios.patch(`/api/messages/${message.id}`, { read: true });
      } catch (error) {
        toast.error("Failed to mark message as read.");

        // revert on failure
        setMessages((prev) =>
          prev.map((m) => (m.id === message.id ? { ...m, read: false } : m))
        );
      }
    }
  };

  // const mockMessages: MessageColumn[] = [
  //   {
  //     id: "1",
  //     name: "John Doe",
  //     email: "john@example.com",
  //     message: "I need a custom suit",
  //     createdAt: "July 4th, 2026",
  //     time: "10:30 AM",
  //     read: false,
  //   },
  // ];

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
        {messages.length === 0 ? (
          <EmptyPage
            title="No Messages found."
            description="Waiting for client messages and inquiries."
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-150">
            {/* Left - message list */}
            <div className="lg:col-span-1 space-y-2 overflow-y-auto">
              {messages.map((message) => (
                <MessageCard
                  key={message.id}
                  data={message}
                  isSelected={selectedMessage?.id === message.id}
                  onClick={() => handleSelectMessage(message)} // 👈 marks as read + selects
                />
              ))}
            </div>

            {/* Right - message detail */}
            <div className="lg:col-span-2">
              <MessageDetail message={selectedMessage!} />
            </div>
          </div>
        )}
      </>
    </>
  );
};

export default MessagesClient;
