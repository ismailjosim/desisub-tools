import React from "react";
import Link from "next/link";
import { Film } from "lucide-react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="absolute top-0 w-full p-6">
        <Link href="/" className="flex items-center gap-2 text-primary font-heading font-bold text-xl hover:text-primary-400 transition-colors">
          <Film className="w-6 h-6" />
          DesiSub
        </Link>
      </header>
      <main className="flex-1 flex items-center justify-center p-6 sm:p-12 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-900/20 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="w-full max-w-md relative z-10 glass p-8 sm:p-12 rounded-xl">
          {children}
        </div>
      </main>
    </div>
  );
}
