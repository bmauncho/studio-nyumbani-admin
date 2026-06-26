import { create } from "zustand";

interface useLoadingModalProps {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

export const useLoadingModal = create<useLoadingModalProps>((set) => ({
  isLoading: false,
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
}));