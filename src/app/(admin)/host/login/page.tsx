import React from 'react';
import { Metadata } from 'next';
import LoginForm from '../../../../components/admin/LoginForm';

export const metadata: Metadata = {
  title: 'Admin Login | Cong & Duyen Wedding',
  description: 'Admin login for Cong & Duyen wedding invitation website',
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-heading font-medium text-secondary">
            Admin Login
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Please enter your credentials to access the admin panel
          </p>
        </div>
        
        <LoginForm />
      </div>
    </div>
  );
}
