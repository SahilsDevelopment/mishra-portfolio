"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { WaveBackdrop } from "@/components/WaveBackdrop";
import { useWelcomeDone } from "@/components/WelcomeIntro";

const SUBTITLE =
  "Engineering high-throughput microservices, payment systems, and resilient cloud architectures.";

const TYPE_START_MS = 2000;
const TYPE_SPEED_MS = 28;

const DELETE_SPEED_MS = 16;
const HOLD_FULL_MS = 2600;
const HOLD_EMPTY_MS = 500;

function useTypewriterLoop(text: string, enabled: boolean) {
  const [count, setCount] = useState(0);
  const [skip, setSkip] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const t = setTimeout(() => setSkip(true), 0);
      return () => clearTimeout(t);
    }

    let timer: ReturnType<typeof setTimeout>;
    let i = 0;
    let deleting = false;
    const tick = () => {
      i += deleting ? -1 : 1;
      setCount(i);

      let delay = deleting ? DELETE_SPEED_MS : TYPE_SPEED_MS;
      if (!deleting && i === text.length) {
        deleting = true;
        delay = HOLD_FULL_MS;
      } else if (deleting && i === 0) {
        deleting = false;
        delay = HOLD_EMPTY_MS;
      }
      timer = setTimeout(tick, delay);
    };
    timer = setTimeout(tick, TYPE_START_MS);
    return () => clearTimeout(timer);
  }, [text, enabled]);

  return skip ? text : text.slice(0, count);
}

const EASE = [0.22, 1, 0.36, 1] as const;

export function HeroSection() {
  const ready = useWelcomeDone();
  const typed = useTypewriterLoop(SUBTITLE, ready);

  return (
    <section className="relative overflow-hidden min-h-dvh flex flex-col items-center justify-center text-center px-5 sm:px-6 py-24 bg-[#E7E8EA]">
      <WaveBackdrop />
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={ready ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.6 }}
        className="relative z-10 mb-8 sm:mb-10 max-w-xs sm:max-w-none text-[11px] sm:text-sm font-mono tracking-[0.12em] sm:tracking-[0.25em] text-muted-custom uppercase"
      >
        Software Engineer &amp; System Architect
      </motion.p>

      <h1 className="relative z-10 flex flex-col items-center select-none font-extrabold tracking-[-0.02em] leading-[0.82] w-full">
        <motion.span
          aria-hidden
          initial={{ opacity: 0, scale: 1.25 }}
          animate={ready ? { opacity: 1, scale: 0.82 } : undefined}
          transition={{
            opacity: { duration: 0.8, ease: EASE },
            scale: { delay: 1.1, duration: 1.2, ease: EASE },
          }}
          className="text-[clamp(2.6rem,13vw,12rem)] text-[#CCCDCF] origin-bottom"
        >
          SAHIL
        </motion.span>
        <motion.span
          aria-hidden
          initial={{ opacity: 0, y: 40 }}
          animate={ready ? { opacity: 1, y: 0 } : undefined}
          transition={{ delay: 1.5, duration: 1.2, ease: EASE }}
          className="text-[clamp(2.6rem,13vw,12rem)] text-[#06141B]"
        >
          MISHRA
        </motion.span>
        <span className="sr-only">Sahil Mishra</span>
      </h1>

      <p className="relative z-10 mt-8 text-base sm:text-lg md:text-xl text-muted-custom max-w-xl min-h-[3.5em] leading-relaxed">
        <span className="sr-only">{SUBTITLE}</span>
        <span aria-hidden className="typing-cursor">
          {typed}
        </span>
      </p>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={ready ? { opacity: 1, y: 0 } : undefined}
        transition={{ delay: 2.6, duration: 0.6 }}
        className="relative z-10 mt-10 flex w-full max-w-xs flex-col items-stretch sm:max-w-none sm:flex-row sm:items-center sm:justify-center gap-4"
      >
        <Link
          href="/services"
          className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#06141B] text-white font-mono text-sm font-medium shadow-[0_6px_20px_-8px_rgba(6,20,27,0.4)] hover:bg-[#253745] hover:-translate-y-0.5 transition-all duration-300"
        >
          Work With Me
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </motion.div>
    </section>
  );
}
