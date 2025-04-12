"use client";

import React, { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import Image from "next/image";
import weddingData from '@/data/data.json';

const HeroSection = () => {
  const [showCard, setShowCard] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show card when scrolled down a bit (e.g., 100px), hide when at top
      if (window.scrollY > 10) {
        setShowCard(true);
      } else {
        setShowCard(false);
      }
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);
    
    // Initial check (card should be hidden on first load)
    handleScroll();

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative pt-16"
    >
      <div className="absolute inset-0">
        <Image
          src="/hero.jpg"
          alt="Wedding background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      <div 
        className={`text-center px-6 z-10 bg-white/80 py-10 rounded-lg backdrop-blur-sm max-w-4xl transition-all duration-500 ${
          showCard 
            ? "opacity-100 translate-y-0" 
            : "opacity-0 translate-y-10 pointer-events-none"
        }`}
      >
        <p className="font-serif text-xl mb-4 text-gray-700">Chúng mình sắp kết hôn</p>

        <h1 className="font-serif text-5xl md:text-7xl font-medium mb-6 text-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4">
            <span>{weddingData.groom.name}</span>
            <span className="text-4xl md:text-6xl">&</span>
            <span>{weddingData.bride.name}</span>
          </div>
        </h1>

        <div className="flex items-center justify-center mb-8">
          <div className="h-px w-12 bg-gray-300"></div>
          <Heart className="mx-4 text-primary" size={24} />
          <div className="h-px w-12 bg-gray-300"></div>
        </div>

        <p className="font-sans uppercase tracking-widest text-lg mb-2">
          NGÀY 1 THÁNG 5, 2025
        </p>

        <p className="font-sans text-md text-gray-600 mb-8">
          (NGÀY 4 THÁNG 4, Ất Tỵ)
        </p>

        {/* <Link
          href="#rsvp"
          className="button-primary inline-block"
        >
          Xác nhận tham dự
        </Link> */}
      </div>
    </section>
  );
};

export default HeroSection;
