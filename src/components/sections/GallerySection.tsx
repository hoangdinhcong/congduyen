'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import SectionTitle from '../ui/SectionTitle';
import weddingData from '@/data/data.json';

export default function GallerySection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('appear');
            // Optional: Unobserve after appearing to save resources
            // observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: '0px 0px -50px 0px', // Start animation a bit before it's fully in view
      }
    );

    const currentSectionRef = sectionRef.current;
    if (currentSectionRef) {
      const elementsToAnimate = currentSectionRef.querySelectorAll('.gallery-item-fade-in');
      elementsToAnimate.forEach((el) => {
        observer.observe(el);
      });
    }

    // Cleanup observer on component unmount
    return () => {
      if (currentSectionRef) {
        const elementsToAnimate = currentSectionRef.querySelectorAll('.gallery-item-fade-in');
        elementsToAnimate.forEach((el) => {
          observer.unobserve(el);
        });
      }
    };
  }, []);

  return (
    <section ref={sectionRef} id="gallery" className="py-20 bg-white">
      <div className="container-wedding">
        <SectionTitle
          title={weddingData.galleryTitle}
          subtitle={weddingData.gallerySubtitle}
        />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {weddingData.gallery.map((image, index) => (
            <div
              key={index}
              className="relative aspect-square overflow-hidden rounded-lg shadow-md gallery-item-fade-in transition-all duration-700 ease-out opacity-0 transform translate-y-5 hover:shadow-xl hover:scale-105"
              style={{ transitionDelay: `${index * 100}ms` }} // Stagger animation
            >
              <Image
                src={image.src}
                alt={image.alt}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-300 ease-in-out"
                // Add sizes for better performance if you know the approx display size
                // sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                priority={index < 3} // Prioritize loading first few images
              />
              {/* Optional: Add overlay or caption on hover */}
              {/* <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-40 transition-opacity duration-300 flex items-center justify-center">
                <p className="text-white opacity-0 hover:opacity-100 transition-opacity duration-300">{image.alt}</p>
              </div> */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
