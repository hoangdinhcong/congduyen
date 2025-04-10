'use client';

import React from 'react';
import SectionTitle from '../ui/SectionTitle';
import { FaQrcode, FaCopy } from 'react-icons/fa';
import { showToast } from '@/components/ui/ToastProvider';

export default function GiftInfoSection() {
  const accountNumber = '1234567890';
  
  const handleCopyAccountNumber = () => {
    navigator.clipboard.writeText(accountNumber)
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
          title="Thông Tin Quà Cưới"
          subtitle="Sự hiện diện của bạn trong ngày cưới của chúng tôi là món quà lớn nhất. Nếu bạn muốn gửi tặng quà, bạn có thể chuyển khoản qua thông tin dưới đây."
        />

        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 max-w-md mx-auto">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-primary-light flex items-center justify-center">
                <FaQrcode className="text-primary text-2xl" />
              </div>
            </div>

            <h3 className="text-xl font-heading mb-3">Mã QR</h3>
            <p className="text-gray-600 mb-4">
              Quét mã QR bên dưới để chuyển tiền trực tiếp đến tài khoản của chúng tôi:
            </p>

            <div className="flex justify-center mb-4">
              <div className="w-40 h-40 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500 text-sm">Mã QR sẽ hiển thị ở đây</span>
              </div>
            </div>

            <div className="space-y-2 text-left bg-gray-50 p-4 rounded-lg mb-4">
              <p><strong>Chuyển Khoản Ngân Hàng:</strong></p>
              <p className="text-gray-600">Tên Tài Khoản: Hoàng Công & Mỹ Duyên</p>
              <p className="text-gray-600">Số Tài Khoản: {accountNumber}</p>
              <p className="text-gray-600">Ngân Hàng: Vietcombank</p>
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
