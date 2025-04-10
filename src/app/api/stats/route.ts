import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabase';
import { RSVPStats } from '../../../lib/types';

export async function GET() {
  try {
    // Get total count
    const { count: total } = await supabase
      .from('guests')
      .select('*', { count: 'exact', head: true });
    
    // Get attending count
    const { count: attending } = await supabase
      .from('guests')
      .select('*', { count: 'exact', head: true })
      .eq('rsvp_status', 'attending');
    
    // Get declined count
    const { count: declined } = await supabase
      .from('guests')
      .select('*', { count: 'exact', head: true })
      .eq('rsvp_status', 'declined');
    
    // Get pending count
    const { count: pending } = await supabase
      .from('guests')
      .select('*', { count: 'exact', head: true })
      .eq('rsvp_status', 'pending');
    
    // Get anonymous count
    const { count: anonymous } = await supabase
      .from('guests')
      .select('*', { count: 'exact', head: true })
      .eq('is_anonymous', true);
    
    // Get bride's side stats
    const { count: brideTotal } = await supabase
      .from('guests')
      .select('*', { count: 'exact', head: true })
      .eq('side', 'bride');
    
    const { count: brideAttending } = await supabase
      .from('guests')
      .select('*', { count: 'exact', head: true })
      .eq('side', 'bride')
      .eq('rsvp_status', 'attending');
    
    const { count: brideDeclined } = await supabase
      .from('guests')
      .select('*', { count: 'exact', head: true })
      .eq('side', 'bride')
      .eq('rsvp_status', 'declined');
    
    const { count: bridePending } = await supabase
      .from('guests')
      .select('*', { count: 'exact', head: true })
      .eq('side', 'bride')
      .eq('rsvp_status', 'pending');
    
    // Get groom's side stats
    const { count: groomTotal } = await supabase
      .from('guests')
      .select('*', { count: 'exact', head: true })
      .eq('side', 'groom');
    
    const { count: groomAttending } = await supabase
      .from('guests')
      .select('*', { count: 'exact', head: true })
      .eq('side', 'groom')
      .eq('rsvp_status', 'attending');
    
    const { count: groomDeclined } = await supabase
      .from('guests')
      .select('*', { count: 'exact', head: true })
      .eq('side', 'groom')
      .eq('rsvp_status', 'declined');
    
    const { count: groomPending } = await supabase
      .from('guests')
      .select('*', { count: 'exact', head: true })
      .eq('side', 'groom')
      .eq('rsvp_status', 'pending');
    
    // Compile stats
    const stats: RSVPStats = {
      total: total || 0,
      attending: attending || 0,
      declined: declined || 0,
      pending: pending || 0,
      anonymous: anonymous || 0,
      bride: {
        total: brideTotal || 0,
        attending: brideAttending || 0,
        declined: brideDeclined || 0,
        pending: bridePending || 0,
      },
      groom: {
        total: groomTotal || 0,
        attending: groomAttending || 0,
        declined: groomDeclined || 0,
        pending: groomPending || 0,
      },
    };
    
    return NextResponse.json(stats, { status: 200 });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { message: 'Failed to fetch statistics' },
      { status: 500 }
    );
  }
}
