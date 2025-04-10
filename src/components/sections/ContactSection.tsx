import React from 'react';
import SectionTitle from '../ui/SectionTitle';
import { FaPhone, FaEnvelope, FaWhatsapp } from 'react-icons/fa';

export default function ContactSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container-wedding">
        <SectionTitle 
          title="Liên Hệ" 
          subtitle="Hãy liên hệ với chúng tôi nếu bạn có bất kỳ câu hỏi nào"
        />
        
        <div className="max-w-3xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Bride Contact */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-xl font-heading mb-4 text-center">Cô Dâu</h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center flex-shrink-0">
                    <FaPhone className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Điện thoại</p>
                    <p className="font-medium">+84 123 456 789</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center flex-shrink-0">
                    <FaEnvelope className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium">myduyen@example.com</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center flex-shrink-0">
                    <FaWhatsapp className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Zalo</p>
                    <p className="font-medium">+84 123 456 789</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Groom Contact */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-xl font-heading mb-4 text-center">Chú Rể</h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center flex-shrink-0">
                    <FaPhone className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Điện thoại</p>
                    <p className="font-medium">+84 987 654 321</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center flex-shrink-0">
                    <FaEnvelope className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium">hoangcong@example.com</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center flex-shrink-0">
                    <FaWhatsapp className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Zalo</p>
                    <p className="font-medium">+84 987 654 321</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Đừng ngần ngại liên hệ với chúng tôi nếu bạn có bất kỳ câu hỏi nào hoặc cần hỗ trợ về việc di chuyển đến địa điểm tổ chức.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
