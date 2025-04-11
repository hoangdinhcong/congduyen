"use client";

import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { Guest } from '@/lib/types';

interface PersonalizedGreetingProps {
  guest: Guest;
}

const PersonalizedGreeting = ({ guest }: PersonalizedGreetingProps) => {
  const [showModal, setShowModal] = useState(true);

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 text-center">
        <div className="mb-4">
          <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
            <Heart className="text-primary" size={24} />
          </div>
        </div>

        <h2 className="text-2xl font-serif mb-4">Welcome, {guest.name}!</h2>

        <p className="text-gray-600 mb-6 font-sans">
          We're delighted that you're here. This is your personal invitation to our wedding.
        </p>

        <button
          onClick={() => setShowModal(false)}
          className="button-primary"
        >
          View Invitation
        </button>
      </div>
    </div>
  );
};

export default PersonalizedGreeting;
