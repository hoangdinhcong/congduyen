"use client";

import React from "react";
import { Copy } from "lucide-react";
import { Button } from "@/components/ui/shadcn/button";
import { copyToClipboard } from "@/lib/utils";
import Image from "next/image";
import weddingData from '@/data/data.json';
import { useRoutePerspective } from "@/utils/routeUtils";
import { Guest } from "@/lib/types";

type GiftsSectionProps = {
  guest: Guest;
};

const GiftsSection = ({ guest }: GiftsSectionProps) => {

  const handleCopyToClipboard = (text: string, label: string) => {
    copyToClipboard(text).then(() => {
      // You can use your preferred toast notification here
      alert(`${label} has been copied to clipboard.`);
    });
  };

  let { isBride, isGroom } = useRoutePerspective();

  if (!!guest) {
    isBride = guest.side === 'bride';
    isGroom = guest.side === 'groom';
  }

  // Determine which gift info block to use based on perspective
  const currentGiftInfo = isBride
    ? weddingData.giftInfo.bride
    : isGroom
      ? weddingData.giftInfo.groom
      : weddingData.giftInfo; // Default uses top-level giftInfo

  return (
    <section id="gifts" className="bg-accent/20">
      <div className="section-container">
        <h2 className="section-title">{currentGiftInfo.title}</h2>

        <div className="max-w-3xl mx-auto">
          <p className="text-center text-gray-600 mb-10">
            {currentGiftInfo.subtitle}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="flex justify-center">
              <div className="bg-white p-4 rounded-lg shadow-md max-w-xs">
                <Image
                  src={currentGiftInfo.bankInfo.qrCodePath}
                  alt="QR Code"
                  className="w-full rounded"
                  width={200}
                  height={200}
                  loading="lazy"
                  style={{ objectFit: "contain" }}
                />
                {/* <p className="text-center text-sm text-gray-500 mt-2">Scan to send a gift</p> */}
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              {/* <h3 className="font-serif text-xl mb-4 text-center">{weddingData.giftInfo.bankInfo.title}</h3> */}

              <div className="space-y-4">

                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{currentGiftInfo.bankInfo.bankName}</p>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{currentGiftInfo.bankInfo.accountName}</p>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{currentGiftInfo.bankInfo.accountNumber}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleCopyToClipboard(currentGiftInfo.bankInfo.accountNumber, "Account Number")}
                  >
                    <Copy size={16} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section >
  );
};

export default GiftsSection;
