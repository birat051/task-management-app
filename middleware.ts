import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  const sessionToken:string | undefined=request.cookies.get('next-auth.session-token')?.value
  const loggedInUserAccessPaths=request.nextUrl.pathname === '/signin' || request.nextUrl.pathname === '/signup'
  if(loggedInUserAccessPaths)
  {
    if(sessionToken)
    return NextResponse.redirect(new URL('/', request.url))
  }
  else{
    if(!sessionToken)
    return NextResponse.redirect(new URL('/signin', request.url))
  }
}
 
export const config = {
  matcher: [
    '/signin',
    '/signup',
    '/',
  ]
}