"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import {
  Subtitles,
  Wand2,
  Timer,
  Search,
  LogOut,
  ArrowRight,
} from "lucide-react";

const TOOLS = [
  {
    id: "translate",
    icon: Wand2,
    label: "AI Translator",
    description: "Translate subtitles into Bangla, Hindi, or Urdu with GPT-4o-mini.",
    href: "/translate",
    badge: "Coming Soon",
    gradient: "from-primary/20 to-violet-700/10",
  },
  {
    id: "sync",
    icon: Timer,
    label: "Sync Fixer",
    description: "Map subtitle text onto correct timestamps instantly, in your browser.",
    href: "/sync",
    badge: "Coming Soon",
    gradient: "from-emerald-600/20 to-teal-700/10",
  },
  {
    id: "search",
    icon: Search,
    label: "Subtitle Search",
    description: "Search millions of subtitles by title or IMDB ID and download in one click.",
    href: "/search",
    badge: "Coming Soon",
    gradient: "from-amber-500/20 to-orange-700/10",
  },
] as const;

export default function DashboardPage() {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  async function handleLogout() {
    await authClient.signOut();
    router.push("/login");
  }

  const displayName =
    session?.user?.name || session?.user?.email?.split("@")[0] || "there";

  return (
    <div className="relative min-h-screen overflow-hidden bg-[hsl(240,20%,6%)]">
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% -10%, hsla(252,75%,52%,0.10) 0%, transparent 70%)",
        }}
      />

      {/* ── Top bar ────────────────────────────────────────────────────────── */}
      <header className="relative z-10 border-b border-white/5 bg-[hsl(240,20%,6%)]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary shadow-lg shadow-primary/30 transition-transform duration-150 group-hover:scale-105">
              <Subtitles className="h-4 w-4 text-white" strokeWidth={2} />
            </div>
            <span className="font-heading text-lg font-semibold text-white tracking-tight">
              DesiSub
            </span>
          </Link>

          {/* User + logout */}
          <div className="flex items-center gap-4">
            {session?.user?.email && (
              <span className="hidden text-sm text-white/40 sm:block">
                {session.user.email}
              </span>
            )}
            <button
              id="dashboard-logout-btn"
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/60 transition-all duration-150 hover:border-white/20 hover:bg-white/10 hover:text-white"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </div>
        </div>
      </header>

      {/* ── Main content ───────────────────────────────────────────────────── */}
      <main className="relative z-10 mx-auto max-w-7xl px-6 py-16">
        {/* Welcome */}
        <div className="mb-14">
          <p className="mb-1 text-sm font-medium text-primary">Welcome back</p>
          <h1 className="font-heading text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Hey, {displayName} 👋
          </h1>
          <p className="mt-3 text-white/45 text-lg">
            Choose a tool below to get started. More features coming soon.
          </p>
        </div>

        {/* Tool cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TOOLS.map((tool) => (
            <div
              key={tool.id}
              id={`dashboard-tool-${tool.id}`}
              className={`group relative overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-br ${tool.gradient} p-8 transition-all duration-300 hover:-translate-y-1 hover:border-white/10 hover:shadow-2xl`}
            >
              {/* Icon */}
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10 transition-all duration-300 group-hover:ring-white/20">
                <tool.icon className="h-6 w-6 text-primary" strokeWidth={1.5} />
              </div>

              {/* Badge */}
              <span className="mb-4 inline-block rounded-full bg-white/5 px-2.5 py-1 text-xs font-semibold text-white/40 ring-1 ring-white/10">
                {tool.badge}
              </span>

              <h2 className="mb-2 font-heading text-xl font-semibold text-white/90">
                {tool.label}
              </h2>
              <p className="mb-6 text-sm leading-relaxed text-white/45">
                {tool.description}
              </p>

              <Link
                href={tool.href}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-primary/70 transition-all duration-150 hover:text-primary group-hover:gap-2.5"
              >
                Open tool
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>

        {/* Phase notice */}
        <div className="mt-16 rounded-2xl border border-primary/10 bg-primary/5 p-6 text-center">
          <p className="text-sm text-white/35">
            <span className="font-semibold text-primary/60">Phase 01 complete.</span>{" "}
            Subtitle tools are being built in Phase 02–04. Stay tuned.
          </p>
        </div>
      </main>
    </div>
  );
}
