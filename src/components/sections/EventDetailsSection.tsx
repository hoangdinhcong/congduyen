import React from 'react';
import SectionTitle from '../ui/SectionTitle';
import { FaMapMarkerAlt, FaCalendarAlt, FaClock } from 'react-icons/fa';

export default function EventDetailsSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container-wedding">
        <SectionTitle 
          title="Event Details" 
          subtitle="Join us for our celebration of love"
        />
        
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Ceremony */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-2xl font-heading mb-4 text-center">Ceremony</h3>
            
            <div className="flex items-start gap-3 mb-4">
              <FaMapMarkerAlt className="text-primary mt-1 flex-shrink-0" />
              <div>
                <p className="font-medium">St. Mary's Cathedral</p>
                <p className="text-gray-600">123 Wedding Avenue, City, Country</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 mb-4">
              <FaCalendarAlt className="text-primary mt-1 flex-shrink-0" />
              <div>
                <p className="font-medium">Saturday, April 15, 2025</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 mb-6">
              <FaClock className="text-primary mt-1 flex-shrink-0" />
              <div>
                <p className="font-medium">3:00 PM - 4:30 PM</p>
              </div>
            </div>
            
            {/* Map */}
            <div className="aspect-video bg-gray-200 rounded-md overflow-hidden">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.5177580045246!2d106.69892121471856!3d10.771412992323746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f4b3330bcc7%3A0x4db964d76bf6e18e!2sNotre-Dame%20Cathedral%20Basilica%20of%20Saigon!5e0!3m2!1sen!2s!4v1649308788974!5m2!1sen!2s" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Ceremony Location"
              />
            </div>
            
            <div className="mt-4 text-center">
              <a 
                href="https://goo.gl/maps/1JyKGTkWs5J2" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:text-primary-dark transition-colors"
              >
                Get Directions
              </a>
            </div>
          </div>
          
          {/* Reception */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-2xl font-heading mb-4 text-center">Reception</h3>
            
            <div className="flex items-start gap-3 mb-4">
              <FaMapMarkerAlt className="text-primary mt-1 flex-shrink-0" />
              <div>
                <p className="font-medium">Grand Ballroom, Luxury Hotel</p>
                <p className="text-gray-600">456 Celebration Road, City, Country</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 mb-4">
              <FaCalendarAlt className="text-primary mt-1 flex-shrink-0" />
              <div>
                <p className="font-medium">Saturday, April 15, 2025</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 mb-6">
              <FaClock className="text-primary mt-1 flex-shrink-0" />
              <div>
                <p className="font-medium">5:30 PM - 10:00 PM</p>
              </div>
            </div>
            
            {/* Map */}
            <div className="aspect-video bg-gray-200 rounded-md overflow-hidden">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4559980344964!2d106.70232791471862!3d10.776939392320223!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f463a0a4dc5%3A0x9e5ec3fa6801b7d6!2sRex%20Hotel!5e0!3m2!1sen!2s!4v1649308863394!5m2!1sen!2s" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Reception Location"
              />
            </div>
            
            <div className="mt-4 text-center">
              <a 
                href="https://goo.gl/maps/2JyKGTkWs5J2" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:text-primary-dark transition-colors"
              >
                Get Directions
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
