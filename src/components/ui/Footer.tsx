import Link from 'next/link';
import { Subtitles } from 'lucide-react';

export function Footer() {
  return (
    <footer className="relative border-t border-white/5 py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center gap-8 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Subtitles className="h-4 w-4 text-white" strokeWidth={2} />
            </div>
            <span className="font-heading text-base font-semibold text-white">DesiSub</span>
            <span className="text-sm text-white/30 ml-2">© {new Date().getFullYear()}</span>
          </div>

          <nav className="flex items-center gap-6 text-sm text-white/35">
            <a href="#features" className="hover:text-white/70 transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="hover:text-white/70 transition-colors">
              How it works
            </a>
            <Link href="/register" className="hover:text-white/70 transition-colors">
              Sign up
            </Link>
            <Link href="/login" className="hover:text-white/70 transition-colors">
              Sign in
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-white/40 transition-all duration-150 hover:border-white/20 hover:text-white/80"
            >
              {/* <Github className="h-4 w-4" /> */}
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-white/40 transition-all duration-150 hover:border-white/20 hover:text-white/80"
            >
              {/* <Twitter className="h-4 w-4" /> */}
            </a>
          </div>
        </div>

        <div className="mt-8 border-t border-white/5 pt-8 text-center text-xs text-white/20">
          Built for Desi cinema lovers. Translate. Sync. Enjoy.
        </div>
      </div>
    </footer>
  );
}
