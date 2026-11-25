"use client";

import { useEffect, useRef } from "react";
import { useSeason } from "./SeasonProvider";

export function LightningFlash() {
  const { season, reducedMotion } = useSeason();
  const ref = useRef<HTMLDivElement>(null);
  const live = useRef({ season, reducedMotion });

  useEffect(() => {
    live.current = { season, reducedMotion };
  }, [season, reducedMotion]);

  useEffect(() => {
    let timer: number;
    const bolt = () => {
      const { season, reducedMotion } = live.current;
      if (season === "monsoon" && !reducedMotion && !document.hidden) {
        ref.current?.animate(
          [
            { opacity: 0 },
            { opacity: 0.5, offset: 0.1 },
            { opacity: 0.08, offset: 0.3 },
            { opacity: 0.4, offset: 0.45 },
            { opacity: 0 },
          ],
          { duration: 800 },
        );
      }
      timer = window.setTimeout(bolt, 7000 + Math.random() * 7000);
    };
    bolt();
    return () => window.clearTimeout(timer);
  }, []);

  return <div id="flash" ref={ref} aria-hidden="true" />;
}
