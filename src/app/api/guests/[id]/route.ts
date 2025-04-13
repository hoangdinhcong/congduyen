import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

type RouteParams = {
  id: string;
};

// GET /api/guests/[id] - Get a specific guest
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<RouteParams> }
) {
  try {
    const { id } = await params;

    const { data, error } = await supabase
      .from('guests')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { message: 'Guest not found' },
          { status: 404 }
        );
      }
      throw error;
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Error fetching guest:', error);
    return NextResponse.json(
      { message: 'An error occurred while fetching the guest' },
      { status: 500 }
    );
  }
}

// PUT /api/guests/[id] - Update a guest
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<RouteParams> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    // Create a partial update data object
    const updateData: Partial<{
      name: string;
      side: string;
      tags: string[];
      rsvp_status: string;
      is_invited: boolean;
    }> = {};

    // Only add fields that are provided in the request body
    if (body.name !== undefined) updateData.name = body.name;
    if (body.side !== undefined) updateData.side = body.side;
    if (body.tags !== undefined) updateData.tags = body.tags;
    if (body.rsvp_status !== undefined) updateData.rsvp_status = body.rsvp_status;
    if (body.is_invited !== undefined) updateData.is_invited = body.is_invited;

    // Validate that there's at least one field to update
    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { message: 'No fields provided for update' },
        { status: 400 }
      );
    }

    // Update the guest in the database
    const { data, error } = await supabase
      .from('guests')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { message: 'Guest not found' },
          { status: 404 }
        );
      }
      throw error;
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Error updating guest:', error);
    return NextResponse.json(
      { message: 'An error occurred while updating the guest' },
      { status: 500 }
    );
  }
}

// PATCH /api/guests/[id] - Update RSVP status only
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<RouteParams> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    // Validate RSVP status
    if (!body.rsvp_status || !['pending', 'attending', 'declined'].includes(body.rsvp_status)) {
      return NextResponse.json(
        { message: 'Invalid RSVP status' },
        { status: 400 }
      );
    }

    // Update the RSVP status in the database
    const { data, error } = await supabase
      .from('guests')
      .update({ rsvp_status: body.rsvp_status })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { message: 'Guest not found' },
          { status: 404 }
        );
      }
      throw error;
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Error updating RSVP status:', error);
    return NextResponse.json(
      { message: 'An error occurred while updating the RSVP status' },
      { status: 500 }
    );
  }
}

// DELETE /api/guests/[id] - Delete a guest
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<RouteParams> }
) {
  try {
    const { id } = await params;

    const { error } = await supabase
      .from('guests')
      .delete()
      .eq('id', id);

    if (error) {
      throw error;
    }

    return NextResponse.json(
      { message: 'Guest deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting guest:', error);
    return NextResponse.json(
      { message: 'An error occurred while deleting the guest' },
      { status: 500 }
    );
  }
}
