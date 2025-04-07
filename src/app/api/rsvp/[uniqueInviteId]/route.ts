import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../../../lib/supabase';
import { RSVPStatus } from '../../../../lib/types';

// PATCH /api/rsvp/[uniqueInviteId] - Update RSVP status
export async function PATCH(
  request: NextRequest,
  { params }: { params: { uniqueInviteId: string } }
) {
  try {
    const uniqueInviteId = params.uniqueInviteId;
    const body = await request.json();
    
    // Validate RSVP status
    const rsvpStatus = body.rsvp_status as RSVPStatus;
    if (!rsvpStatus || !['attending', 'declined'].includes(rsvpStatus)) {
      return NextResponse.json(
        { message: 'Invalid RSVP status' },
        { status: 400 }
      );
    }
    
    // Find the guest by unique invite ID
    const { data: guest, error: findError } = await supabase
      .from('guests')
      .select('id')
      .eq('unique_invite_id', uniqueInviteId)
      .single();
    
    if (findError || !guest) {
      return NextResponse.json(
        { message: 'Guest not found' },
        { status: 404 }
      );
    }
    
    // Update the RSVP status
    const { data, error: updateError } = await supabase
      .from('guests')
      .update({ rsvp_status: rsvpStatus })
      .eq('id', guest.id)
      .select()
      .single();
    
    if (updateError) {
      throw updateError;
    }
    
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Error updating RSVP status:', error);
    return NextResponse.json(
      { message: 'An error occurred while updating RSVP status' },
      { status: 500 }
    );
  }
}
