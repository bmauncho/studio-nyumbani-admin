import MessagesClient from "./components/client";

const MessagesPage = () => {
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4">
        <MessagesClient />
      </div>
    </div>
  );
};

export default MessagesPage;
