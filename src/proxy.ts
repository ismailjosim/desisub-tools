import { NextRequest, NextResponse } from 'next/server';
import { getSessionCookie } from 'better-auth/cookies';

// Routes that require authentication
const PROTECTED_PREFIXES = ['/dashboard'];

// Routes that should redirect to dashboard if already authenticated
const AUTH_ROUTES = ['/login', '/register'];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check for session cookie (optimistic — fast, no DB round-trip)
  const sessionCookie = getSessionCookie(request);
  const isAuthenticated = Boolean(sessionCookie);

  // ── 1. Protect dashboard routes ───────────────────────────────────────
  const isProtected = PROTECTED_PREFIXES.some((prefix) => pathname.startsWith(prefix));

  if (isProtected && !isAuthenticated) {
    const loginUrl = new URL('/login', request.url);

    // Preserve original destination
    loginUrl.searchParams.set('from', pathname);

    return NextResponse.redirect(loginUrl);
  }

  // ── 2. Redirect authenticated users away from auth pages ──────────────
  const isAuthRoute = AUTH_ROUTES.some((route) => pathname === route);

  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Run proxy on all routes EXCEPT:
     * - Next.js internals (_next/static, _next/image)
     * - favicon
     * - API routes (handled by Better Auth)
     */
    '/((?!_next/static|_next/image|favicon.ico|api/).*)',
  ],
};
