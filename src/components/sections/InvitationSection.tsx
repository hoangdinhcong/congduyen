'use client';

import React, { useRef, useEffect } from 'react';
import SectionTitle from '../ui/SectionTitle';
import { Heart } from 'lucide-react';
import weddingData from '@/data/data.json';

export default function InvitationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const invitationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('appear');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    const currentSectionRef = sectionRef.current;
    if (currentSectionRef) {
      const elementsToAnimate = currentSectionRef.querySelectorAll('.section-fade-in');
      elementsToAnimate.forEach((el) => {
        observer.observe(el);
      });
    }

    return () => {
      if (currentSectionRef) {
        const elementsToAnimate = currentSectionRef.querySelectorAll('.section-fade-in');
        elementsToAnimate.forEach((el) => {
          observer.unobserve(el);
        });
      }
    };
  }, []);

  // Format event date and time for display
  const eventDate = new Date(weddingData.event.date);
  const displayDate = eventDate.toLocaleDateString('vi-VN', {
    weekday: 'long', // e.g., Thứ Ba
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  // Assuming the time shown is the reception time
  const displayTime = weddingData.event.reception.time;

  return (
    <section ref={sectionRef} id="invitation" className="py-20 bg-gradient-to-b from-white to-primary-light">
      <div className="container-wedding">
        <SectionTitle
          title={weddingData.invitationTitle}
          subtitle={weddingData.invitationSubtitle}
        />

        <div className="max-w-3xl mx-auto text-center">
          <p className="text-lg mb-6 text-gray-700 section-fade-in">
            Được sự đồng ý của hai bên gia đình:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 text-lg section-fade-in">
            <div className="text-center md:text-right">
              <p className="font-semibold">Nhà Trai:</p>
              <p>Ông: {weddingData.groom.father}</p>
              <p>Bà: {weddingData.groom.mother}</p>
            </div>
            <div className="text-center md:text-left">
              <p className="font-semibold">Nhà Gái:</p>
              <p>Ông: {weddingData.bride.father}</p>
              <p>Bà: {weddingData.bride.mother}</p>
            </div>
          </div>
          <p className="text-lg mb-8 section-fade-in">
            {weddingData.invitationMessage}
          </p>

          <div
            ref={invitationRef}
            className="relative border-t border-b border-primary py-10 my-10 px-6 md:px-10 section-fade-in"
          >
            {/* Decorative corners */}
            <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-primary -translate-x-1 -translate-y-1"></div>
            <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-primary translate-x-1 -translate-y-1"></div>
            <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-primary -translate-x-1 translate-y-1"></div>
            <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-primary translate-x-1 translate-y-1"></div>

            {/* Decorative heart */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-white p-2">
              <Heart className="text-primary" size={20} />
            </div>

            <h3 className="font-serif text-2xl md:text-3xl mb-3 text-secondary">
              {weddingData.groom.name} & {weddingData.bride.name}
            </h3>
            <p className="text-xl mb-5 font-light font-sans">Trân trọng kính mời</p>
            <p className="text-lg leading-relaxed font-sans">
              {displayTime}, {displayDate}<br />
              {weddingData.event.location.address}
            </p>

            {/* Decorative heart at bottom */}
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white p-2">
              <Heart className="text-primary" size={20} />
            </div>
          </div>

          <p className="italic text-gray-600 section-fade-in">
            &ldquo;{weddingData.invitationQuote}&rdquo;
          </p>
        </div>
      </div>
    </section>
  );
}
