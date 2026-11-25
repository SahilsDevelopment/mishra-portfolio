"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { contact, site } from "@/lib/content";
import { seasonLabels } from "@/lib/seasons";
import { useSeason } from "./SeasonProvider";

const noopSubscribe = () => () => {};
const todayStamp = () =>
  new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }).toUpperCase();

export function Postcard() {
  const { season, burst, reducedMotion } = useSeason();
  const date = useSyncExternalStore(noopSubscribe, todayStamp, () => "");
  const [copied, setCopied] = useState(false);
  const [stamped, setStamped] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const postmarkRef = useRef<HTMLDivElement>(null);
  const copyTimer = useRef<number>(undefined);

  useEffect(() => {
    return () => window.clearTimeout(copyTimer.current);
  }, []);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    let impact: number | undefined;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        setStamped(true);
        if (reducedMotion) return;
        // Matches the postmark's landing in the `postmark-hit` keyframes.
        impact = window.setTimeout(() => {
          const r = postmarkRef.current?.getBoundingClientRect();
          if (r) burst(r.left + r.width / 2, r.top + r.height / 2);
        }, 950);
      },
      { threshold: 0.3 },
    );
    io.observe(card);
    return () => {
      io.disconnect();
      window.clearTimeout(impact);
    };
  }, [burst, reducedMotion]);

  const copyEmail = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    try {
      await navigator.clipboard.writeText(site.email);
    } catch {
      window.location.href = `mailto:${site.email}`;
      return;
    }
    burst(r.left + r.width / 2, r.top + r.height / 2);
    setCopied(true);
    window.clearTimeout(copyTimer.current);
    copyTimer.current = window.setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div className={stamped ? "postcard stamped" : "postcard"} ref={cardRef}>
      <div className="pc-msg">
        {contact.note.map((line) => (
          <p key={line}>{line}</p>
        ))}
        <p className="pc-sign">{contact.signoff}</p>
      </div>

      <div className="pc-addr">
        <div className="pc-top" aria-hidden="true">
          <div className="postmark" ref={postmarkRef}>
            <span>{contact.postmark}</span>
            <span className="pm-date">{date}</span>
          </div>
          <svg className="cancel" viewBox="0 0 120 40" fill="none">
            <path d="M0 8c10-6 20 6 30 0s20 6 30 0 20 6 30 0 20 6 30 0M0 20c10-6 20 6 30 0s20 6 30 0 20 6 30 0 20 6 30 0M0 32c10-6 20 6 30 0s20 6 30 0 20 6 30 0 20 6 30 0" />
          </svg>
          <div className="stamp-wrap">
            <div className="stamp">
              <StampArt label={season ? seasonLabels[season] : ""} />
            </div>
          </div>
        </div>

        <ul className="pc-lines">
          <li>
            <span className="pc-label">Email</span>
            <span className="pc-email">
              <button type="button" onClick={copyEmail} title="Copy email address">
                {site.email}
              </button>
              <span className="pc-copied" aria-live="polite">
                {copied ? "Copied ✓" : ""}
              </span>
              <a href={`mailto:${site.email}`} className="pc-mailto">
                Write ↗
              </a>
            </span>
          </li>
          {contact.lines.map((l) => (
            <li key={l.label}>
              <span className="pc-label">{l.label}</span>
              <a href={l.href} target="_blank" rel="noreferrer">
                {l.display}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function StampArt({ label }: { label: string }) {
  return (
    <svg className="stamp-art" viewBox="0 0 84 96" preserveAspectRatio="none">
      <defs>
        <linearGradient id="stamp-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" style={{ stopColor: "var(--sky1)" }} />
          <stop offset="1" style={{ stopColor: "var(--sky2)" }} />
        </linearGradient>
      </defs>
      <rect width="84" height="96" fill="url(#stamp-sky)" />
      <circle cx="60" cy="32" r="9" style={{ fill: "var(--sun)" }} />
      <g style={{ opacity: "var(--cloud)" }}>
        <ellipse cx="24" cy="27" rx="20" ry="6" fill="#70858f" />
        <ellipse cx="62" cy="23" rx="22" ry="6.5" fill="#5c717d" />
        <g stroke="rgba(220,236,246,.85)" strokeWidth="1" strokeLinecap="round">
          <path d="M14 36l-2 6M30 38l-2 6M46 35l-2 6M62 37l-2 6M74 34l-2 6M22 46l-2 6M54 45l-2 6" />
        </g>
      </g>
      <path d="M0 58 C16 50 30 54 44 51 S70 46 84 50 V96 H0Z" style={{ fill: "var(--h1)" }} />
      <path d="M0 66 C14 60 30 64 46 61 S72 58 84 62 V96 H0Z" style={{ fill: "var(--h2)" }} />
      <g fill="none" strokeLinecap="round" style={{ stroke: "var(--bark)" }}>
        <path d="M22 72 C22.5 64 21.5 58 22 50" strokeWidth="2.6" />
        <path d="M22 60 C19 57 17 56 15 53" strokeWidth="1.4" />
        <path d="M22 57 C25 54 27 53 29 50" strokeWidth="1.4" />
      </g>
      <g style={{ fill: "var(--canopy)", opacity: "var(--leaf)" }}>
        <circle cx="22" cy="45" r="8" />
        <circle cx="15.5" cy="50" r="6" />
        <circle cx="28.5" cy="49.5" r="6" />
      </g>
      <g className="st-snow" fill="#fff">
        <circle cx="12" cy="34" r="1.1" /><circle cx="30" cy="22" r="1" /><circle cx="44" cy="40" r="1.2" />
        <circle cx="70" cy="46" r="1" /><circle cx="56" cy="16" r="1.1" /><circle cx="8" cy="50" r="1" />
        <circle cx="38" cy="54" r="1" /><circle cx="76" cy="28" r="1.2" />
      </g>
      <path d="M0 74 C16 70 32 73 48 71 S74 68 84 71 V96 H0Z" style={{ fill: "var(--h3)" }} />
      <text x="6" y="13" className="st-country">INDIA</text>
      <text x="78" y="14" textAnchor="end" className="st-value">₹5</text>
      <rect y="82" width="84" height="14" style={{ fill: "var(--accent)" }} />
      <text x="42" y="91.6" textAnchor="middle" className="st-label">{label}</text>
      <rect x=".5" y=".5" width="83" height="95" fill="none" className="st-frame" />
    </svg>
  );
}
