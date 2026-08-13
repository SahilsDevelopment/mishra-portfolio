"use client";

import { TECH_CATEGORIES } from "@/lib/constants";
import { Code2, CheckCircle2, Cloud, Database, ShieldCheck, Sparkles, LucideIcon } from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  Code2,
  CheckCircle2,
  Cloud,
  Database,
  ShieldCheck,
  Sparkles,
};

export function TechSection() {
  return (
    <div className="w-full">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-bold uppercase tracking-widest text-accent-custom mb-2 block">
          Skills & Expertise
        </span>
        <h2 className="font-heading text-3xl sm:text-4xl font-extrabold tracking-tight">
          Technologies & Tools I Use
        </h2>
        <p className="text-muted-custom mt-2 text-sm sm:text-base">
          Proven proficiency across backend systems, cloud infrastructure, quality engineering, and AI automation.
        </p>
      </div>

      {/* Grid of Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {TECH_CATEGORIES.map((category) => {
          const IconComponent = ICON_MAP[category.iconName] || Code2;

          return (
            <div
              key={category.title}
              className="glass-panel p-6 rounded-2xl flex flex-col justify-between group hover:border-amber-500/40"
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-xl glass-pill text-accent-custom group-hover:scale-110 transition-transform">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <h3 className="font-heading font-bold text-lg text-main-custom">
                    {category.title}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {category.items.map((tech) => (
                    <span
                      key={tech}
                      className="glass-pill px-3 py-1.5 rounded-lg text-xs font-medium text-main-custom hover:border-accent-custom transition-all"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
