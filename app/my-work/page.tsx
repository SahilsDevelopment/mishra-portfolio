import type { Metadata } from "next";
import { WorkSection } from "@/components/WorkSection";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "My Work | Sahil Mishra",
  description: "Selected backend engineering work by Sahil Mishra.",
};

export default function MyWorkPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#ECEDEF]">
      <main className="flex-1">
        <WorkSection />
      </main>
      <Footer pinned />
    </div>
  );
}
