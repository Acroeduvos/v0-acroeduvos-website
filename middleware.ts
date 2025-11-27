import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl
  
  // Get the host from the request
  const host = request.headers.get('host') || ''
  
  // Check if request is from allowed IP range (172.16.20.x)
  const clientIP = request.ip || 
    request.headers.get('x-forwarded-for') || 
    request.headers.get('x-real-ip') || 
    'unknown'
  
  // Allow localhost, acroeduvos.in, and 172.16.20.x range
  const isAllowedHost = 
    host.includes('localhost') ||
    host.includes('127.0.0.1') ||
    host.includes('acroeduvos.in') ||
    host.includes('172.16.20.')
  
  if (!isAllowedHost) {
    return NextResponse.json(
      { error: 'Access denied. Only localhost and acroeduvos.in are allowed.' },
      { status: 403 }
    )
  }
  
  // Add CORS headers for network access
  const response = NextResponse.next()
  
  response.headers.set('Access-Control-Allow-Origin', '*')
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  response.headers.set('Access-Control-Max-Age', '86400')
  
  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers: response.headers })
  }
  
  // Add dynamic page headers
  response.headers.set('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300')
  
  // Set dynamic content headers for acroeduvos.in
  if (host.includes('acroeduvos.in')) {
    response.headers.set('X-Frame-Options', 'SAMEORIGIN')
    response.headers.set('X-Content-Type-Options', 'nosniff')
    response.headers.set('Referrer-Policy', 'origin-when-cross-origin')
  }
  
  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
