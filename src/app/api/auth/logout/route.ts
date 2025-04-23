import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  try {
    // Clear the admin session cookie
    const cookieStore = await cookies();
    cookieStore.delete('admin_session');

    return NextResponse.json(
      { message: 'Đăng xuất thành công' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { message: 'Đã xảy ra lỗi khi đăng xuất' },
      { status: 500 }
    );
  }
}
