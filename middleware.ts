import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  // Only protect routes that start with /admin
  // Except for the main /admin route which contains the login page
  if (request.nextUrl.pathname.startsWith('/admin') && 
      request.nextUrl.pathname !== '/admin') {
    
    // Check for the Supabase auth cookie
    // Note: Supabase automatically sets these cookies during auth processes
    const supabaseSession = request.cookies.get('sb-access-token')?.value;
    const hasSupabaseCookie = !!supabaseSession;
    
    // If there's no session, redirect to login
    if (!hasSupabaseCookie) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }
  
  // For all other routes, allow the request to proceed
  return NextResponse.next();
}

// Only run middleware on admin routes
export const config = {
  matcher: '/admin/:path*',
};