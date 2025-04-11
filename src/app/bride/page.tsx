import React from 'react';
import MainLayout from '../../components/layout/MainLayout';
import HeroSection from '../../components/sections/HeroSection';
import InvitationSection from '../../components/sections/InvitationSection';
import EventDetailsSection from '../../components/sections/EventDetailsSection';
import GiftInfoSection from '../../components/sections/GiftInfoSection';
import ContactSection from '../../components/sections/ContactSection';
import RSVPSection from '../../components/sections/RSVPSection';

export default function BridePage() {
  
  return (
    <MainLayout>
      <HeroSection />
      <InvitationSection />
      <EventDetailsSection />
      <GiftInfoSection />
      <ContactSection />
      <RSVPSection />
    </MainLayout>
  );
}
