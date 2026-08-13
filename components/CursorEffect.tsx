"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CursorEffect() {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Mouse position motion values
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Spring physics for smooth follower motion
  const springConfig = { stiffness: 350, damping: 28 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const glowX = useSpring(mouseX, { stiffness: 120, damping: 20 });
  const glowY = useSpring(mouseY, { stiffness: 120, damping: 20 });

  useEffect(() => {
    // Check if device supports touch using lazy check
    if (typeof window !== "undefined" && ("ontouchstart" in window || navigator.maxTouchPoints > 0)) {
      const timer = setTimeout(() => setIsTouchDevice(true), 0);
      return () => clearTimeout(timer);
    }

    const updateMousePosition = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("a") ||
        target.closest("button") ||
        target.closest(".glass-panel") ||
        target.closest(".glass-pill") ||
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA"
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [mouseX, mouseY, isVisible]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <>
      {/* Ambient Spotlight Glow following cursor */}
      <motion.div
        style={{
          x: glowX,
          y: glowY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className="fixed top-0 left-0 w-[450px] h-[450px] pointer-events-none z-30 rounded-full bg-radial from-amber-500/12 via-terracotta-500/5 to-transparent blur-3xl opacity-75 dark:opacity-40 transition-opacity duration-300"
      />

      {/* Outer Cursor Ring */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovered ? 2.2 : 1,
          borderColor: isHovered ? "var(--accent)" : "rgba(217, 83, 56, 0.4)",
          backgroundColor: isHovered ? "rgba(217, 83, 56, 0.08)" : "transparent",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-accent-custom/40 pointer-events-none z-50 backdrop-blur-[1px]"
      />

      {/* Inner Precision Dot */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovered ? 0.5 : 1,
        }}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-accent-custom pointer-events-none z-50 shadow-sm"
      />
    </>
  );
}
