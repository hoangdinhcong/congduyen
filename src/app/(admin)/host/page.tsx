import React from 'react';
import { Metadata } from 'next';
import AdminLayout from '@/components/admin/AdminLayout';
import DashboardStats from '@/components/admin/DashboardStats';

export const metadata: Metadata = {
  title: 'Admin Dashboard | Cong & Duyen Wedding',
  description: 'Admin dashboard for Cong & Duyen wedding invitation website',
};

export default function AdminDashboardPage() {
  return (
    <AdminLayout>
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="py-4">
            <DashboardStats />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
