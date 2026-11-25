"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Check, Circle, X } from "lucide-react";
import type { WorkProject } from "@/lib/constants";
import { GithubIcon } from "@/components/SocialIcons";

const EASE = [0.22, 1, 0.36, 1] as const;

export function ProjectDialog({ project, onClose }: { project: WorkProject; onClose: () => void }) {
  const details = project.details;
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    const previous = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    return () => {
      document.documentElement.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <motion.div
      className="pd-wrap"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <button type="button" aria-label="Close project details" className="pd-back" onClick={onClose} />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="pd-title"
        className="pd"
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.97 }}
        transition={{ duration: 0.35, ease: EASE }}
      >
        <button type="button" className="pd-x" onClick={onClose} aria-label="Close" ref={closeRef}>
          <X size={16} />
        </button>

        <p className="pd-eyebrow">
          {project.companyOrType} · {details?.status ?? project.periodOrYear}
        </p>
        <h3 id="pd-title" className="pd-title">
          {project.title}
        </h3>
        <p className="pd-sub">{project.subtitle}</p>
        <p className="pd-desc">{project.description}</p>

        {project.highlightMetric && (
          <div className="pd-key">
            <span className="pd-k">Key result</span>
            <strong>{project.highlightMetric}</strong>
          </div>
        )}

        {details?.goals && (
          <div className="pd-sec">
            <h4 className="pd-h">{details.goalsTitle ?? "Current Goal"}</h4>
            <ol className="pd-goals">
              {details.goals.map((goal, index) => (
                <li key={goal.title}>
                  <span className="pd-n">0{index + 1}</span>
                  <strong>{goal.title}</strong>
                  <p>{goal.text}</p>
                </li>
              ))}
            </ol>
          </div>
        )}

        {details?.diagrams && (
          <div className="pd-sec pd-two">
            {details.diagrams.map((diagram) => (
              <div key={diagram.title}>
                <h4 className="pd-h">{diagram.title}</h4>
                <pre className="pd-code">{diagram.body}</pre>
              </div>
            ))}
          </div>
        )}

        {details?.example && (
          <div className="pd-sec">
            <h4 className="pd-h">Example</h4>
            <div className="pd-three">
              {details.example.map((block) => (
                <div key={block.title}>
                  <p className="pd-cap">
                    {block.title} <span>· {block.language}</span>
                  </p>
                  <pre className="pd-code">{block.body}</pre>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="pd-sec">
          <h4 className="pd-h">Technology Stack</h4>
          <ul className="pd-tags">
            {project.technologies.map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
        </div>

        {details?.roadmap && (
          <div className="pd-sec">
            <h4 className="pd-h">Development Roadmap</h4>
            <ul className="pd-road">
              {details.roadmap.map((item) => (
                <li key={item.label} className={item.done ? "done" : undefined}>
                  <span aria-hidden="true">{item.done ? <Check size={13} /> : <Circle size={7} />}</span>
                  {item.label}
                  {item.done && <span className="sr-only"> (done)</span>}
                </li>
              ))}
            </ul>
            {details.note && <p className="pd-note">{details.note}</p>}
          </div>
        )}

        <div className="pd-actions">
          {project.githubUrl && (
            <a className="btn pri pd-gh" href={project.githubUrl} target="_blank" rel="noopener noreferrer">
              <GithubIcon className="pd-ico" />
              View on GitHub
            </a>
          )}
          <button type="button" className="btn" onClick={onClose}>
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
