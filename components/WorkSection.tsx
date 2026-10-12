"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Boxes,
  Check,
  ChevronLeft,
  ChevronRight,
  Circle,
  Layers,
  Search,
  SearchX,
  Terminal,
  X,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { WORK_PROJECTS, type WorkProject } from "@/lib/constants";
import { GithubIcon } from "@/components/SocialIcons";

const GITHUB_URL = "https://github.com/SahilsDevelopment";
const PAGE_SIZE = 8;

const ICONS: Record<string, LucideIcon> = {
  "production-performance-engineering": Zap,
  "core-mock": Boxes,
  "task-orchestrator": Terminal,
  "forge-queue": Layers,
};

function matches(project: WorkProject, query: string) {
  const needle = query.trim().toLowerCase();
  if (!needle) return true;
  return [project.title, project.subtitle, project.description, project.companyOrType, ...project.technologies]
    .join(" ")
    .toLowerCase()
    .includes(needle);
}

export function WorkSection() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [activeId, setActiveId] = useState<string | null>(null);

  const results = useMemo(() => WORK_PROJECTS.filter((project) => matches(project, query)), [query]);
  const pageCount = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const visible = results.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const active = WORK_PROJECTS.find((project) => project.id === activeId) ?? null;

  useEffect(() => {
    if (!active) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveId(null);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [active]);

  const updateQuery = (value: string) => {
    setQuery(value);
    setPage(1);
  };

  return (
    <section className="px-6 pt-24 pb-20 max-w-[90rem] mx-auto w-full">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#06141B]">Projects I&apos;ve shipped</h1>
        <p className="mt-3 text-[#4A5C6A] text-base sm:text-lg leading-relaxed">
          Production work in payments, and the tools I built to understand how those systems work.
        </p>
      </div>

      <div className="relative max-w-xl mx-auto mb-14">
        <label htmlFor="work-search" className="sr-only">
          Search projects
        </label>
        <div className="clay flex items-center gap-3 pl-5 pr-2 py-2 rounded-full">
          <Search className="w-5 h-5 text-[#4A5C6A] shrink-0" />
          <input
            id="work-search"
            value={query}
            onChange={(event) => updateQuery(event.target.value)}
            placeholder="Search projects, languages, tools..."
            className="flex-1 min-w-0 bg-transparent py-2.5 text-base text-[#06141B] placeholder:text-[#9BABA8] outline-none"
          />
          <AnimatePresence>
            {query && (
              <motion.button
                type="button"
                onClick={() => updateQuery("")}
                aria-label="Clear search"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="clay-button shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-[#253745] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {results.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="clay max-w-md mx-auto px-8 py-12 text-center"
          >
            <motion.div
              animate={{ rotate: [0, -10, 10, -6, 0], y: [0, -4, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 1.2 }}
              className="clay-button mx-auto w-16 h-16 rounded-2xl flex items-center justify-center text-[#4A5C6A]"
            >
              <SearchX className="w-7 h-7" />
            </motion.div>
            <h2 className="mt-6 text-xl font-bold text-[#06141B]">No search results found</h2>
            <p className="mt-2 text-sm text-[#4A5C6A]">
              Nothing matches &ldquo;{query}&rdquo;. Try a project name, a language, or a tool.
            </p>
            <button
              type="button"
              onClick={() => updateQuery("")}
              className="clay-dark mt-6 rounded-full px-5 py-2.5 text-sm font-semibold cursor-pointer"
            >
              Clear search
            </button>
          </motion.div>
        ) : (
          <motion.div
            key={`grid-${currentPage}-${query}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-7"
          >
            {visible.map((project, index) => {
              const Icon = ICONS[project.id] ?? Boxes;
              return (
                <motion.article
                  key={project.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.35 }}
                  className="clay p-7 flex flex-col min-h-[300px]"
                >
                  <div className="clay-button w-12 h-12 rounded-2xl flex items-center justify-center text-[#11212D]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <p className="mt-5 text-[11px] font-mono uppercase tracking-wider text-[#4A5C6A]">
                    {project.companyOrType}
                  </p>
                  <h2 className="mt-1.5 text-lg font-bold tracking-tight text-[#06141B]">{project.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-[#4A5C6A] line-clamp-3 flex-1">
                    {project.description}
                  </p>
                  <button
                    type="button"
                    onClick={() => setActiveId(project.id)}
                    className="clay-dark mt-6 w-full rounded-2xl py-3 text-sm font-semibold cursor-pointer"
                  >
                    Learn more
                  </button>
                </motion.article>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {results.length > 0 && (
        <nav aria-label="Project pages" className="mt-14 flex justify-center">
          <div className="clay flex items-center gap-2 rounded-[22px] p-2">
            <button
              type="button"
              onClick={() => setPage(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="Previous page"
              className="w-11 h-11 rounded-xl flex items-center justify-center text-[#4A5C6A] disabled:opacity-35 enabled:hover:text-[#06141B] cursor-pointer disabled:cursor-default"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            {Array.from({ length: pageCount }, (_, i) => i + 1).map((number) => (
              <button
                key={number}
                type="button"
                onClick={() => setPage(number)}
                aria-current={number === currentPage ? "page" : undefined}
                className={`w-11 h-11 rounded-xl text-sm font-bold cursor-pointer ${
                  number === currentPage ? "clay-dark" : "clay-pressed text-[#4A5C6A] hover:text-[#06141B]"
                }`}
              >
                {number}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setPage(currentPage + 1)}
              disabled={currentPage === pageCount}
              aria-label="Next page"
              className="w-11 h-11 rounded-xl flex items-center justify-center text-[#4A5C6A] disabled:opacity-35 enabled:hover:text-[#06141B] cursor-pointer disabled:cursor-default"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </nav>
      )}

      <AnimatePresence>
        {active && <ProjectDialog project={active} onClose={() => setActiveId(null)} />}
      </AnimatePresence>
    </section>
  );
}

function ProjectDialog({ project, onClose }: { project: WorkProject; onClose: () => void }) {
  const details = project.details;
  const Icon = ICONS[project.id] ?? Boxes;

  return (
    <motion.div
      className="fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <button
        type="button"
        aria-label="Close project details"
        className="absolute inset-0 bg-[#06141B]/35 backdrop-blur-sm cursor-default"
        onClick={onClose}
      />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-dialog-title"
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.97 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="clay relative z-10 w-full max-w-4xl max-h-[88vh] overflow-y-auto rounded-[32px] p-7 sm:p-10"
      >
        <button
          type="button"
          onClick={onClose}
          className="clay-button absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center text-[#253745] cursor-pointer"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-start gap-5 pr-14">
          <div className="clay-button w-14 h-14 shrink-0 rounded-2xl flex items-center justify-center text-[#11212D]">
            <Icon className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-mono uppercase tracking-wider text-[#4A5C6A]">
              {project.companyOrType} · {details?.status ?? project.periodOrYear}
            </p>
            <h2 id="project-dialog-title" className="mt-1 text-2xl sm:text-3xl font-extrabold tracking-tight text-[#06141B]">
              {project.title}
            </h2>
            <p className="mt-1 text-sm sm:text-base text-[#4A5C6A]">{project.subtitle}</p>
          </div>
        </div>

        <p className="mt-7 text-base leading-relaxed text-[#253745]">{project.description}</p>

        {project.highlightMetric && (
          <div className="clay-pressed mt-6 rounded-2xl px-5 py-4">
            <p className="text-[11px] font-mono uppercase tracking-wider text-[#4A5C6A]">Key result</p>
            <p className="mt-1 text-lg font-bold text-[#06141B]">{project.highlightMetric}</p>
          </div>
        )}

        {details?.goals && (
          <DialogSection title={details.goalsTitle ?? "Current Goal"}>
            <ol className="grid gap-3 sm:grid-cols-3">
              {details.goals.map((goal, index) => (
                <li key={goal.title} className="clay-pressed rounded-2xl p-4">
                  <span className="text-xs font-mono text-[#4A5C6A]">0{index + 1}</span>
                  <p className="mt-1 font-bold text-[#06141B]">{goal.title}</p>
                  <p className="mt-1 text-sm text-[#4A5C6A] leading-relaxed">{goal.text}</p>
                </li>
              ))}
            </ol>
          </DialogSection>
        )}

        {details?.diagrams && (
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {details.diagrams.map((diagram) => (
              <div key={diagram.title}>
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#253745]">{diagram.title}</h3>
                <pre className="mt-3 rounded-2xl bg-[#06141B] p-5 text-[13px] leading-relaxed text-[#CCCDCF] font-mono overflow-x-auto">
                  {diagram.body}
                </pre>
              </div>
            ))}
          </div>
        )}

        {details?.example && (
          <DialogSection title="Example">
            <div className="grid gap-4 md:grid-cols-3">
              {details.example.map((block) => (
                <div key={block.title}>
                  <p className="text-xs font-semibold text-[#4A5C6A]">
                    {block.title} <span className="font-mono text-[#9BABA8]">· {block.language}</span>
                  </p>
                  <pre className="mt-2 rounded-2xl bg-[#06141B] p-4 text-xs leading-relaxed text-[#CCCDCF] font-mono overflow-x-auto">
                    {block.body}
                  </pre>
                </div>
              ))}
            </div>
          </DialogSection>
        )}

        <DialogSection title="Technology Stack">
          <ul className="flex flex-wrap gap-2.5">
            {project.technologies.map((tech) => (
              <li key={tech} className="clay-button rounded-full px-4 py-1.5 text-sm font-semibold text-[#253745]">
                {tech}
              </li>
            ))}
          </ul>
        </DialogSection>

        {details?.roadmap && (
          <DialogSection title="Development Roadmap">
            <ul className="grid gap-2 sm:grid-cols-2">
              {details.roadmap.map((item) => (
                <li key={item.label} className="flex items-center gap-3 text-sm">
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                      item.done ? "clay-dark" : "clay-pressed text-[#9BABA8]"
                    }`}
                  >
                    {item.done ? <Check className="w-3.5 h-3.5" /> : <Circle className="w-2 h-2" />}
                  </span>
                  <span className={item.done ? "font-semibold text-[#06141B]" : "text-[#4A5C6A]"}>{item.label}</span>
                </li>
              ))}
            </ul>
            {details.note && (
              <p className="mt-5 border-l-2 border-[#9BABA8] pl-4 text-sm italic text-[#4A5C6A]">{details.note}</p>
            )}
          </DialogSection>
        )}

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="clay-dark inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold"
          >
            <GithubIcon className="w-4 h-4" />
            View on GitHub
          </a>
          <button
            type="button"
            onClick={onClose}
            className="clay-button rounded-full px-6 py-3 text-sm font-semibold text-[#253745] cursor-pointer"
          >
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function DialogSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-8">
      <h3 className="text-sm font-bold uppercase tracking-wider text-[#253745] mb-3">{title}</h3>
      {children}
    </section>
  );
}
