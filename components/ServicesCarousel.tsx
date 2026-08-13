"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { SERVICES } from "@/lib/constants";
import { ComingSoonModal } from "@/components/ComingSoonModal";
import {
  ChevronLeft,
  ChevronRight,
  Cpu,
  Zap,
  Server,
  Bot,
  Activity,
  CheckCircle,
  LucideIcon,
  ArrowRight,
} from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  Cpu,
  Zap,
  Server,
  Bot,
  Activity,
};

export function ServicesCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [selectedServiceTitle, setSelectedServiceTitle] = useState("");
  const total = SERVICES.length;
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const nextCard = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevCard = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  useEffect(() => {
    if (isPaused) return;

    timeoutRef.current = setInterval(() => {
      nextCard();
    }, 4500);

    return () => {
      if (timeoutRef.current) clearInterval(timeoutRef.current);
    };
  }, [isPaused, nextCard]);

  const handleInquire = (title: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedServiceTitle(title);
    setShowComingSoon(true);
  };

  return (
    <div
      className="w-full relative py-8"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* 3D Coverflow Container */}
      <div className="relative h-[480px] sm:h-[500px] flex items-center justify-center carousel-container overflow-hidden">
        {SERVICES.map((service, index) => {
          let offset = index - activeIndex;
          if (offset < -Math.floor(total / 2)) offset += total;
          if (offset > Math.floor(total / 2)) offset -= total;

          const isActive = offset === 0;
          const IconComponent = ICON_MAP[service.iconName] || Cpu;

          return (
            <motion.div
              key={service.id}
              initial={false}
              animate={{
                x: offset * 280,
                scale: isActive ? 1 : 0.82 - Math.abs(offset) * 0.05,
                rotateY: offset * -18,
                zIndex: 10 - Math.abs(offset),
                opacity: Math.abs(offset) > 2 ? 0 : isActive ? 1 : 0.5,
                filter: isActive ? "blur(0px)" : "blur(1.5px)",
              }}
              transition={{
                duration: 0.6,
                ease: [0.25, 1, 0.5, 1],
              }}
              onClick={() => setActiveIndex(index)}
              className={`absolute top-0 w-[320px] sm:w-[420px] h-[440px] sm:h-[460px] p-6 sm:p-8 rounded-3xl cursor-pointer carousel-card glass-panel flex flex-col justify-between select-none ${
                isActive
                  ? "border-accent-custom/60 shadow-2xl ring-1 ring-amber-500/20"
                  : "border-subtle-custom hover:border-accent-custom/30"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div
                    className={`p-3 rounded-2xl ${
                      isActive
                        ? "bg-accent-custom text-white shadow-md"
                        : "glass-pill text-muted-custom"
                    }`}
                  >
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono font-bold text-muted-custom">
                    0{index + 1} / 0{total}
                  </span>
                </div>

                <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-main-custom mb-3 leading-snug">
                  {service.title}
                </h3>

                <p className="text-muted-custom text-sm sm:text-base leading-relaxed mb-6">
                  {service.fullDescription}
                </p>

                <div className="space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-accent-custom block mb-2">
                    Key Deliverables:
                  </span>
                  {service.deliverables.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-xs font-medium text-main-custom"
                    >
                      <CheckCircle className="w-3.5 h-3.5 text-accent-custom shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-subtle-custom flex items-center justify-between">
                <span className="text-xs font-semibold text-muted-custom">
                  {isActive ? "Currently Active Service" : "Click to view details"}
                </span>
                <button
                  onClick={(e) => handleInquire(service.title, e)}
                  className={`text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer ${
                    isActive
                      ? "text-accent-custom hover:underline"
                      : "text-muted-custom"
                  }`}
                >
                  <span>Inquire Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="flex items-center justify-center gap-6 mt-8">
        <button
          onClick={prevCard}
          className="p-3 rounded-full glass-pill text-main-custom hover:text-accent-custom hover:scale-110 transition-all cursor-pointer"
          aria-label="Previous Service Card"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2">
          {SERVICES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`h-2.5 rounded-full transition-all cursor-pointer ${
                idx === activeIndex
                  ? "w-8 bg-accent-custom"
                  : "w-2.5 bg-black/20 dark:bg-white/20 hover:bg-black/40"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        <button
          onClick={nextCard}
          className="p-3 rounded-full glass-pill text-main-custom hover:text-accent-custom hover:scale-110 transition-all cursor-pointer"
          aria-label="Next Service Card"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Coming Soon Alert Modal */}
      <ComingSoonModal
        isOpen={showComingSoon}
        onClose={() => setShowComingSoon(false)}
        title={`Inquiry for ${selectedServiceTitle}`}
        message="This service inquiry portal is coming soon! Please email prof.se.sahil@gmail.com or message Sahil directly on LinkedIn."
      />
    </div>
  );
}
