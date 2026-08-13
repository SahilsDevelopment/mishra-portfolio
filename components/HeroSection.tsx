"use client";

import { motion } from "framer-motion";
import { MapPin, GraduationCap, ArrowDown, Mail } from "lucide-react";
import { PERSONAL_INFO } from "@/lib/constants";
import { GithubIcon, LinkedinIcon } from "@/components/SocialIcons";

export function HeroSection() {
  return (
    <div className="relative pt-12 pb-8 sm:pt-20 sm:pb-16 flex flex-col items-center">
      {/* Subtle Ambient Glow Backgrounds */}
      <div className="hero-glow-1" />
      <div className="hero-glow-2" />

      {/* Location & Status Badges */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-6"
      >
        <span className="glass-pill px-3.5 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 shadow-2xs">
          <MapPin className="w-3.5 h-3.5 text-accent-custom" />
          <span>{PERSONAL_INFO.location}</span>
        </span>

        <span className="glass-pill px-3.5 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 shadow-2xs">
          <GraduationCap className="w-3.5 h-3.5 text-amber-500" />
          <span>Jadavpur University CSE</span>
        </span>

        <span className="glass-pill px-3.5 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 shadow-2xs">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span>Available for High-Impact Roles</span>
        </span>
      </motion.div>

      {/* Main Headline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-center max-w-4xl"
      >
        <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6">
          Architecting High-Throughput <br className="hidden sm:inline" />
          <span className="gradient-text">Backend Systems</span> & AI Workflows
        </h1>

        <p className="text-lg sm:text-xl text-muted-custom font-normal leading-relaxed max-w-2xl mx-auto mb-8">
          {PERSONAL_INFO.bio}
        </p>
      </motion.div>

      {/* Key Metric Highlights Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 w-full max-w-4xl mb-10"
      >
        {PERSONAL_INFO.stats.map((stat, idx) => (
          <div
            key={idx}
            className="glass-panel p-4 rounded-2xl flex flex-col items-center text-center group"
          >
            <span className="font-heading font-extrabold text-2xl sm:text-3xl text-accent-custom group-hover:scale-105 transition-transform">
              {stat.value}
            </span>
            <span className="font-semibold text-xs sm:text-sm text-main-custom mt-1">
              {stat.label}
            </span>
            <span className="text-[11px] text-muted-custom mt-0.5">
              {stat.subtext}
            </span>
          </div>
        ))}
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="flex flex-wrap items-center justify-center gap-4"
      >
        <a href="#works">
          <button className="accent-pill-btn px-7 py-3.5 text-base flex items-center gap-2 cursor-pointer">
            <span>Explore My Works</span>
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </button>
        </a>

        <a href="#contact">
          <button className="glass-pill px-6 py-3.5 rounded-full text-base font-semibold flex items-center gap-2 hover:border-accent-custom transition-all">
            <Mail className="w-4 h-4 text-accent-custom" />
            <span>Say Hello</span>
          </button>
        </a>

        <div className="flex items-center gap-2 pl-2">
          <a
            href={PERSONAL_INFO.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full glass-pill hover:text-accent-custom transition-colors"
            aria-label="GitHub Profile"
          >
            <GithubIcon className="w-5 h-5" />
          </a>
          <a
            href={PERSONAL_INFO.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full glass-pill hover:text-accent-custom transition-colors"
            aria-label="LinkedIn Profile"
          >
            <LinkedinIcon className="w-5 h-5" />
          </a>
        </div>
      </motion.div>
    </div>
  );
}
