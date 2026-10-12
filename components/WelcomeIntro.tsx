"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const WORD = "Welcome";
const EASE = [0.22, 1, 0.36, 1] as const;
const VISIBLE_MS = 2900;
const DONE_EVENT = "welcome-intro-done";

let introDone = false;

export function useWelcomeDone() {
  const [done, setDone] = useState(introDone);
  useEffect(() => {
    if (introDone) return;
    const onDone = () => setDone(true);
    window.addEventListener(DONE_EVENT, onDone);
    return () => window.removeEventListener(DONE_EVENT, onDone);
  }, []);
  return done;
}

export function WelcomeIntro() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = setTimeout(() => {
      setVisible(false);
      introDone = true;
      window.dispatchEvent(new Event(DONE_EVENT));
    }, reduced ? 600 : VISIBLE_MS);
    document.documentElement.style.overflow = "hidden";
    return () => {
      clearTimeout(timer);
      document.documentElement.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (!visible) document.documentElement.style.overflow = "";
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="welcome"
          aria-hidden
          className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden bg-[#06141B]"
          initial={{ clipPath: "circle(150% at 50% 50%)" }}
          exit={{ clipPath: "circle(0% at 50% 50%)" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.div
            className="pointer-events-none absolute h-[70vmin] w-[70vmin] rounded-full bg-[radial-gradient(circle,rgba(155,171,168,0.35)_0%,rgba(37,55,69,0.2)_45%,transparent_70%)] blur-2xl"
            initial={{ scale: 0.3, opacity: 0 }}
            animate={{ scale: [0.3, 1.15, 1], opacity: [0, 1, 0.8] }}
            transition={{ duration: 2, ease: EASE }}
          />

          {Array.from({ length: 14 }, (_, i) => {
            const angle = (i / 14) * Math.PI * 2;
            return (
              <motion.span
                key={i}
                className="absolute h-1 w-1 rounded-full bg-[#CCCDCF]"
                initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                animate={{
                  x: Math.cos(angle) * (160 + (i % 3) * 60),
                  y: Math.sin(angle) * (110 + (i % 4) * 40),
                  opacity: [0, 1, 0],
                  scale: [0, 1.4, 0.4],
                }}
                transition={{ delay: 0.5 + (i % 5) * 0.08, duration: 1.8, ease: EASE }}
              />
            );
          })}

          <div className="relative flex flex-col items-center">
            <h1 className="flex text-[clamp(3.5rem,12vw,9rem)] font-extrabold tracking-[-0.03em] leading-none">
              {WORD.split("").map((letter, i) => (
                <motion.span
                  key={i}
                  className="inline-block bg-gradient-to-b from-white via-[#CCCDCF] to-[#9BABA8] bg-clip-text text-transparent"
                  initial={{ opacity: 0, y: 40, filter: "blur(14px)", rotateX: 70 }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)", rotateX: 0 }}
                  transition={{ delay: 0.25 + i * 0.08, duration: 0.9, ease: EASE }}
                >
                  {letter}
                </motion.span>
              ))}
            </h1>

            <motion.span
              className="mt-6 h-px bg-gradient-to-r from-transparent via-[#9BABA8] to-transparent"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "min(22rem, 70vw)", opacity: 1 }}
              transition={{ delay: 1.1, duration: 1, ease: EASE }}
            />
            <motion.p
              className="mt-5 font-mono text-xs uppercase tracking-[0.4em] text-[#9BABA8]"
              initial={{ opacity: 0, letterSpacing: "0.9em" }}
              animate={{ opacity: 1, letterSpacing: "0.4em" }}
              transition={{ delay: 1.3, duration: 1, ease: EASE }}
            >
              Sahil Mishra
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
