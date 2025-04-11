'use client';

import React, { useRef, useEffect } from 'react';
import SectionTitle from '../ui/SectionTitle';
import weddingData from '@/data/data.json';
import * as FaIcons from 'react-icons/fa'; // Import all Fa icons

// Define a type for the icon names (optional but good practice)
type IconName = keyof typeof FaIcons;

// Helper function to get icon component by name
const getIconComponent = (iconName: string | undefined): React.ComponentType<{ className?: string }> | null => {
  if (!iconName || !(iconName in FaIcons)) {
    return FaIcons.FaClock; // Default icon if not found or specified
  }
  return FaIcons[iconName as IconName];
};

export default function ScheduleSection() {
  const sectionRef = useRef<HTMLElement>(null);

  // Intersection Observer for animations (similar to other sections)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('appear');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const currentSectionRef = sectionRef.current;
    if (currentSectionRef) {
      const elements = currentSectionRef.querySelectorAll('.timeline-item-fade-in');
      elements.forEach(el => observer.observe(el));
    }

    return () => {
      if (currentSectionRef) {
        const elements = currentSectionRef.querySelectorAll('.timeline-item-fade-in');
        elements.forEach(el => observer.unobserve(el));
      }
    };
  }, []);

  return (
    <section ref={sectionRef} id="schedule" className="py-20 bg-primary-light">
      <div className="container-wedding">
        <SectionTitle
          title={weddingData.scheduleTitle}
          subtitle={weddingData.scheduleSubtitle}
          titleClassName="text-secondary" // Apply custom class for title
          subtitleClassName="text-gray-600" // Apply custom class for subtitle
        />

        <div className="relative max-w-2xl mx-auto mt-12">
          {/* Vertical line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-primary rounded -translate-x-1/2"></div>

          {weddingData.schedule.map((item, index) => {
            const IconComponent = getIconComponent(item.icon);
            const isLeft = index % 2 === 0; // Alternate sides

            return (
              <div
                key={index}
                className={`relative mb-12 timeline-item-fade-in transition-all duration-700 ease-out opacity-0 transform ${isLeft ? 'pr-8 md:pr-16' : 'pl-8 md:pl-16' } ${isLeft ? 'md:text-right' : 'md:text-left'}`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Dot on the timeline */}
                 <div className={`absolute top-1 w-5 h-5 bg-primary rounded-full border-4 border-primary-light transform -translate-x-1/2 ${isLeft ? 'left-1/2 md:left-auto md:right-[calc(50%+0.5rem)]' : 'left-1/2 md:left-auto md:left-[calc(50%+0.5rem)]' } md:-translate-x-1/2`}></div>

                {/* Content Box Adjust based on side */} 
                 <div className={`relative ${isLeft ? 'md:mr-[calc(50%+2.5rem)]' : 'md:ml-[calc(50%+2.5rem)]'}`}>
                    <div className="p-6 bg-white rounded-lg shadow-lg">
                        <div className={`flex items-center mb-2 ${isLeft ? 'md:justify-end' : 'md:justify-start'}`}>
                         {IconComponent && <IconComponent className={`mr-2 text-primary ${isLeft ? 'md:order-last md:ml-2 md:mr-0' : '' }`} />} 
                         <h3 className={`font-heading text-xl font-semibold text-secondary`}>{item.title}</h3>
                       </div>
                       <p className={`text-primary font-semibold mb-2`}>{item.time}</p>
                       <p className={`text-gray-600`}>{item.description}</p>
                   </div>
                    {/* Arrow pointing to timeline */}
                   <div className={`absolute top-4 w-0 h-0 border-t-8 border-b-8 ${ 
                     isLeft 
                       ? 'right-full md:right-auto md:left-full border-l-8 border-l-white border-t-transparent border-b-transparent md:border-r-8 md:border-r-white md:border-l-transparent' 
                       : 'left-full border-r-8 border-r-white border-t-transparent border-b-transparent'
                   } transform ${isLeft ? '' : ''}`}>
                 </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
