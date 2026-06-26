import { useLoadingModal } from "@/hooks/use-loading-modal";
import { useEffect, useState } from "react";

export const LoadingModal = () => {
  const isLoading = useLoadingModal((state) => state.isLoading);
  const [visible, setVisible] = useState(false);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setVisible(true);
      setFading(false);
    } else if (visible) {
      setFading(true);

      const timeOut = setTimeout(() => {
        setVisible(false);
        setFading(false);
      }, 300);

      return () => clearTimeout(timeOut);
    }
  }, [isLoading]);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 transition-opacity duration-300 ${
        fading ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center gap-4 rounded-xl border border-white/10 bg-white p-10 dark:bg-zinc-900">
        {/* Spinner */}
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-zinc-200 border-t-blue-500" />
        {/* Dots */}
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-500"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
        <span className="text-sm text-zinc-500">Loading...</span>
      </div>
    </div>
  );
};
