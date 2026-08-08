import Link from 'next/link';
import { Zap, Star, ArrowRight, Play } from 'lucide-react';
import { FloatingOrb } from '../ui/FloatingOrb';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-40" />

      <FloatingOrb className="h-150 w-150 bg-primary/20 -top-40 -left-20" delay={0} />
      <FloatingOrb className="h-125 w-125 bg-violet-600/15 -bottom-20 -right-20" delay={2} />
      <FloatingOrb
        className="h-75 w-75 bg-amber-500/10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        delay={4}
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 0%, hsla(252,75%,52%,0.12) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-5xl px-6 py-32 text-center">
        <div className="fade-in-up fade-in-up-1 mb-8 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-medium text-primary badge-glow">
          <Zap className="h-3.5 w-3.5" />
          <span>AI-Powered Subtitle Tools for Desi Content</span>
          <Star className="h-3.5 w-3.5 fill-current" />
        </div>

        <h1 className="fade-in-up fade-in-up-2 font-heading text-5xl font-bold leading-[1.1] tracking-tight sm:text-6xl md:text-7xl mb-6">
          <span className="hero-text-gradient">Subtitle Magic</span>
          <br />
          <span className="text-foreground/90">for Desi Cinema</span>
        </h1>

        <p className="fade-in-up fade-in-up-3 mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground mb-10">
          Translate subtitles with AI into natural-sounding Bangla, Hindi &amp; Urdu. Fix sync issues
          instantly. Download from the world&apos;s largest subtitle database. All in one place.
        </p>

        <div className="fade-in-up fade-in-up-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/register"
            id="hero-cta-register"
            className="group flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-base font-semibold text-primary-foreground cta-glow transition-all duration-200 hover:scale-[1.03] hover:bg-primary/90"
          >
            Start for Free
            <ArrowRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-1" />
          </Link>
          <a
            href="#features"
            id="hero-see-features"
            className="flex items-center gap-2 rounded-xl border border-border bg-foreground/5 px-8 py-4 text-base font-medium text-foreground/80 backdrop-blur-sm transition-all duration-200 hover:border-foreground/20 hover:bg-foreground/10 hover:text-foreground"
          >
            <Play className="h-4 w-4" />
            See Features
          </a>
        </div>

        <div className="fade-in-up fade-in-up-4 mt-12 flex items-center justify-center gap-6 text-sm text-muted-foreground/70">
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            No credit card required
          </span>
          <span className="h-3 w-px bg-border" />
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Free tier available
          </span>
          <span className="h-3 w-px bg-border hidden sm:block" />
          <span className="hidden sm:flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Open source friendly
          </span>
        </div>
      </div>

      <div className="absolute bottom-0 inset-x-0 h-32 bg-linear-to-t from-background to-transparent" />
    </section>
  );
}
