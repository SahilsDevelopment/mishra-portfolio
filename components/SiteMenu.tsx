"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Briefcase, Home, PenLine, User, type LucideIcon } from "lucide-react";

const LINKS: { href: string; label: string; Icon: LucideIcon }[] = [
  { href: "/", label: "Home", Icon: Home },
  { href: "/my-work", label: "My Work", Icon: Briefcase },
  { href: "/my-blogs", label: "My Blogs", Icon: PenLine },
  { href: "/about-me", label: "About me", Icon: User },
];

const ARC_START_DEG = 8;
const ARC_END_DEG = 82;

function usePanelRadius() {
  const [radius, setRadius] = useState(800);
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const update = () => {
      const narrow = window.innerWidth < 640;
      setCompact(narrow);
      const next = narrow
        ? Math.min(window.innerWidth * 1.02, window.innerHeight * 0.9, 480)
        : 800;
      setRadius(Math.max(300, next));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return { radius, compact };
}

export function SiteMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { radius, compact } = usePanelRadius();
  const arcRadius = radius * (compact ? 0.55 : 0.78);

  useEffect(() => {
    const timer = setTimeout(() => setOpen(false), 0);
    return () => clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
        className={`fixed top-4 right-4 sm:top-5 sm:right-5 z-[80] w-11 h-11 sm:w-12 sm:h-12 rounded-full flex flex-col items-center justify-center gap-[5px] cursor-pointer transition-colors duration-300 ${
          open ? "bg-[#06141B] shadow-[0_8px_24px_-10px_rgba(6,20,27,0.5)]" : "bg-white shadow-[0_8px_24px_-10px_rgba(6,20,27,0.35)]"
        }`}
      >
        <span
          className={`block h-[1.5px] w-5 rounded-full transition-transform duration-300 ${
            open ? "translate-y-[6.5px] rotate-45 bg-white" : "bg-[#06141B]"
          }`}
        />
        <span
          className={`block h-[1.5px] w-5 rounded-full transition-all duration-300 ${
            open ? "opacity-0 bg-white" : "bg-[#06141B]"
          }`}
        />
        <span
          className={`block h-[1.5px] w-5 rounded-full transition-transform duration-300 ${
            open ? "-translate-y-[6.5px] -rotate-45 bg-white" : "bg-[#06141B]"
          }`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              aria-hidden
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-[#06141B]/10 backdrop-blur-md"
            />

            <div
              key="panel"
              className="fixed top-0 right-0 z-[70]"
              style={{ width: radius, height: radius }}
            >
              <motion.nav
                aria-label="Site"
                initial={{ clipPath: "circle(0px at 100% 0%)" }}
                animate={{ clipPath: `circle(${radius}px at 100% 0%)` }}
                exit={{ clipPath: "circle(0px at 100% 0%)" }}
                transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                className="absolute inset-0 backdrop-blur-2xl backdrop-saturate-150 bg-[radial-gradient(circle_at_100%_0%,rgba(255,255,255,0.7)_0%,rgba(255,255,255,0.42)_45%,rgba(204,205,207,0.3)_100%)]"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute rounded-full border border-white/80 shadow-[inset_0_0_60px_rgba(255,255,255,0.45)]"
                  style={{ width: radius * 2 - 2, height: radius * 2 - 2, right: -radius + 1, top: -radius + 1 }}
                />
                <ul>
                  {LINKS.map(({ href, label, Icon }, i) => {
                    const angle =
                      ((ARC_START_DEG + ((ARC_END_DEG - ARC_START_DEG) * i) / (LINKS.length - 1)) * Math.PI) / 180;
                    const right = arcRadius * Math.cos(angle);
                    const top = arcRadius * Math.sin(angle);
                    const isActive = pathname === href;

                    return (
                      <motion.li
                        key={href}
                        className="absolute"
                        style={{ right, top, x: "50%", y: "-50%" }}
                        initial={{ opacity: 0, scale: 0.4 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.4 }}
                        transition={{ delay: 0.22 + i * 0.07, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <Link
                          href={href}
                          onClick={() => setOpen(false)}
                          aria-current={isActive ? "page" : undefined}
                          className="group relative flex flex-col items-center"
                        >
                          <span
                            className={`flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full border shadow-[0_8px_24px_-10px_rgba(6,20,27,0.35)] backdrop-blur-md transition-all duration-300 group-hover:scale-110 ${
                              isActive
                                ? "bg-[#06141B]/85 border-white/30 text-white"
                                : "bg-white/55 border-white/80 text-[#06141B] group-hover:bg-white/80"
                            }`}
                          >
                            <Icon className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2.2} />
                          </span>
                          <span className="absolute top-full mt-1.5 sm:mt-2 whitespace-nowrap rounded-full border border-white/70 bg-white/50 backdrop-blur-md px-2 py-0.5 text-xs sm:text-sm font-semibold tracking-wide text-[#06141B]">
                            {label}
                          </span>
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>
              </motion.nav>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
