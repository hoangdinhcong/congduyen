import React from 'react';
import { Metadata } from 'next';
import LoginForm from '@/components/admin/LoginForm';

export const metadata: Metadata = {
  title: 'Đăng nhập quản trị | Thiệp cưới Công & Duyên',
  description: 'Trang đăng nhập cho quản trị viên thiệp cưới Công & Duyên',
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-heading font-medium">
            Đăng nhập
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Vui lòng nhập mật khẩu để truy cập trang quản trị
          </p>
        </div>

        <LoginForm />
      </div>
    </div>
  );
}
