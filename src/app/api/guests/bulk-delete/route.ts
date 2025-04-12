import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// DELETE /api/guests/bulk-delete - Delete multiple guests by IDs
export async function DELETE(request: NextRequest) {
  try {
    const { ids } = await request.json();
    
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        { message: 'No guest IDs provided' },
        { status: 400 }
      );
    }
    
    // Delete the guests
    const { error } = await supabase
      .from('guests')
      .delete()
      .in('id', ids);
    
    if (error) {
      throw error;
    }
    
    return NextResponse.json({
      message: `Successfully deleted ${ids.length} guests`
    });
  } catch (error) {
    console.error('Error deleting guests:', error);
    return NextResponse.json(
      { message: 'An error occurred while deleting guests' },
      { status: 500 }
    );
  }
}
