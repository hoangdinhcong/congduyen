import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();
    
    // Get the hashed password from environment variables
    const hashedPassword = process.env.ADMIN_PASSWORD_HASH;
    
    if (!hashedPassword) {
      console.error('Admin password hash not set in environment variables');
      return NextResponse.json(
        { message: 'Server configuration error' },
        { status: 500 }
      );
    }
    
    // Compare the submitted password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, hashedPassword);
    
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: 'Invalid password' },
        { status: 401 }
      );
    }
    
    // Set a cookie to maintain the session
    const cookieStore = cookies();
    cookieStore.set('admin_session', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/',
      sameSite: 'strict',
    });
    
    return NextResponse.json(
      { message: 'Login successful' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'An error occurred during login' },
      { status: 500 }
    );
  }
}
