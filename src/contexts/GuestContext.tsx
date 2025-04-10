'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { Guest, RSVPStatus, GuestSide } from '@/lib/types';
import { useGuests } from '@/hooks/useGuests';

interface GuestContextType {
  guests: Guest[];
  isLoading: boolean;
  selectedGuests: string[];
  fetchGuests: () => Promise<void>;
  addGuest: (guestData: Omit<Guest, 'id' | 'unique_invite_id' | 'created_at' | 'updated_at'>) => Promise<Guest | null>;
  updateGuest: (id: string, updates: Partial<Guest>) => Promise<Guest | null>;
  updateRSVP: (uniqueInviteId: string, rsvpStatus: RSVPStatus) => Promise<Guest | null>;
  deleteGuest: (id: string) => Promise<boolean>;
  bulkDeleteGuests: () => Promise<boolean>;
  bulkUpdateGuests: (updates: Partial<Guest>) => Promise<boolean>;
  toggleGuestSelection: (id: string) => void;
  selectAllGuests: () => void;
  clearGuestSelection: () => void;
  submitAnonymousRSVP: (data: {
    name: string;
    email?: string;
    side?: GuestSide;
    rsvp_status: RSVPStatus;
  }) => Promise<Guest | null>;
}

const GuestContext = createContext<GuestContextType | undefined>(undefined);

/**
 * Provider component for guest data management
 */
export function GuestProvider({ children }: { children: ReactNode }) {
  const guestMethods = useGuests();
  
  return (
    <GuestContext.Provider value={guestMethods}>
      {children}
    </GuestContext.Provider>
  );
}

/**
 * Hook to use the guest context
 */
export function useGuestContext() {
  const context = useContext(GuestContext);
  
  if (context === undefined) {
    throw new Error('useGuestContext must be used within a GuestProvider');
  }
  
  return context;
}
