export type Guest = {
  id: string;
  name: string;
  side: 'bride' | 'groom' | 'both';
  tags?: string[];
  unique_invite_id: string;
  rsvp_status: 'pending' | 'attending' | 'declined';
  created_at: string;
  updated_at: string;
};

export type RSVPStatus = 'pending' | 'attending' | 'declined';

export type RSVPStats = {
  total: number;
  attending: number;
  declined: number;
  pending: number;
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
};
