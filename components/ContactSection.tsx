"use client";

import { useState } from "react";
import { Mail, Phone, Copy, Check, Send, MapPin } from "lucide-react";
import { PERSONAL_INFO } from "@/lib/constants";
import { GithubIcon, LinkedinIcon, MediumIcon } from "@/components/SocialIcons";
import { ComingSoonModal } from "@/components/ComingSoonModal";
import confetti from "canvas-confetti";

export function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [showComingSoon, setShowComingSoon] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    
    // Trigger celebratory micro-animation
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ["#D95338", "#E26D5C", "#F3EFEA"]
    });

    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="w-full">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-bold uppercase tracking-widest text-accent-custom mb-2 block">
          Get In Touch
        </span>
        <h2 className="font-heading text-3xl sm:text-5xl font-extrabold tracking-tight">
          Let&apos;s Build Something Great Together
        </h2>
        <p className="text-muted-custom mt-3 text-base sm:text-lg">
          Whether you have a high-impact backend engineering role, a scaling challenge, or just want to connect — my inbox is open.
        </p>
      </div>

      {/* Main Glassmorphic Contact Card */}
      <div className="glass-panel max-w-3xl mx-auto p-8 sm:p-12 rounded-3xl text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent-custom/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col items-center gap-6 relative z-10">
          <div className="p-4 rounded-full glass-pill text-accent-custom shadow-inner">
            <Mail className="w-8 h-8" />
          </div>

          {/* Email Copy Card */}
          <div className="flex flex-col sm:flex-row items-center gap-3 glass-pill p-2 sm:p-2.5 pl-5 rounded-2xl border border-subtle-custom w-full max-w-md justify-between">
            <span className="font-mono text-sm sm:text-base font-semibold text-main-custom select-all">
              {PERSONAL_INFO.email}
            </span>
            <button
              onClick={handleCopyEmail}
              className="accent-pill-btn px-4 py-2 text-xs font-semibold flex items-center gap-1.5 w-full sm:w-auto justify-center cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-white" />
                  <span>Copy Email</span>
                </>
              )}
            </button>
          </div>

          {/* Phone & Location Details */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-muted-custom">
            <span className="flex items-center gap-1.5 glass-pill px-3.5 py-1.5 rounded-full">
              <Phone className="w-3.5 h-3.5 text-accent-custom" />
              <span>{PERSONAL_INFO.phone}</span>
            </span>

            <span className="flex items-center gap-1.5 glass-pill px-3.5 py-1.5 rounded-full">
              <MapPin className="w-3.5 h-3.5 text-amber-500" />
              <span>{PERSONAL_INFO.location}</span>
            </span>
          </div>

          {/* Primary Action Button */}
          <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
            <button
              onClick={() => setShowComingSoon(true)}
              className="accent-pill-btn px-8 py-4 text-base flex items-center gap-2 cursor-pointer shadow-lg"
            >
              <Send className="w-4 h-4" />
              <span>Say Hello via Email</span>
            </button>
          </div>

          {/* Social Profiles Grid */}
          <div className="pt-8 border-t border-subtle-custom w-full flex items-center justify-center gap-4">
            <a
              href={PERSONAL_INFO.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-pill p-3.5 rounded-full hover:text-accent-custom hover:scale-110 transition-all"
              aria-label="GitHub Profile"
            >
              <GithubIcon className="w-5 h-5" />
            </a>
            <a
              href={PERSONAL_INFO.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-pill p-3.5 rounded-full hover:text-accent-custom hover:scale-110 transition-all"
              aria-label="LinkedIn Profile"
            >
              <LinkedinIcon className="w-5 h-5" />
            </a>
            <a
              href={PERSONAL_INFO.socials.medium}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-pill p-3.5 rounded-full hover:text-accent-custom hover:scale-110 transition-all"
              aria-label="Medium Profile"
            >
              <MediumIcon className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Feature Coming Soon Alert Modal */}
      <ComingSoonModal
        isOpen={showComingSoon}
        onClose={() => setShowComingSoon(false)}
        title="Direct Email Dispatcher Coming Soon!"
        message="The integrated email dispatcher feature is currently under development. In the meantime, click 'Copy Email' above to copy prof.se.sahil@gmail.com directly or reach out via LinkedIn!"
      />
    </div>
  );
}
