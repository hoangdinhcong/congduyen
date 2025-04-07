import React from 'react';
import Image from 'next/image';
import SectionTitle from '../ui/SectionTitle';
import getImagePath from '../../utils/imagePath';

export default function GallerySection() {
  // In a real implementation, these would be actual images from your public folder
  const images = [
    { src: '/gallery/couple1.jpg', alt: 'Couple at the beach' },
    { src: '/gallery/couple2.jpg', alt: 'Couple in the park' },
    { src: '/gallery/couple3.jpg', alt: 'Engagement photo' },
    { src: '/gallery/couple4.jpg', alt: 'First date' },
    { src: '/gallery/couple5.jpg', alt: 'Proposal moment' },
    { src: '/gallery/couple6.jpg', alt: 'Together in the city' },
  ];

  return (
    <section className="py-16 bg-primary-light">
      <div className="container-wedding">
        <SectionTitle 
          title="Our Gallery" 
          subtitle="Moments we've shared together"
        />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <div 
              key={index} 
              className="aspect-square relative overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              {/* 
                Note: In a real implementation, you would replace the placeholder with actual images.
                For now, we're using a placeholder div with a gradient background.
              */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-light to-primary flex items-center justify-center">
                <p className="text-white text-center p-4">Image {index + 1}: {image.alt}</p>
              </div>
              
              {/* Uncomment this when you have actual images */}
              {/* 
              <Image
                src={getImagePath(image.src)}
                alt={image.alt}
                fill
                className="object-cover transition-transform hover:scale-105"
              />
              */}
            </div>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <p className="text-gray-600 italic">
            "Every love story is beautiful, but ours is my favorite."
          </p>
        </div>
      </div>
    </section>
  );
}
