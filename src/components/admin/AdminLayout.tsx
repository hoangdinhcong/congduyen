'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Gauge,
  Users,
  LogOut,
  Menu,
  X,
  Heart,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

type AdminLayoutProps = {
  children: React.ReactNode;
};

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
      });

      if (response.ok) {
        router.push('/host/login');
        router.refresh();
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const navigation = [
    { name: 'Bảng điều khiển', href: '/host', icon: Gauge },
    { name: 'Danh sách khách mời', href: '/host/guests', icon: Users },
  ];

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      {/* Mobile sidebar */}
      <div className={`md:hidden ${sidebarOpen ? 'fixed inset-0 flex z-40' : 'hidden'}`}>
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-75"
          onClick={() => setSidebarOpen(false)}
        />

        <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              type="button"
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-hidden focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setSidebarOpen(false)}
            >
              <span className="sr-only">Close sidebar</span>
              <X className="h-6 w-6 text-white" aria-hidden="true" />
            </button>
          </div>

          {/* Sidebar content */}
          <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
            <div className="shrink-0 flex items-center px-4">
              <Link href="/host" className="text-xl font-semibold flex items-center gap-2">
                <span>Quản trị thiệp cưới</span>
                <Heart className="text-primary text-sm" />
              </Link>
            </div>
            <nav className="mt-5 px-2 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                    pathname === item.href
                      ? 'bg-primary-light text-primary'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <item.icon
                    className={`mr-4 h-6 w-6 ${
                      pathname === item.href ? 'text-primary' : 'text-gray-400 group-hover:text-gray-500'
                    }`}
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Logout button */}
          <div className="shrink-0 flex border-t border-gray-200 p-4">
            <button
              onClick={handleLogout}
              className="flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900 w-full"
            >
              <LogOut className="mr-4 h-6 w-6 text-gray-400" aria-hidden="true" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className={`hidden md:flex md:shrink-0 transition-all duration-300 ${sidebarCollapsed ? 'md:w-16' : 'md:w-64'}`}>
        <div className={`flex flex-col w-full relative`}>
          <div className="flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white">
            {/* Collapse toggle button */}
            <button 
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="absolute -right-3 top-20 bg-white rounded-full h-6 w-6 flex items-center justify-center border border-gray-200 shadow-sm z-10 hover:bg-gray-50"
              aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {sidebarCollapsed ? (
                <ChevronRight className="h-4 w-4 text-gray-500" />
              ) : (
                <ChevronLeft className="h-4 w-4 text-gray-500" />
              )}
            </button>

            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <div className={`flex ${sidebarCollapsed ? 'justify-center' : 'items-center'} shrink-0 px-4`}>
                <Link href="/host" className="text-xl font-semibold flex items-center gap-2">
                  {!sidebarCollapsed && <span>Wedding Admin</span>}
                  <Heart className="text-primary text-sm" />
                </Link>
              </div>
              <nav className="mt-5 flex-1 px-2 bg-white space-y-1 overflow-x-hidden">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`group flex items-center ${sidebarCollapsed ? 'justify-center' : ''} px-2 py-2 text-sm font-medium rounded-md ${
                      pathname === item.href
                        ? 'bg-primary-light text-primary'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                    title={item.name}
                  >
                    <item.icon
                      className={`${sidebarCollapsed ? '' : 'mr-3'} h-5 w-5 ${
                        pathname === item.href ? 'text-primary' : 'text-gray-400 group-hover:text-gray-500'
                      }`}
                      aria-hidden="true"
                    />
                    {!sidebarCollapsed && item.name}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Logout button */}
            <div className="shrink-0 flex border-t border-gray-200 p-4">
              <button
                onClick={handleLogout}
                className={`flex items-center ${sidebarCollapsed ? 'justify-center' : ''} px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900 w-full`}
                title="Logout"
              >
                <LogOut className={`${sidebarCollapsed ? '' : 'mr-3'} h-5 w-5 text-gray-400`} aria-hidden="true" />
                {!sidebarCollapsed && 'Logout'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <div className="md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3">
          <button
            type="button"
            className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-hidden focus:ring-2 focus:ring-inset focus:ring-primary"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        <main className="flex-1 relative z-0 overflow-y-auto focus:outline-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
