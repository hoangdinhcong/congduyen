'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import RsvpSection from '@/components/RsvpSection';

/**
 * Anonymous RSVP page
 * Allows guests to submit an RSVP without a unique invitation link
 */
export default function AnonymousRSVPPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-24"> {/* Add padding to account for fixed navbar */}
        <RsvpSection />
      </div>

      <footer className="py-8 bg-white text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Hoàng Công & Mỹ Duyên</p>
      </footer>
    </div>
  );
}
