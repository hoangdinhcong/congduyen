import { Guest, RSVPStatus, AnonymousRSVP, RSVPStats } from './types';
import { supabase } from './supabase';

/**
 * API client for guests-related operations
 */
export const GuestAPI = {
  /**
   * Fetch all guests
   */
  async getAllGuests(): Promise<Guest[]> {
    const { data, error } = await supabase
      .from('guests')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      throw new Error(`Error fetching guests: ${error.message}`);
    }
    
    return data || [];
  },

  /**
   * Get a guest by their unique invite ID
   */
  async getGuestByInviteId(uniqueInviteId: string): Promise<Guest | null> {
    const { data, error } = await supabase
      .from('guests')
      .select('*')
      .eq('unique_invite_id', uniqueInviteId)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') {
        return null; // Guest not found
      }
      throw new Error(`Error fetching guest: ${error.message}`);
    }
    
    return data;
  },

  /**
   * Create a new guest
   */
  async createGuest(guestData: Partial<Guest>): Promise<Guest> {
    const { data, error } = await supabase
      .from('guests')
      .insert(guestData)
      .select()
      .single();
    
    if (error) {
      throw new Error(`Error creating guest: ${error.message}`);
    }
    
    return data;
  },

  /**
   * Update a guest by ID
   */
  async updateGuest(id: string, updates: Partial<Guest>): Promise<Guest> {
    const { data, error } = await supabase
      .from('guests')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      throw new Error(`Error updating guest: ${error.message}`);
    }
    
    return data;
  },

  /**
   * Update RSVP status by unique invite ID
   */
  async updateRSVPStatus(uniqueInviteId: string, rsvpStatus: RSVPStatus): Promise<Guest> {
    const guest = await this.getGuestByInviteId(uniqueInviteId);
    
    if (!guest) {
      throw new Error('Guest not found');
    }
    
    return this.updateGuest(guest.id, { rsvp_status: rsvpStatus });
  },

  /**
   * Delete a guest by ID
   */
  async deleteGuest(id: string): Promise<void> {
    const { error } = await supabase
      .from('guests')
      .delete()
      .eq('id', id);
    
    if (error) {
      throw new Error(`Error deleting guest: ${error.message}`);
    }
  },

  /**
   * Delete multiple guests by IDs
   */
  async bulkDeleteGuests(ids: string[]): Promise<void> {
    const { error } = await supabase
      .from('guests')
      .delete()
      .in('id', ids);
    
    if (error) {
      throw new Error(`Error bulk deleting guests: ${error.message}`);
    }
  },

  /**
   * Bulk update guests
   */
  async bulkUpdateGuests(ids: string[], updates: Partial<Guest>): Promise<void> {
    // Supabase doesn't support bulk updates directly, so we need to do it one by one
    const promises = ids.map(id => this.updateGuest(id, updates));
    await Promise.all(promises);
  },

  /**
   * Submit an anonymous RSVP
   */
  async submitAnonymousRSVP(data: AnonymousRSVP): Promise<Guest> {
    const guestData: Partial<Guest> = {
      ...data,
      unique_invite_id: `anon-${Date.now().toString(36)}`,
      tags: ['anonymous']
    };
    
    return this.createGuest(guestData);
  },

  /**
   * Get RSVP statistics
   */
  async getRSVPStats(): Promise<RSVPStats> {
    const { data, error } = await supabase
      .from('guests')
      .select('*');
    
    if (error) {
      throw new Error(`Error fetching RSVP stats: ${error.message}`);
    }
    
    const guests = data || [];
    const stats: RSVPStats = {
      total: guests.length,
      attending: guests.filter(g => g.rsvp_status === 'attending').length,
      declined: guests.filter(g => g.rsvp_status === 'declined').length,
      pending: guests.filter(g => g.rsvp_status === 'pending').length,
      anonymous: guests.filter(g => g.tags?.includes('anonymous')).length,
      bride: {
        total: guests.filter(g => g.side === 'bride').length,
        attending: guests.filter(g => g.side === 'bride' && g.rsvp_status === 'attending').length,
        declined: guests.filter(g => g.side === 'bride' && g.rsvp_status === 'declined').length,
        pending: guests.filter(g => g.side === 'bride' && g.rsvp_status === 'pending').length,
      },
      groom: {
        total: guests.filter(g => g.side === 'groom').length,
        attending: guests.filter(g => g.side === 'groom' && g.rsvp_status === 'attending').length,
        declined: guests.filter(g => g.side === 'groom' && g.rsvp_status === 'declined').length,
        pending: guests.filter(g => g.side === 'groom' && g.rsvp_status === 'pending').length,
      }
    };
    
    return stats;
  }
};

/**
 * API client for authentication-related operations
 */
export const AuthAPI = {
  /**
   * Check if a user is authenticated based on session cookie
   */
  async checkSession(): Promise<boolean> {
    const response = await fetch('/api/auth/session', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    return response.status === 200;
  },

  /**
   * Login with password
   */
  async login(password: string): Promise<boolean> {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password }),
    });
    
    return response.status === 200;
  },

  /**
   * Logout current user
   */
  async logout(): Promise<void> {
    await fetch('/api/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};
