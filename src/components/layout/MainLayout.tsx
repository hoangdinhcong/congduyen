'use client';

import React from 'react';
import Header from './Header';
import FloatingActionButtons from '../ui/FloatingActionButtons';
import { usePathname } from 'next/navigation';

type MainLayoutProps = {
  children: React.ReactNode;
  guestName?: string;
  guestId?: string;
  uniqueInviteId?: string;
  rsvpStatus?: 'pending' | 'attending' | 'declined';
};

export default function MainLayout({ 
  children, 
  guestName = '',
  guestId = '',
  uniqueInviteId = '',
  rsvpStatus = 'pending'
}: MainLayoutProps) {
  const pathname = usePathname();
  const isAdminPage = pathname?.includes('/host');
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div className="max-w-screen-xl mx-auto">
          {children}
        </div>
      </main>
      
      {/* Add bottom padding to compensate for removed footer and floating buttons */}
      <div className="pb-24 md:pb-16"></div>
      
      {/* Show floating action buttons on all pages except admin pages */}
      {!isAdminPage && (
        <FloatingActionButtons 
          guestName={guestName}
          guestId={guestId}
          uniqueInviteId={uniqueInviteId}
          rsvpStatus={rsvpStatus}
        />
      )}
    </div>
  );
}
