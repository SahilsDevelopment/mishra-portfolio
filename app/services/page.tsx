"use client";

import { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ServicesCarousel } from "@/components/ServicesCarousel";
import { ComingSoonModal } from "@/components/ComingSoonModal";
import { ArrowLeft, Sparkles, Send } from "lucide-react";

export default function ServicesPage() {
  const [showComingSoon, setShowComingSoon] = useState(false);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-canvas">
      <Navbar />

      <main className="flex-1 pt-24 pb-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb Back Link */}
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-muted-custom hover:text-accent-custom transition-colors glass-pill px-4 py-2 rounded-full"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Portfolio Home</span>
            </Link>
          </div>

          {/* Page Heading */}
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="glass-pill px-3.5 py-1.5 rounded-full text-xs font-semibold text-accent-custom inline-flex items-center gap-1.5 mb-4 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Engineering Offerings</span>
            </span>

            <h1 className="font-heading text-4xl sm:text-6xl font-extrabold tracking-tight mb-4">
              Services & Specialized Offerings
            </h1>

            <p className="text-lg text-muted-custom leading-relaxed">
              From architecting zero-downtime payment microservices to scaling production throughput by 70x and automating AI engineering workflows.
            </p>
          </div>

          {/* 3D Coverflow Carousel */}
          <ServicesCarousel />

          {/* Custom Project Callout */}
          <div className="mt-16 glass-panel p-8 sm:p-12 rounded-3xl text-center max-w-3xl mx-auto">
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-main-custom mb-3">
              Need a Custom Systems Architecture or Audit?
            </h2>
            <p className="text-muted-custom text-sm sm:text-base mb-6 max-w-xl mx-auto">
              I collaborate with startups and enterprise teams to solve complex performance bottlenecks, build scalable backend services, and implement modern AI workflows.
            </p>

            <button
              onClick={() => setShowComingSoon(true)}
              className="accent-pill-btn px-8 py-3.5 text-base inline-flex items-center gap-2 cursor-pointer shadow-lg"
            >
              <Send className="w-4 h-4" />
              <span>Discuss Your Engineering Needs</span>
            </button>
          </div>
        </div>
      </main>

      <Footer />

      {/* Coming Soon Alert Modal */}
      <ComingSoonModal
        isOpen={showComingSoon}
        onClose={() => setShowComingSoon(false)}
        title="Engineering Inquiry Feature Coming Soon!"
        message="The direct engineering inquiry portal is currently being finalized. In the meantime, please feel free to reach out via email or LinkedIn!"
      />
    </div>
  );
}
