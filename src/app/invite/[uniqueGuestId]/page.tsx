import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import MainLayout from '../../../components/layout/MainLayout';
import HeroSection from '../../../components/sections/HeroSection';
import InvitationSection from '../../../components/sections/InvitationSection';
import ParentsSection from '../../../components/sections/ParentsSection';
import EventDetailsSection from '../../../components/sections/EventDetailsSection';
import GallerySection from '../../../components/sections/GallerySection';
import GiftInfoSection from '../../../components/sections/GiftInfoSection';
import ContactSection from '../../../components/sections/ContactSection';
import RSVPSection from '../../../components/sections/RSVPSection';
import PersonalizedGreeting from '../../../components/sections/PersonalizedGreeting';
import { supabase } from '../../../lib/supabase';
import { Guest } from '../../../lib/types';

// Generate dynamic metadata for each page
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ uniqueGuestId: string }> 
}): Promise<Metadata> {
  // Fetch guest data
  const { uniqueGuestId } = await params;
  const { data: guest } = await supabase
    .from('guests')
    .select('*')
    .eq('unique_invite_id', uniqueGuestId)
    .single();
  
  if (!guest) {
    return {
      title: 'Invitation Not Found | Hoàng Công & Mỹ Duyên Wedding',
      description: 'The invitation you are looking for could not be found.',
    };
  }
  
  return {
    title: `${guest.name}'s Invitation | Hoàng Công & Mỹ Duyên Wedding`,
    description: `${guest.name}, you are cordially invited to Hoàng Công & Mỹ Duyên's wedding.`,
  };
}

// This function runs on the server at request time
async function getGuest(uniqueGuestId: string): Promise<Guest | null> {
  const { data, error } = await supabase
    .from('guests')
    .select('*')
    .eq('unique_invite_id', uniqueGuestId)
    .single();
  
  if (error || !data) {
    return null;
  }
  
  return data as Guest;
}

export default async function PersonalizedInvitationPage({ 
  params 
}: { 
  params: Promise<{ uniqueGuestId: string }> 
}) {
  // Await the params if it's a promise (Next.js 15 compatibility)
  const { uniqueGuestId } = await params;
  
  const guest = await getGuest(uniqueGuestId);
  
  // If guest not found, show 404 page
  if (!guest) {
    return notFound();
  }
  
  // Wedding date - May 1, 2025 at 17:00
  const weddingDate = '2025-05-01T17:00:00';
  
  return (
    <MainLayout>
      <PersonalizedGreeting guest={guest} />
      <HeroSection weddingDate={weddingDate} />
      <InvitationSection />
      <ParentsSection />
      <EventDetailsSection />
      <GallerySection />
      <GiftInfoSection />
      <ContactSection />
      <RSVPSection 
        isPersonalized={true}
        guestName={guest.name}
        guestId={guest.id}
        uniqueInviteId={guest.unique_invite_id}
        rsvpStatus={guest.rsvp_status}
      />
    </MainLayout>
  );
}
