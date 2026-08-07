import {
  HeroSection,
  StatsSection,
  FeaturesSection,
  HowItWorksSection,
  CTASection,
} from '@/components/Home';
import Footer from '@/components/ui/Footer';
import Navbar from '@/components/ui/Navbar';

export default function Home() {
  return (
    <main className="bg-[hsl(240,20%,6%)] text-white">
      <Navbar />
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <HowItWorksSection />
      <CTASection />
      <Footer />
    </main>
  );
}
