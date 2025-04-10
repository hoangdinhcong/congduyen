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
import SectionTitle from '../../components/ui/SectionTitle';

export default function BridePage() {
  // Wedding date - May 1, 2025 at 17:00
  const weddingDate = '2025-05-01T17:00:00';
  
  return (
    <MainLayout>
      <div className="py-8 bg-primary-light">
        <div className="container-wedding">
          <SectionTitle 
            title="Nhà Gái" 
            subtitle="Chào mừng gia đình và bạn bè của Mỹ Duyên"
          />
          
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg mb-4">
              Cảm ơn bạn đã đồng hành cùng Mỹ Duyên. Chúng tôi rất vui mừng khi có bạn tham dự lễ cưới của chúng tôi.
            </p>
            <p className="text-gray-700">
              Vui lòng sử dụng đường dẫn mời cá nhân để phản hồi tham dự đám cưới.
            </p>
          </div>
        </div>
      </div>
      
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
