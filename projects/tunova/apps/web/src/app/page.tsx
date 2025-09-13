import { HeroSection } from '@/components/sections/hero-section';
import { MinigamesSection } from '@/components/sections/minigames-section';
import { PreRegistrationSection } from '@/components/sections/pre-registration-section';
import { RoadmapSection } from '@/components/sections/roadmap-section';
import { TeamSection } from '@/components/sections/team-section';
import { Footer } from '@/components/layout/footer';
import { Navigation } from '@/components/layout/navigation';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-dark-950">
      <Navigation />
      <HeroSection />
      <MinigamesSection />
      <PreRegistrationSection />
      <RoadmapSection />
      <TeamSection />
      <Footer />
    </main>
  );
}