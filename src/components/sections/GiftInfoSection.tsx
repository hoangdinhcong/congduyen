'use client';

import React from 'react';
import SectionTitle from '../ui/SectionTitle';
import { FaGift, FaQrcode } from 'react-icons/fa';
import { showToast } from '@/components/ui/ToastProvider';

export default function GiftInfoSection() {
  return (
    <section className="py-16">
      <div className="container-wedding">
        <SectionTitle
          title="Thông Tin Quà Cưới"
          subtitle="Sự hiện diện của bạn trong ngày cưới của chúng tôi là món quà lớn nhất. Tuy nhiên, nếu bạn muốn gửi tặng chúng tôi một món quà, dưới đây là một số lựa chọn."
        />

        <div className="max-w-3xl mx-auto text-center">

          <div className="grid md:grid-cols-2 gap-8">
            {/* Cash Gift */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-primary-light flex items-center justify-center">
                  <FaGift className="text-primary text-2xl" />
                </div>
              </div>

              <h3 className="text-xl font-heading mb-3">Tiền Mặt</h3>
              <p className="text-gray-600 mb-4">
                Nếu bạn muốn gửi tặng tiền mặt, bạn có thể làm điều đó tại tiệc cưới hoặc thông qua các phương thức sau:
              </p>

              <div className="space-y-2 text-left">
                <p><strong>Chuyển Khoản Ngân Hàng:</strong></p>
                <p className="text-gray-600">Tên Tài Khoản: Hoàng Công & Mỹ Duyên</p>
                <p className="text-gray-600">Số Tài Khoản: 1234567890</p>
                <p className="text-gray-600">Ngân Hàng: Vietcombank</p>
              </div>
            </div>

            {/* QR Code */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
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

              <button
                className="btn-primary"
                onClick={() => showToast.success('Đã sao chép thông tin tài khoản!')}
              >
                Sao Chép Thông Tin
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
