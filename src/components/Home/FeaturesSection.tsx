import { Wand2, Timer, Search } from 'lucide-react';

import FeatureCard from './FeatureCard';

export default function FeaturesSection() {
  return (
    <section id="features">
      <div className="grid md:grid-cols-3 gap-6">
        <FeatureCard
          icon={Wand2}
          title="AI Subtitle Translator"
          description="Upload any SRT or VTT file..."
          gradient="bg-gradient-to-br from-primary/20"
        />

        <FeatureCard
          icon={Timer}
          title="Timestamp Sync Fixer"
          description="Fix subtitle timing..."
          gradient="bg-gradient-to-br from-emerald-500/20"
        />

        <FeatureCard
          icon={Search}
          title="Global Subtitle Search"
          description="Search millions of subtitles..."
          gradient="bg-gradient-to-br from-amber-500/20"
        />
      </div>
    </section>
  );
}
