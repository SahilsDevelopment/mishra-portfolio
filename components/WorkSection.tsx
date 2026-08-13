"use client";

import { WORK_PROJECTS } from "@/lib/constants";
import { ExternalLink, Zap } from "lucide-react";
import { GithubIcon } from "@/components/SocialIcons";

export function WorkSection() {
  return (
    <div className="w-full">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-bold uppercase tracking-widest text-accent-custom mb-2 block">
          Featured Projects & Experience
        </span>
        <h2 className="font-heading text-3xl sm:text-4xl font-extrabold tracking-tight">
          Engineering Impact & Works
        </h2>
        <p className="text-muted-custom mt-2 text-sm sm:text-base">
          Highlights from production performance optimizations, framework builds, and distributed task orchestrators.
        </p>
      </div>

      {/* Projects List */}
      <div className="flex flex-col gap-8">
        {WORK_PROJECTS.map((project) => (
          <div
            key={project.id}
            className="glass-panel p-6 sm:p-8 rounded-3xl flex flex-col lg:flex-row justify-between gap-6 group hover:border-accent-custom/50"
          >
            <div className="flex-1 flex flex-col justify-between">
              <div>
                {/* Meta details */}
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span className="text-xs font-semibold px-3 py-1 rounded-full glass-pill text-accent-custom">
                    {project.companyOrType}
                  </span>
                  {project.highlightMetric && (
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 flex items-center gap-1">
                      <Zap className="w-3.5 h-3.5 fill-amber-500/20" />
                      {project.highlightMetric}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-main-custom group-hover:text-accent-custom transition-colors mb-2">
                  {project.title}
                </h3>
                <p className="text-sm font-medium text-muted-custom mb-4">
                  {project.subtitle}
                </p>

                {/* Description */}
                <p className="text-main-custom text-sm sm:text-base leading-relaxed mb-6">
                  {project.description}
                </p>
              </div>

              {/* Technologies */}
              <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-subtle-custom">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="glass-pill px-3 py-1 rounded-md text-xs font-medium text-muted-custom"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions / Links */}
            <div className="flex lg:flex-col items-center justify-end lg:justify-center gap-3 pt-4 lg:pt-0 border-t lg:border-t-0 lg:border-l border-subtle-custom lg:pl-6">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full lg:w-auto accent-pill-btn px-4 py-2.5 text-xs font-medium flex items-center justify-center gap-2"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>View Repository</span>
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full lg:w-auto glass-pill px-4 py-2.5 rounded-full text-xs font-medium flex items-center justify-center gap-2 hover:border-accent-custom transition-all"
                >
                  <span>Read Benchmark Guide</span>
                  <ExternalLink className="w-3.5 h-3.5 text-accent-custom" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
