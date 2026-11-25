"use client";

import { useCallback, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { WORK_PROJECTS } from "@/lib/constants";
import { Row } from "./Row";
import { ProjectDialog } from "./ProjectDialog";

export function WorkList() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = WORK_PROJECTS.find((p) => p.id === activeId) ?? null;
  const close = useCallback(() => setActiveId(null), []);

  return (
    <>
      {WORK_PROJECTS.map((p) => (
        <Row
          key={p.id}
          title={p.title}
          href={p.githubUrl ?? "#work"}
          summary={p.description}
          meta={p.technologies.join(", ")}
          onOpen={() => setActiveId(p.id)}
        />
      ))}
      <AnimatePresence>{active && <ProjectDialog project={active} onClose={close} />}</AnimatePresence>
    </>
  );
}
