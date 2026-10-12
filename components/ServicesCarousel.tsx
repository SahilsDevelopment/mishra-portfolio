"use client";

import { useState, useEffect, useCallback } from "react";
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
  Check,
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

// Each step starts as the previous one ends, so the carousel never rests.
const STEP_SECONDS = 2.4;
const AUTOPLAY_MS = STEP_SECONDS * 1000;

export function ServicesCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTabHidden, setIsTabHidden] = useState(false);
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [selectedServiceTitle, setSelectedServiceTitle] = useState("");
  const total = SERVICES.length;

  const nextCard = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevCard = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  useEffect(() => {
    const onVisibilityChange = () => setIsTabHidden(document.hidden);
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);

  // Keyed on activeIndex so manual navigation restarts the countdown.
  useEffect(() => {
    if (showComingSoon || isTabHidden) return;
    const timer = setTimeout(nextCard, AUTOPLAY_MS);
    return () => clearTimeout(timer);
  }, [activeIndex, showComingSoon, isTabHidden, nextCard]);

  const handleInquire = (title: string) => {
    setSelectedServiceTitle(title);
    setShowComingSoon(true);
  };

  return (
    <div className="w-full">
      <div className="relative h-[420px] flex items-center justify-center overflow-hidden carousel-container">
        {SERVICES.map((service, index) => {
          let offset = index - activeIndex;
          if (offset < -Math.floor(total / 2)) offset += total;
          if (offset > Math.floor(total / 2)) offset -= total;

          const isActive = offset === 0;
          const isVisible = Math.abs(offset) <= 1;
          const IconComponent = ICON_MAP[service.iconName] || Cpu;

          return (
            <motion.div
              key={service.id}
              initial={false}
              animate={{
                x: `${offset * 78}%`,
                scale: isActive ? 1 : 0.86,
                rotateY: offset * -14,
                opacity: isActive ? 1 : isVisible ? 0.45 : 0,
                zIndex: isActive ? 3 : isVisible ? 2 : 1,
              }}
              transition={{ duration: STEP_SECONDS, ease: "linear" }}
              onClick={() => !isActive && setActiveIndex(index)}
              aria-hidden={!isActive}
              className={`clay absolute w-[300px] sm:w-[380px] h-[380px] p-7 carousel-card flex flex-col select-none ${
                isActive ? "" : "cursor-pointer"
              } ${isVisible ? "" : "pointer-events-none"}`}
            >
              <div className="flex items-center justify-between mb-8">
                <span className="clay-button w-12 h-12 rounded-2xl flex items-center justify-center">
                  <IconComponent className="w-5 h-5 text-accent-custom" />
                </span>
                <span className="text-xs font-mono text-muted-custom">
                  0{index + 1} / 0{total}
                </span>
              </div>

              <h3 className="font-heading font-semibold text-xl sm:text-2xl text-main-custom mb-3 leading-snug">
                {service.title}
              </h3>

              <p className="text-sm text-muted-custom leading-relaxed mb-6">
                {service.shortDescription}
              </p>

              <ul className="space-y-2 mb-auto">
                {service.deliverables.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-main-custom">
                    <Check className="w-4 h-4 mt-0.5 text-accent-custom shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {isActive && (
                <button
                  onClick={() => handleInquire(service.title)}
                  className="mt-6 self-start text-sm font-medium text-accent-custom inline-flex items-center gap-1.5 hover:gap-2.5 transition-all cursor-pointer"
                >
                  <span>Inquire</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </motion.div>
          );
        })}
      </div>

      <div className="flex items-center justify-center gap-6 mt-6">
        <button
          onClick={prevCard}
          className="p-2 rounded-full text-muted-custom hover:text-main-custom transition-colors cursor-pointer"
          aria-label="Previous service"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2">
          {SERVICES.map((service, idx) => (
            <button
              key={service.id}
              onClick={() => setActiveIndex(idx)}
              className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                idx === activeIndex ? "w-6 bg-accent-custom" : "w-1.5 bg-[var(--border-strong)]"
              }`}
              aria-label={`Go to service ${idx + 1}`}
              aria-current={idx === activeIndex}
            />
          ))}
        </div>

        <button
          onClick={nextCard}
          className="p-2 rounded-full text-muted-custom hover:text-main-custom transition-colors cursor-pointer"
          aria-label="Next service"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <ComingSoonModal
        isOpen={showComingSoon}
        onClose={() => setShowComingSoon(false)}
        title={`Inquiry for ${selectedServiceTitle}`}
        message="This service inquiry portal is coming soon! Please email prof.se.sahil@gmail.com or message Sahil directly on LinkedIn."
      />
    </div>
  );
}
