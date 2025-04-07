import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname;
  
  // Check if the path is for the admin area (except the login page)
  const isAdminPath = path.startsWith('/host') && !path.startsWith('/host/login');
  
  // Check if the user is authenticated
  const adminSession = request.cookies.get('admin_session')?.value;
  
  // If the user is not authenticated and trying to access admin area, redirect to login
  if (isAdminPath && !adminSession) {
    const url = new URL('/host/login', request.url);
    return NextResponse.redirect(url);
  }
  
  // If the user is authenticated and trying to access login page, redirect to admin dashboard
  if (path.startsWith('/host/login') && adminSession) {
    const url = new URL('/host', request.url);
    return NextResponse.redirect(url);
  }
  
  return NextResponse.next();
}

// Configure the middleware to run only on specific paths
export const config = {
  matcher: ['/host/:path*'],
};
