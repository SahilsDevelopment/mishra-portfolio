import type { Metadata, Viewport } from "next";
import { Fraunces, Instrument_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { LightningFlash } from "@/components/LightningFlash";
import { ParticleCanvas } from "@/components/ParticleCanvas";
import { SeasonProvider } from "@/components/SeasonProvider";
import { WelcomeIntro } from "@/components/WelcomeIntro";

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-fraunces",
  display: "swap",
});

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument-sans",
  display: "swap",
});

export const metadata: Metadata = {
  // Absolute base for Open Graph / Twitter image URLs. Set NEXT_PUBLIC_SITE_URL to your live domain
  // (e.g. https://your-domain.com) in your hosting provider's environment settings.
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: "Sahil Mishra | Software Engineer — Backend & AI Systems",
  description:
    "Personal portfolio of Sahil Mishra, Software Engineer specializing in high-throughput backend microservices, distributed infrastructure, performance engineering, and AI automation.",
  keywords: [
    "Sahil Mishra",
    "Software Engineer",
    "Backend Engineer",
    "Distributed Systems",
    "Java",
    "Golang",
    "TypeScript",
    "Performance Optimization",
    "MCP",
    "Kolkata",
    "Jadavpur University",
  ],
  authors: [{ name: "Sahil Mishra", url: "https://github.com/sahilmishra1408" }],
  openGraph: {
    title: "Sahil Mishra | Software Engineer",
    description:
      "Backend & Distributed Systems Specialist. Scaled payment microservices throughput from 34 → 2,400 TPS (70x). Proficient in Java, Go, TypeScript, TDD & AI Workflow Automation.",
    images: [{ url: "/logo.png", width: 500, height: 500, alt: "Sahil Mishra Logo" }],
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

// Runs before paint so the saved/seasonal theme is applied without a flash.
const themeInit = `(function(){try{var d=document.documentElement,s=localStorage.getItem("season"),ok=["spring","summer","monsoon","autumn","winter"];if(ok.indexOf(s)<0){var m=new Date().getMonth();s=(m==0||m==11)?"winter":m<3?"spring":m<6?"summer":m<9?"monsoon":"autumn"}d.setAttribute("data-season",s);var h=new Date().getHours();d.setAttribute("data-tod",h>=5&&h<8?"dawn":h>=8&&h<17?"day":h>=17&&h<19?"dusk":"night");d.classList.add("js")}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${fraunces.variable} ${instrumentSans.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body>
        <SeasonProvider>
          <WelcomeIntro />
          <ParticleCanvas />
          <LightningFlash />
          <Header />
          {children}
        </SeasonProvider>
      </body>
    </html>
  );
}
