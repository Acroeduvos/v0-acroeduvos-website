import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Handle auth routes
  if (pathname.startsWith('/auth/')) {
    return NextResponse.rewrite(new URL(pathname, request.url))
  }

  // Handle IDE route
  if (pathname === '/ide') {
    return NextResponse.rewrite(new URL('/ide/page', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/auth/:path*', '/ide'],
}
