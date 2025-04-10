'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { FaChevronDown } from 'react-icons/fa';

type HeroSectionProps = {
  weddingDate: string; // ISO date string
};

export default function HeroSection({ weddingDate }: HeroSectionProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Format date for display in Vietnamese
  const displayDate = new Date(weddingDate).toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  useEffect(() => {
    // Trigger animations after component mounts
    setIsLoaded(true);
    
    // Optional: Add parallax effect on scroll
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const heroImage = document.querySelector('.hero-image') as HTMLElement;
      if (heroImage) {
        heroImage.style.transform = `translateY(${scrollPosition * 0.4}px)`;
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const scrollToNextSection = () => {
    const nextSection = document.querySelector('#invitation');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center py-16 overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/30 z-10" />
        <Image
          src="/hero.jpg"
          alt="Hoàng Công và Mỹ Duyên"
          fill
          className={`object-cover hero-image transition-opacity duration-1000 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          priority
        />
      </div>
      
      {/* Content */}
      <div className="container-wedding relative z-20 text-center text-white">
        <div className="max-w-3xl mx-auto">
          {/* Names */}
          <h1 
            className={`text-5xl md:text-6xl lg:text-7xl font-heading mb-6 transition-all duration-1000 delay-500 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <span className="md:inline block">Hoàng Công</span>
            <span className="md:inline block my-2 md:my-0">&</span>
            <span className="md:inline block">Mỹ Duyên</span>
          </h1>
          
          {/* Date */}
          <p 
            className={`text-xl md:text-2xl mb-8 transition-all duration-1000 delay-700 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {displayDate}
          </p>
        </div>
      </div>
      
      {/* Scroll down indicator - moved outside of the content container to avoid overlap */}
      <div 
        className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer transition-all duration-1000 delay-1200 z-30 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={scrollToNextSection}
      >
        <div className="animate-bounce flex flex-col items-center">
          <span className="text-sm mb-2 text-white">Cuộn xuống</span>
          <FaChevronDown className="text-white" />
        </div>
      </div>
    </section>
  );
}
