"use client";

import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { Guest } from '@/lib/types';
import { Button } from './ui/Button';

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
      <div className="max-w-lg w-full p-6 text-center">
        <div className="mb-4">
          <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
            <Heart className="text-primary" size={24} />
          </div>
        </div>

        <h2 className="text-2xl font-serif mb-4">Chào {guest.name}!</h2>

        <p className="text-gray-600 mb-6 font-sans">
          Đây là lời mời riêng biệt dành cho bạn yêu.
          <br />
          Chúng mình rất vinh dự nếu bạn có thể đến chung vui trong ngày trọng đại này.
        </p>

        <Button
          variant="primary"
          className="flex items-center gap-2"
          onClick={() => setShowModal(false)}
        >
          Xem Lời Mời
        </Button>

      </div>
    </div>
  );
};

export default PersonalizedGreeting;
