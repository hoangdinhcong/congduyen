'use client';

import { useState, useCallback } from 'react';
import { RSVPStatus, GuestSide } from '@/lib/types';
import { GuestAPI } from '@/lib/api-client';
import { showToast } from '@/components/ui/ToastProvider';

/**
 * Custom hook for handling anonymous RSVP submissions
 * This hook doesn't load all guest data, making it efficient for the home page
 */
export function useAnonymousRSVP() {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Submit an anonymous RSVP
   * @param data Anonymous RSVP data
   */
  const submitAnonymousRSVP = useCallback(async (data: {
    name: string;
    email?: string;
    side?: GuestSide;
    rsvp_status: RSVPStatus;
  }) => {
    try {
      setIsSubmitting(true);
      setError(null);
      
      const newGuest = await GuestAPI.submitAnonymousRSVP(data);
      
      showToast.success('RSVP submitted successfully');
      return newGuest;
    } catch (error) {
      console.error('Error submitting anonymous RSVP:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to submit RSVP';
      setError(errorMessage);
      showToast.error(errorMessage);
      return null;
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  return {
    submitAnonymousRSVP,
    isSubmitting,
    error
  };
}
