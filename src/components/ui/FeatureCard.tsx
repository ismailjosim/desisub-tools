import { cn } from '@/lib/cn';

interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  gradient: string;
  badge?: string;
}

export function FeatureCard({ icon: Icon, title, description, gradient, badge }: FeatureCardProps) {
  return (
    <div className="feature-card group relative overflow-hidden rounded-2xl border border-white/5 bg-white/3 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-white/10 hover:bg-white/6 hover:shadow-2xl">
      <div
        className={cn(
          'absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 rounded-2xl',
          gradient
        )}
        style={{ filter: 'blur(40px)', transform: 'scale(1.2)' }}
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

        <h3 className="mb-3 font-heading text-xl font-semibold text-white/95">{title}</h3>
        <p className="text-sm leading-relaxed text-white/55">{description}</p>
      </div>
    </div>
  );
}
