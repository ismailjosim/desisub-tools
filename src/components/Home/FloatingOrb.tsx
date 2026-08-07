interface Props {
  className?: string;
  delay?: number;
}

export default function FloatingOrb({ className, delay = 0 }: Props) {
  return (
    <div
      className={`absolute rounded-full blur-3xl pointer-events-none ${className}`}
      style={{
        animation: `float ${6 + delay}s ease-in-out infinite`,
        animationDelay: `${delay}s`,
      }}
    />
  );
}
