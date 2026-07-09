import BookingsClient from "./components/client";

const BookingsPage = () => {
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4">
        <BookingsClient />
      </div>
    </div>
  );
};

export default BookingsPage;
