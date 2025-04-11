"use client";

import React from "react";
import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const HeroSection = () => {
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

      <div className="text-center px-6 fade-in z-10 bg-white/80 py-10 rounded-lg backdrop-blur-sm max-w-2xl" style={{ animationDelay: "0.2s" }}>
        <p className="font-serif text-xl mb-4 text-gray-700">Chúng tôi sắp kết hôn</p>

        <h1 className="font-serif text-5xl md:text-7xl font-medium mb-6 text-gray-800">
          Hoàng Công & Mỹ Duyên
        </h1>

        <div className="flex items-center justify-center mb-8">
          <div className="h-px w-12 bg-gray-300"></div>
          <Heart className="mx-4 text-primary" size={24} />
          <div className="h-px w-12 bg-gray-300"></div>
        </div>

        <p className="font-sans uppercase tracking-widest text-lg mb-8">
          NGÀY 1 THÁNG 5, 2025
        </p>

        <Link
          href="#rsvp"
          className="button-primary inline-block"
        >
          Xác nhận tham dự
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
