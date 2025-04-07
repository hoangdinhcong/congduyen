import React from 'react';
import MainLayout from '../components/layout/MainLayout';
import HeroSection from '../components/sections/HeroSection';
import InvitationSection from '../components/sections/InvitationSection';
import ParentsSection from '../components/sections/ParentsSection';
import EventDetailsSection from '../components/sections/EventDetailsSection';
import ScheduleSection from '../components/sections/ScheduleSection';
import GallerySection from '../components/sections/GallerySection';
import GiftInfoSection from '../components/sections/GiftInfoSection';
import ContactSection from '../components/sections/ContactSection';
import RSVPSection from '../components/sections/RSVPSection';

export default function Home() {
  // Wedding date - April 15, 2025
  const weddingDate = '2025-04-15T15:00:00';
  
  return (
    <MainLayout>
      <HeroSection weddingDate={weddingDate} />
      <InvitationSection />
      <ParentsSection />
      <EventDetailsSection />
      <ScheduleSection />
      <GallerySection />
      <GiftInfoSection />
      <ContactSection />
      <RSVPSection />
    </MainLayout>
  );
}
