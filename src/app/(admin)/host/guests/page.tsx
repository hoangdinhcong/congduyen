import React from 'react';
import { Metadata } from 'next';
import AdminLayout from '@/components/admin/AdminLayout';
import GuestList from '@/components/admin/GuestList';

export const metadata: Metadata = {
  title: 'Quản lý khách mời | Thiệp cưới Công & Duyên',
  description: 'Quản lý khách mời cho thiệp cưới Công & Duyên',
};

export default function GuestManagementPage() {
  return (
    <AdminLayout>
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">Quản Lý Khách Mời</h1>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="py-4">
            <GuestList />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
