"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-full glass-pill flex items-center justify-center opacity-70">
        <span className="w-4 h-4 bg-gray-400/40 rounded-full animate-pulse" />
      </div>
    );
  }

  const isDark = resolvedTheme === "dark" || theme === "dark";

  return (
    <motion.button
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative w-10 h-10 rounded-full glass-pill flex items-center justify-center text-main-custom focus:outline-none focus:ring-2 focus:ring-amber-500/40 transition-colors"
      aria-label="Toggle Light and Dark Theme"
    >
      <motion.div
        key={isDark ? "dark" : "light"}
        initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        {isDark ? (
          <Sun className="w-5 h-5 text-amber-400 fill-amber-400/20" />
        ) : (
          <Moon className="w-5 h-5 text-slate-700 fill-slate-700/10" />
        )}
      </motion.div>
    </motion.button>
  );
}
