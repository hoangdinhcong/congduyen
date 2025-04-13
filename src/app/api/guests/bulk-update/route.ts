import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { GuestSide, RSVPStatus } from '@/lib/types';

// PATCH /api/guests/bulk-update - Update multiple guests by IDs
export async function PATCH(request: NextRequest) {
  try {
    const { ids, side, rsvp_status, is_invited } = await request.json();
    
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        { message: 'No guest IDs provided' },
        { status: 400 }
      );
    }
    
    // Validate that at least one field to update is provided
    if (!side && !rsvp_status && is_invited === undefined) {
      return NextResponse.json(
        { message: 'No fields to update provided' },
        { status: 400 }
      );
    }
    
    // Validate side if provided
    if (side && !['bride', 'groom'].includes(side)) {
      return NextResponse.json(
        { message: 'Invalid side value' },
        { status: 400 }
      );
    }
    
    // Validate rsvp_status if provided
    if (rsvp_status && !['pending', 'attending', 'declined'].includes(rsvp_status)) {
      return NextResponse.json(
        { message: 'Invalid RSVP status value' },
        { status: 400 }
      );
    }

    // Validate is_invited if provided
    if (is_invited !== undefined && typeof is_invited !== 'boolean') {
      return NextResponse.json(
        { message: 'Invalid invitation status value' },
        { status: 400 }
      );
    }
    
    // Prepare update data
    const updateData: { side?: GuestSide; rsvp_status?: RSVPStatus; is_invited?: boolean } = {};
    
    if (side) {
      updateData.side = side;
    }
    
    if (rsvp_status) {
      updateData.rsvp_status = rsvp_status;
    }

    if (is_invited !== undefined) {
      updateData.is_invited = is_invited;
    }
    
    // Update the guests
    const { error } = await supabase
      .from('guests')
      .update(updateData)
      .in('id', ids);
    
    if (error) {
      throw error;
    }
    
    return NextResponse.json({
      message: `Successfully updated ${ids.length} guests`
    });
  } catch (error) {
    console.error('Error updating guests:', error);
    return NextResponse.json(
      { message: 'An error occurred while updating guests' },
      { status: 500 }
    );
  }
}
