'use client';

import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import AnonymousRSVPForm from '@/components/ui/AnonymousRSVPForm';
import { WEDDING_CONFIG } from '@/lib/config';

/**
 * Anonymous RSVP page
 * Allows guests to submit an RSVP without a unique invitation link
 */
export default function AnonymousRSVPPage() {
  return (
    <MainLayout>
      <div className="container max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-heading text-secondary mb-4">
            Xác Nhận Tham Dự
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Cảm ơn bạn đã quan tâm đến đám cưới của {WEDDING_CONFIG.COUPLE.FULL_NAMES}. 
            Vui lòng điền thông tin của bạn để xác nhận tham dự.
          </p>
        </div>
        
        <div className="max-w-md mx-auto">
          <AnonymousRSVPForm />
        </div>
      </div>
    </MainLayout>
  );
}
