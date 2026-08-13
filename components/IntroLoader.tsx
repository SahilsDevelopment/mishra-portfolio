"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?/░▒▓█";
const TARGET_NAME = "SAHIL MISHRA";
const TARGET_TAGLINE = "SOFTWARE ENGINEER — BACKEND SYSTEMS & AI AUTOMATION";

export function IntroLoader() {
  const [nameText, setNameText] = useState("");
  const [taglineText, setTaglineText] = useState("");
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const getScrambledString = (target: string, lockedCount: number) => {
    let result = "";
    for (let i = 0; i < target.length; i++) {
      if (target[i] === " ") {
        result += " ";
      } else if (i < lockedCount) {
        result += target[i];
      } else {
        result += CHARS[Math.floor(Math.random() * CHARS.length)];
      }
    }
    return result;
  };

  const handleFinish = useCallback(() => {
    setIsComplete(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 700);
  }, []);

  useEffect(() => {
    let step = 0;
    const totalSteps = 32;

    const interval = setInterval(() => {
      step++;

      // Step-by-step lock
      const nameLocked = Math.min(TARGET_NAME.length, Math.floor((step / 20) * TARGET_NAME.length));
      setNameText(getScrambledString(TARGET_NAME, nameLocked));

      if (step > 6) {
        const taglineLocked = Math.min(
          TARGET_TAGLINE.length,
          Math.floor(((step - 6) / 22) * TARGET_TAGLINE.length)
        );
        setTaglineText(getScrambledString(TARGET_TAGLINE, taglineLocked));
      }

      const currentProgress = Math.min(100, Math.floor((step / totalSteps) * 100));
      setProgress(currentProgress);

      if (step >= totalSteps) {
        clearInterval(interval);
        setNameText(TARGET_NAME);
        setTaglineText(TARGET_TAGLINE);
        setProgress(100);
        
        // Hold full reveal state for ~1.2 seconds for cinematic feel (3s total)
        setTimeout(() => {
          handleFinish();
        }, 1200);
      }
    }, 65);

    return () => clearInterval(interval);
  }, [handleFinish]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          key="intro-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -50, filter: "blur(10px)" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#12100E] text-[#F5F2EB] px-6 select-none overflow-hidden"
        >
          {/* Ambient Radial Backdrop */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-radial from-amber-500/20 via-terracotta-500/8 to-transparent blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl w-full flex flex-col items-center text-center">
            {/* Logo Emblem */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="relative w-20 h-20 mb-8 p-2 rounded-2xl bg-gradient-to-br from-amber-500/20 to-terracotta-500/20 border border-amber-500/30 shadow-2xl flex items-center justify-center"
            >
              <div className="absolute inset-0 rounded-2xl bg-amber-500/25 animate-ping opacity-30 pointer-events-none" />
              <Image
                src="/logo.png"
                alt="Sahil Mishra Logo"
                width={64}
                height={64}
                className="object-contain"
                priority
              />
            </motion.div>

            {/* Jumbled Typeahead Scramble Name */}
            <div className="mb-4 min-h-[4rem] flex items-center justify-center">
              <h1 className="font-mono text-3xl sm:text-5xl font-extrabold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#F5F2EB] via-amber-200 to-[#E26D5C]">
                {nameText || "SAHIL MISHRA"}
                <span className="inline-block w-3 h-8 sm:h-10 ml-2 bg-[#E26D5C] animate-pulse align-middle" />
              </h1>
            </div>

            {/* Tagline Scramble Subtitle */}
            <div className="mb-10 min-h-[2.5rem] flex items-center justify-center max-w-lg">
              <p className="font-mono text-xs sm:text-sm text-amber-500/90 tracking-widest leading-relaxed">
                {taglineText}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="w-full max-w-sm flex flex-col items-center gap-3">
              <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden relative">
                <motion.div
                  className="h-full bg-gradient-to-r from-amber-500 to-[#E26D5C] rounded-full"
                  style={{ width: `${progress}%` }}
                  transition={{ duration: 0.15 }}
                />
              </div>

              <div className="flex items-center justify-between w-full text-xs font-mono text-muted-custom">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
                  <span>INITIALIZING PORTFOLIO...</span>
                </span>
                <span className="font-bold text-amber-400">{progress}%</span>
              </div>
            </div>

            {/* Skip Button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              onClick={handleFinish}
              className="mt-10 px-4 py-2 rounded-full glass-pill text-xs font-mono text-muted-custom hover:text-white hover:border-amber-500/50 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>SKIP INTRO</span>
              <ArrowRight className="w-3 h-3" />
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
