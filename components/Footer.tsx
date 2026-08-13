"use client";

import Image from "next/image";
import { Mail, ArrowUp } from "lucide-react";
import { PERSONAL_INFO } from "@/lib/constants";
import { GithubIcon, LinkedinIcon, MediumIcon } from "@/components/SocialIcons";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full border-t border-subtle-custom bg-canvas py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand Info */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl overflow-hidden shadow-xs ring-1 ring-black/10 dark:ring-white/10 p-1 bg-card-custom flex items-center justify-center">
            <Image
              src="/logo.png"
              alt="Sahil Mishra Logo"
              width={36}
              height={36}
              className="object-contain"
            />
          </div>
          <div>
            <p className="font-heading font-bold text-sm tracking-tight">
              Sahil Mishra
            </p>
            <p className="text-xs text-muted-custom">
              Backend Systems & Distributed Infrastructure
            </p>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-4 text-muted-custom">
          <a
            href={PERSONAL_INFO.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full glass-pill hover:text-accent-custom transition-colors"
            aria-label="GitHub Profile"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
          <a
            href={PERSONAL_INFO.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full glass-pill hover:text-accent-custom transition-colors"
            aria-label="LinkedIn Profile"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>
          <a
            href={PERSONAL_INFO.socials.medium}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full glass-pill hover:text-accent-custom transition-colors"
            aria-label="Medium Profile"
          >
            <MediumIcon className="w-4 h-4" />
          </a>
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="p-2.5 rounded-full glass-pill hover:text-accent-custom transition-colors"
            aria-label="Email Me"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>

        {/* Back to Top & Copyright */}
        <div className="flex items-center gap-4 text-xs text-muted-custom">
          <span>© {new Date().getFullYear()} Sahil Mishra. All rights reserved.</span>
          <button
            onClick={scrollToTop}
            className="p-2 rounded-full glass-pill hover:text-accent-custom transition-colors"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
