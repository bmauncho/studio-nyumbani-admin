import { create } from "zustand";

interface useStoreModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useStoreModal = create<useStoreModalProps>(() => ({
  isOpen: false,
  onOpen: () => ({ isOpen: true }),
  onClose: () => ({ isOpen: false }),
}));
