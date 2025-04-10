import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase';
import { nanoid } from 'nanoid';
import { AnonymousRSVP } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const data: AnonymousRSVP = await request.json();
    
    // Validate required fields
    if (!data.name || !data.rsvp_status) {
      return NextResponse.json(
        { message: 'Vui lòng nhập tên và trạng thái tham dự của bạn' },
        { status: 400 }
      );
    }
    
    // Initialize Supabase client
    const supabase = createClient();
    
    // Generate a unique invitation ID for this anonymous RSVP
    const uniqueInviteId = `anon-${nanoid(8)}`;
    
    // Insert the anonymous RSVP into the guests table
    const { data: insertedGuest, error } = await supabase
      .from('guests')
      .insert({
        name: data.name,
        email: data.email || null,
        side: data.side || 'bride', // Default to bride if not specified
        unique_invite_id: uniqueInviteId,
        rsvp_status: data.rsvp_status,
        tags: ['anonymous']
      })
      .select()
      .single();
    
    if (error) {
      console.error('Error inserting anonymous RSVP:', error);
      return NextResponse.json(
        { message: 'Không thể lưu phản hồi của bạn' },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { 
        message: 'Phản hồi đã được ghi nhận',
        guest: insertedGuest
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error processing anonymous RSVP:', error);
    return NextResponse.json(
      { message: 'Đã xảy ra lỗi khi xử lý phản hồi của bạn' },
      { status: 500 }
    );
  }
}
