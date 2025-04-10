'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import SectionTitle from '../ui/SectionTitle';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function GallerySection() {
  // Using the actual images from the gallery folder
  const images = [
    { src: '/gallery/1.jpg', alt: 'Ảnh cưới 1' },
    { src: '/gallery/2.jpg', alt: 'Ảnh cưới 2' },
    { src: '/gallery/3.jpg', alt: 'Ảnh cưới 3' },
    { src: '/gallery/4.jpg', alt: 'Ảnh cưới 4' },
    { src: '/gallery/5.jpg', alt: 'Ảnh cưới 5' },
    { src: '/gallery/6.jpg', alt: 'Ảnh cưới 6' },
    { src: '/gallery/7.jpg', alt: 'Ảnh cưới 7' },
    { src: '/gallery/8.jpg', alt: 'Ảnh cưới 8' },
    { src: '/gallery/9.jpg', alt: 'Ảnh cưới 9' },
  ];

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Handle scroll events to update arrow visibility and active dot
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainer;
      
      // Show/hide navigation arrows based on scroll position
      setShowLeftArrow(scrollLeft > 20);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 20);
      
      // Update active dot indicator
      if (isMobile) {
        const itemWidth = scrollWidth / images.length;
        const newActiveIndex = Math.round(scrollLeft / itemWidth);
        setActiveIndex(Math.min(newActiveIndex, images.length - 1));
      }
    };

    scrollContainer.addEventListener('scroll', handleScroll);
    return () => scrollContainer.removeEventListener('scroll', handleScroll);
  }, [images.length, isMobile]);

  // Scroll to previous image
  const scrollPrev = () => {
    if (!scrollContainerRef.current) return;
    
    const itemWidth = scrollContainerRef.current.scrollWidth / images.length;
    scrollContainerRef.current.scrollBy({
      left: -itemWidth,
      behavior: 'smooth'
    });
  };

  // Scroll to next image
  const scrollNext = () => {
    if (!scrollContainerRef.current) return;
    
    const itemWidth = scrollContainerRef.current.scrollWidth / images.length;
    scrollContainerRef.current.scrollBy({
      left: itemWidth,
      behavior: 'smooth'
    });
  };

  // Scroll to a specific image
  const scrollToIndex = (index: number) => {
    if (!scrollContainerRef.current) return;
    
    const itemWidth = scrollContainerRef.current.scrollWidth / images.length;
    scrollContainerRef.current.scrollTo({
      left: itemWidth * index,
      behavior: 'smooth'
    });
  };

  return (
    <section className="py-16 bg-primary-light">
      <div className="container-wedding">
        <SectionTitle 
          title="Bộ Sưu Tập Ảnh" 
          subtitle="Những khoảnh khắc đẹp của chúng tôi"
        />
        
        {/* Desktop Gallery (Grid) */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <div 
              key={index} 
              className="aspect-square relative overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform hover:scale-105"
                loading={index < 6 ? "eager" : "lazy"}
              />
            </div>
          ))}
        </div>
        
        {/* Mobile Gallery (Horizontal Scroll) */}
        <div className="relative md:hidden">
          {/* Left Arrow */}
          {showLeftArrow && (
            <button 
              onClick={scrollPrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow-md text-primary"
              aria-label="Previous image"
            >
              <FaChevronLeft />
            </button>
          )}
          
          {/* Right Arrow */}
          {showRightArrow && (
            <button 
              onClick={scrollNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow-md text-primary"
              aria-label="Next image"
            >
              <FaChevronRight />
            </button>
          )}
          
          {/* Scrollable Container */}
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-6"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {images.map((image, index) => (
              <div 
                key={index} 
                className="flex-none w-[85%] mx-2 first:ml-0 last:mr-0 aspect-square relative overflow-hidden rounded-lg shadow-sm snap-center"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="85vw"
                  className="object-cover"
                  loading={index < 3 ? "eager" : "lazy"}
                  priority={index < 3}
                />
              </div>
            ))}
          </div>
          
          {/* Dot Indicators */}
          <div className="flex justify-center mt-4 gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  activeIndex === index 
                    ? 'bg-primary w-4' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </div>
        
        <div className="text-center mt-8">
          <p className="text-gray-600 italic">
            "Mỗi câu chuyện tình yêu đều đẹp, nhưng câu chuyện của chúng tôi là đặc biệt nhất."
          </p>
        </div>
      </div>
    </section>
  );
}
