import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import LocationSection from '@/components/LocationSection';
import GallerySection from '@/components/GallerySection';
import GiftsSection from '@/components/GiftsSection';
import RsvpSection from '@/components/RsvpSection';
import PersonalizedGreeting from '@/components/PersonalizedGreeting';
import { supabase } from '@/lib/supabase';
import { Guest } from '@/lib/types';

// Generate dynamic metadata for each page
export async function generateMetadata({
  params
}: {
  params: Promise<{ uniqueGuestId: string }>
}): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://congduyen.vercel.app';
  // Fetch guest data
  const { uniqueGuestId } = await params;
  const { data: guest } = await supabase
    .from('guests')
    .select('*')
    .eq('unique_invite_id', uniqueGuestId)
    .single();

  if (!guest) {
    return {
      title: 'Không tìm thấy lời mời | Đám cưới Hoàng Công & Mỹ Duyên',
      description: 'Lời mời bạn đang tìm kiếm không tồn tại.',
      openGraph: {
        title: 'Không tìm thấy lời mời | Đám cưới Hoàng Công & Mỹ Duyên',
        description: 'Lời mời bạn đang tìm kiếm không tồn tại.',
        images: [
          {
            url: `${baseUrl}/hero.jpg`,
            width: 1200,
            height: 630,
            alt: 'Thiệp mời cưới Công & Duyên',
          }
        ],
      }
    };
  }

  const title = `Lời mời tới ${guest.name} | Đám cưới Hoàng Công & Mỹ Duyên`;
  const description = `${guest.name}, bạn được trân trọng mời đến dự đám cưới của Hoàng Công & Mỹ Duyên.`;

  return {
    title,
    description,
    metadataBase: new URL(baseUrl),
    openGraph: {
      type: 'website',
      title,
      description,
      siteName: 'Đám cưới Công & Duyên',
      url: `${baseUrl}/invite/${uniqueGuestId}`,
      locale: 'vi_VN',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${baseUrl}/invite/${uniqueGuestId}/opengraph-image.png`],
    },
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
      <LocationSection guest={guest} />
      <GallerySection />
      <GiftsSection guest={guest} />
      <RsvpSection guest={guest} />

      <footer className="py-8 bg-white text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Hoàng Công & Mỹ Duyên</p>
      </footer>
    </div>
  );
}
