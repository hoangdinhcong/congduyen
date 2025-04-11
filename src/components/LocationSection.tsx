"use client";

import React from "react";
import { Calendar, Clock, MapPin, Navigation } from "lucide-react";
import { Button } from "./ui/shadcn/button";

const LocationSection = () => {
  const addToGoogleCalendar = () => {
    const eventTitle = "Lễ cưới Hoàng Công & Mỹ Duyên";
    const startDate = "20250501T100000";
    const endDate = "20250501T160000";
    const location = "Trung Tâm Tiệc Cưới Nguyên Đình, Tầng 4, 461 Đ. Trương Định, Tân Mai, Hoàng Mai, Hà Nội 100000, Việt Nam";
    const details = "Chúng tôi rất vui mừng được chào đón bạn đến dự ngày đặc biệt của chúng tôi!";

    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventTitle)}&dates=${startDate}/${endDate}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}&sf=true&output=xml`;

    window.open(url, '_blank');
  };

  const getDirections = () => {
    const destination = "Trung Tâm Tiệc Cưới Nguyên Đình, 461 Đ. Trương Định, Tân Mai, Hoàng Mai, Hà Nội";
    const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}`;
    window.open(url, '_blank');
  };

  return (
    <section id="location" className="bg-white relative">
      <div className="section-container">
        <h2 className="section-title">Thông Tin Lễ Cưới</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div
            className="bg-muted p-8 md:p-12 rounded-lg fade-in"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="flex flex-col space-y-6">
              <div className="flex items-start">
                <Calendar className="mr-4 text-gray-600 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-lg mb-1 font-serif text-gray-900">Ngày & Giờ</h3>
                  <p className="text-gray-600">Ngày 1 tháng 5, 2025</p>
                  <p className="text-gray-600">17:00</p>
                </div>
              </div>

              <div className="flex items-start">
                <MapPin className="mr-4 text-gray-600 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-lg mb-1 font-serif text-gray-900">Địa Điểm</h3>
                  <p className="text-gray-600">Trung Tâm Tiệc Cưới Nguyên Đình</p>
                  <p className="text-gray-600">Tầng 4, 461 Đ. Trương Định</p>
                  <p className="text-gray-600">Tân Mai, Hoàng Mai, Hà Nội</p>
                </div>
              </div>

              <div className="flex items-start">
                <Clock className="mr-4 text-gray-600 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-lg mb-1 font-serif text-gray-900">Lịch Trình</h3>
                  <p className="text-gray-600">17:00 - Đón khách</p>
                  <p className="text-gray-600">17:30 - Lễ cưới</p>
                  <p className="text-gray-600">18:30 - Tiệc cưới</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-4">
                <Button
                  onClick={addToGoogleCalendar}
                  className="flex items-center gap-2 text-gray-900"
                  variant="outline"
                >
                  <Calendar size={16} />
                  Lưu vào Lịch
                </Button>

                <Button
                  onClick={getDirections}
                  className="flex items-center gap-2 text-gray-900"
                  variant="outline"
                >
                  <Navigation size={16} />
                  Chỉ Đường
                </Button>
              </div>
            </div>
          </div>

          <div
            className="h-64 md:h-96 bg-gray-200 rounded-lg overflow-hidden fade-in"
            style={{ animationDelay: "0.4s" }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.160697366141!2d105.84622587586588!3d20.9844888941104!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ac3d675b713b%3A0xd6e0befc95dbf578!2zVHJ1bmcgVMOibSBUaeG7h2MgQ8aw4bubaSBOZ3V5w6puIMSQw6xuaA!5e0!3m2!1svi!2s!4v1713035266945!5m2!1svi!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Địa điểm tổ chức lễ cưới"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
