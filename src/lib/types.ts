// Guest RSVP status options
export type RSVPStatus = 'pending' | 'attending' | 'declined';

// Guest side options (bride's side or groom's side)
export type GuestSide = 'bride' | 'groom' | 'both';

// Guest data structure
export interface Guest {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  side: GuestSide;
  tags?: string[];
  unique_invite_id: string;
  rsvp_status: RSVPStatus;
  plus_one?: boolean;
  plus_one_name?: string;
  dietary_restrictions?: string;
  notes?: string;
  created_at?: string;
  updated_at?: string;
}
