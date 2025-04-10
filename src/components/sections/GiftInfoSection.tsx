'use client';

import React from 'react';
import SectionTitle from '../ui/SectionTitle';
import { FaQrcode, FaCopy, FaInfoCircle } from 'react-icons/fa';
import { showToast } from '@/components/ui/ToastProvider';
import { useRoutePerspective } from '@/utils/routeUtils';

export default function GiftInfoSection() {
  const { isBride, isGroom } = useRoutePerspective();
  
  // Different account details based on bride/groom perspective
  const accountDetails = {
    bride: {
      name: 'Mỹ Duyên',
      accountNumber: '9876543210',
      bank: 'Techcombank',
      branch: 'Chi nhánh Hà Nội',
    },
    groom: {
      name: 'Hoàng Công',
      accountNumber: '1234567890',
      bank: 'Vietcombank',
      branch: 'Chi nhánh Hà Nội',
    },
    default: {
      name: 'Hoàng Công & Mỹ Duyên',
      accountNumber: '1234567890',
      bank: 'Vietcombank',
      branch: 'Chi nhánh Hà Nội',
    }
  };
  
  // Determine which account details to show
  const currentAccount = isBride 
    ? accountDetails.bride 
    : isGroom 
      ? accountDetails.groom 
      : accountDetails.default;
  
  const handleCopyAccountNumber = () => {
    navigator.clipboard.writeText(currentAccount.accountNumber)
      .then(() => {
        showToast.success('Đã sao chép số tài khoản!');
      })
      .catch(() => {
        showToast.error('Không thể sao chép. Vui lòng thử lại.');
      });
  };

  // Different section titles based on perspective
  const sectionTitle = isBride 
    ? "Thông Tin Quà Cưới - Nhà Gái" 
    : isGroom 
      ? "Thông Tin Quà Cưới - Nhà Trai" 
      : "Thông Tin Quà Cưới";

  const sectionSubtitle = isBride || isGroom
    ? `Sự hiện diện của bạn trong ngày cưới của chúng tôi là món quà lớn nhất. Nếu bạn muốn gửi tặng quà cho ${isBride ? 'nhà gái' : 'nhà trai'}, bạn có thể chuyển khoản qua thông tin dưới đây.`
    : "Sự hiện diện của bạn trong ngày cưới của chúng tôi là món quà lớn nhất. Nếu bạn muốn gửi tặng quà, bạn có thể chuyển khoản qua thông tin dưới đây.";

  return (
    <section className="py-16">
      <div className="container-wedding">
        <SectionTitle
          title={sectionTitle}
          subtitle={sectionSubtitle}
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

            <div className="flex justify-center mb-4">
              <div className="w-40 h-40 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500 text-sm">Mã QR sẽ hiển thị ở đây</span>
              </div>
            </div>

            <div className="space-y-2 text-left bg-gray-50 p-4 rounded-lg mb-4">
              <p><strong>Chuyển Khoản Ngân Hàng:</strong></p>
              <p className="text-gray-600">Tên Tài Khoản: {currentAccount.name}</p>
              <p className="text-gray-600">Số Tài Khoản: {currentAccount.accountNumber}</p>
              <p className="text-gray-600">Ngân Hàng: {currentAccount.bank}</p>
              <p className="text-gray-600">Chi Nhánh: {currentAccount.branch}</p>
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
