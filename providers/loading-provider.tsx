"use client";

import { LoadingModal } from "@/components/modals/loading-modal";
import { useEffect, useState } from "react";

export const LoadingProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), 0);
    return () => clearTimeout(timeout);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <LoadingModal />
    </>
  );
};
