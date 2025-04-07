import React from 'react';
import Image from 'next/image';
import SectionTitle from '../ui/SectionTitle';
import { FaGift, FaQrcode, FaEnvelope } from 'react-icons/fa';
import getImagePath from '../../utils/imagePath';

export default function GiftInfoSection() {
  return (
    <section className="py-16">
      <div className="container-wedding">
        <SectionTitle 
          title="Gift Information" 
          subtitle="Your presence is our present, but if you wish to give a gift"
        />
        
        <div className="max-w-3xl mx-auto text-center">
          <p className="mb-8">
            Your presence at our wedding is the greatest gift of all. However, if you wish to honor us with a gift, we've included some options below.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Cash Gift */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-primary-light flex items-center justify-center">
                  <FaGift className="text-primary text-2xl" />
                </div>
              </div>
              
              <h3 className="text-xl font-heading mb-3">Cash Gift</h3>
              <p className="text-gray-600 mb-4">
                If you would like to give a cash gift, you may do so at the reception or through the following methods:
              </p>
              
              <div className="space-y-2 text-left">
                <p><strong>Bank Transfer:</strong></p>
                <p className="text-gray-600">Account Name: Cong & Duyen Wedding</p>
                <p className="text-gray-600">Account Number: 1234567890</p>
                <p className="text-gray-600">Bank: Example Bank</p>
              </div>
            </div>
            
            {/* QR Code */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-primary-light flex items-center justify-center">
                  <FaQrcode className="text-primary text-2xl" />
                </div>
              </div>
              
              <h3 className="text-xl font-heading mb-3">Scan to Send Gift</h3>
              <p className="text-gray-600 mb-4">
                Scan the QR code below to send a gift directly to our account.
              </p>
              
              <div className="flex justify-center">
                {/* Placeholder for QR code - in a real implementation, replace with actual QR code image */}
                <div className="w-40 h-40 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center">
                  <p className="text-gray-500 text-sm text-center p-2">QR Code Placeholder</p>
                </div>
                
                {/* Uncomment when you have an actual QR code image */}
                {/*
                <Image
                  src={getImagePath('/qr-code.png')}
                  alt="QR Code for gift"
                  width={160}
                  height={160}
                  className="rounded-md"
                />
                */}
              </div>
            </div>
          </div>
          
          {/* Registry */}
          <div className="mt-8 p-6 bg-primary-light rounded-lg">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
                <FaEnvelope className="text-primary text-2xl" />
              </div>
            </div>
            
            <h3 className="text-xl font-heading mb-3">Registry</h3>
            <p className="text-gray-700">
              We've also created a registry for those who prefer to give a specific gift.
            </p>
            <div className="mt-4">
              <a 
                href="#" 
                className="btn-primary inline-block"
                onClick={(e) => {
                  e.preventDefault();
                  alert('Registry link will be added here');
                }}
              >
                View Registry
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
