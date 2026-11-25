"use client";

import { hero } from "@/lib/content";
import { seasonNotes, timeOfDayNotes } from "@/lib/seasons";
import { useSeason } from "./SeasonProvider";
import { useWelcomeDone } from "./WelcomeIntro";

export function Hero() {
  const { season, timeOfDay } = useSeason();
  const ready = useWelcomeDone();
  const note = season
    ? seasonNotes[season] + (timeOfDayNotes[timeOfDay] ? " " + timeOfDayNotes[timeOfDay] : "")
    : "";

  return (
    <div className="hero" id="top">
      <div className={ready ? "txt ready" : "txt"}>
        <h1>{hero.heading}</h1>
        <p className="note" aria-live="polite">
          {note}
        </p>
        <div className="cta">
          <a className="btn pri" href={hero.primaryCta.href}>
            {hero.primaryCta.label}
          </a>
          <a className="btn" href={hero.secondaryCta.href}>
            {hero.secondaryCta.label}
          </a>
        </div>
      </div>
      <HeroScene />
    </div>
  );
}

function HeroScene() {
  return (
    <svg className="scene" viewBox="0 0 1440 500" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <circle className="sun" cx="1130" cy="90" r="64" style={{ fill: "var(--sun)" }} />
      <g style={{ opacity: "var(--cloud)" }}>
        <g fill="#70858f">
          <ellipse cx="200" cy="60" rx="220" ry="48" />
          <ellipse cx="520" cy="40" rx="260" ry="52" />
          <ellipse cx="880" cy="70" rx="240" ry="46" />
          <ellipse cx="1240" cy="48" rx="260" ry="54" />
        </g>
        <g fill="#5c717d">
          <ellipse cx="380" cy="100" rx="200" ry="34" />
          <ellipse cx="1010" cy="112" rx="220" ry="36" />
          <ellipse cx="1380" cy="96" rx="180" ry="32" />
        </g>
      </g>
      <path d="M0 330 C200 250 380 300 600 270 S980 200 1200 260 S1380 290 1440 270 V500 H0Z" style={{ fill: "var(--h1)" }} />
      <path d="M0 390 C180 330 360 380 560 350 S940 300 1160 350 S1380 370 1440 340 V500 H0Z" style={{ fill: "var(--h2)" }} />
      <g strokeLinecap="round" fill="none" style={{ stroke: "var(--bark)" }}>
        <path d="M290 430 C294 360 288 320 292 250" strokeWidth="16" />
        <path d="M292 300 C260 270 236 262 214 232" strokeWidth="8" />
        <path d="M292 280 C322 252 346 244 372 214" strokeWidth="8" />
        <path d="M292 250 C290 220 282 200 270 176" strokeWidth="7" />
      </g>
      <g style={{ fill: "var(--canopy)", opacity: "var(--leaf)" }}>
        <circle cx="290" cy="190" r="74" />
        <circle cx="220" cy="232" r="58" />
        <circle cx="366" cy="226" r="60" />
        <circle cx="252" cy="150" r="48" />
        <circle cx="330" cy="156" r="46" />
      </g>
      <path d="M0 450 C220 410 420 440 640 420 S1040 390 1260 425 S1400 440 1440 430 V500 H0Z" style={{ fill: "var(--h3)" }} />
    </svg>
  );
}
