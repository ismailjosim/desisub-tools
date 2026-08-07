import Link from 'next/link';
import { Subtitles } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative border-t border-white/5 py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center gap-8 sm:flex-row sm:justify-between">
          {/* Brand */}
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Subtitles className="h-4 w-4 text-white" strokeWidth={2} />
            </div>

            <span className="font-heading text-base font-semibold text-white">DesiSub</span>

            <span className="ml-2 text-sm text-white/30">© {new Date().getFullYear()}</span>
          </div>

          {/* Links */}
          <nav className="flex items-center gap-6 text-sm text-white/35">
            <a href="#features" className="transition-colors hover:text-white/70">
              Features
            </a>

            <a href="#how-it-works" className="transition-colors hover:text-white/70">
              How it works
            </a>

            <Link href="/register" className="transition-colors hover:text-white/70">
              Sign up
            </Link>

            <Link href="/login" className="transition-colors hover:text-white/70">
              Sign in
            </Link>
          </nav>

          {/* Social */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-white/40 transition-all hover:border-white/20 hover:text-white/80"
            >
              GitHub
            </a>

            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-white/40 transition-all hover:border-white/20 hover:text-white/80"
            >
              X
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 border-t border-white/5 pt-8 text-center text-xs text-white/20">
          Built for Desi cinema lovers. Translate. Sync. Enjoy.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
