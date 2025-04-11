"use client";

import React from "react";
import { Copy } from "lucide-react";
import { Button } from "@/components/ui/shadcn/button";
import { copyToClipboard } from "@/lib/utils";

const GiftsSection = () => {
  const bankDetails = [
    { label: "Bank Name", value: "First National Bank" },
    { label: "Account Name", value: "Alex & Taylor Wedding" },
    { label: "Account Number", value: "1234567890" },
    { label: "Routing Number", value: "987654321" },
  ];

  const handleCopyToClipboard = (text: string, label: string) => {
    copyToClipboard(text).then(() => {
      // You can use your preferred toast notification here
      alert(`${label} has been copied to clipboard.`);
    });
  };

  return (
    <section id="gifts" className="bg-accent/20">
      <div className="section-container">
        <h2 className="section-title">Gift Registry</h2>

        <div className="max-w-3xl mx-auto">
          <p className="text-center text-gray-600 mb-10">
            Your presence at our wedding is the greatest gift of all. However, if you wish to help us celebrate with a gift, we've included our details below.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="flex justify-center">
              <div className="bg-white p-4 rounded-lg shadow-md max-w-xs">
                <img
                  src="https://images.unsplash.com/photo-1610202631408-fa6492863d23?ixlib=rb-4.0.3&auto=format&fit=crop&w=600"
                  alt="QR Code"
                  className="w-full rounded"
                />
                <p className="text-center text-sm text-gray-500 mt-2">Scan to send a gift</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-serif text-xl mb-4 text-center">Bank Details</h3>

              <div className="space-y-4">
                {bankDetails.map((detail, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-500">{detail.label}</p>
                      <p className="font-medium">{detail.value}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleCopyToClipboard(detail.value, detail.label)}
                    >
                      <Copy size={16} />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GiftsSection;
