"use client";

import { useStoreModal } from "@/hooks/use-store-modal";

const SetUpPage = () => {
const onOpen = useStoreModal((state) => state.onOpen);
const onClose = useStoreModal((state) => state.onClose);

  return <div className="p-4"></div>;
};

export default SetUpPage;
