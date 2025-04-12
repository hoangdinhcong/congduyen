'use client';

import { useState, useCallback, useEffect } from 'react';
import { Guest } from '@/lib/types';
import { showToast } from '@/components/ui/ToastProvider';

/**
 * Custom hook for managing guests data in the admin dashboard
 * This hook automatically loads guest data when mounted
 * @returns Guest management functions and state
 */
export function useAdminGuests() {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetch all guests
   */
  const fetchGuests = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch('/api/guests');
      
      if (!response.ok) {
        throw new Error('Failed to fetch guests');
      }
      
      const data = await response.json();
      setGuests(data);
    } catch (error) {
      console.error('Error fetching guests:', error);
      setError(error instanceof Error ? error.message : 'Failed to load guests');
      showToast.error('Failed to load guests');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Automatically fetch guests when the hook is mounted
  useEffect(() => {
    fetchGuests();
  }, [fetchGuests]);

  return {
    guests,
    isLoading,
    error,
    fetchGuests,
    setGuests
  };
}
