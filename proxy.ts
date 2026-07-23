import { NextRequest, NextResponse } from 'next/server'

export default function proxy(request: NextRequest) {
  const session = request.cookies.get('bm_session')?.value
  const { pathname } = request.nextUrl

  // Protect dashboard and admin routes
  const protectedPrefixes = ['/dashboard', '/admin']
  const isProtected = protectedPrefixes.some((p) => pathname.startsWith(p))

  if (isProtected && !session) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('from', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Redirect logged-in users away from auth pages
  const authPaths = ['/login', '/register', '/verify-otp']
  const isAuth = authPaths.some((p) => pathname.startsWith(p))
  if (isAuth && session) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/admin/:path*',
    '/login',
    '/register',
    '/verify-otp',
  ],
}
