'use client';

import React from 'react';
import Header from './Header';
import Footer from './Footer';
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
  const isInvitePage = pathname?.includes('/invite/');
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div className="max-w-screen-xl mx-auto">
          {children}
        </div>
      </main>
      <Footer />
      
      {/* Only show floating action buttons on invite pages */}
      {isInvitePage && (
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
