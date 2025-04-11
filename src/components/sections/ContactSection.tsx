'use client';

import React from 'react';
import SectionTitle from '../ui/SectionTitle';
import { Phone, Info } from 'lucide-react';
import { useRoutePerspective } from '@/utils/routeUtils';
import weddingData from '@/data/data.json';

export default function ContactSection() {
  const { isBride, isGroom } = useRoutePerspective();

  const currentContactInfo = isBride
    ? weddingData.contact.bride
    : isGroom
      ? weddingData.contact.groom
      : weddingData.contact;

  const displayName = isBride
    ? weddingData.contact.bride.name
    : isGroom
      ? weddingData.contact.groom.name
      : 'Thông tin liên hệ chung';

  const displayPhone = isBride
    ? weddingData.contact.bride.phone
    : isGroom
      ? weddingData.contact.groom.phone
      : weddingData.contact.generalPhone;

  return (
    <section className="py-16 bg-gray-50">
      <div className="container-wedding">
        <SectionTitle 
          title={currentContactInfo.title} 
          subtitle={currentContactInfo.subtitle} 
        />
        
        <div className="max-w-3xl mx-auto">
          {(isBride || isGroom) && (
            <div className="mb-6 flex justify-center">
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${isBride ? 'bg-primary-light text-primary' : 'bg-blue-50 text-blue-600'}`}>
                <Info />
                <span>Thông tin liên hệ {isBride ? 'nhà gái' : 'nhà trai'}</span>
              </div>
            </div>
          )}
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 md:p-8">
              <div className="grid grid-cols-1 gap-8">
                <div className="space-y-6">
                  <h3 className="text-xl font-heading text-secondary">
                    {displayName}
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary bg-opacity-10 flex items-center justify-center">
                        <Phone className="text-primary" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-900">Điện thoại / Zalo</p>
                        <p className="text-sm text-gray-500">
                          {displayPhone}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
