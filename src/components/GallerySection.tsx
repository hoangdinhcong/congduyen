"use client";

import React, { useEffect, useState, useRef, TouchEvent } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/shadcn/carousel";
import weddingData from '@/data/data.json';
import Image from "next/image";

const GallerySection = () => {
  const images = weddingData.gallery;
  const [galleryImages, setGalleryImages] = useState(images);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Use useEffect to shuffle images on the client side only
  useEffect(() => {
    setGalleryImages([...images].sort(() => Math.random() - 0.5));
  }, [images]);

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
    setIsClosing(false);
    setIsFading(false);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setIsClosing(true);
    setTimeout(() => {
      setSelectedImageIndex(null);
      setIsClosing(false);
      setIsFading(false);
      document.body.style.overflow = 'auto';
    }, 300); // Match this with the animation duration
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (selectedImageIndex === null) return;
    
    // Set fading state for animation
    setIsFading(true);
    
    // Small delay to allow fade out before changing the image
    setTimeout(() => {
      const newIndex = direction === 'next' 
        ? (selectedImageIndex + 1) % galleryImages.length
        : (selectedImageIndex - 1 + galleryImages.length) % galleryImages.length;
      
      setSelectedImageIndex(newIndex);
      
      // Reset fading state after a short delay to fade in the new image
      setTimeout(() => {
        setIsFading(false);
      }, 50);
    }, 100);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') navigateImage('prev');
    if (e.key === 'ArrowRight') navigateImage('next');
    if (e.key === 'Escape') closeLightbox();
  };

  // Touch handlers for swipe navigation
  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    
    const diffX = touchStartX.current - touchEndX.current;
    const threshold = 50; // Minimum swipe distance
    
    if (Math.abs(diffX) > threshold) {
      if (diffX > 0) {
        // Swiped left, go to next
        navigateImage('next');
      } else {
        // Swiped right, go to previous
        navigateImage('prev');
      }
    }
    
    // Reset values
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <section id="gallery" className="bg-secondary/20">
      <div className="section-container">
        <h2 className="section-title">{weddingData.galleryTitle}</h2>

        <div className="max-w-5xl mx-auto">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {galleryImages.map((image, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div
                    className="aspect-square overflow-hidden rounded-lg shadow-md fade-in cursor-pointer group"
                    style={{ animationDelay: `${0.2 + index * 0.1}s` }}
                    onClick={() => openLightbox(index)}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                      <div className="p-3 w-full text-white text-sm font-medium">
                        {image.alt}
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-6">
              <CarouselPrevious className="relative static left-0 translate-y-0 mr-2" />
              <CarouselNext className="relative static right-0 translate-y-0 ml-2" />
            </div>
          </Carousel>
        </div>
      </div>

      {/* Fullscreen Lightbox */}
      {selectedImageIndex !== null && (
        <div 
          className={`fixed inset-0 bg-black/75 z-50 flex items-center justify-center backdrop-blur-sm transition-opacity duration-300 ${isClosing ? 'opacity-0' : 'opacity-100'}`}
          onClick={closeLightbox} // This will close the lightbox when clicking anywhere in this container
          onKeyDown={handleKeyDown}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          tabIndex={0}
        >
          {/* Image container - we need to stop propagation here to prevent closing when clicking on the image */}
          <div 
            className={`relative max-w-[90vw] max-h-[90vh] transition-transform duration-300 ${isClosing ? 'scale-95' : 'scale-100'}`}
            onClick={(e) => e.stopPropagation()} // Stop propagation to prevent closing when clicking on the image
          >
            <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
              <div className="w-full h-full flex items-center justify-center">
                <Image
                  src={galleryImages[selectedImageIndex].src}
                  alt={galleryImages[selectedImageIndex].alt}
                  width={1200}
                  height={800}
                  className={`object-contain max-h-[90vh] max-w-[90vw] transition-opacity duration-300 ${isClosing || isFading ? 'opacity-0' : 'opacity-100'}`}
                  priority
                />
              </div>
            </div>
          </div>
              
          {/* Navigation buttons - also need to stop propagation */}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              navigateImage('prev');
            }}
            className="absolute left-4 p-3 bg-black/30 hover:bg-black/60 rounded-full transition-all duration-300 z-10 hover:scale-110"
            aria-label="Previous image"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
            
          <button 
            onClick={(e) => {
              e.stopPropagation();
              navigateImage('next');
            }}
            className="absolute right-4 p-3 bg-black/30 hover:bg-black/60 rounded-full transition-all duration-300 z-10 hover:scale-110"
            aria-label="Next image"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
            
          <button 
            onClick={(e) => {
              e.stopPropagation();
              closeLightbox();
            }}
            className="absolute top-4 right-4 bg-black/30 hover:bg-black/60 rounded-full p-2 transition-all duration-300 z-10 hover:scale-110"
            aria-label="Close lightbox"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      )}
    </section>
  );
};

export default GallerySection;
