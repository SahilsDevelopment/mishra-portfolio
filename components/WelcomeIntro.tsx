"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "framer-motion";

const DONE_EVENT = "welcome-intro-done";
const PAINT = ["#06141B", "#11212D", "#253745", "#4A5C6A"];

// Drop, bounce, bounce, then burst. Times are fractions of BALL_S.
const BALL_S = 2.15;
const BALL_TIMES = [0, 0.33, 0.51, 0.66, 0.76, 0.87, 0.93, 1];
const BURST_AT = BALL_S * 0.87;
const VISIBLE_MS = 3400;

let introDone = false;

function subscribeToIntro(onChange: () => void) {
  window.addEventListener(DONE_EVENT, onChange);
  return () => window.removeEventListener(DONE_EVENT, onChange);
}

export function useWelcomeDone() {
  return useSyncExternalStore(subscribeToIntro, () => introDone, () => false);
}

function useIsClient() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

function seeded(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

const DROPLETS = Array.from({ length: 44 }, (_, i) => {
  const angle = (i / 44) * Math.PI * 2 + seeded(i) * 0.35;
  const reach = 0.28 + seeded(i + 100) * 0.62;
  const size = 8 + Math.round(seeded(i + 200) * 34);
  return {
    angle,
    dx: Math.cos(angle) * reach,
    dy: Math.sin(angle) * reach,
    size,
    stretch: 1.4 + seeded(i + 300) * 1.8,
    color: PAINT[i % PAINT.length],
    delay: seeded(i + 400) * 0.08,
  };
});

const SPLATS = Array.from({ length: 9 }, (_, i) => {
  const angle = (i / 9) * Math.PI * 2 + seeded(i + 500);
  const reach = 0.08 + seeded(i + 600) * 0.14;
  return {
    dx: Math.cos(angle) * reach,
    dy: Math.sin(angle) * reach,
    size: 52 + Math.round(seeded(i + 700) * 70),
    radius: `${40 + seeded(i + 800) * 30}% ${60 - seeded(i + 900) * 20}% ${45 + seeded(i + 1000) * 25}% ${55 - seeded(i + 1100) * 15}%`,
  };
});

const FALL = [0.55, 0, 1, 0.55] as const;
const RISE = [0.15, 0.7, 0.3, 1] as const;

export function WelcomeIntro() {
  const isClient = useIsClient();
  const [playing, setPlaying] = useState(true);
  const reduced = isClient && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const span = isClient ? Math.max(window.innerWidth, window.innerHeight) : 1600;

  useEffect(() => {
    if (!isClient || introDone) return;
    if (reduced) {
      introDone = true;
      window.dispatchEvent(new Event(DONE_EVENT));
      return;
    }

    document.documentElement.style.overflow = "hidden";
    const timer = setTimeout(() => {
      setPlaying(false);
      introDone = true;
      window.dispatchEvent(new Event(DONE_EVENT));
      document.documentElement.style.overflow = "";
    }, VISIBLE_MS);

    return () => {
      clearTimeout(timer);
      document.documentElement.style.overflow = "";
    };
  }, [isClient, reduced]);

  const visible = isClient && playing && !reduced;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="welcome"
          aria-hidden
          className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden bg-white"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          <motion.span
            className="absolute h-10 w-28 rounded-[50%] bg-[#06141B]/15 blur-md"
            initial={{ opacity: 0, scale: 0.2, y: 78 }}
            animate={{
              opacity: [0, 0.85, 0.15, 0.7, 0.1, 0.9, 0],
              scale: [0.2, 1, 0.35, 0.85, 0.3, 1.15, 1.5],
            }}
            transition={{ duration: BALL_S, times: BALL_TIMES, ease: "easeOut" }}
          />

          <motion.span
            className="absolute h-32 w-32 rounded-full bg-[#06141B] shadow-[0_22px_36px_-14px_rgba(6,20,27,0.6)]"
            initial={{ y: "-70vh", scaleX: 0.86, scaleY: 1.22 }}
            animate={{
              y: ["-70vh", "0vh", "-22vh", "0vh", "-9vh", "0vh", "0vh", "0vh"],
              scaleX: [0.86, 0.86, 1.28, 0.9, 1.16, 0.92, 1.55, 0],
              scaleY: [1.22, 1.22, 0.62, 1.14, 0.72, 1.1, 0.5, 0],
            }}
            transition={{
              duration: BALL_S,
              times: BALL_TIMES,
              ease: [FALL, RISE, FALL, RISE, FALL, [0.3, 0, 0.2, 1], [0.4, 0, 1, 1]],
            }}
          />

          <motion.span
            className="absolute h-24 w-24 rounded-full border-[3px] border-[#253745]"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 8], opacity: [0.55, 0] }}
            transition={{ delay: BURST_AT, duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
          />

          {SPLATS.map((splat, i) => (
            <motion.span
              key={`splat-${i}`}
              className="absolute bg-[#06141B]"
              style={{ width: splat.size, height: splat.size, borderRadius: splat.radius }}
              initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
              animate={{
                x: splat.dx * span,
                y: splat.dy * span,
                scale: [0, 1.15, 1],
                opacity: [1, 1, 0],
              }}
              transition={{
                delay: BURST_AT,
                duration: 1.15,
                ease: [0.16, 1, 0.3, 1],
                opacity: { delay: BURST_AT + 0.4, duration: 0.75 },
              }}
            />
          ))}

          {DROPLETS.map((drop, i) => (
            <motion.span
              key={`drop-${i}`}
              className="absolute rounded-full"
              style={{
                width: drop.size * drop.stretch,
                height: drop.size,
                backgroundColor: drop.color,
                rotate: `${(drop.angle * 180) / Math.PI}deg`,
              }}
              initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
              animate={{
                x: drop.dx * span,
                y: drop.dy * span,
                scale: [0, 1, 0.55],
                opacity: [1, 1, 0],
              }}
              transition={{
                delay: BURST_AT + drop.delay,
                duration: 1.2,
                ease: [0.12, 0.9, 0.25, 1],
                opacity: { delay: BURST_AT + drop.delay + 0.5, duration: 0.7 },
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
