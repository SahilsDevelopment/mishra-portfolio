"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, Clock } from "lucide-react";

interface ComingSoonModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
}

export function ComingSoonModal({
  isOpen,
  onClose,
  title = "Feature Coming Soon!",
  message = "This feature is currently under active development and will be available shortly. Thank you for your interest!",
}: ComingSoonModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-md"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
          className="relative z-10 w-full max-w-md p-6 sm:p-8 rounded-3xl glass-panel border border-accent-custom/40 shadow-2xl text-center overflow-hidden"
        >
          {/* Subtle Ambient Glow */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent-custom/20 rounded-full blur-2xl pointer-events-none" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full glass-pill text-muted-custom hover:text-main-custom transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Icon Badge */}
          <div className="mx-auto w-14 h-14 mb-5 rounded-2xl glass-pill flex items-center justify-center text-accent-custom shadow-inner border border-accent-custom/30">
            <Clock className="w-7 h-7" />
          </div>

          {/* Title */}
          <h3 className="font-heading font-extrabold text-2xl text-main-custom mb-2">
            {title}
          </h3>

          {/* Message */}
          <p className="text-muted-custom text-sm leading-relaxed mb-6">
            {message}
          </p>

          {/* Action Button */}
          <button
            onClick={onClose}
            className="w-full accent-pill-btn py-3 text-sm flex items-center justify-center gap-2 cursor-pointer shadow-lg"
          >
            <Sparkles className="w-4 h-4" />
            <span>Got it, thanks!</span>
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
