'use client';

import * as React from 'react';
import { ThemeProvider } from 'next-themes';

export function NextThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={true}>
      {children}
    </ThemeProvider>
  );
}
