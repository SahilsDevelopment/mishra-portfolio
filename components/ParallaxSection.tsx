"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxSectionProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
  parallaxSpeed?: number; // Subtle scroll speed factor e.g. -40 to 40
}

export function ParallaxSection({
  id,
  children,
  className = "",
  parallaxSpeed = 30,
}: ParallaxSectionProps) {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [-parallaxSpeed, parallaxSpeed]);

  return (
    <section
      id={id}
      ref={targetRef}
      className={`relative overflow-hidden py-20 px-4 sm:px-6 ${className}`}
    >
      {/* Background Parallax Element */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 pointer-events-none z-0 opacity-40 dark:opacity-20"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-amber-500/10 via-orange-500/5 to-transparent blur-3xl" />
      </motion.div>

      {/* Foreground Content reveal */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-6xl mx-auto"
      >
        {children}
      </motion.div>
    </section>
  );
}
