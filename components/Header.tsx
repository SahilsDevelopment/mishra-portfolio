"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { site } from "@/lib/content";
import { SEASONS, seasonLabels } from "@/lib/seasons";
import { SeasonIcon } from "./SeasonIcon";
import { useSeason } from "./SeasonProvider";

const NAV = [
  { id: "work", label: "Work" },
  { id: "services", label: "Services" },
  { id: "writing", label: "Writing" },
  { id: "about", label: "About" },
  { id: "connect", label: "Connect" },
];

export function Header() {
  const { season, setSeason, burst } = useSeason();
  const [active, setActive] = useState("");
  const indRef = useRef<HTMLSpanElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  // The sliding highlight is positioned straight on the DOM node: it only mirrors layout.
  const measure = useCallback((id: string) => {
    const ind = indRef.current;
    if (!ind) return;
    const el = linkRefs.current[id];
    if (el) {
      ind.style.left = `${el.offsetLeft}px`;
      ind.style.top = `${el.offsetTop}px`;
      ind.style.width = `${el.offsetWidth}px`;
      ind.style.height = `${el.offsetHeight}px`;
      ind.style.opacity = "1";
    } else {
      ind.style.opacity = "0";
    }
  }, []);

  useEffect(() => {
    measure(active);
    const onResize = () => measure(active);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [active, measure]);

  useEffect(() => {
    const sectionObserver = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    document.querySelectorAll("main section").forEach((s) => sectionObserver.observe(s));

    const heroObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].intersectionRatio > 0.6) setActive("");
      },
      { threshold: [0.6] },
    );
    const hero = document.getElementById("top");
    if (hero) heroObserver.observe(hero);

    const onScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) setActive("connect");
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      sectionObserver.disconnect();
      heroObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header>
      <div className="pill">
        <a className="brand" href="#top" aria-label="Back to top">
          {site.initials}
        </a>
        <nav aria-label="Sections">
          <span className="ind" ref={indRef} />
          {NAV.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              ref={(el) => {
                linkRefs.current[n.id] = el;
              }}
              className={active === n.id ? "on" : undefined}
            >
              {n.label}
            </a>
          ))}
        </nav>
        <div className="seasons" role="group" aria-label="Choose a season">
          {SEASONS.map((s) => (
            <button
              key={s}
              type="button"
              aria-label={seasonLabels[s]}
              title={seasonLabels[s]}
              aria-pressed={season === s}
              onClick={(e) => {
                setSeason(s);
                const r = e.currentTarget.getBoundingClientRect();
                burst(r.left + r.width / 2, r.top + r.height / 2);
              }}
            >
              <SeasonIcon season={s} />
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
