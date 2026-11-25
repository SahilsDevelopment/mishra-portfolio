export const SEASONS = ["spring", "summer", "monsoon", "autumn", "winter"] as const;
export type Season = (typeof SEASONS)[number];

export type TimeOfDay = "dawn" | "day" | "dusk" | "night";

export const seasonLabels: Record<Season, string> = {
  spring: "Spring",
  summer: "Summer",
  monsoon: "Monsoon",
  autumn: "Autumn",
  winter: "Winter",
};

export const seasonNotes: Record<Season, string> = {
  spring: "It’s spring. Mustard fields, fresh commits, and the first blossoms.",
  summer: "It’s summer. Mango season, long days, and fireflies after dark.",
  monsoon: "It’s monsoon. Rain on the window, chai going cold, and a quiet deploy queue.",
  autumn: "It’s autumn. Marigolds, softer light, and festival evenings.",
  winter: "It’s winter. Foggy mornings, hot chai, and the glow of a late-night terminal.",
};

export const timeOfDayNotes: Record<TimeOfDay, string> = {
  dawn: "The day is just waking up.",
  day: "",
  dusk: "The evening light is on.",
  night: "It’s late. The quiet hours.",
};

export const glowByTimeOfDay: Record<TimeOfDay, number> = {
  dawn: 0.6,
  day: 0.35,
  dusk: 1,
  night: 1.2,
};

export type ParticleShape = "petal" | "glow" | "rain" | "fog";

export type ParticleConfig = {
  n: number;
  c: string[];
  vy: [number, number];
  vx: [number, number];
  sz: [number, number];
  shape: ParticleShape;
};

export const particleConfig: Record<Season, ParticleConfig> = {
  spring: { n: 46, c: ["#f7b9cc", "#f3a0ba", "#fde0e8", "#fbd45c"], vy: [0.5, 1.1], vx: [0.2, 0.7], sz: [5, 9], shape: "petal" },
  summer: { n: 38, c: ["#ffe27a", "#fff2b0", "#ffd24a"], vy: [-0.35, -0.1], vx: [-0.2, 0.2], sz: [2, 4.5], shape: "glow" },
  monsoon: { n: 170, c: ["#cfe4ee", "#ffffff"], vy: [14, 24], vx: [2.5, 4.2], sz: [10, 26], shape: "rain" },
  autumn: { n: 42, c: ["#e8a13a", "#f2b84b", "#d9742b", "#b8431e"], vy: [0.6, 1.4], vx: [-0.6, 0.5], sz: [7, 12], shape: "petal" },
  winter: { n: 14, c: ["#e6efff"], vy: [-0.03, 0.03], vx: [0.15, 0.5], sz: [70, 150], shape: "fog" },
};

export function isSeason(value: unknown): value is Season {
  return typeof value === "string" && (SEASONS as readonly string[]).includes(value);
}

export function seasonForMonth(month: number): Season {
  if (month === 0 || month === 11) return "winter";
  if (month < 3) return "spring";
  if (month < 6) return "summer";
  if (month < 9) return "monsoon";
  return "autumn";
}

export function timeOfDayForHour(h: number): TimeOfDay {
  if (h >= 5 && h < 8) return "dawn";
  if (h >= 8 && h < 17) return "day";
  if (h >= 17 && h < 19) return "dusk";
  return "night";
}
