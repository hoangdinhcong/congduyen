'use client';

import React from 'react';
import Modal from './Modal';
import { QrCode, Copy } from 'lucide-react';
import { showToast } from '@/components/ui/ToastProvider';

type GiftModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function GiftModal({ isOpen, onClose }: GiftModalProps) {
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
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      title="Thông Tin Gửi Quà"
    >
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-primary-light flex items-center justify-center">
            <QrCode className="text-primary text-2xl" />
          </div>
        </div>

        <p className="text-gray-600 mb-4">
          Sự hiện diện của bạn trong ngày cưới của chúng tôi là món quà lớn nhất. Nếu bạn muốn gửi tặng quà, bạn có thể chuyển khoản qua thông tin dưới đây:
        </p>

        <div className="flex justify-center mb-6">
          <div className="w-48 h-48 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500 text-sm">Mã QR sẽ hiển thị ở đây</span>
          </div>
        </div>

        <div className="space-y-2 text-left bg-gray-50 p-4 rounded-lg mb-6">
          <p><strong>Chuyển Khoản Ngân Hàng:</strong></p>
          <p className="text-gray-600">Tên Tài Khoản: Hoàng Công & Mỹ Duyên</p>
          <p className="text-gray-600">Số Tài Khoản: {accountNumber}</p>
          <p className="text-gray-600">Ngân Hàng: Vietcombank</p>
        </div>

        <button
          className="btn-primary flex items-center justify-center gap-2 mx-auto"
          onClick={handleCopyAccountNumber}
        >
          <Copy className="text-sm" />
          Sao Chép Số Tài Khoản
        </button>
      </div>
    </Modal>
  );
}
