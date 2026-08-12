import { Navigation } from "@/components/landing/navigation";
import { HeroSection } from "@/components/landing/hero-section";
import { AboutSection } from "@/components/landing/about-section";
import { ServicesSection } from "@/components/landing/services-section";
import { StackSection } from "@/components/landing/stack-section";
import { ProcessSection } from "@/components/landing/process-section";
import { ContactSection } from "@/components/landing/contact-section";
import { FooterSection } from "@/components/landing/footer-section";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#0F172A]">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <StackSection />
      <ProcessSection />
      <ContactSection />
      <FooterSection />
    </main>
  );
}
