'use client';

import React, { useState } from 'react';
import SectionTitle from '../ui/SectionTitle';
import { FaCheck, FaTimes } from 'react-icons/fa';
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
    <section className="py-16" id="rsvp">
      <div className="container-wedding">
        <SectionTitle 
          title="RSVP" 
          subtitle={isPersonalized 
            ? `Please let us know if you can attend, ${guestName}` 
            : "Please use your personalized link to RSVP"}
        />
        
        <div className="max-w-2xl mx-auto">
          {isPersonalized ? (
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 text-center">
              {status === 'pending' ? (
                <>
                  <h3 className="text-xl font-heading mb-6">
                    Will you join us on our special day?
                  </h3>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button 
                      onClick={() => handleRSVP('attending')}
                      disabled={submitting}
                      className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {submitting ? 'Submitting...' : 'Yes, I&apos;ll be there'}
                    </button>
                    
                    <button 
                      onClick={() => handleRSVP('declined')}
                      disabled={submitting}
                      className="btn-outline disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {submitting ? 'Submitting...' : 'Sorry, I can&apos;t make it'}
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                    {status === 'attending' ? (
                      <div className="bg-green-100 w-full h-full rounded-full flex items-center justify-center">
                        <FaCheck className="text-green-600 text-2xl" />
                      </div>
                    ) : (
                      <div className="bg-red-100 w-full h-full rounded-full flex items-center justify-center">
                        <FaTimes className="text-red-600 text-2xl" />
                      </div>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-heading mb-4">
                    {status === 'attending' 
                      ? 'You have confirmed your attendance!' 
                      : 'You have declined the invitation.'}
                  </h3>
                  
                  <p className="text-gray-600 mb-6">
                    {status === 'attending'
                      ? 'We look forward to celebrating with you!'
                      : 'We will miss you, but thank you for letting us know.'}
                  </p>
                  
                  <button
                    onClick={() => setStatus('pending')}
                    className="text-primary hover:text-primary-dark underline"
                  >
                    Change your response
                  </button>
                </div>
              )}
              
              {error && (
                <div className="mt-4 text-red-600">
                  {error}
                </div>
              )}
              
              {success && (
                <div className="mt-4 text-green-600">
                  {success}
                </div>
              )}
            </div>
          ) : (
            <div className="bg-primary-light p-8 rounded-lg text-center">
              <p className="mb-4">
                To RSVP for our wedding, please use the personalized link that was sent to you.
              </p>
              <p className="text-gray-700">
                If you haven&apos;t received your invitation link or have any questions, please contact us directly.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
