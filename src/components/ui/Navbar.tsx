'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Subtitles, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/cn';
import { ThemeToggler } from '@/components/ui/ThemeToggler';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <nav
      className={cn(
        'fixed top-0 inset-x-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-background/90 backdrop-blur-xl border-b border-border shadow-2xl'
          : 'bg-transparent'
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary shadow-lg shadow-primary/30 transition-transform duration-150 group-hover:scale-105">
            <Subtitles className="h-4 w-4 text-primary-foreground" strokeWidth={2} />
          </div>
          <span className="font-heading text-lg font-semibold text-foreground tracking-tight">
            DesiSub
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
          <a href="#features" className="hover:text-foreground transition-colors duration-150">
            Features
          </a>
          <a href="#how-it-works" className="hover:text-foreground transition-colors duration-150">
            How it works
          </a>
          <a href="#stats" className="hover:text-foreground transition-colors duration-150">
            Stats
          </a>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggler />
          <Link
            href="/login"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-150 hidden sm:block"
          >
            Sign in
          </Link>
          <Link
            href="/register"
            className="flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-150 hover:bg-primary/90 hover:scale-[1.02] hover:shadow-primary/40"
          >
            Get Started
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </nav>
  );
}
