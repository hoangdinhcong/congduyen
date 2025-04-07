'use client';

import React, { useState, useEffect } from 'react';
import { FaHeart } from 'react-icons/fa';
import { Guest } from '../../lib/types';

type PersonalizedGreetingProps = {
  guest: Guest;
};

export default function PersonalizedGreeting({ guest }: PersonalizedGreetingProps) {
  const [showModal, setShowModal] = useState(true);
  
  // Close the modal after a certain time (e.g., 5 seconds)
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(false);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (!showModal) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 text-center">
        <div className="mb-4">
          <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mx-auto">
            <FaHeart className="text-primary text-2xl" />
          </div>
        </div>
        
        <h2 className="text-2xl font-heading mb-4">Welcome, {guest.name}!</h2>
        
        <p className="text-gray-600 mb-6">
          We&apos;re delighted that you&apos;re here. This is your personal invitation to our wedding.
        </p>
        
        <button
          onClick={() => setShowModal(false)}
          className="btn-primary"
        >
          View Invitation
        </button>
      </div>
    </div>
  );
}
