import React from 'react';
import Image from 'next/image';
import CountdownTimer from '../ui/CountdownTimer';
import getImagePath from '../../utils/imagePath';

type HeroSectionProps = {
  weddingDate: string; // ISO date string
};

export default function HeroSection({ weddingDate }: HeroSectionProps) {
  // Format date for display (e.g., "April 15, 2025")
  const displayDate = new Date(weddingDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center py-16 overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/30 z-10" />
        <Image
          src={getImagePath('/couple.jpg')}
          alt="Cong and Duyen"
          fill
          className="object-cover"
          priority
        />
      </div>
      
      {/* Content */}
      <div className="container-wedding relative z-20 text-center text-white">
        <div className="max-w-3xl mx-auto">
          {/* Monogram */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="text-4xl md:text-5xl font-heading">C</span>
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-white flex items-center justify-center">
              <span className="text-xl">&</span>
            </div>
            <span className="text-4xl md:text-5xl font-heading">D</span>
          </div>
          
          {/* Names */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading mb-4">
            Cong & Duyen
          </h1>
          
          {/* Date */}
          <p className="text-xl md:text-2xl mb-8">
            {displayDate}
          </p>
          
          {/* Countdown Timer */}
          <div className="mt-12">
            <p className="text-lg mb-4">Countdown to our special day</p>
            <CountdownTimer targetDate={weddingDate} />
          </div>
        </div>
      </div>
    </section>
  );
}
