'use client';

import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { GuestSide, RSVPStatus } from '../../lib/types';

type BulkEditModalProps = {
  selectedCount: number;
  onClose: () => void;
  onUpdate: (data: { side?: GuestSide; rsvp_status?: RSVPStatus }) => void;
};

export default function BulkEditModal({ selectedCount, onClose, onUpdate }: BulkEditModalProps) {
  const [side, setSide] = useState<GuestSide | ''>('');
  const [rsvpStatus, setRsvpStatus] = useState<RSVPStatus | ''>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const updateData: { side?: GuestSide; rsvp_status?: RSVPStatus } = {};
    
    if (side) {
      updateData.side = side;
    }
    
    if (rsvpStatus) {
      updateData.rsvp_status = rsvpStatus;
    }
    
    if (Object.keys(updateData).length === 0) {
      return; // No changes to apply
    }
    
    onUpdate(updateData);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-lg font-medium text-gray-900">Bulk Edit {selectedCount} Guests</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <FaTimes />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="px-6 py-4">
          <p className="mb-4 text-sm text-gray-600">
            Select the fields you want to update for all {selectedCount} selected guests. 
            Leave a field empty if you don't want to change it.
          </p>
          
          <div className="mb-4">
            <label htmlFor="side" className="block text-sm font-medium text-gray-700 mb-1">
              Side
            </label>
            <select
              id="side"
              value={side}
              onChange={(e) => setSide(e.target.value as GuestSide | '')}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            >
              <option value="">-- No Change --</option>
              <option value="bride">Bride&apos;s Side</option>
              <option value="groom">Groom&apos;s Side</option>
            </select>
          </div>
          
          <div className="mb-4">
            <label htmlFor="rsvp_status" className="block text-sm font-medium text-gray-700 mb-1">
              RSVP Status
            </label>
            <select
              id="rsvp_status"
              value={rsvpStatus}
              onChange={(e) => setRsvpStatus(e.target.value as RSVPStatus | '')}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            >
              <option value="">-- No Change --</option>
              <option value="pending">Pending</option>
              <option value="attending">Attending</option>
              <option value="declined">Declined</option>
            </select>
          </div>
          
          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-3 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Update Selected Guests
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
