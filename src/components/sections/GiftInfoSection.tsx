'use client';

import React from 'react';
import SectionTitle from '../ui/SectionTitle';
import { FaQrcode, FaCopy, FaInfoCircle } from 'react-icons/fa';
import { showToast } from '@/components/ui/ToastProvider';
import { useRoutePerspective } from '@/utils/routeUtils';
import weddingData from '@/data/data.json'; // Import data
import Image from 'next/image'; // Import Image component

export default function GiftInfoSection() {
  const { isBride, isGroom } = useRoutePerspective();
  
  // Determine which gift info block to use based on perspective
  const currentGiftInfo = isBride 
    ? weddingData.giftInfo.bride 
    : isGroom 
      ? weddingData.giftInfo.groom 
      : weddingData.giftInfo; // Default uses top-level giftInfo
  
  const handleCopyAccountNumber = () => {
    // Use account number from the selected bankInfo
    navigator.clipboard.writeText(currentGiftInfo.bankInfo.accountNumber)
      .then(() => {
        showToast.success('Đã sao chép số tài khoản!');
      })
      .catch(() => {
        showToast.error('Không thể sao chép. Vui lòng thử lại.');
      });
  };

  return (
    <section className="py-16">
      <div className="container-wedding">
        <SectionTitle
          title={currentGiftInfo.title} // Use title from data
          subtitle={currentGiftInfo.subtitle} // Use subtitle from data
        />

        <div className="max-w-3xl mx-auto text-center">
          {/* Perspective indicator for bride/groom pages */}
          {(isBride || isGroom) && (
            <div className="mb-6 flex justify-center">
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${
                isBride ? 'bg-primary-light text-primary' : 'bg-blue-50 text-blue-600'
              }`}>
                <FaInfoCircle />
                <span>
                  {isBride 
                    ? 'Bạn đang xem thông tin quà cưới cho nhà gái' 
                    : 'Bạn đang xem thông tin quà cưới cho nhà trai'}
                </span>
              </div>
            </div>
          )}

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 max-w-md mx-auto">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-primary-light flex items-center justify-center">
                <FaQrcode className="text-primary text-2xl" />
              </div>
            </div>

            <h3 className="text-xl font-heading mb-3">Mã QR</h3>
            <p className="text-gray-600 mb-4">
              Quét mã QR bên dưới để chuyển tiền trực tiếp đến tài khoản {isBride ? 'cô dâu' : isGroom ? 'chú rể' : 'của chúng tôi'}:
            </p>

            {/* Replace placeholder div with Image component */}
            <div className="flex justify-center mb-4">
              <div className="w-40 h-40 relative"> {/* Add relative positioning */}
                <Image
                  src={currentGiftInfo.bankInfo.qrCodePath} // Use QR code path from data
                  alt={`QR Code for ${currentGiftInfo.bankInfo.accountName}`}
                  fill // Use fill layout
                  style={{ objectFit: 'contain' }} // Ensure QR code fits
                  priority // Load QR code quickly
                />
              </div>
            </div>

            <div className="space-y-2 text-left bg-gray-50 p-4 rounded-lg mb-4">
              <p><strong>Chuyển Khoản Ngân Hàng:</strong></p>
              {/* Use bankInfo from selected data */}
              <p className="text-gray-600">Tên Tài Khoản: {currentGiftInfo.bankInfo.accountName}</p>
              <p className="text-gray-600">Số Tài Khoản: {currentGiftInfo.bankInfo.accountNumber}</p>
              <p className="text-gray-600">Ngân Hàng: {currentGiftInfo.bankInfo.bankName}</p>
              <p className="text-gray-600">Chi Nhánh: {currentGiftInfo.bankInfo.branch}</p>
            </div>

            <button
              className="btn-primary flex items-center justify-center gap-2 mx-auto"
              onClick={handleCopyAccountNumber}
            >
              <FaCopy className="text-sm" />
              Sao Chép Số Tài Khoản
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
