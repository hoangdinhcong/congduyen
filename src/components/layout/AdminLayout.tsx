'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Users, BarChart, Settings, LogOut, UserRound, Menu, X } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface AdminLayoutProps {
  children: React.ReactNode;
}

/**
 * Admin Layout component
 * Provides consistent layout for admin pages with navigation and authentication
 */
export default function AdminLayout({ children }: AdminLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();
  const { isAuthenticated, isLoading, logout } = useAuth();
  const [isPageLoading, setIsPageLoading] = useState(true);

  useEffect(() => {
    // Check authentication status
    if (isAuthenticated) {
      setIsPageLoading(false);
    } else if (!isLoading) {
      // Redirect to login if not authenticated
      window.location.href = '/host/login';
    }
  }, [isAuthenticated, isLoading]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const navigation = [
    { name: 'Dashboard', href: '/host', icon: BarChart },
    { name: 'Guest List', href: '/host/guests', icon: Users },
    { name: 'Anonymous RSVPs', href: '/host/anonymous', icon: UserRound },
    { name: 'Settings', href: '/host/settings', icon: Settings },
  ];

  if (isPageLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile sidebar backdrop */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:static lg:inset-0 transition-transform duration-300 ease-in-out`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b">
          <Link href="/host" className="flex items-center">
            <span className="text-xl font-semibold text-primary">Admin Panel</span>
          </Link>
          <button 
            className="p-1 text-gray-500 rounded-md lg:hidden hover:text-primary focus:outline-none"
            onClick={toggleSidebar}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="px-3 mt-6">
          <div className="space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                    isActive
                      ? 'bg-primary-light text-primary'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <item.icon className={`mr-3 h-5 w-5 ${isActive ? 'text-primary' : 'text-gray-400'}`} />
                  {item.name}
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="absolute bottom-0 w-full border-t border-gray-200">
          <Link href="/" className="flex items-center px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900">
            <Home className="w-5 h-5 mr-3 text-gray-400" />
            Back to Website
          </Link>
          <button 
            onClick={logout}
            className="flex items-center w-full px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900"
          >
            <LogOut className="w-5 h-5 mr-3 text-gray-400" />
            Sign out
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top header */}
        <header className="flex items-center justify-between h-16 px-6 bg-white border-b lg:hidden">
          <button
            className="p-1 text-gray-500 rounded-md hover:text-primary focus:outline-none"
            onClick={toggleSidebar}
          >
            <Menu className="w-6 h-6" />
          </button>
          <span className="text-lg font-semibold text-primary">Admin Panel</span>
          <div className="w-6"></div> {/* Spacer for centering */}
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
}
