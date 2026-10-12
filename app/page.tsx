import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { TechMarquee } from "@/components/TechMarquee";
import { ContactSection } from "@/components/ContactSection";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-canvas">
      <main className="flex-1">
        <HeroSection />
        <TechMarquee />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
