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
import { Button } from "@/components/ui/button";
import { AlertModal } from "@/components/modals/alert-modal";

interface MessageClientProps {
  messages: MessageColumn[] | null;
}

const MessagesClient = ({ messages: initialMessages }: MessageClientProps) => {
  const [openDelete, setOpenDelete] = useState(false);
  const [openArchive, setOpenArchive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [filter, setFilter] = useState<"All" | "Read" | "Unread" | "Archived">(
    "All"
  );
  const [messages, setMessages] = useState<MessageColumn[]>(
    initialMessages ?? []
  );

  const [selectedMessage, setSelectedMessage] = useState<MessageColumn | null>(
    null
  );

  const filtered =
    filter === "All"
      ? messages
      : filter === "Read"
        ? messages?.filter((msg) => msg.read && !msg.archived)
        : filter === "Unread"
          ? messages?.filter((msg) => !msg.read && !msg.archived)
          : messages?.filter((msg) => msg.archived);

  const handleSelectMessage = async (message: MessageColumn) => {
    setSelectedMessage(message);

    if (!message.read) {
      // optimistic update
      setMessages((prev) =>
        prev.map((m) => (m.id === message.id ? { ...m, read: true } : m))
      );

      try {
        await axios.patch(`/api/messages/${message.id}`, { read: true });
        toast.success("Message read successfully.");
      } catch (error) {
        toast.error("Failed to mark message as read.");

        // revert on failure
        setMessages((prev) =>
          prev.map((m) => (m.id === message.id ? { ...m, read: false } : m))
        );
      }
    }
  };

  const OnDelete = async (message: MessageColumn) => {
    try {
      await axios.delete(`/api/messages/${message.id}`);
      toast.success("Message deleted successfully.");
      setMessages((prev) => prev.filter((m) => m.id !== message.id));
    } catch (error) {
      toast.error("Failed to delete message.");
    }
  };

  const OnArchive = async (message: MessageColumn) => {
    try {
      await axios.patch(`/api/messages/${message.id}`, { archived: true });
      toast.success("Message archived successfully.");
      setMessages((prev) =>
        prev.map((m) => (m.id === message.id ? { ...m, archived: true } : m))
      );
    } catch (error) {
      toast.error("Failed to archive message.");
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
  const filterOptions = ["All", "Read", "Unread", "Archived"] as const;

  return (
    <>
      <AlertModal
        isOpen={openDelete}
        onClose={() => setOpenDelete(false)}
        onConfirm={() => OnDelete(selectedMessage!)}
        loading={isLoading}
      />
      <AlertModal
        isOpen={openArchive}
        onClose={() => setOpenArchive(false)}
        onConfirm={() => OnArchive(selectedMessage!)}
        loading={isLoading}
      />
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
          <>
            <div className="flex gap-2">
              {filterOptions.map((option) => (
                <Button
                  key={option}
                  onClick={() => setFilter(option)}
                  className={filter === option ? "font-bold underline" : ""}
                >
                  {option}
                </Button>
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-150">
              {/* Left - message list */}
              <div className="lg:col-span-1 space-y-2 overflow-y-auto">
                {filtered?.length ? (
                  filtered.map((message) => (
                    <MessageCard
                      key={message.id}
                      data={message}
                      isSelected={selectedMessage?.id === message.id}
                      onClick={() => handleSelectMessage(message)} // 👈 marks as read + selects
                      onDelete={() => OnDelete(message)}
                      onArchive={() => OnArchive(message)}
                    />
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-6">
                    No {filter !== "All" ? filter.toLowerCase() : ""} messages
                  </p>
                )}
              </div>
              {/* Right - message detail */}
              <div className="lg:col-span-2">
                <MessageDetail
                  message={selectedMessage!}
                  onDelete={() => setOpenDelete(true)}
                  onArchive={() => setOpenArchive(true)}
                />
              </div>
            </div>
          </>
        )}
      </>
    </>
  );
};

export default MessagesClient;
