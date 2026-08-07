import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Dashboard — DesiSub',
  description: 'Your DesiSub dashboard. Translate subtitles, fix sync, and search.',
};

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return <div className="min-h-screen bg-background text-foreground flex flex-col">{children}</div>;
}
