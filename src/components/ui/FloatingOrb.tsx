import { cn } from '@/lib/cn';

interface FloatingOrbProps {
  className?: string;
  delay?: number;
}

export function FloatingOrb({ className, delay = 0 }: FloatingOrbProps) {
  return (
    <div
      className={cn('absolute rounded-full blur-3xl pointer-events-none', className)}
      style={{
        animation: `float ${6 + delay}s ease-in-out infinite`,
        animationDelay: `${delay}s`,
      }}
    />
  );
}
