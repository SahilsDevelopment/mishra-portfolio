import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { CursorEffect } from "@/components/CursorEffect";
import { IntroLoader } from "@/components/IntroLoader";

const headingFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
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
  icons: {
    icon: [
      { url: "/logo.png", type: "image/png" },
      { url: "/icon.png", type: "image/png" },
    ],
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "Sahil Mishra | Software Engineer",
    description:
      "Backend & Distributed Systems Specialist. Scaled payment microservices throughput from 34 → 2,400 TPS (70x). Proficient in Java, Go, TypeScript, TDD & AI Workflow Automation.",
    images: [{ url: "/logo.png", width: 500, height: 500, alt: "Sahil Mishra Logo" }],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${headingFont.variable} ${bodyFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-canvas text-main-custom selection:bg-amber-500/20 selection:text-amber-600">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <IntroLoader />
          <CursorEffect />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
