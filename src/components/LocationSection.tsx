"use client";

import React from "react";
import { Calendar, MapPin, Navigation } from "lucide-react";
import { Button } from "./ui/shadcn/button";
import weddingData from '@/data/data.json';

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
    const url = weddingData.event.location.directionsLink;
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
                  <h3 className="font-medium text-lg mb-1 text-gray-900">17:00, ngày 1 tháng 5, 2025</h3>
                  <p className="text-gray-600">Tức ngày 4 tháng 4, Ất Tỵ</p>
                </div>
              </div>

              <div className="flex items-start">
                <MapPin className="mr-4 text-gray-600 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-lg mb-1 text-gray-900">Trung Tâm Tiệc Cưới Nguyên Đình</h3>
                  <p className="text-gray-600">Tầng 4, 461 Đ. Trương Định</p>
                  <p className="text-gray-600">Tân Mai, Hoàng Mai, Hà Nội</p>
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
              src={weddingData.event.location.mapLink}
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
