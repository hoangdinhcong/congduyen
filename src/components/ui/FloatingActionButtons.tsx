'use client';

import React, { useState, useRef } from 'react';
import { Reply, Gift, Heart } from 'lucide-react';
import RSVPModal from './RSVPModal';
import GiftModal from './GiftModal';
import confetti from 'canvas-confetti';

type FloatingActionButtonsProps = {
  guestName?: string;
  guestId?: string;
  uniqueInviteId?: string;
  rsvpStatus?: 'pending' | 'attending' | 'declined';
};

export default function FloatingActionButtons({
  guestName = '',
  guestId = '',
  uniqueInviteId = '',
  rsvpStatus = 'pending'
}: FloatingActionButtonsProps) {
  const [isRSVPModalOpen, setIsRSVPModalOpen] = useState(false);
  const [isGiftModalOpen, setIsGiftModalOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleReactionClick = () => {
    // Create party popper animation from left and right
    const canvasOptions = {
      particleCount: 100,
      spread: 70,
      origin: { y: 0.9 }
    };

    // Left side
    confetti({
      ...canvasOptions,
      origin: { x: 0.1, y: 0.9 }
    });

    // Right side
    confetti({
      ...canvasOptions,
      origin: { x: 0.9, y: 0.9 }
    });
  };

  return (
    <>
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 flex gap-3">
        <button
          onClick={() => setIsRSVPModalOpen(true)}
          className="bg-primary hover:bg-primary-dark text-white rounded-full p-3 shadow-lg transition-all duration-300 transform hover:scale-110 flex items-center gap-2"
          aria-label="Phản hồi tham dự"
        >
          <Reply size={16} />
          <span className="text-sm font-medium hidden sm:inline">Phản hồi</span>
        </button>

        <button
          onClick={() => setIsGiftModalOpen(true)}
          className="bg-primary hover:bg-primary-dark text-white rounded-full p-3 shadow-lg transition-all duration-300 transform hover:scale-110 flex items-center gap-2"
          aria-label="Gửi quà"
        >
          <Gift size={16} />
          <span className="text-sm font-medium hidden sm:inline">Gửi quà</span>
        </button>

        <button
          ref={buttonRef}
          onClick={handleReactionClick}
          className="bg-primary hover:bg-primary-dark text-white rounded-full p-3 shadow-lg transition-all duration-300 transform hover:scale-110 flex items-center gap-2"
          aria-label="Chúc mừng"
        >
          <Heart size={16} />
          <span className="text-sm font-medium hidden sm:inline">Chúc mừng</span>
        </button>
      </div>

      {/* RSVP Modal */}
      <RSVPModal
        isOpen={isRSVPModalOpen}
        onClose={() => setIsRSVPModalOpen(false)}
        guestName={guestName}
        guestId={guestId}
        uniqueInviteId={uniqueInviteId}
        rsvpStatus={rsvpStatus}
      />

      {/* Gift Modal */}
      <GiftModal
        isOpen={isGiftModalOpen}
        onClose={() => setIsGiftModalOpen(false)}
      />
    </>
  );
}
