"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useSyncExternalStore } from "react";
import {
  isSeason,
  seasonForMonth,
  timeOfDayForHour,
  type Season,
  type TimeOfDay,
} from "@/lib/seasons";

type BurstFn = (x: number, y: number) => void;

type SeasonContextValue = {
  season: Season | null;
  timeOfDay: TimeOfDay;
  reducedMotion: boolean;
  setSeason: (season: Season) => void;
  burst: BurstFn;
  registerBurst: (fn: BurstFn | null) => void;
};

const SeasonContext = createContext<SeasonContextValue | null>(null);

const COLOR_PROPS = [
  "--sky1", "--sky2", "--ink", "--muted", "--accent", "--h1", "--h2",
  "--h3", "--canopy", "--sun", "--bark", "--rule",
];

function registerAnimatableProps() {
  if (typeof CSS === "undefined" || !("registerProperty" in CSS)) return;
  try {
    COLOR_PROPS.forEach((name) =>
      CSS.registerProperty({ name, syntax: "<color>", inherits: true, initialValue: "#000" }),
    );
    CSS.registerProperty({ name: "--leaf", syntax: "<number>", inherits: true, initialValue: "1" });
    CSS.registerProperty({ name: "--cloud", syntax: "<number>", inherits: true, initialValue: "0" });
  } catch {
    // Already registered (e.g. after a fast refresh).
  }
}

// The season lives on <html data-season>, set before paint by the inline script in the layout.
// Reading it through an external store keeps React state in sync with that attribute without
// a setState-in-effect round trip.
const seasonListeners = new Set<() => void>();

function subscribeSeason(onChange: () => void) {
  seasonListeners.add(onChange);
  return () => {
    seasonListeners.delete(onChange);
  };
}

function readSeason(): Season {
  const fromDom = document.documentElement.dataset.season;
  if (isSeason(fromDom)) return fromDom;
  let saved: string | null = null;
  try {
    saved = localStorage.getItem("season");
  } catch {}
  return isSeason(saved) ? saved : seasonForMonth(new Date().getMonth());
}

function subscribeTimeOfDay(onChange: () => void) {
  const id = window.setInterval(onChange, 600_000);
  return () => window.clearInterval(id);
}

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onChange: () => void) {
  const mq = window.matchMedia(REDUCED_MOTION);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

export function SeasonProvider({ children }: { children: React.ReactNode }) {
  const season = useSyncExternalStore<Season | null>(subscribeSeason, readSeason, () => null);
  const timeOfDay = useSyncExternalStore<TimeOfDay>(
    subscribeTimeOfDay,
    () => timeOfDayForHour(new Date().getHours()),
    () => "day",
  );
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => false,
  );
  const burstRef = useRef<BurstFn | null>(null);

  useEffect(() => {
    registerAnimatableProps();
  }, []);

  // (Re)apply the document attributes. In dev, React's Strict Mode remount can clear the
  // attributes the inline script set, so these keep dev and production identical.
  useEffect(() => {
    document.documentElement.classList.add("js");
  }, []);

  useEffect(() => {
    if (season) document.documentElement.dataset.season = season;
  }, [season]);

  useEffect(() => {
    document.documentElement.dataset.tod = timeOfDay;
  }, [timeOfDay]);

  const setSeason = useCallback((next: Season) => {
    document.documentElement.dataset.season = next;
    try {
      localStorage.setItem("season", next);
    } catch {}
    seasonListeners.forEach((fn) => fn());
  }, []);

  const burst = useCallback<BurstFn>((x, y) => burstRef.current?.(x, y), []);
  const registerBurst = useCallback((fn: BurstFn | null) => {
    burstRef.current = fn;
  }, []);

  const value = useMemo(
    () => ({ season, timeOfDay, reducedMotion, setSeason, burst, registerBurst }),
    [season, timeOfDay, reducedMotion, setSeason, burst, registerBurst],
  );

  return <SeasonContext.Provider value={value}>{children}</SeasonContext.Provider>;
}

export function useSeason() {
  const ctx = useContext(SeasonContext);
  if (!ctx) throw new Error("useSeason must be used inside <SeasonProvider>");
  return ctx;
}
