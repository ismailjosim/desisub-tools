import { ElementType } from 'react';

interface Props {
  icon: ElementType;
  title: string;
  description: string;
  gradient: string;
  badge?: string;
}

export default function FeatureCard({ icon: Icon, title, description, gradient, badge }: Props) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/2 p-8">
      <div
        className={`absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${gradient}`}
        style={{
          filter: 'blur(40px)',
          transform: 'scale(1.2)',
        }}
      />
      .
      <div className="relative z-10">
        <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10">
          <Icon className="h-7 w-7 text-primary" />
        </div>

        {badge && (
          <span className="mb-4 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs text-primary">
            {badge}
          </span>
        )}

        <h3 className="mb-3 text-xl font-semibold">{title}</h3>

        <p className="text-sm text-white/55">{description}</p>
      </div>
    </div>
  );
}
