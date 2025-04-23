import React from 'react';
import { Metadata } from 'next';
import AdminLayout from '@/components/admin/AdminLayout';
import GuestList from '@/components/admin/GuestList';

export const metadata: Metadata = {
  title: 'Guest Management | Cong & Duyen Wedding',
  description: 'Manage guests for Cong & Duyen wedding invitation',
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
