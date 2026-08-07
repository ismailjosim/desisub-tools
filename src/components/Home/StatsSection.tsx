import { StatCard } from '../ui/StatCard';

export function StatsSection() {
  return (
    <section id="stats" className="relative py-20 overflow-hidden">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            'radial-gradient(ellipse 60% 80% at 50% 50%, hsla(252,75%,52%,0.08), transparent)',
        }}
      />
      <div className="relative mx-auto max-w-5xl px-6">
        <div className="rounded-2xl border border-white/5 bg-white/2 p-10 backdrop-blur-sm">
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
            <StatCard value={50000} suffix="+" label="Subtitles Translated" />
            <StatCard value={12} suffix="+" label="Languages Supported" />
            <StatCard value={99} suffix="%" label="Sync Accuracy" />
            <StatCard value={5000} suffix="+" label="Happy Users" />
          </div>
        </div>
      </div>
    </section>
  );
}
