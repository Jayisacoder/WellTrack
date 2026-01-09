import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request) {
  const { pathname } = request.nextUrl
  
  // Protect LP Staff pages
  const protectedRoutes = ['/rubric-evidence', '/reflection']
  
  if (protectedRoutes.some(route => pathname.startsWith(route))) {
    const token = await getToken({ 
      req: request, 
      secret: process.env.NEXTAUTH_SECRET || 'development-secret-do-not-use-in-production'
    })
    
    // Check if user is authenticated
    if (!token) {
      const url = new URL('/auth/signin', request.url)
      url.searchParams.set('callbackUrl', pathname)
      return NextResponse.redirect(url)
    }
    
    // Check if user is LP staff (admin role)
    const lpStaffEmails = process.env.LP_STAFF_EMAILS?.split(',').map(e => e.trim().toLowerCase()) || []
    const userEmail = token.email?.toLowerCase()
    
    if (!userEmail || !lpStaffEmails.includes(userEmail)) {
      return NextResponse.redirect(new URL('/unauthorized', request.url))
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/rubric-evidence/:path*', '/reflection/:path*']
}
