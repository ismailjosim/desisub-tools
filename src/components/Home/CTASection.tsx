import Link from 'next/link';
import { Subtitles, ArrowRight } from 'lucide-react';
import { FloatingOrb } from '../ui/FloatingOrb';

export function CTASection() {
  return (
    <section className="relative py-28 overflow-hidden">
      <FloatingOrb className="h-125 w-125 bg-primary/15 -right-40 top-0" delay={3} />

      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <div className="rounded-3xl border border-primary/20 bg-linear-to-b from-primary/10 to-violet-900/10 p-14 backdrop-blur-sm ring-1 ring-white/5">
          <div className="mb-8 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/20 ring-1 ring-primary/30">
            <Subtitles className="h-8 w-8 text-primary" strokeWidth={1.5} />
          </div>
          <h2 className="font-heading text-4xl font-bold tracking-tight text-white mb-4">
            Ready to get started?
          </h2>
          <p className="text-white/50 text-lg mb-10 leading-relaxed">
            Join thousands of Desi content fans who use DesiSub to watch their favorite films and
            series with perfect subtitles.
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
  );
}
