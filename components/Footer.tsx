import { PERSONAL_INFO } from "@/lib/constants";

const BAR = "h-16 sm:h-[6.75rem]";
const BAR_COMPACT = "h-14";

export function Footer({ pinned = false, compact = false }: { pinned?: boolean; compact?: boolean }) {
  const height = compact ? BAR_COMPACT : BAR;
  const bar = (
    <footer
      className={`${height} flex items-center justify-center bg-[#06141B] text-center ${
        pinned ? "fixed inset-x-0 bottom-0 z-40" : ""
      }`}
    >
      <p className="px-4 font-sans font-extrabold tracking-tight text-sm sm:text-lg text-[#CCCDCF]">
        © {new Date().getFullYear()} {PERSONAL_INFO.name} · Built for Backend Scale
      </p>
    </footer>
  );

  if (!pinned) return bar;

  return (
    <>
      <div aria-hidden className={`${height} shrink-0`} />
      {bar}
    </>
  );
}
