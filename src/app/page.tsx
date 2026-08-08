import { CTASection } from '@/components/Home/CTASection';
import { FeaturesSection } from '@/components/Home/FeaturesSection';
import { GlobalStyles } from '@/components/Home/GlobalStyles';
import { HeroSection } from '@/components/Home/HeroSection';
import { HowItWorksSection } from '@/components/Home/HowItWorksSection';
import { StatsSection } from '@/components/Home/StatsSection';
import { Footer } from '@/components/ui/Footer';
import { Navbar } from '@/components/ui/Navbar';

export default function LandingPage() {
  return (
    <>
      <GlobalStyles />
      <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
        <Navbar />
        <HeroSection />
        <StatsSection />
        <FeaturesSection />
        <HowItWorksSection />
        <CTASection />
        <Footer />
      </div>
    </>
  );
}
