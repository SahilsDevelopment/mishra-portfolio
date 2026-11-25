"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Entry } from "@/lib/content";
import { SeasonIcon } from "./SeasonIcon";
import { useSeason } from "./SeasonProvider";

type Props = Entry & { variant?: "row" | "paper"; onOpen?: () => void };

export function Row({ title, href, summary, meta, poem, variant = "row", onOpen }: Props) {
  const { season, reducedMotion } = useSeason();
  const rowRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const glyphRef = useRef<HTMLSpanElement>(null);
  const rollRef = useRef<HTMLSpanElement>(null);
  const played = useRef(false);
  const visible = useRef(false);
  const [entered, setEntered] = useState(false);
  const [settled, setSettled] = useState(false);
  const paper = variant === "paper";

  const play = useCallback(() => {
    const row = rowRef.current;
    const rb = bodyRef.current;
    const g = glyphRef.current;
    if (!row || !rb || !g) return;

    const w = row.clientWidth;
    const h = row.clientHeight;
    const ex = w - 52;
    const n = 10;
    const amp = Math.min(h * 0.3, 30);

    played.current = true;
    setEntered(true);
    setSettled(false);

    if (reducedMotion) {
      rb.style.opacity = "1";
      g.style.opacity = "1";
      g.style.transform = `translate(${ex}px,${paper ? h - 46 : 12}px)`;
      setSettled(true);
      return;
    }

    const kf: Keyframe[] = [];
    for (let i = 0; i <= n; i++) {
      const f = i / n;
      let x: number, y: number;
      if (paper) {
        x = ex - 70 * (1 - f) + Math.sin(f * 9) * 26 * (1 - f);
        y = -20 + f * (h - 26);
      } else {
        x = -20 + f * (ex + 20);
        y = 12 + Math.sin(f * 7) * amp * (1 - f);
      }
      kf.push({
        transform: `translate(${x}px,${y}px) rotate(${f * (paper ? 240 : 360) + 12}deg)`,
        opacity: i ? 1 : 0,
      });
    }

    const opts: KeyframeAnimationOptions = {
      duration: 1600,
      easing: "cubic-bezier(.45,.1,.3,1)",
      fill: "forwards",
    };

    g.animate(kf, opts).finished.then(() => setSettled(true)).catch(() => {});
    rb.animate(
      [
        { opacity: 1, clipPath: paper ? "inset(0 0 100% 0)" : "inset(0 100% 0 0)" },
        { opacity: 1, clipPath: "inset(0 0 0 0)" },
      ],
      opts,
    );

    const ro = rollRef.current;
    if (ro) {
      const ty = Math.max(h - 14, 0);
      ro.animate(
        [
          { transform: "translateY(0)", opacity: 1 },
          { transform: `translateY(${ty}px)`, opacity: 1, offset: 0.92 },
          { transform: `translateY(${ty}px)`, opacity: 0 },
        ],
        opts,
      );
    }
  }, [paper, reducedMotion]);

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    const io = new IntersectionObserver(
      ([e]) => {
        visible.current = e.isIntersecting;
        if (e.isIntersecting && !played.current) play();
      },
      { threshold: 0.25 },
    );
    io.observe(row);
    return () => io.disconnect();
  }, [play]);

  // Keep the latest `play` reachable so the season effect replays only on season changes.
  const playRef = useRef(play);
  useEffect(() => {
    playRef.current = play;
  }, [play]);

  useEffect(() => {
    if (season && played.current && visible.current) playRef.current();
  }, [season]);

  const className = ["row", paper && "paper", entered && "in"].filter(Boolean).join(" ");

  return (
    <div className={className} ref={rowRef}>
      <div className="rb" ref={bodyRef}>
        <h3>
          {onOpen ? (
            <button type="button" onClick={onOpen} aria-haspopup="dialog">
              {title}
            </button>
          ) : (
            <a href={href} {...(/^https?:/.test(href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
              {title}
            </a>
          )}
        </h3>
        <p className={poem ? "poem" : undefined}>{summary}</p>
        {meta && <span className="meta">{meta}</span>}
      </div>
      <span className={settled ? "glyph settled" : "glyph"} ref={glyphRef} aria-hidden="true">
        <i>{season && <SeasonIcon season={season} />}</i>
      </span>
      {paper && <span className="roll" ref={rollRef} aria-hidden="true" />}
    </div>
  );
}
