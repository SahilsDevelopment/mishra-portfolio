"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

const NAV_LINKS = [
  { label: "About", href: "/" },
  { label: "Techs", href: "/#techs" },
  { label: "Works", href: "/#works" },
  { label: "Blogs", href: "/#blogs" },
  { label: "Contact", href: "/#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isServicesPage = pathname === "/services";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-navbar py-3 shadow-sm" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand Logo - Base URL / */}
        <Link href="/" className="flex items-center gap-3 group">
          <motion.div
            whileHover={{ scale: 1.06, rotate: 3 }}
            whileTap={{ scale: 0.95 }}
            className="relative w-10 h-10 rounded-xl overflow-hidden shadow-md ring-1 ring-black/10 dark:ring-white/10 bg-card-custom flex items-center justify-center p-1"
          >
            <Image
              src="/logo.png"
              alt="Sahil Mishra Logo"
              width={40}
              height={40}
              className="object-contain"
              priority
            />
          </motion.div>
          <div className="flex flex-col">
            <span className="font-heading font-bold text-base tracking-tight group-hover:text-accent-custom transition-colors">
              Sahil Mishra
            </span>
            <span className="text-xs text-muted-custom font-medium -mt-1">
              Software Engineer
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1 glass-pill px-4 py-1.5 rounded-full shadow-xs">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="px-3.5 py-1.5 text-sm font-medium text-muted-custom hover:text-main-custom transition-colors rounded-full hover:bg-black/5 dark:hover:bg-white/5"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Action Controls: Theme Toggle & Standout CTA */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />

          <Link href={isServicesPage ? "/#contact" : "/services"}>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="accent-pill-btn px-5 py-2 text-sm flex items-center gap-1.5 cursor-pointer"
            >
              <span>{isServicesPage ? "Get in Touch" : "Work With Me"}</span>
              <ArrowUpRight className="w-4 h-4" />
            </motion.button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl glass-pill text-main-custom"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-navbar border-t border-subtle-custom overflow-hidden px-6 py-5"
          >
            <div className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-base font-medium hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                >
                  {link.label}
                </Link>
              ))}

              <div className="pt-2 border-t border-subtle-custom mt-1">
                <Link
                  href={isServicesPage ? "/#contact" : "/services"}
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full accent-pill-btn py-3 text-center flex items-center justify-center gap-2"
                >
                  <span>{isServicesPage ? "Get in Touch" : "Work With Me"}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
