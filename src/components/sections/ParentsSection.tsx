import React from 'react';
import SectionTitle from '../ui/SectionTitle';

export default function ParentsSection() {
  return (
    <section className="py-16">
      <div className="container-wedding">
        <SectionTitle 
          title="Được Sự Chứng Giám Của Hai Họ" 
          subtitle="Cùng gia đình chúng tôi"
        />
        
        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto text-center">
          {/* Bride's Parents */}
          <div>
            <h3 className="text-2xl font-heading mb-4">Nhà Gái</h3>
            <p className="text-lg mb-2">
              <span className="block mb-1">Bố: Bùi Ngọc Sơn</span>
              <span className="block">Mẹ: Đinh Thị Sen</span>
            </p>
            <p className="text-gray-600">
              Trân trọng báo tin lễ thành hôn của con gái
            </p>
            <p className="text-xl font-heading mt-4">Mỹ Duyên</p>
          </div>
          
          {/* Groom's Parents */}
          <div>
            <h3 className="text-2xl font-heading mb-4">Nhà Trai</h3>
            <p className="text-lg mb-2">
              <span className="block">Mẹ: Trần Thị Thìn</span>
            </p>
            <p className="text-gray-600">
              Trân trọng báo tin lễ thành hôn của con trai
            </p>
            <p className="text-xl font-heading mt-4">Hoàng Công</p>
          </div>
        </div>
      </div>
    </section>
  );
}
