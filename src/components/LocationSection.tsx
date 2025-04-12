"use client";

import React from "react";
import { Calendar, MapPin, Navigation } from "lucide-react";
import { Button } from "./ui/shadcn/button";
import weddingData from '@/data/data.json';
import { useRoutePerspective } from "@/utils/routeUtils";
import { Guest } from "@/lib/types";

type LocationSectionProps = {
  guest?: Guest;
};

const LocationSection = ({ guest }: LocationSectionProps) => {

  let { isBride } = useRoutePerspective();
  if (!!guest) {
    isBride = guest.side === 'bride';
  }

  const addToGoogleCalendar = () => {
    const eventTitle = "Lễ cưới Hoàng Công & Mỹ Duyên";
    const startDate = "20250501T170000";
    const endDate = "20250501T190000";
    const location = "Trung Tâm Tiệc Cưới Nguyên Đình, Tầng 4, 461 Đ. Trương Định, Tân Mai, Hoàng Mai, Hà Nội 100000, Việt Nam";
    const details = "chúng mình rất vui mừng được chào đón bạn đến dự ngày đặc biệt của chúng mình!";

    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventTitle)}&dates=${startDate}/${endDate}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}&sf=true&output=xml`;

    window.open(url, '_blank');
  };

  const getDirections = () => {
    const url = weddingData.event.location.directionsLink;
    window.open(url, '_blank');
  };

  const addBrideEvent1GoogleCalendar = () => {
    const eventTitle = "Đám cưới Hoàng Công & Mỹ Duyên";
    const startDate = "20250501T100000";
    const endDate = "20250501T120000";
    const location = "Tư Gia Nhà Gái, Xóm 1, Xuân Kiên - Xuân Phúc, Xuân Trường, Nam Định";
    const details = "chúng mình rất vui mừng được chào đón bạn đến dự ngày đặc biệt của chúng mình!";

    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventTitle)}&dates=${startDate}/${endDate}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}&sf=true&output=xml`;

    window.open(url, '_blank');
  };

  const getBrideEvent1Directions = () => {
    const url = "https://maps.app.goo.gl/VZduvM5QVMQp9RGH7";
    window.open(url, '_blank');
  };

  return (
    <section id="location" className="bg-white relative">
      <div className="section-container">
        <h2 className="section-title">Thông Tin Lễ Cưới</h2>

        <div
          className="bg-muted p-8 md:p-12 rounded-lg fade-in max-w-3xl mx-auto"
          style={{ animationDelay: "0.3s" }}
        >

          {
            isBride
              ? (
                <div className="flex flex-col space-y-6">
                  <div className="flex items-start">
                    <Calendar className="mr-4 text-gray-600 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-lg mb-1 text-gray-900">Bữa Cơm Thân Mật</h3>
                      <p className="text-gray-600">10:00, ngày 1/5</p>
                      <p className="text-gray-600">Tư Gia Nhà Gái, Xóm 1, Xuân Kiên - Xuân Phúc, Xuân Trường, Nam Định</p>
                      <div className="flex flex-wrap gap-3 pt-4">
                        <Button
                          onClick={addBrideEvent1GoogleCalendar}
                          className="flex items-center gap-2 text-gray-900"
                          variant="outline"
                        >
                          <Calendar size={16} />
                          Thêm vào Lịch
                        </Button>

                        <Button
                          onClick={getBrideEvent1Directions}
                          className="flex items-center gap-2 text-gray-900"
                          variant="outline"
                        >
                          <Navigation size={16} />
                          Chỉ Đường
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Calendar className="mr-4 text-gray-600 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-lg mb-1 text-gray-900">Lễ Cưới</h3>
                      <p className="text-gray-600">17:00, ngày 1/5</p>
                      <p className="text-gray-600">Trung Tâm Tiệc Cưới Nguyên Đình, Tầng 4 - TTTM Trương Định Plaza, 461 Đ. Trương Định, Tân Mai, Hoàng Mai, Hà Nội</p>
                      <div className="flex flex-wrap gap-3 pt-4">
                        <Button
                          onClick={addToGoogleCalendar}
                          className="flex items-center gap-2 text-gray-900"
                          variant="outline"
                        >
                          <Calendar size={16} />
                          Thêm vào Lịch
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

                </div>
              )
              : (
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
                      <p className="text-gray-600">Tầng 4 - TTTM Trương Định Plaza,</p>
                      <p className="text-gray-600">461 Đ. Trương Định, Tân Mai, Hoàng Mai, Hà Nội</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 pt-4">
                    <Button
                      onClick={addToGoogleCalendar}
                      className="flex items-center gap-2 text-gray-900"
                      variant="outline"
                    >
                      <Calendar size={16} />
                      Thêm vào Lịch
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
              )
          }

        </div>

      </div>
    </section>
  );
};

export default LocationSection;
