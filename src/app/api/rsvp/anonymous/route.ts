import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase';
import { nanoid } from 'nanoid';
import { AnonymousRSVP } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const data: AnonymousRSVP = await request.json();
    
    // Validate required fields
    if (!data.name || !data.side) {
      return NextResponse.json(
        { message: 'Vui lòng nhập tên và bên của bạn' },
        { status: 400 }
      );
    }
    
    // Initialize Supabase client
    const supabase = createClient();
    
    // Generate a unique invitation ID for this anonymous RSVP
    const uniqueInviteId = nanoid(10);
    
    // Insert the anonymous RSVP into the guests table
    const { data: insertedGuest, error } = await supabase
      .from('guests')
      .insert({
        name: data.name,
        email: null,
        phone: null,
        side: data.side,
        unique_invite_id: uniqueInviteId,
        rsvp_status: 'attending', // Always set to attending for anonymous RSVPs
        plus_one: false,
        plus_one_name: null,
        dietary_restrictions: null,
        notes: null,
        is_anonymous: true,
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
    console.error('Anonymous RSVP error:', error);
    return NextResponse.json(
      { message: 'Đã xảy ra lỗi khi xử lý yêu cầu của bạn' },
      { status: 500 }
    );
  }
}
