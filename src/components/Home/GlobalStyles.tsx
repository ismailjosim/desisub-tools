export function GlobalStyles() {
  return (
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
        background: linear-gradient(135deg, hsl(var(--foreground)) 30%, hsl(252, 85%, 72%), hsl(280, 80%, 70%));
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
      .dark .cta-glow {
        box-shadow: 0 0 40px hsla(252, 75%, 52%, 0.35), 0 8px 24px hsla(0,0%,0%,0.5);
      }
      .dark .cta-glow:hover {
        box-shadow: 0 0 60px hsla(252, 75%, 52%, 0.5), 0 12px 32px hsla(0,0%,0%,0.5);
      }
      :root .cta-glow {
        box-shadow: 0 0 30px hsla(252, 75%, 52%, 0.2), 0 8px 24px hsla(0,0%,0%,0.1);
      }
      :root .cta-glow:hover {
        box-shadow: 0 0 50px hsla(252, 75%, 52%, 0.3), 0 12px 32px hsla(0,0%,0%,0.15);
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
  );
}
