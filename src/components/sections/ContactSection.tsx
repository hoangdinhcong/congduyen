'use client';

import React from 'react';
import SectionTitle from '../ui/SectionTitle';
import { FaPhone, FaWhatsapp, FaInfoCircle } from 'react-icons/fa';
import { useRoutePerspective } from '@/utils/routeUtils';

export default function ContactSection() {
  const { isBride, isGroom } = useRoutePerspective();

  // Contact information
  const contactInfo = {
    bride: {
      name: 'Mỹ Duyên',
      phone: '+84 123 456 789',
      zalo: '+84 123 456 789',
    },
    groom: {
      name: 'Hoàng Công',
      phone: '+84 987 654 321',
      zalo: '+84 987 654 321',
    }
  };

  // Different section titles based on perspective
  const sectionTitle = isBride 
    ? "Liên Hệ - Nhà Gái" 
    : isGroom 
      ? "Liên Hệ - Nhà Trai" 
      : "Liên Hệ";

  const sectionSubtitle = isBride || isGroom
    ? `Hãy liên hệ với ${isBride ? 'cô dâu' : 'chú rể'} nếu bạn có bất kỳ câu hỏi nào`
    : "Hãy liên hệ với chúng tôi nếu bạn có bất kỳ câu hỏi nào";

  return (
    <section className="py-16 bg-gray-50">
      <div className="container-wedding">
        <SectionTitle 
          title={sectionTitle}
          subtitle={sectionSubtitle}
        />
        
        <div className="max-w-3xl mx-auto">
          {/* Perspective indicator for bride/groom pages */}
          {(isBride || isGroom) && (
            <div className="mb-6 flex justify-center">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary bg-opacity-10 text-primary">
                <FaInfoCircle className="mr-2" />
                <span>Thông tin liên hệ {isBride ? 'nhà gái' : 'nhà trai'}</span>
              </div>
            </div>
          )}
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Contact info */}
                <div className="space-y-6">
                  <h3 className="text-xl font-heading text-secondary">
                    {isBride ? contactInfo.bride.name : isGroom ? contactInfo.groom.name : 'Thông tin liên hệ'}
                  </h3>
                  
                  <div className="space-y-4">
                    {/* Phone */}
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary bg-opacity-10 flex items-center justify-center">
                        <FaPhone className="text-primary" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-900">Điện thoại</p>
                        <p className="text-sm text-gray-500">
                          {isBride ? contactInfo.bride.phone : isGroom ? contactInfo.groom.phone : '+84 xxx xxx xxx'}
                        </p>
                      </div>
                    </div>
                    
                    {/* Zalo */}
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary bg-opacity-10 flex items-center justify-center">
                        <FaWhatsapp className="text-primary" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-900">Zalo</p>
                        <p className="text-sm text-gray-500">
                          {isBride ? contactInfo.bride.zalo : isGroom ? contactInfo.groom.zalo : '+84 xxx xxx xxx'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Contact form or additional info */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-heading text-secondary mb-4">Lưu ý</h3>
                  <p className="text-gray-600 mb-4">
                    Nếu bạn có bất kỳ câu hỏi nào về đám cưới, vui lòng liên hệ với chúng tôi qua số điện thoại hoặc Zalo.
                  </p>
                  <p className="text-gray-600">
                    Chúng tôi sẽ phản hồi bạn trong thời gian sớm nhất.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
