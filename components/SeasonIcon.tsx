import type { Season } from "@/lib/seasons";

export function SeasonIcon({ season }: { season: Season }) {
  switch (season) {
    case "spring":
      return (
        <svg viewBox="0 0 24 24">
          <path d="M12 2C5.5 7.5 5 15 12 22c7-7 6.5-14.5 0-20z" fill="currentColor" />
        </svg>
      );
    case "summer":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="12" r="11" opacity=".18" />
          <circle cx="12" cy="12" r="7" opacity=".4" />
          <circle cx="12" cy="12" r="3.5" />
        </svg>
      );
    case "monsoon":
      return (
        <svg viewBox="0 0 24 24">
          <path d="M12 2C12 2 5 10.5 5 15a7 7 0 0014 0c0-4.5-7-13-7-13z" fill="currentColor" />
        </svg>
      );
    case "autumn":
      return (
        <svg viewBox="0 0 24 24">
          <path
            d="M12 2l2.2 4.4 4.3-1.2-1.3 4.6 4.3 1.4-4 2.9 1.2 3.7-4-1.2L12 22l-.7-5.4-4 1.2 1.2-3.7-4-2.9 4.3-1.4-1.3-4.6 4.3 1.2z"
            fill="currentColor"
          />
        </svg>
      );
    case "winter":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          <path d="M3 8c3-3 5 3 9 0s6 3 9 0M3 13c3-3 5 3 9 0s6 3 9 0M3 18c3-3 5 3 9 0s6 3 9 0" />
        </svg>
      );
  }
}
