'use client';

import React, { useState, useRef, useEffect } from 'react';
import SectionTitle from '../ui/SectionTitle';
import { FaCheck, FaTimes, FaHeart, FaEnvelope } from 'react-icons/fa';
import { RSVPStatus } from '../../lib/types';

type RSVPSectionProps = {
  isPersonalized?: boolean;
  guestName?: string;
  guestId?: string;
  uniqueInviteId?: string;
  rsvpStatus?: RSVPStatus;
};

export default function RSVPSection({ 
  isPersonalized = false, 
  guestName = '', 
  guestId = '',
  uniqueInviteId = '',
  rsvpStatus = 'pending'
}: RSVPSectionProps) {
  const [status, setStatus] = useState<RSVPStatus>(rsvpStatus);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const handleRSVP = async (newStatus: 'attending' | 'declined') => {
    if (!isPersonalized || !guestId || !uniqueInviteId) return;
    
    setSubmitting(true);
    setError('');
    setSuccess('');
    
    try {
      const response = await fetch(`/api/rsvp/${uniqueInviteId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rsvp_status: newStatus }),
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to update RSVP');
      }
      
      setStatus(newStatus);
      setSuccess(`Thank you! Your RSVP has been ${newStatus === 'attending' ? 'confirmed' : 'declined'}.`);
    } catch (err: unknown) {
      console.error('Error updating RSVP:', err);
      setError(err instanceof Error ? err.message : 'An error occurred while updating your RSVP');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section 
      ref={sectionRef} 
      className="py-20 bg-gradient-to-b from-white to-primary-light" 
      id="rsvp"
    >
      <div className="container-wedding">
        <SectionTitle 
          title="RSVP" 
          subtitle={isPersonalized 
            ? `Please let us know if you can attend, ${guestName}` 
            : "Please use your personalized link to RSVP"}
        />
        
        <div 
          className={`max-w-2xl mx-auto transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {isPersonalized ? (
            <div className="bg-white p-8 md:p-10 rounded-lg shadow-md border border-primary-light text-center relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-primary opacity-30"></div>
              <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-primary opacity-30"></div>
              
              {status === 'pending' ? (
                <>
                  <div className="mb-8">
                    <FaEnvelope className="text-4xl text-primary mx-auto mb-4" />
                    <h3 className="text-2xl font-heading mb-4 text-secondary">
                      Will you join us on our special day?
                    </h3>
                    <p className="text-gray-600 max-w-md mx-auto">
                      We would be honored to have you celebrate this moment with us.
                      Please let us know if you can attend.
                    </p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-6 justify-center">
                    <button 
                      onClick={() => handleRSVP('attending')}
                      disabled={submitting}
                      className="btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <FaCheck className="text-sm" />
                      {submitting ? 'Submitting...' : 'Yes, I\'ll be there'}
                    </button>
                    
                    <button 
                      onClick={() => handleRSVP('declined')}
                      disabled={submitting}
                      className="btn-outline flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <FaTimes className="text-sm" />
                      {submitting ? 'Submitting...' : 'Sorry, I can\'t make it'}
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center py-4">
                  <div className="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6">
                    {status === 'attending' ? (
                      <div className="bg-green-100 w-full h-full rounded-full flex items-center justify-center shadow-md">
                        <FaCheck className="text-green-600 text-2xl animate-bounce" />
                      </div>
                    ) : (
                      <div className="bg-red-100 w-full h-full rounded-full flex items-center justify-center shadow-md">
                        <FaTimes className="text-red-600 text-2xl" />
                      </div>
                    )}
                  </div>
                  
                  <h3 className="text-2xl font-heading mb-4 text-secondary">
                    {status === 'attending' 
                      ? 'You have confirmed your attendance!' 
                      : 'You have declined the invitation.'}
                  </h3>
                  
                  <p className="text-gray-600 mb-8 max-w-md mx-auto">
                    {status === 'attending'
                      ? 'We look forward to celebrating with you! Thank you for being part of our special day.'
                      : 'We will miss you, but thank you for letting us know. We appreciate your response.'}
                  </p>
                  
                  <button
                    onClick={() => setStatus('pending')}
                    className="text-primary hover:text-primary-dark transition-colors duration-300 flex items-center gap-2 mx-auto"
                  >
                    <span className="underline">Change your response</span>
                  </button>
                </div>
              )}
              
              {error && (
                <div className="mt-6 text-red-600 bg-red-50 p-3 rounded-md">
                  {error}
                </div>
              )}
              
              {success && (
                <div className="mt-6 text-green-600 bg-green-50 p-3 rounded-md flex items-center justify-center gap-2">
                  <FaHeart className="text-primary animate-heartbeat" />
                  <span>{success}</span>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white p-8 md:p-10 rounded-lg shadow-md border border-primary-light text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-primary opacity-30"></div>
              <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-primary opacity-30"></div>
              
              <FaEnvelope className="text-4xl text-primary mx-auto mb-6" />
              
              <h3 className="text-2xl font-heading mb-4 text-secondary">
                Personalized RSVP
              </h3>
              
              <p className="mb-6 text-gray-600">
                To RSVP for our wedding, please use the personalized link that was sent to you.
              </p>
              
              <p className="text-gray-700 mb-6">
                If you haven&apos;t received your invitation link or have any questions, please contact us directly.
              </p>
              
              <button className="btn-primary flex items-center justify-center gap-2 mx-auto">
                <FaEnvelope className="text-sm" />
                Contact Us
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
