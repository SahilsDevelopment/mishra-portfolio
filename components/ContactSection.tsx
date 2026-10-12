"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy, Mail } from "lucide-react";
import { PERSONAL_INFO } from "@/lib/constants";
import { GithubIcon, LinkedinIcon, MediumIcon } from "@/components/SocialIcons";

type CopyState = "idle" | "copied" | "error";

const SOCIALS = [
  { label: "GitHub", href: PERSONAL_INFO.socials.github, Icon: GithubIcon },
  { label: "LinkedIn", href: PERSONAL_INFO.socials.linkedin, Icon: LinkedinIcon },
  { label: "Medium", href: PERSONAL_INFO.socials.medium, Icon: MediumIcon },
];

export function ContactSection() {
  const [copyState, setCopyState] = useState<CopyState>("idle");
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (resetTimer.current) clearTimeout(resetTimer.current);
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(PERSONAL_INFO.email);
      setCopyState("copied");
    } catch {
      setCopyState("error");
    }
    if (resetTimer.current) clearTimeout(resetTimer.current);
    resetTimer.current = setTimeout(() => setCopyState("idle"), 2000);
  };

  return (
    <section id="contact" className="py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-[0_30px_70px_-25px_rgba(6,20,27,0.35)] p-6 sm:p-16 text-center">
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">Let&apos;s Work Together</h2>
        <p className="mt-4 text-muted-custom text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
          Open to backend engineering roles, system architecture consulting, and high-throughput
          performance tuning projects.
        </p>

        <div className="mt-10 mx-auto max-w-md flex items-center gap-2 p-2 pl-4 rounded-2xl bg-canvas border border-subtle-custom">
          <Mail className="w-4 h-4 text-muted-custom shrink-0" />
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="flex-1 min-w-0 truncate text-left font-mono text-sm sm:text-base text-main-custom hover:text-[#253745] transition-colors"
          >
            {PERSONAL_INFO.email}
          </a>
          <button
            type="button"
            onClick={handleCopy}
            className={`shrink-0 inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors cursor-pointer ${
              copyState === "copied"
                ? "bg-[#4A5C6A] text-white"
                : copyState === "error"
                  ? "bg-[#06141B] text-white"
                  : "bg-[#06141B] text-white hover:bg-[#253745]"
            }`}
          >
            {copyState === "copied" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copyState === "copied" ? "Copied!" : copyState === "error" ? "Failed" : "Copy"}
          </button>
        </div>
        <p role="status" aria-live="polite" className="sr-only">
          {copyState === "copied" ? "Email copied to clipboard" : copyState === "error" ? "Copy failed" : ""}
        </p>

        <div className="mt-10 pt-8 border-t border-subtle-custom flex items-center justify-center gap-4">
          {SOCIALS.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="p-3 rounded-full bg-canvas border border-subtle-custom text-muted-custom hover:text-[#06141B] hover:border-[#06141B] transition-colors"
            >
              <Icon className="w-5 h-5" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
