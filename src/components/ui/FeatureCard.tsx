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
    <div className="feature-card group relative overflow-hidden rounded-2xl border border-border bg-foreground/3 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-foreground/10 hover:bg-foreground/6 hover:shadow-2xl">
      <div
        className={cn(
          'absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 rounded-2xl',
          gradient
        )}
        style={{ filter: 'blur(40px)', transform: 'scale(1.2)' }}
      />

      <div className="relative z-10">
        <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-foreground/5 ring-1 ring-foreground/10 transition-all duration-300 group-hover:ring-foreground/20">
          <Icon className="h-7 w-7 text-primary" strokeWidth={1.5} />
        </div>

        {badge && (
          <span className="mb-4 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary ring-1 ring-primary/20">
            {badge}
          </span>
        )}

        <h3 className="mb-3 font-heading text-xl font-semibold text-foreground/95">{title}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
