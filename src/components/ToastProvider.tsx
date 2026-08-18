"use client";

import React, { createContext, useContext, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface Toast {
  id: string;
  title?: string;
  message: string;
}

interface ToastContextType {
  showToast: (message?: string, title?: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = useState<Toast | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const showToast = useCallback(
    (
      message: string = "Sorry...not available yet, Stay tuned!",
      title: string = "NOTICE // DOTX"
    ) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      const id = Date.now().toString() + Math.random().toString(36).substring(2, 6);
      setToast({ id, title, message });

      timerRef.current = setTimeout(() => {
        setToast(null);
      }, 1600);
    },
    []
  );

  const removeToast = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setToast(null);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Floating Top-Right Toast Container in DotX Chamfered Tech Theme */}
      <div className="fixed top-20 right-4 sm:top-24 sm:right-6 z-[99999] flex flex-col items-end max-w-sm w-[calc(100vw-2rem)] sm:w-[360px] pointer-events-none px-2 sm:px-0">
        <AnimatePresence mode="popLayout">
          {toast && (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, scale: 0.9, y: 0 }}
              animate={{ opacity: 1, scale: [0.9, 1.04, 1], y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 0 }}
              transition={{ duration: 0.12, ease: "easeOut" }}
              className="pointer-events-auto relative w-full bg-white p-[2px] shadow-[0_12px_36px_rgba(0,0,0,0.9),0_0_24px_rgba(89,0,140,0.4)] clip-button"
            >
              {/* Inner Chamfered Box with Black Background */}
              <div className="bg-black text-white p-3.5 flex items-start gap-3.5 relative clip-button w-full">
                {/* Left DotX Logo */}
                <img
                  src="/logo-highres-seamless.png"
                  alt="DotX"
                  className="w-6 h-6 object-contain block shrink-0 mt-0.5"
                />

                {/* Text Content */}
                <div className="flex-1 min-w-0 font-mono">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-black uppercase tracking-widest text-black bg-white px-1.5 py-0.5">
                      {toast.title}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#59008C] animate-ping" />
                  </div>
                  <p className="text-xs sm:text-sm font-bold tracking-tight text-white leading-snug break-words">
                    {toast.message}
                  </p>
                </div>

                {/* Close Button */}
                <button
                  onClick={removeToast}
                  className="text-neutral-400 hover:text-white p-1 transition-colors cursor-pointer shrink-0"
                  aria-label="Close notification"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Animated Progress Timer Bar at Bottom */}
                <motion.div
                  key={`progress-${toast.id}`}
                  initial={{ width: "100%" }}
                  animate={{ width: "0%" }}
                  transition={{ duration: 1.6, ease: "linear" }}
                  className="absolute bottom-0 left-0 h-[2px] bg-[#59008C]"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
