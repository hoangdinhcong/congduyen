import React from 'react';
import MainLayout from '../../components/layout/MainLayout';
import HeroSection from '../../components/sections/HeroSection';
import InvitationSection from '../../components/sections/InvitationSection';
import ParentsSection from '../../components/sections/ParentsSection';
import EventDetailsSection from '../../components/sections/EventDetailsSection';
import GallerySection from '../../components/sections/GallerySection';
import GiftInfoSection from '../../components/sections/GiftInfoSection';
import ContactSection from '../../components/sections/ContactSection';
import RSVPSection from '../../components/sections/RSVPSection';

export default function GroomPage() {
  // Wedding date - May 1, 2025 at 17:00
  const weddingDate = '2025-05-01T17:00:00';
  
  return (
    <MainLayout>
      <HeroSection weddingDate={weddingDate} />
      <InvitationSection />
      <ParentsSection />
      <EventDetailsSection />
      <GallerySection />
      <GiftInfoSection />
      <ContactSection />
      <RSVPSection />
    </MainLayout>
  );
}
