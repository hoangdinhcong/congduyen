import React from 'react';
import MainLayout from '../../components/layout/MainLayout';
import HeroSection from '../../components/sections/HeroSection';
import InvitationSection from '../../components/sections/InvitationSection';
import ParentsSection from '../../components/sections/ParentsSection';
import EventDetailsSection from '../../components/sections/EventDetailsSection';
import ScheduleSection from '../../components/sections/ScheduleSection';
import GallerySection from '../../components/sections/GallerySection';
import GiftInfoSection from '../../components/sections/GiftInfoSection';
import ContactSection from '../../components/sections/ContactSection';
import RSVPSection from '../../components/sections/RSVPSection';
import SectionTitle from '../../components/ui/SectionTitle';

export default function GroomPage() {
  // Wedding date - April 15, 2025
  const weddingDate = '2025-04-15T15:00:00';
  
  return (
    <MainLayout>
      <div className="py-8 bg-primary-light">
        <div className="container-wedding">
          <SectionTitle 
            title="Groom&apos;s Side" 
            subtitle="Welcome to Cong&apos;s family and friends"
          />
          
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg mb-4">
              Thank you for being part of Cong&apos;s journey. We&apos;re excited to have you join us for this special celebration.
            </p>
            <p className="text-gray-700">
              Please use your personalized invitation link to RSVP for the wedding.
            </p>
          </div>
        </div>
      </div>
      
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
