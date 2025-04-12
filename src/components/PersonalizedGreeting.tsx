"use client";

import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { Guest } from '@/lib/types';

interface PersonalizedGreetingProps {
  guest: Guest;
}

const PersonalizedGreeting = ({ guest }: PersonalizedGreetingProps) => {
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    // Add body class to prevent scrolling
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showModal]);

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-50 transition-all duration-500">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 text-center">
        <div className="mb-4">
          <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
            <Heart className="text-primary" size={24} />
          </div>
        </div>

        <h2 className="text-2xl font-serif mb-4">Chào {guest.name}!</h2>

        <p className="text-gray-600 mb-6 font-sans">
          Chúng mình rất vui khi bạn đến tham dự đám cưới của chúng mình. 
          Đây là lời mời riêng biệt dành cho bạn yêu.
        </p>

        <button
          onClick={() => setShowModal(false)}
          className="button-primary"
        >
          Xem Lời Mời
        </button>
      </div>
    </div>
  );
};

export default PersonalizedGreeting;
