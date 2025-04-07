import React from 'react';
import SectionTitle from '../ui/SectionTitle';

export default function ParentsSection() {
  return (
    <section className="py-16">
      <div className="container-wedding">
        <SectionTitle 
          title="With the Blessings of Our Parents" 
          subtitle="Together with our families"
        />
        
        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto text-center">
          {/* Bride's Parents */}
          <div>
            <h3 className="text-2xl font-heading mb-4">Bride's Parents</h3>
            <p className="text-lg mb-2">Mr. & Mrs. Nguyen</p>
            <p className="text-gray-600">
              Proudly present their daughter
            </p>
            <p className="text-xl font-heading mt-4">Duyen Nguyen</p>
          </div>
          
          {/* Groom's Parents */}
          <div>
            <h3 className="text-2xl font-heading mb-4">Groom's Parents</h3>
            <p className="text-lg mb-2">Mr. & Mrs. Hoang</p>
            <p className="text-gray-600">
              Proudly present their son
            </p>
            <p className="text-xl font-heading mt-4">Cong Hoang</p>
          </div>
        </div>
      </div>
    </section>
  );
}
