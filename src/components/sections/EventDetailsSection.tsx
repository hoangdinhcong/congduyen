import React from 'react';
import SectionTitle from '../ui/SectionTitle';
import { FaMapMarkerAlt, FaCalendarAlt, FaClock, FaCalendarPlus } from 'react-icons/fa';
import { generateGoogleCalendarUrl } from '../../utils/calendarUtils';
import weddingData from '@/data/data.json';

export default function EventDetailsSection() {
  const googleCalendarUrl = generateGoogleCalendarUrl(
    weddingData.event.title,
    weddingData.event.description,
    weddingData.event.location.address,
    weddingData.event.date,
    weddingData.event.endDate
  );

  const displayDate = new Date(weddingData.event.date).toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
  const displayTime = weddingData.event.reception.time;

  return (
    <section className="py-16 bg-gray-50">
      <div className="container-wedding">
        <SectionTitle 
          title={weddingData.eventDetailsTitle} 
          subtitle={weddingData.eventDetailsSubtitle} 
        />
        
        <div className="grid md:grid-cols-1 gap-8 max-w-6xl mx-auto">
          {/* Ceremony & Reception Combined */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-2xl font-heading mb-4 text-center">Tiệc Cưới</h3>
            
            <div className="flex items-start gap-3 mb-4">
              <FaMapMarkerAlt className="text-primary mt-1 flex-shrink-0" />
              <div>
                <p className="font-medium">{weddingData.event.location.name}</p>
                <p className="text-gray-600">{weddingData.event.location.address}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 mb-4">
              <FaCalendarAlt className="text-primary mt-1 flex-shrink-0" />
              <div>
                <p className="font-medium">{displayDate}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 mb-6">
              <FaClock className="text-primary mt-1 flex-shrink-0" />
              <div>
                <p className="font-medium">{displayTime}</p>
              </div>
            </div>
            
            {/* Add to Calendar Button */}
            <div className="flex justify-center mb-6">
              <a 
                href={googleCalendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md transition-colors"
              >
                <FaCalendarPlus />
                <span>Thêm vào Google Calendar</span>
              </a>
            </div>
            
            {/* Map */}
            <div className="aspect-video bg-gray-200 rounded-md overflow-hidden">
              <iframe 
                src={weddingData.event.location.mapLink}
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Địa điểm tổ chức"
              />
            </div>
            
            <div className="mt-4 text-center">
              <a 
                href={weddingData.event.location.directionsLink}
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:text-primary-dark transition-colors"
              >
                Chỉ Đường
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
