// Guest RSVP status options
export type RSVPStatus = 'pending' | 'attending' | 'declined';

// Guest side options (bride's side or groom's side)
export type GuestSide = 'bride' | 'groom';

// Guest data structure
export interface Guest {
  id: string;
  name: string;
  side: GuestSide;
  tags?: string[];
  unique_invite_id: string;
  rsvp_status: RSVPStatus;
  created_at?: string;
  updated_at?: string;
}

// Anonymous RSVP submission data
export interface AnonymousRSVP {
  name: string;
  email?: string;
  side?: GuestSide;
  rsvp_status: RSVPStatus;
}

// RSVP statistics structure
export interface RSVPStats {
  total: number;
  attending: number;
  declined: number;
  pending: number;
  anonymous?: number; // Count of anonymous RSVPs
  bride?: {
    total: number;
    attending: number;
    declined: number;
    pending: number;
  };
  groom?: {
    total: number;
    attending: number;
    declined: number;
    pending: number;
  };
}
