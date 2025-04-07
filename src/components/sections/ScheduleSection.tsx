import React from 'react';
import SectionTitle from '../ui/SectionTitle';
import { FaClock } from 'react-icons/fa';

export default function ScheduleSection() {
  const events = [
    {
      time: '2:30 PM',
      title: 'Guest Arrival',
      description: 'Welcome and seating of guests at the ceremony venue'
    },
    {
      time: '3:00 PM',
      title: 'Ceremony Begins',
      description: 'Exchange of vows and rings'
    },
    {
      time: '4:30 PM',
      title: 'Cocktail Hour',
      description: 'Refreshments and appetizers served'
    },
    {
      time: '5:30 PM',
      title: 'Reception',
      description: 'Dinner, speeches, and celebration'
    },
    {
      time: '7:00 PM',
      title: 'First Dance',
      description: 'The couple\'s first dance as newlyweds'
    },
    {
      time: '10:00 PM',
      title: 'Farewell',
      description: 'The celebration concludes'
    }
  ];

  return (
    <section className="py-16">
      <div className="container-wedding">
        <SectionTitle 
          title="Wedding Day Schedule" 
          subtitle="The timeline for our special day"
        />
        
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary-light transform md:-translate-x-1/2" />
            
            {/* Events */}
            {events.map((event, index) => (
              <div 
                key={index}
                className={`relative flex flex-col md:flex-row gap-8 mb-12 ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Time bubble */}
                <div className="absolute left-4 md:left-1/2 w-8 h-8 bg-primary rounded-full flex items-center justify-center transform -translate-x-1/2 z-10">
                  <FaClock className="text-white text-xs" />
                </div>
                
                {/* Content */}
                <div className="md:w-1/2 ml-16 md:ml-0">
                  <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
                    <div className="text-lg font-medium text-primary mb-1">{event.time}</div>
                    <h3 className="text-xl font-heading mb-2">{event.title}</h3>
                    <p className="text-gray-600">{event.description}</p>
                  </div>
                </div>
                
                {/* Empty space for alternating layout */}
                <div className="hidden md:block md:w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
