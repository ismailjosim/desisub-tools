"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  Subtitles,
  Wand2,
  Timer,
  Search,
  ArrowRight,
  Zap,
  Globe,
  FileText,
  ChevronRight,
  Star,
  Play,
} from "lucide-react";

// ─── Utility ────────────────────────────────────────────────────────────────
function cn(...classes: (string | undefined | false | null)[]) {
  return classes.filter(Boolean).join(" ");
}

// ─── Animated Counter ────────────────────────────────────────────────────────
function Counter({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const duration = 1500;
          const step = Math.ceil(end / (duration / 16));
          const timer = setInterval(() => {
            start += step;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(start);
            }
          }, 16);
          observer.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

// ─── Floating Orb ────────────────────────────────────────────────────────────
function FloatingOrb({
  className,
  delay = 0,
}: {
  className?: string;
  delay?: number;
}) {
  return (
    <div
      className={cn(
        "absolute rounded-full blur-3xl pointer-events-none",
        className,
      )}
      style={{
        animation: `float ${6 + delay}s ease-in-out infinite`,
        animationDelay: `${delay}s`,
      }}
    />
  );
}

// ─── Feature Card ─────────────────────────────────────────────────────────────
function FeatureCard({
  icon: Icon,
  title,
  description,
  gradient,
  badge,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  gradient: string;
  badge?: string;
}) {
  return (
    <div className="feature-card group relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.03] p-8 transition-all duration-300 hover:-translate-y-1 hover:border-white/10 hover:bg-white/[0.06] hover:shadow-2xl">
      <div
        className={cn(
          "absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 rounded-2xl",
          gradient,
        )}
        style={{ filter: "blur(40px)", transform: "scale(1.2)" }}
      />

      <div className="relative z-10">
        <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10 transition-all duration-300 group-hover:ring-white/20">
          <Icon className="h-7 w-7 text-primary" strokeWidth={1.5} />
        </div>

        {badge && (
          <span className="mb-4 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary ring-1 ring-primary/20">
            {badge}
          </span>
        )}

        <h3 className="mb-3 font-heading text-xl font-semibold text-white/95">
          {title}
        </h3>
        <p className="text-sm leading-relaxed text-white/55">{description}</p>
      </div>
    </div>
  );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({
  value,
  suffix,
  label,
}: {
  value: number;
  suffix: string;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="font-heading text-4xl font-bold tracking-tight text-white">
        <Counter end={value} suffix={suffix} />
      </div>
      <div className="text-sm text-white/45 font-medium">{label}</div>
    </div>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-[hsl(240,20%,6%)]/90 backdrop-blur-xl border-b border-white/5 shadow-2xl"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary shadow-lg shadow-primary/30 transition-transform duration-150 group-hover:scale-105">
            <Subtitles className="h-4 w-4 text-white" strokeWidth={2} />
          </div>
          <span className="font-heading text-lg font-semibold text-white tracking-tight">
            DesiSub
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-6 text-sm text-white/50">
          <a
            href="#features"
            className="hover:text-white transition-colors duration-150"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="hover:text-white transition-colors duration-150"
          >
            How it works
          </a>
          <a
            href="#stats"
            className="hover:text-white transition-colors duration-150"
          >
            Stats
          </a>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="text-sm font-medium text-white/60 hover:text-white transition-colors duration-150 hidden sm:block"
          >
            Sign in
          </Link>
          <Link
            href="/register"
            className="flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all duration-150 hover:bg-primary/90 hover:scale-[1.02] hover:shadow-primary/40"
          >
            Get Started
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </nav>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function LandingPage() {
  return (
    <>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-20px) scale(1.05); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .hero-text-gradient {
          background: linear-gradient(135deg, #fff 30%, hsl(252, 85%, 72%), hsl(280, 80%, 70%));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .badge-glow {
          box-shadow: 0 0 20px hsla(252, 75%, 52%, 0.4), inset 0 1px 0 hsla(255,100%,100%,0.08);
        }
        .cta-glow {
          box-shadow: 0 0 40px hsla(252, 75%, 52%, 0.35), 0 8px 24px hsla(0,0%,0%,0.5);
        }
        .cta-glow:hover {
          box-shadow: 0 0 60px hsla(252, 75%, 52%, 0.5), 0 12px 32px hsla(0,0%,0%,0.5);
        }
        .grid-bg {
          background-image: linear-gradient(hsla(252,100%,70%,0.05) 1px, transparent 1px),
            linear-gradient(90deg, hsla(252,100%,70%,0.05) 1px, transparent 1px);
          background-size: 60px 60px;
        }
        .fade-in-up {
          animation: fadeInUp 0.7s ease forwards;
        }
        .fade-in-up-1 { animation-delay: 0.1s; opacity: 0; }
        .fade-in-up-2 { animation-delay: 0.25s; opacity: 0; }
        .fade-in-up-3 { animation-delay: 0.4s; opacity: 0; }
        .fade-in-up-4 { animation-delay: 0.55s; opacity: 0; }
      `}</style>

      <div className="relative min-h-screen overflow-x-hidden bg-[hsl(240,20%,6%)] text-white">
        <Navbar />

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 grid-bg opacity-40" />

          <FloatingOrb
            className="h-[600px] w-[600px] bg-primary/20 -top-40 -left-20"
            delay={0}
          />
          <FloatingOrb
            className="h-[500px] w-[500px] bg-violet-600/15 -bottom-20 -right-20"
            delay={2}
          />
          <FloatingOrb
            className="h-[300px] w-[300px] bg-amber-500/10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            delay={4}
          />

          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 50% 0%, hsla(252,75%,52%,0.12) 0%, transparent 70%)",
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
              <span className="text-white/90">for Desi Cinema</span>
            </h1>

            <p className="fade-in-up fade-in-up-3 mx-auto max-w-2xl text-lg leading-relaxed text-white/50 mb-10">
              Translate subtitles with AI into natural-sounding Bangla, Hindi &
              Urdu. Fix sync issues instantly. Download from the world&apos;s
              largest subtitle database. All in one place.
            </p>

            <div className="fade-in-up fade-in-up-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/register"
                id="hero-cta-register"
                className="group flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-base font-semibold text-white cta-glow transition-all duration-200 hover:scale-[1.03] hover:bg-primary/90"
              >
                Start for Free
                <ArrowRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-1" />
              </Link>
              <a
                href="#features"
                id="hero-see-features"
                className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-8 py-4 text-base font-medium text-white/80 backdrop-blur-sm transition-all duration-200 hover:border-white/20 hover:bg-white/10 hover:text-white"
              >
                <Play className="h-4 w-4" />
                See Features
              </a>
            </div>

            <div className="fade-in-up fade-in-up-4 mt-12 flex items-center justify-center gap-6 text-sm text-white/35">
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                No credit card required
              </span>
              <span className="h-3 w-px bg-white/10" />
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Free tier available
              </span>
              <span className="h-3 w-px bg-white/10 hidden sm:block" />
              <span className="hidden sm:flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Open source friendly
              </span>
            </div>
          </div>

          <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[hsl(240,20%,6%)] to-transparent" />
        </section>

        {/* ── STATS ────────────────────────────────────────────────────────── */}
        <section id="stats" className="relative py-20 overflow-hidden">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background:
                "radial-gradient(ellipse 60% 80% at 50% 50%, hsla(252,75%,52%,0.08), transparent)",
            }}
          />
          <div className="relative mx-auto max-w-5xl px-6">
            <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-10 backdrop-blur-sm">
              <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
                <StatCard
                  value={50000}
                  suffix="+"
                  label="Subtitles Translated"
                />
                <StatCard value={12} suffix="+" label="Languages Supported" />
                <StatCard value={99} suffix="%" label="Sync Accuracy" />
                <StatCard value={5000} suffix="+" label="Happy Users" />
              </div>
            </div>
          </div>
        </section>

        {/* ── FEATURES ─────────────────────────────────────────────────────── */}
        <section id="features" className="relative py-28">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-16 text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-white/50">
                <Globe className="h-3.5 w-3.5" />
                Three Powerful Tools
              </div>
              <h2 className="font-heading text-4xl font-bold tracking-tight text-white sm:text-5xl">
                Everything you need for
                <br />
                <span className="hero-text-gradient">perfect subtitles</span>
              </h2>
              <p className="mt-4 text-white/45 text-lg max-w-2xl mx-auto">
                From AI translation to sync fixing to worldwide search — DesiSub
                handles the entire subtitle workflow.
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

        {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
        <section id="how-it-works" className="relative py-28 overflow-hidden">
          <FloatingOrb
            className="h-[400px] w-[400px] bg-primary/10 -left-40 top-20"
            delay={1}
          />

          <div className="relative mx-auto max-w-5xl px-6">
            <div className="mb-16 text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-white/50">
                <Zap className="h-3.5 w-3.5" />
                Three simple steps
              </div>
              <h2 className="font-heading text-4xl font-bold tracking-tight text-white sm:text-5xl">
                Ready in under a minute
              </h2>
            </div>

            <div className="relative grid gap-8 sm:grid-cols-3">
              <div className="absolute top-12 left-[calc(16.66%+1.5rem)] right-[calc(16.66%+1.5rem)] hidden h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent sm:block" />

              {[
                {
                  step: "01",
                  icon: FileText,
                  title: "Upload your file",
                  desc: "Drag and drop your SRT or VTT subtitle file. No account needed for sync — sign up for AI translation.",
                },
                {
                  step: "02",
                  icon: Wand2,
                  title: "Choose your tool",
                  desc: "Translate to Bangla/Hindi, fix sync timing, or search the global database — pick what you need.",
                },
                {
                  step: "03",
                  icon: Globe,
                  title: "Download & enjoy",
                  desc: "Get your perfect subtitle file in seconds. Load it in VLC, Plex, or any media player.",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="flex flex-col items-center text-center gap-4"
                >
                  <div className="relative flex h-24 w-24 items-center justify-center">
                    <div className="absolute inset-0 rounded-full bg-primary/10 ring-1 ring-primary/20" />
                    <div
                      className="absolute inset-0 rounded-full bg-primary/5 ring-1 ring-primary/10"
                      style={{ transform: "scale(1.2)" }}
                    />
                    <item.icon
                      className="relative h-9 w-9 text-primary"
                      strokeWidth={1.5}
                    />
                    <div className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white shadow-lg shadow-primary/40">
                      {item.step}
                    </div>
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-white/90">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-white/45 max-w-xs">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA SECTION ──────────────────────────────────────────────────── */}
        <section className="relative py-28 overflow-hidden">
          <FloatingOrb
            className="h-[500px] w-[500px] bg-primary/15 -right-40 top-0"
            delay={3}
          />

          <div className="relative mx-auto max-w-3xl px-6 text-center">
            <div className="rounded-3xl border border-primary/20 bg-gradient-to-b from-primary/10 to-violet-900/10 p-14 backdrop-blur-sm ring-1 ring-white/5">
              <div className="mb-8 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/20 ring-1 ring-primary/30">
                <Subtitles className="h-8 w-8 text-primary" strokeWidth={1.5} />
              </div>
              <h2 className="font-heading text-4xl font-bold tracking-tight text-white mb-4">
                Ready to get started?
              </h2>
              <p className="text-white/50 text-lg mb-10 leading-relaxed">
                Join thousands of Desi content fans who use DesiSub to watch
                their favorite films and series with perfect subtitles.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/register"
                  id="cta-section-register"
                  className="group flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-base font-semibold text-white cta-glow transition-all duration-200 hover:scale-[1.03] hover:bg-primary/90"
                >
                  Create free account
                  <ArrowRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/login"
                  id="cta-section-login"
                  className="rounded-xl border border-white/10 bg-white/5 px-8 py-4 text-base font-medium text-white/75 backdrop-blur-sm transition-all duration-200 hover:border-white/20 hover:bg-white/10 hover:text-white"
                >
                  Sign in instead
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── FOOTER ───────────────────────────────────────────────────────── */}
        <footer className="relative border-t border-white/5 py-12">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex flex-col items-center gap-8 sm:flex-row sm:justify-between">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                  <Subtitles className="h-4 w-4 text-white" strokeWidth={2} />
                </div>
                <span className="font-heading text-base font-semibold text-white">
                  DesiSub
                </span>
                <span className="text-sm text-white/30 ml-2">
                  © {new Date().getFullYear()}
                </span>
              </div>

              <nav className="flex items-center gap-6 text-sm text-white/35">
                <a
                  href="#features"
                  className="hover:text-white/70 transition-colors"
                >
                  Features
                </a>
                <a
                  href="#how-it-works"
                  className="hover:text-white/70 transition-colors"
                >
                  How it works
                </a>
                <Link
                  href="/register"
                  className="hover:text-white/70 transition-colors"
                >
                  Sign up
                </Link>
                <Link
                  href="/login"
                  className="hover:text-white/70 transition-colors"
                >
                  Sign in
                </Link>
              </nav>

              <div className="flex items-center gap-3">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-white/40 transition-all duration-150 hover:border-white/20 hover:text-white/80"
                >
                  {/* <Github className="h-4 w-4" /> */}
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-white/40 transition-all duration-150 hover:border-white/20 hover:text-white/80"
                >
                  {/* <Twitter className="h-4 w-4" /> */}
                </a>
              </div>
            </div>

            <div className="mt-8 border-t border-white/5 pt-8 text-center text-xs text-white/20">
              Built for Desi cinema lovers. Translate. Sync. Enjoy.
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
