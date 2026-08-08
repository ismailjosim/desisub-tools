'use client';
import { ArrowRight, CheckCircle2, Film, Languages, Play, Sparkles } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export function HeroSection() {
  const scrollToDemo = () => {
    document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative isolate min-h-[calc(100vh-4rem)] overflow-hidden border-b border-zinc-800/40">
      {/* ================================================================ */}
      {/* Background */}
      {/* ================================================================ */}

      <div className="absolute inset-0 -z-20 bg-background" />

      {/* Subtle primary indigo radiance (top-left) */}
      <div
        className="absolute -left-40 -top-32 h-96 w-96 rounded-full opacity-15 blur-3xl"
        style={{
          background: 'radial-linear(circle, hsl(252, 75%, 52%) 0%, transparent 70%)',
        }}
      />

      {/* Warm accent glow (bottom-right, very subtle) */}
      <div
        className="absolute -bottom-48 -right-40 h-80 w-80 rounded-full opacity-12 blur-3xl"
        style={{
          background: 'radial-linear(circle, hsl(38, 80%, 52%) 0%, transparent 70%)',
        }}
      />

      {/* Accent depth layer (center-right) */}
      <div
        className="absolute right-1/4 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full opacity-8 blur-3xl"
        style={{
          background: 'radial-linear(circle, hsl(38, 80%, 52%) 0%, transparent 70%)',
        }}
      />

      {/* Very subtle accent grid for cinema texture */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-linear(90deg, hsl(38, 80%, 52%) 1px, transparent 1px),
            linear-linear(hsl(38, 80%, 52%) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* ================================================================ */}
      {/* Main Content */}
      {/* ================================================================ */}

      <div className="container relative z-10 mx-auto flex min-h-[calc(100vh-4rem)] items-center px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="container mx-auto">
          <div className="grid w-full items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            {/* ============================================================ */}
            {/* Left Content */}
            {/* ============================================================ */}

            <div className="text-center lg:text-left">
              {/* Overline Badge */}
              <div className="mb-6 flex justify-center lg:justify-start">
                <Badge
                  variant="outline"
                  className="
                    gap-2
                    rounded-full
                    border-accent/40
                    bg-accent/10
                    px-4
                    py-2
                    text-accent
                    text-xs
                    font-medium
                    uppercase
                    tracking-widest
                    backdrop-blur-sm
                  "
                >
                  <Film className="size-3.5" />
                  AI-Powered Translation
                </Badge>
              </div>

              {/* Main Headline */}
              <h1
                className="
                  font-serif
                  text-5xl
                  sm:text-6xl
                  md:text-7xl
                  font-bold
                  leading-[1.1]
                  tracking-tight
                  text-foreground
                  text-balance
                  mb-6
                "
              >
                Subtitles That{' '}
                <span className="text-accent inline-block relative">
                  Speak
                  <span
                    className="absolute bottom-0 left-0 right-0 h-1 rounded-full"
                    style={{
                      background:
                        'linear-linear(to right, hsl(38, 80%, 52%), hsl(38, 80%, 52% - 10%), transparent)',
                    }}
                  />
                </span>{' '}
                Your Language.
              </h1>

              {/* Subheading */}
              <p
                className="
                  text-lg
                  sm:text-xl
                  leading-8
                  text-muted-foreground
                  max-w-2xl
                  mb-8
                  font-light
                "
              >
                Stop reading robotic translations. DesiSub uses AI to transform English subtitles
                into natural, culturally-aware translations in{' '}
                <span className="text-accent font-medium">Bangla, Hindi, and Urdu</span>.
              </p>

              {/* Trust Points */}
              <div className="mb-10 space-y-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-3 lg:justify-start justify-center">
                  <div className="size-5 rounded-full bg-primary/10 flex items-center justify-center">
                    <CheckCircle2 className="size-3 text-primary" />
                  </div>
                  <span>No credit card needed • Free tier available</span>
                </div>
                <div className="flex items-center gap-3 lg:justify-start justify-center">
                  <div className="size-5 rounded-full bg-accent/10 flex items-center justify-center">
                    <Languages className="size-3 text-accent" />
                  </div>
                  <span>Preserves idioms, humor, and emotional nuance</span>
                </div>
                <div className="flex items-center gap-3 lg:justify-start justify-center">
                  <div className="size-5 rounded-full bg-primary/10 flex items-center justify-center">
                    <Sparkles className="size-3 text-primary" />
                  </div>
                  <span>Auto-sync and subtitle timing fixes included</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-3 justify-center lg:justify-start">
                <Button
                  size="lg"
                  onClick={scrollToDemo}
                  className="
                    h-12
                    px-6
                    rounded-lg
                    bg-linear-to-r
                    from-accent
                    to-accent/80
                    hover:from-accent/90
                    hover:to-accent/70
                    text-accent-foreground
                    font-semibold
                    shadow-lg
                    shadow-accent/30
                    transition-all
                    duration-300
                    hover:-translate-y-0.5
                    hover:shadow-accent/40
                  "
                >
                  Start Translating Free
                  <ArrowRight className="ml-2 size-4" />
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={scrollToDemo}
                  className="
                    h-12
                    px-6
                    rounded-lg
                    border-border
                    bg-card/50
                    text-foreground
                    hover:bg-card/80
                    hover:border-accent/50
                    font-medium
                    backdrop-blur-sm
                    transition-all
                    duration-300
                  "
                >
                  <Play className="mr-2 size-4 fill-current" />
                  Watch Demo
                </Button>
              </div>
            </div>

            {/* ============================================================ */}
            {/* Translation Showcase Mockup */}
            {/* ============================================================ */}

            <div className="relative mx-auto w-full">
              {/* Glow behind card */}
              <div
                className="absolute -inset-6 rounded-2xl opacity-20 blur-2xl"
                style={{
                  background:
                    'radial-linear(ellipse at center, hsl(252, 75%, 52%, 0.3), transparent 70%)',
                }}
              />

              {/* Main Card */}
              <Card
                className="
                  relative
                  overflow-hidden
                  rounded-xl
                  border
                  border-border
                  bg-card
                  shadow-2xl
                  backdrop-blur-xl
                "
              >
                {/* Window Header / Film Frame */}
                <CardHeader
                  className="
                    flex
                    flex-row
                    items-center
                    space-y-0
                    border-b
                    border-border
                    bg-surface-elevated
                    px-5
                    py-4
                  "
                >
                  {/* Cinema Controls Dots */}
                  <div className="flex items-center gap-2">
                    <div className="size-2.5 rounded-full bg-destructive/80" />
                    <div className="size-2.5 rounded-full bg-accent/80" />
                    <div className="size-2.5 rounded-full bg-primary/80" />
                  </div>

                  {/* Title */}
                  <div className="flex-1 text-center text-xs font-semibold text-accent tracking-widest uppercase">
                    Language Transformation
                  </div>

                  {/* Status */}
                  <div className="flex items-center gap-1.5 text-[10px] text-primary font-medium">
                    <span className="size-1.5 rounded-full bg-primary animate-pulse" />
                    Active
                  </div>
                </CardHeader>

                <CardContent className="space-y-6 p-6 sm:p-7">
                  {/* ====================================================== */}
                  {/* Original English Subtitle */}
                  {/* ====================================================== */}

                  <div className="space-y-3">
                    <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Original Subtitle (English)
                    </div>

                    <div
                      className="
                        rounded-lg
                        border
                        border-border
                        bg-muted/30
                        p-4
                        backdrop-blur-sm
                      "
                    >
                      <p className="text-base sm:text-lg font-medium text-foreground leading-relaxed">
                        &quot;You&apos;re a tough nut to crack.&quot;
                      </p>
                    </div>
                  </div>

                  {/* ====================================================== */}
                  {/* Divider with AI Badge */}
                  {/* ====================================================== */}

                  <div className="relative flex items-center gap-3 py-2">
                    <div className="flex-1 h-px bg-linear-to-r from-border via-border to-border" />
                    <Badge
                      className="
                        rounded-full
                        border
                        border-accent/40
                        bg-accent/10
                        px-3
                        py-1.5
                        text-accent
                        text-[11px]
                        font-bold
                        uppercase
                        tracking-wider
                        whitespace-nowrap
                      "
                    >
                      <Sparkles className="size-3 mr-1.5" />
                      DesiSub AI
                    </Badge>
                    <div className="flex-1 h-px bg-linear-to-l from-border via-border to-border" />
                  </div>

                  {/* ====================================================== */}
                  {/* Literal Translation (Bad) */}
                  {/* ====================================================== */}

                  <div className="relative space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-semibold text-destructive/80 uppercase tracking-wider">
                        Without AI (Literal)
                      </div>
                      <Badge
                        variant="destructive"
                        className="
                          h-6
                          rounded-full
                          border-destructive/30
                          bg-destructive/10
                          px-2.5
                          text-[10px]
                          font-semibold
                          text-destructive
                          uppercase
                          tracking-wider
                          hover:bg-destructive/10
                        "
                      >
                        ✗ Robotic
                      </Badge>
                    </div>

                    <div
                      className="
                        relative
                        overflow-hidden
                        rounded-lg
                        border
                        border-destructive/30
                        bg-destructive/5
                        p-4
                        backdrop-blur-sm
                      "
                    >
                      <div className="absolute inset-y-0 left-0 w-1 bg-destructive/50" />
                      <p className="text-sm leading-relaxed text-destructive/60 italic line-through">
                        তুমি একটি কঠিন বাদাম ফাটানোর জন্য।
                      </p>
                      <p className="text-xs text-destructive/50 mt-2">
                        (Word-for-word, nonsensical)
                      </p>
                    </div>
                  </div>

                  {/* ====================================================== */}
                  {/* Natural Translation (Good) */}
                  {/* ====================================================== */}

                  <div className="relative space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs font-semibold text-accent uppercase tracking-wider">
                        <Sparkles className="size-3.5" />
                        With DesiSub AI
                      </div>
                      <Badge
                        className="
                          h-6
                          rounded-full
                          border
                          border-accent/40
                          bg-accent/10
                          px-2.5
                          text-[10px]
                          font-semibold
                          text-accent
                          uppercase
                          tracking-wider
                          hover:bg-accent/10
                        "
                      >
                        ✓ Natural
                      </Badge>
                    </div>

                    <div
                      className="
                        relative
                        overflow-hidden
                        rounded-lg
                        border
                        border-accent/40
                        bg-linear-to-br
                        from-accent/10
                        to-accent/5
                        p-4
                        backdrop-blur-sm
                        shadow-lg
                        shadow-accent/10
                      "
                    >
                      <div className="absolute inset-y-0 left-0 w-1 bg-accent" />
                      <p className="text-lg font-semibold leading-relaxed text-foreground">
                        তোমাকে বোঝা বড় মুশকিল।
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        (Natural, contextual, preserves meaning and idiom)
                      </p>
                    </div>
                  </div>

                  {/* ====================================================== */}
                  {/* Footer Status */}
                  {/* ====================================================== */}

                  <div
                    className="
                      flex
                      items-center
                      justify-between
                      border-t
                      border-zinc-800/50
                      pt-4
                      text-[11px]
                      font-medium
                      text-zinc-400
                      uppercase
                      tracking-wider
                    "
                  >
                    <span className="flex items-center gap-2">
                      <CheckCircle2 className="size-3.5 text-emerald-500" />
                      Meaning Intact
                    </span>

                    <span className="flex items-center gap-2">
                      <Languages className="size-3.5 text-amber-400" />
                      Bengali • Hindi • Urdu
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Floating quality badge */}
              <div
                className="
                  absolute
                  -top-4
                  -right-2
                  hidden
                  sm:flex
                  items-center
                  gap-2
                  rounded-lg
                  border
                  border-amber-600/30
                  bg-zinc-900/90
                  px-4
                  py-2.5
                  shadow-lg
                  backdrop-blur-xl
                "
              >
                <div className="flex size-6 items-center justify-center rounded-md bg-amber-500/20">
                  <Sparkles className="size-3 text-amber-400" />
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-medium text-zinc-400">Context-Aware</p>
                  <p className="text-xs font-bold text-amber-300">Culturally Smart</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================================================================ */}
      {/* Bottom Fade */}
      {/* ================================================================ */}

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-zinc-950 via-zinc-950/50 to-transparent" />
    </section>
  );
}
