"use client";

import React, { useEffect, useState } from "react";
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

  // Use useEffect to shuffle images on the client side only
  useEffect(() => {
    setGalleryImages([...images].sort(() => Math.random() - 0.5));
  }, [images]);

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
                    className="aspect-square overflow-hidden rounded-lg shadow-md fade-in"
                    style={{ animationDelay: `${0.2 + index * 0.1}s` }}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
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
    </section>
  );
};

export default GallerySection;
