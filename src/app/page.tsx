import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/layout/SmoothScroll";
import CustomCursor from "@/components/ui/CustomCursor";
import HeroSection from "@/components/ui/HeroSection";
import AboutSection from "@/components/ui/AboutSection";
import ExperienceSection from "@/components/ui/ExperienceSection";
import ProjectSection from "@/components/ui/ProjectSection";
import SkillsSection from "@/components/ui/SkillsSection";
import AwardsSection from "@/components/ui/AwardsSection";

export default function Home() {
  return (
    <SmoothScroll>
      <CustomCursor />
      <Header />
      <main className="bg-background relative z-10">
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <ProjectSection />
        <SkillsSection />
        <AwardsSection />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
