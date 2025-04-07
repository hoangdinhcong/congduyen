import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '../../../lib/supabase';
import { Guest } from '../../../lib/types';

// GET /api/guests - Fetch all guests
export async function GET(request: NextRequest) {
  try {
    const { data, error } = await supabase
      .from('guests')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      throw error;
    }
    
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Error fetching guests:', error);
    return NextResponse.json(
      { message: 'An error occurred while fetching guests' },
      { status: 500 }
    );
  }
}

// POST /api/guests - Add a new guest
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.name || !body.side || !body.rsvp_status) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Generate a unique invite ID
    const uniqueInviteId = uuidv4().slice(0, 8);
    
    // Prepare the guest data
    const guestData = {
      name: body.name,
      side: body.side,
      tags: body.tags || [],
      unique_invite_id: uniqueInviteId,
      rsvp_status: body.rsvp_status,
    };
    
    // Insert the guest into the database
    const { data, error } = await supabase
      .from('guests')
      .insert(guestData)
      .select()
      .single();
    
    if (error) {
      throw error;
    }
    
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Error adding guest:', error);
    return NextResponse.json(
      { message: 'An error occurred while adding the guest' },
      { status: 500 }
    );
  }
}
