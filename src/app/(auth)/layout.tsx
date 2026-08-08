import React from 'react';
import Link from 'next/link';
import { Film } from 'lucide-react';
import { ThemeToggler } from '@/components/ui/ThemeToggler';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground transition-colors duration-300">
      <header className="absolute top-0 w-full p-6 flex items-center justify-between z-20">
        <Link
          href="/"
          className="flex items-center gap-2 text-primary font-heading font-bold text-xl hover:opacity-80 transition-opacity"
        >
          <Film className="w-6 h-6" />
          DesiSub
        </Link>
        <ThemeToggler />
      </header>
      <main className="flex-1 flex items-center justify-center p-6 sm:p-12 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 dark:bg-primary/25 rounded-full blur-[140px] pointer-events-none" />

        <div className="w-full max-w-md relative z-10 glass p-8 sm:p-10 rounded-2xl shadow-xl">
          {children}
        </div>
      </main>
    </div>
  );
}
