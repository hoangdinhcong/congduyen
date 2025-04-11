"use client";

import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/shadcn/carousel";

const GallerySection = () => {
  const images = [
    {
      url: "https://images.unsplash.com/photo-1529634597503-139d3726fed5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600",
      alt: "Couple by the beach"
    },
    {
      url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600",
      alt: "Couple holding hands"
    },
    {
      url: "https://images.unsplash.com/photo-1522673607200-164d1b3ce551?ixlib=rb-4.0.3&auto=format&fit=crop&w=600",
      alt: "Bride and groom embracing"
    },
    {
      url: "https://images.unsplash.com/photo-1535980156496-32222d3bb0b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600",
      alt: "Wedding proposal"
    },
    {
      url: "https://images.unsplash.com/photo-1494783367193-149034c05e8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600",
      alt: "Couple walking in the park"
    },
    {
      url: "https://images.unsplash.com/photo-1509927083803-4bd519298ac4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600",
      alt: "Couple's silhouette"
    },
  ];

  return (
    <section id="gallery" className="bg-secondary/20">
      <div className="section-container">
        <h2 className="section-title">Our Journey</h2>

        <div className="max-w-5xl mx-auto">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {images.map((image, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div
                    className="aspect-square overflow-hidden rounded-lg shadow-md fade-in"
                    style={{ animationDelay: `${0.2 + index * 0.1}s` }}
                  >
                    <img
                      src={image.url}
                      alt={image.alt}
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
