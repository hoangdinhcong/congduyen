'use client';

import React, { ReactNode } from 'react';
import { ToastProvider } from '@/contexts/ToastContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { GuestProvider } from '@/contexts/GuestContext';

interface AppProviderProps {
  children: ReactNode;
}

/**
 * Combined provider component for the entire application
 * Wraps all context providers in the correct order
 */
export function AppProvider({ children }: AppProviderProps) {
  return (
    <ToastProvider>
      <AuthProvider>
        <GuestProvider>
          {children}
        </GuestProvider>
      </AuthProvider>
    </ToastProvider>
  );
}
