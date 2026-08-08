import { Wand2, Timer, Search, Globe } from 'lucide-react';
import { FeatureCard } from '../ui/FeatureCard';

export function FeaturesSection() {
  return (
    <section id="features" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-foreground/5 px-4 py-1.5 text-sm text-muted-foreground">
            <Globe className="h-3.5 w-3.5" />
            Three Powerful Tools
          </div>
          <h2 className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Everything you need for
            <br />
            <span className="hero-text-gradient">perfect subtitles</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
            From AI translation to sync fixing to worldwide search — DesiSub handles the entire
            subtitle workflow.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <FeatureCard
            icon={Wand2}
            title="AI Subtitle Translator"
            description="Upload any SRT or VTT file and translate it into natural-sounding Bangla, Hindi, or Urdu using GPT-4o-mini. Batch processing with contextual awareness means cinematic quality — not robotic."
            gradient="bg-gradient-to-br from-primary/20 via-violet-500/10 to-transparent"
            badge="Most Popular"
          />
          <FeatureCard
            icon={Timer}
            title="Timestamp Sync Fixer"
            description="Have a perfectly-timed file in one language and translated text in another? DesiSub maps the text onto the correct timestamps in seconds — entirely in your browser, zero upload."
            gradient="bg-gradient-to-br from-emerald-500/20 via-teal-500/10 to-transparent"
          />
          <FeatureCard
            icon={Search}
            title="Global Subtitle Search"
            description="Search millions of subtitles from OpenSubtitles by movie title or IMDB ID. Filter by language, download instantly. Your search history is always accessible."
            gradient="bg-gradient-to-br from-amber-500/20 via-orange-500/10 to-transparent"
          />
        </div>
      </div>
    </section>
  );
}
