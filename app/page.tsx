import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ParallaxSection } from "@/components/ParallaxSection";
import { HeroSection } from "@/components/HeroSection";
import { TechSection } from "@/components/TechSection";
import { WorkSection } from "@/components/WorkSection";
import { BlogSection } from "@/components/BlogSection";
import { ContactSection } from "@/components/ContactSection";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-canvas">
      <Navbar />

      <main className="flex-1 pt-16">
        {/* 1. Hero / About Me */}
        <ParallaxSection id="about" parallaxSpeed={20}>
          <HeroSection />
        </ParallaxSection>

        {/* 2. Techs I Know */}
        <ParallaxSection id="techs" parallaxSpeed={35}>
          <TechSection />
        </ParallaxSection>

        {/* 3. My Works */}
        <ParallaxSection id="works" parallaxSpeed={25}>
          <WorkSection />
        </ParallaxSection>

        {/* 4. Blogs I Have Written */}
        <ParallaxSection id="blogs" parallaxSpeed={30}>
          <BlogSection />
        </ParallaxSection>

        {/* 5. Contact */}
        <ParallaxSection id="contact" parallaxSpeed={15}>
          <ContactSection />
        </ParallaxSection>
      </main>

      <Footer />
    </div>
  );
}
