import { FileText, Wand2, Globe, Zap } from 'lucide-react';
import { FloatingOrb } from '../ui/FloatingOrb';

const STEPS = [
  {
    step: '01',
    icon: FileText,
    title: 'Upload your file',
    desc: 'Drag and drop your SRT or VTT subtitle file. No account needed for sync — sign up for AI translation.',
  },
  {
    step: '02',
    icon: Wand2,
    title: 'Choose your tool',
    desc: 'Translate to Bangla/Hindi, fix sync timing, or search the global database — pick what you need.',
  },
  {
    step: '03',
    icon: Globe,
    title: 'Download & enjoy',
    desc: 'Get your perfect subtitle file in seconds. Load it in VLC, Plex, or any media player.',
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative py-28 overflow-hidden">
      <FloatingOrb className="h-100 w-100 bg-primary/10 -left-40 top-20" delay={1} />

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
          <div className="absolute top-12 left-[calc(16.66%+1.5rem)] right-[calc(16.66%+1.5rem)] hidden h-px bg-linear-to-r from-transparent via-primary/40 to-transparent sm:block" />

          {STEPS.map((item) => (
            <div key={item.step} className="flex flex-col items-center text-center gap-4">
              <div className="relative flex h-24 w-24 items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-primary/10 ring-1 ring-primary/20" />
                <div
                  className="absolute inset-0 rounded-full bg-primary/5 ring-1 ring-primary/10"
                  style={{ transform: 'scale(1.2)' }}
                />
                <item.icon className="relative h-9 w-9 text-primary" strokeWidth={1.5} />
                <div className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white shadow-lg shadow-primary/40">
                  {item.step}
                </div>
              </div>
              <h3 className="font-heading text-lg font-semibold text-white/90">{item.title}</h3>
              <p className="text-sm leading-relaxed text-white/45 max-w-xs">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
