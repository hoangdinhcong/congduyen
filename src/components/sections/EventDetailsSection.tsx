import React from 'react';
import SectionTitle from '../ui/SectionTitle';
import { FaMapMarkerAlt, FaCalendarAlt, FaClock } from 'react-icons/fa';

export default function EventDetailsSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container-wedding">
        <SectionTitle 
          title="Thông Tin Sự Kiện" 
          subtitle="Hân hạnh được đón tiếp quý vị trong ngày vui của chúng tôi"
        />
        
        <div className="grid md:grid-cols-1 gap-8 max-w-6xl mx-auto">
          {/* Ceremony & Reception Combined */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-2xl font-heading mb-4 text-center">Tiệc Cưới</h3>
            
            <div className="flex items-start gap-3 mb-4">
              <FaMapMarkerAlt className="text-primary mt-1 flex-shrink-0" />
              <div>
                <p className="font-medium">Trung Tâm Tiệc Cưới Nguyên Đình</p>
                <p className="text-gray-600">461 Đ. Trương Định, Tân Mai, Hoàng Mai, Hà Nội 100000, Việt Nam</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 mb-4">
              <FaCalendarAlt className="text-primary mt-1 flex-shrink-0" />
              <div>
                <p className="font-medium">Ngày 01 tháng 05 năm 2025</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 mb-6">
              <FaClock className="text-primary mt-1 flex-shrink-0" />
              <div>
                <p className="font-medium">17:00</p>
              </div>
            </div>
            
            {/* Map */}
            <div className="aspect-video bg-gray-200 rounded-md overflow-hidden">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.9876068474984!2d105.84941947597658!3d20.98454898064339!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ac1d0b1a6dc7%3A0x2b7d9d9d5a4cd0e9!2zNDYxIMSQLiBUcsaw4budbmcgxJDhu4tuaCwgVMOibiBNYWksIEhvw6BuZyBNYWksIEjDoCBO4buZaSAxMDAwMDAsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1713765565000!5m2!1svi!2s" 
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
                href="https://maps.app.goo.gl/w75HLBwaPNAUzCXr7" 
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
