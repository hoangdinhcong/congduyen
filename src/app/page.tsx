import React from 'react';
import MainLayout from '../components/layout/MainLayout';
import HeroSection from '../components/sections/HeroSection';
import InvitationSection from '../components/sections/InvitationSection';
import EventDetailsSection from '../components/sections/EventDetailsSection';
import ScheduleSection from '../components/sections/ScheduleSection';
import GallerySection from '../components/sections/GallerySection';
import GiftInfoSection from '../components/sections/GiftInfoSection';
import ContactSection from '../components/sections/ContactSection';
import RSVPSection from '../components/sections/RSVPSection';

export default function Home() {
  return (
    <MainLayout>
      <HeroSection />
      <InvitationSection />
      <EventDetailsSection />
      <ScheduleSection />
      <GallerySection />
      <GiftInfoSection />
      <ContactSection />
      <RSVPSection />
    </MainLayout>
  );
}
