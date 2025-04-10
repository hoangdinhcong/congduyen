'use client';

import { useState, useEffect, useCallback } from 'react';
import { Guest, RSVPStatus, GuestSide } from '@/lib/types';
import { GuestAPI } from '@/lib/api-client';
import { useToastContext } from '@/contexts/ToastContext';
import { generateUniqueInviteId } from '@/lib/utils';

/**
 * Custom hook for managing guests data
 * @returns Guest management functions and state
 */
export function useGuests() {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedGuests, setSelectedGuests] = useState<string[]>([]);
  const { showSuccess, showError } = useToastContext();

  /**
   * Fetch all guests
   */
  const fetchGuests = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await GuestAPI.getAllGuests();
      setGuests(data);
    } catch (error) {
      console.error('Error fetching guests:', error);
      showError('Failed to load guests');
    } finally {
      setIsLoading(false);
    }
  }, [showError]);

  /**
   * Add a new guest
   * @param guestData Guest data to add
   */
  const addGuest = useCallback(async (guestData: Omit<Guest, 'id' | 'unique_invite_id' | 'created_at' | 'updated_at'>) => {
    try {
      setIsLoading(true);
      
      // Generate a unique invite ID if not provided
      const dataWithId = {
        ...guestData,
        unique_invite_id: generateUniqueInviteId(),
      };
      
      const newGuest = await GuestAPI.createGuest(dataWithId);
      
      // Update local state
      setGuests(prev => [newGuest, ...prev]);
      
      showSuccess('Guest added successfully');
      return newGuest;
    } catch (error) {
      console.error('Error adding guest:', error);
      showError('Failed to add guest');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [showSuccess, showError]);

  /**
   * Update a guest
   * @param id Guest ID
   * @param updates Updates to apply
   */
  const updateGuest = useCallback(async (id: string, updates: Partial<Guest>) => {
    try {
      setIsLoading(true);
      const updatedGuest = await GuestAPI.updateGuest(id, updates);
      
      // Update local state
      setGuests(prev => prev.map(guest => 
        guest.id === id ? updatedGuest : guest
      ));
      
      showSuccess('Guest updated successfully');
      return updatedGuest;
    } catch (error) {
      console.error('Error updating guest:', error);
      showError('Failed to update guest');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [showSuccess, showError]);

  /**
   * Update RSVP status
   * @param uniqueInviteId Unique invite ID
   * @param rsvpStatus New RSVP status
   */
  const updateRSVP = useCallback(async (uniqueInviteId: string, rsvpStatus: RSVPStatus) => {
    try {
      setIsLoading(true);
      const updatedGuest = await GuestAPI.updateRSVPStatus(uniqueInviteId, rsvpStatus);
      
      // Update local state
      setGuests(prev => prev.map(guest => 
        guest.unique_invite_id === uniqueInviteId ? updatedGuest : guest
      ));
      
      showSuccess('RSVP updated successfully');
      return updatedGuest;
    } catch (error) {
      console.error('Error updating RSVP:', error);
      showError('Failed to update RSVP');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [showSuccess, showError]);

  /**
   * Delete a guest
   * @param id Guest ID
   */
  const deleteGuest = useCallback(async (id: string) => {
    try {
      setIsLoading(true);
      await GuestAPI.deleteGuest(id);
      
      // Update local state
      setGuests(prev => prev.filter(guest => guest.id !== id));
      
      // Remove from selected if present
      if (selectedGuests.includes(id)) {
        setSelectedGuests(prev => prev.filter(guestId => guestId !== id));
      }
      
      showSuccess('Guest deleted successfully');
      return true;
    } catch (error) {
      console.error('Error deleting guest:', error);
      showError('Failed to delete guest');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [selectedGuests, showSuccess, showError]);

  /**
   * Bulk delete selected guests
   */
  const bulkDeleteGuests = useCallback(async () => {
    if (selectedGuests.length === 0) {
      showError('No guests selected');
      return false;
    }
    
    try {
      setIsLoading(true);
      await GuestAPI.bulkDeleteGuests(selectedGuests);
      
      // Update local state
      setGuests(prev => prev.filter(guest => !selectedGuests.includes(guest.id)));
      
      // Clear selection
      setSelectedGuests([]);
      
      showSuccess(`${selectedGuests.length} guests deleted successfully`);
      return true;
    } catch (error) {
      console.error('Error bulk deleting guests:', error);
      showError('Failed to delete selected guests');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [selectedGuests, showSuccess, showError]);

  /**
   * Bulk update selected guests
   * @param updates Updates to apply
   */
  const bulkUpdateGuests = useCallback(async (updates: Partial<Guest>) => {
    if (selectedGuests.length === 0) {
      showError('No guests selected');
      return false;
    }
    
    try {
      setIsLoading(true);
      await GuestAPI.bulkUpdateGuests(selectedGuests, updates);
      
      // Update local state
      setGuests(prev => prev.map(guest => 
        selectedGuests.includes(guest.id) 
          ? { ...guest, ...updates } 
          : guest
      ));
      
      showSuccess(`${selectedGuests.length} guests updated successfully`);
      return true;
    } catch (error) {
      console.error('Error bulk updating guests:', error);
      showError('Failed to update selected guests');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [selectedGuests, showSuccess, showError]);

  /**
   * Toggle guest selection
   * @param id Guest ID
   */
  const toggleGuestSelection = useCallback((id: string) => {
    setSelectedGuests(prev => 
      prev.includes(id)
        ? prev.filter(guestId => guestId !== id)
        : [...prev, id]
    );
  }, []);

  /**
   * Select all guests
   */
  const selectAllGuests = useCallback(() => {
    setSelectedGuests(guests.map(guest => guest.id));
  }, [guests]);

  /**
   * Clear all guest selections
   */
  const clearGuestSelection = useCallback(() => {
    setSelectedGuests([]);
  }, []);

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
      setIsLoading(true);
      const newGuest = await GuestAPI.submitAnonymousRSVP(data);
      
      // Update local state
      setGuests(prev => [newGuest, ...prev]);
      
      showSuccess('RSVP submitted successfully');
      return newGuest;
    } catch (error) {
      console.error('Error submitting anonymous RSVP:', error);
      showError('Failed to submit RSVP');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [showSuccess, showError]);

  /**
   * Convert an anonymous RSVP to a regular guest
   * @param id Guest ID of the anonymous RSVP
   */
  const convertAnonymousToGuest = useCallback(async (id: string) => {
    try {
      setIsLoading(true);
      
      // Find the anonymous guest
      const anonymousGuest = guests.find(guest => guest.id === id);
      if (!anonymousGuest) {
        throw new Error('Anonymous RSVP not found');
      }
      
      // Generate a unique invite ID for the new regular guest
      const uniqueInviteId = generateUniqueInviteId();
      
      // Convert to regular guest
      const updatedGuest = await GuestAPI.updateGuest(id, {
        unique_invite_id: uniqueInviteId,
      });
      
      // Update local state
      setGuests(prev => prev.map(guest => 
        guest.id === id ? updatedGuest : guest
      ));
      
      showSuccess('Anonymous RSVP converted to guest successfully');
      return updatedGuest;
    } catch (error) {
      console.error('Error converting anonymous RSVP to guest:', error);
      showError('Failed to convert anonymous RSVP');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [guests, showSuccess, showError]);

  // Fetch guests on mount
  useEffect(() => {
    fetchGuests();
  }, [fetchGuests]);

  return {
    guests,
    isLoading,
    selectedGuests,
    fetchGuests,
    addGuest,
    updateGuest,
    updateRSVP,
    deleteGuest,
    bulkDeleteGuests,
    bulkUpdateGuests,
    toggleGuestSelection,
    selectAllGuests,
    clearGuestSelection,
    submitAnonymousRSVP,
    convertAnonymousToGuest,
  };
}
