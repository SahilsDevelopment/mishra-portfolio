import type { Metadata } from "next";
import Image from "next/image";
import { Allura, Newsreader, Playfair_Display } from "next/font/google";
import { Footer } from "@/components/Footer";
import { PERSONAL_INFO } from "@/lib/constants";

const display = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600"],
  display: "swap",
});

const prose = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const signature = Allura({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "About Me | Sahil Mishra",
  description: "About Sahil Mishra, a backend engineer building high-throughput systems.",
};

const PARAGRAPHS = [
  "I'm Sahil Mishra, a software engineer designing and scaling backend systems in payments and fintech. Over the last two years that work has meant high-throughput, low-latency microservices — including a production effort that took throughput from 34 transactions a second to 2,400.",
  "I build mostly in Java, Go, and TypeScript, and I rely on test-driven development when the system has to stay correct under load. The stack around that is distributed: PostgreSQL, Kafka, Kubernetes, and the metrics that show whether a service is actually healthy.",
  "I also use AI tooling — MCP and prompt engineering — to take repetitive work off the team, which has shortened code review cycles by about 40%. I studied Computer Science and Engineering at Jadavpur University, and I work from Kolkata.",
];

export default function AboutMePage() {
  return (
    <div className="flex min-h-dvh flex-col bg-[#F3F3F1] lg:h-dvh lg:overflow-hidden">
      <main className="flex min-h-0 flex-1 flex-col px-4 pt-20 pb-4 sm:px-6 lg:px-8 lg:pt-[4.5rem] lg:pb-4">
        <article className="mx-auto flex w-full max-w-[88rem] flex-1 flex-col overflow-hidden rounded-[2rem] bg-white shadow-[0_24px_70px_-36px_rgba(6,20,27,0.35)] lg:min-h-0 lg:flex-row">
          <div className="relative h-72 w-full shrink-0 bg-[#1a1a1a] sm:h-[28rem] lg:h-full lg:w-[44%]">
            <Image
              src="/Sahil.png"
              alt="Sahil Mishra standing by the sea"
              fill
              priority
              sizes="(min-width: 1024px) 44vw, 100vw"
              className="object-cover object-[40%_40%]"
            />
            <div className="pointer-events-none absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-black/55 to-transparent" />
            <div className="absolute left-5 top-1/2 flex -translate-y-1/2 items-center gap-4 text-white sm:left-7">
              <p className="rotate-180 text-[11px] font-medium uppercase tracking-[0.28em] [writing-mode:vertical-rl]">
                Software Engineer
              </p>
              <span className="h-16 w-px bg-white/80" />
            </div>
          </div>

          <div className="flex min-h-0 flex-1 flex-col px-5 py-7 sm:px-10 lg:px-14 lg:py-[clamp(1.25rem,3vh,2.25rem)]">
            <h1 className={`${display.className} text-5xl sm:text-6xl lg:text-[clamp(3.5rem,8vh,5.75rem)] leading-[0.86] font-medium tracking-[-0.03em] text-[#161616]`}>
              About
              <br />
              Me<span className="text-[#E23B2F]">.</span>
            </h1>

            <div className={`${prose.className} mt-[clamp(0.85rem,2vh,1.5rem)] max-w-lg space-y-[clamp(0.55rem,1.3vh,0.9rem)] text-[clamp(0.95rem,1.7vh,1.05rem)] leading-snug text-[#2a2a2a]`}>
              {PARAGRAPHS.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-8 lg:mt-auto lg:pt-[clamp(0.5rem,1.5vh,1rem)]">
              <p className={`${signature.className} text-[clamp(2.75rem,5vh,3.75rem)] leading-none text-[#161616]`}>sahil</p>
              <p className="mt-1 break-all text-xs tracking-wide text-[#6d6d6d]">{PERSONAL_INFO.email}</p>
            </div>
          </div>
        </article>
      </main>
      <Footer pinned compact />
    </div>
  );
}
