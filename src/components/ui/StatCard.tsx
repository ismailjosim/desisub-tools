import { Counter } from './Counter';

interface StatCardProps {
  value: number;
  suffix: string;
  label: string;
}

export function StatCard({ value, suffix, label }: StatCardProps) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="font-heading text-4xl font-bold tracking-tight text-foreground">
        <Counter end={value} suffix={suffix} />
      </div>
      <div className="text-sm text-muted-foreground font-medium">{label}</div>
    </div>
  );
}
