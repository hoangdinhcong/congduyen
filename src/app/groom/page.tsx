import React from 'react';
import Navbar from '../../components/Navbar';
import HeroSection from '../../components/HeroSection';
import LocationSection from '../../components/LocationSection';
import GallerySection from '../../components/GallerySection';
import GiftsSection from '../../components/GiftsSection';
import RsvpSection from '../../components/RsvpSection';

export default function GroomPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
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
