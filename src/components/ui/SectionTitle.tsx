'use client';

import React, { useEffect, useRef } from 'react';

type SectionTitleProps = {
  title: string;
  subtitle?: string;
  centered?: boolean;
  animationDelay?: number;
  titleClassName?: string;
  subtitleClassName?: string;
};

export default function SectionTitle({
  title,
  subtitle,
  centered = true,
  animationDelay = 0,
  titleClassName = 'section-title',
  subtitleClassName = 'text-lg text-gray-600 font-sans'
}: SectionTitleProps) {
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('appear');
            }, animationDelay);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    const currentRef = titleRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [animationDelay]);

  return (
    <div
      ref={titleRef}
      className={`mb-12 section-fade-in ${centered ? 'text-center' : ''}`}
    >
      <h2 className={`${titleClassName}`}>{title}</h2>
      {subtitle && (
        <p className={`${subtitleClassName} max-w-2xl mx-auto`}>{subtitle}</p>
      )}
      <div className="section-title mt-4 inline-block">
        <span className="invisible">.</span>
      </div>
    </div>
  );
}
