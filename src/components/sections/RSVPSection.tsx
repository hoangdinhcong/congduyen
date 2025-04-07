import React from 'react';
import SectionTitle from '../ui/SectionTitle';

type RSVPSectionProps = {
  isPersonalized?: boolean;
  guestName?: string;
  onRSVP?: (status: 'attending' | 'declined') => void;
};

export default function RSVPSection({ isPersonalized = false, guestName = '', onRSVP }: RSVPSectionProps) {
  return (
    <section className="py-16">
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
              <h3 className="text-xl font-heading mb-6">
                Will you join us on our special day?
              </h3>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => onRSVP && onRSVP('attending')}
                  className="btn-primary"
                >
                  Yes, I'll be there
                </button>
                
                <button 
                  onClick={() => onRSVP && onRSVP('declined')}
                  className="btn-outline"
                >
                  Sorry, I can't make it
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-primary-light p-8 rounded-lg text-center">
              <p className="mb-4">
                To RSVP for our wedding, please use the personalized link that was sent to you.
              </p>
              <p className="text-gray-700">
                If you haven't received your invitation link or have any questions, please contact us directly.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
