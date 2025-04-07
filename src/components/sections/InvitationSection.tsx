import React from 'react';
import SectionTitle from '../ui/SectionTitle';

export default function InvitationSection() {
  return (
    <section className="py-16 bg-primary-light">
      <div className="container-wedding">
        <SectionTitle 
          title="You Are Invited" 
          subtitle="We would be honored to have you join us on our special day"
        />
        
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-lg mb-6">
            With great pleasure, we invite you to share in our joy as we unite in marriage.
            Your presence will make our celebration even more meaningful as we begin our new life together.
          </p>
          
          <div className="border-t border-b border-primary py-8 my-8">
            <h3 className="font-heading text-2xl mb-2">Cong & Duyen</h3>
            <p className="text-xl mb-4">Request the honor of your presence</p>
            <p className="text-lg">
              Saturday, the fifteenth of April<br />
              Two thousand and twenty-five<br />
              at three o'clock in the afternoon
            </p>
          </div>
          
          <p className="italic text-gray-600">
            "Love is patient, love is kind. It always protects, always trusts, always hopes, always perseveres."
          </p>
        </div>
      </div>
    </section>
  );
}
