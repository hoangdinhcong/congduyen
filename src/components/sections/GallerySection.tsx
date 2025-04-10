import React from 'react';
import Image from 'next/image';
import SectionTitle from '../ui/SectionTitle';

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

  return (
    <section className="py-16 bg-primary-light">
      <div className="container-wedding">
        <SectionTitle 
          title="Bộ Sưu Tập Ảnh" 
          subtitle="Những khoảnh khắc đẹp của chúng tôi"
        />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <div 
              key={index} 
              className="aspect-square relative overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform hover:scale-105"
              />
            </div>
          ))}
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
