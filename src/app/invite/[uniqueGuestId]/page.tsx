import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Navbar from '../../../components/Navbar';
import HeroSection from '../../../components/HeroSection';
import LocationSection from '../../../components/LocationSection';
import GallerySection from '../../../components/GallerySection';
import GiftsSection from '../../../components/GiftsSection';
import RsvpSection from '../../../components/RsvpSection';
import PersonalizedGreeting from '../../../components/PersonalizedGreeting';
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

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <PersonalizedGreeting guest={guest} />
      <HeroSection />
      <LocationSection />
      <GallerySection />
      <GiftsSection />
      <RsvpSection />

      <footer className="py-8 bg-white text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Hoàng Công & Mỹ Duyên</p>
      </footer>
    </div>
  );
}
