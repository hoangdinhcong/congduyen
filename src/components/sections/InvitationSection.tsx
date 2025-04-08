'use client';

import React, { useRef, useEffect } from 'react';
import SectionTitle from '../ui/SectionTitle';
import { FaHeart } from 'react-icons/fa';

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

  return (
    <section ref={sectionRef} id="invitation" className="py-20 bg-gradient-to-b from-white to-primary-light">
      <div className="container-wedding">
        <SectionTitle 
          title="You Are Invited" 
          subtitle="We would be honored to have you join us on our special day"
        />
        
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-lg mb-8 section-fade-in">
            With great pleasure, we invite you to share in our joy as we unite in marriage.
            Your presence will make our celebration even more meaningful as we begin our new life together.
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
              <FaHeart className="text-primary text-xl" />
            </div>
            
            <h3 className="font-heading text-2xl md:text-3xl mb-3 text-secondary">Cong & Duyen</h3>
            <p className="text-xl mb-5 font-light">Request the honor of your presence</p>
            <p className="text-lg leading-relaxed">
              Saturday, the fifteenth of April<br />
              Two thousand and twenty-five<br />
              at three o&apos;clock in the afternoon
            </p>
            
            {/* Decorative heart at bottom */}
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white p-2">
              <FaHeart className="text-primary text-xl" />
            </div>
          </div>
          
          <p className="italic text-gray-600 section-fade-in">
            &ldquo;Love is patient, love is kind. It always protects, always trusts, always hopes, always perseveres.&rdquo;
          </p>
        </div>
      </div>
    </section>
  );
}
