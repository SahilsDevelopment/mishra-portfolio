"use client";

import { useState } from "react";
import { Footer } from "@/components/Footer";
import { ServicesCarousel } from "@/components/ServicesCarousel";
import { ComingSoonModal } from "@/components/ComingSoonModal";
import { Send } from "lucide-react";

export default function ServicesPage() {
  const [showComingSoon, setShowComingSoon] = useState(false);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#ECEDEF]">
      <main className="flex-1 pt-28 pb-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Page Heading */}
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h1 className="font-heading text-3xl sm:text-6xl font-extrabold tracking-tight mb-4">
              Services & Specialized Offerings
            </h1>

            <p className="text-base sm:text-lg text-muted-custom leading-relaxed">
              From architecting zero-downtime payment microservices to scaling production throughput by 70x and automating AI engineering workflows.
            </p>
          </div>

          {/* 3D Coverflow Carousel */}
          <ServicesCarousel />

          {/* Custom Project Callout */}
          <div className="clay mt-12 sm:mt-16 p-5 sm:p-12 text-center max-w-3xl mx-auto">
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-main-custom mb-3">
              Need a Custom Systems Architecture or Audit?
            </h2>
            <p className="text-muted-custom text-sm sm:text-base mb-6 max-w-xl mx-auto">
              I collaborate with startups and enterprise teams to solve complex performance bottlenecks, build scalable backend services, and implement modern AI workflows.
            </p>

            <button
              onClick={() => setShowComingSoon(true)}
              className="clay-dark w-full max-w-full sm:w-auto rounded-full px-5 sm:px-8 py-3.5 text-sm sm:text-base font-semibold inline-flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Discuss Your Engineering Needs</span>
            </button>
          </div>
        </div>
      </main>

      <Footer pinned />

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
