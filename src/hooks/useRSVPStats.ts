'use client';

import { useState, useEffect, useCallback } from 'react';
import { RSVPStats } from '@/lib/types';
import { GuestAPI } from '@/lib/api-client';
import { showToast } from '@/components/ui/ToastProvider';

/**
 * Custom hook for managing RSVP statistics
 * @returns RSVP statistics and management functions
 */
export function useRSVPStats() {
  const [stats, setStats] = useState<RSVPStats | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  /**
   * Fetch RSVP statistics
   */
  const fetchStats = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await GuestAPI.getRSVPStats();
      setStats(data);
    } catch (error) {
      console.error('Error fetching RSVP stats:', error);
      showToast.error('Failed to load RSVP statistics');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch stats on mount
  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return {
    stats,
    isLoading,
    fetchStats,
  };
}
