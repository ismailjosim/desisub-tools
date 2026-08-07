'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ChevronRight, Subtitles } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-white/5 bg-[hsl(240,20%,6%)]/90 shadow-2xl backdrop-blur-xl'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Subtitles className="h-5 w-5 text-white" strokeWidth={2} />
          </div>

          <span className="font-heading text-lg font-semibold text-white">DesiSub</span>
        </Link>

        {/* Navigation */}
        <div className="hidden items-center gap-6 text-sm text-white/50 md:flex">
          <a href="#features" className="transition-colors hover:text-white">
            Features
          </a>

          <a href="#how-it-works" className="transition-colors hover:text-white">
            How it works
          </a>

          <a href="#stats" className="transition-colors hover:text-white">
            Stats
          </a>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="hidden text-sm font-medium text-white/60 transition-colors hover:text-white sm:block"
          >
            Sign in
          </Link>

          <Link
            href="/register"
            className="flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:scale-[1.02] hover:bg-primary/90"
          >
            Get Started
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
