'use client';

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Guest, GuestSide } from '../../lib/types';
import { showToast } from '@/components/ui/ToastProvider';

type EditGuestModalProps = {
  guest: Guest;
  onClose: () => void;
  onUpdate: (updatedGuest: Partial<Guest>) => void;
};

export default function EditGuestModal({ guest, onClose, onUpdate }: EditGuestModalProps) {
  const [name, setName] = useState(guest.name);
  const [side, setSide] = useState<GuestSide>(guest.side);
  const [tags, setTags] = useState<string[]>(guest.tags || []);
  const [tagInput, setTagInput] = useState('');
  const [rsvpStatus, setRsvpStatus] = useState<'pending' | 'attending' | 'declined'>(guest.rsvp_status);
  const [isInvited, setIsInvited] = useState<boolean>(guest.is_invited || false);

  useEffect(() => {
    setName(guest.name);
    setSide(guest.side);
    setTags(guest.tags || []);
    setRsvpStatus(guest.rsvp_status);
    setIsInvited(guest.is_invited || false);
  }, [guest]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      showToast.error('Vui lòng nhập tên khách');
      return;
    }

    onUpdate({
      id: guest.id,
      name,
      side,
      tags,
      rsvp_status: rsvpStatus,
      is_invited: isInvited,
    });
  };

  const handleAddTag = () => {
    if (tagInput.trim()) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600/75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-lg font-medium text-gray-900">Chỉnh sửa khách</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-4">
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name *
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-xs focus:outline-hidden focus:ring-primary focus:border-primary sm:text-sm"
              placeholder="Enter guest name"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="side" className="block text-sm font-medium text-gray-700 mb-1">
              Side *
            </label>
            <select
              id="side"
              value={side}
              onChange={(e) => setSide(e.target.value as GuestSide)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-xs focus:outline-hidden focus:ring-primary focus:border-primary sm:text-sm"
            >
              <option value="bride">Bride&apos;s Side</option>
              <option value="groom">Groom&apos;s Side</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
              Tags
            </label>
            <div className="flex">
              <input
                type="text"
                id="tags"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="block w-full px-3 py-2 border border-gray-300 rounded-l-md shadow-xs focus:outline-hidden focus:ring-primary focus:border-primary sm:text-sm"
                placeholder="Add a tag (e.g., family, friend)"
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-r-md shadow-xs text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Add
              </button>
            </div>

            {tags.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-light text-primary"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(index)}
                      className="ml-1.5 inline-flex items-center justify-center h-4 w-4 rounded-full text-primary-light bg-primary hover:bg-primary-dark"
                    >
                      <span className="sr-only">Remove tag</span>
                      <X className="h-2 w-2" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="rsvp_status" className="block text-sm font-medium text-gray-700 mb-1">
              RSVP Status *
            </label>
            <select
              id="rsvp_status"
              value={rsvpStatus}
              onChange={(e) => setRsvpStatus(e.target.value as 'pending' | 'attending' | 'declined')}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-xs focus:outline-hidden focus:ring-primary focus:border-primary sm:text-sm"
            >
              <option value="pending">Pending</option>
              <option value="attending">Attending</option>
              <option value="declined">Declined</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="is_invited" className="block text-sm font-medium text-gray-700 mb-1">
              Invitation Status
            </label>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="is_invited"
                checked={isInvited}
                onChange={(e) => setIsInvited(e.target.checked)}
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
              <label htmlFor="is_invited" className="ml-2 block text-sm text-gray-900">
                Mark as invited
              </label>
              <div className="ml-2 text-xs text-gray-500">
                {isInvited ? '(Link has been sent to this guest)' : '(Link has not been sent yet)'}
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-3 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-xs text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-xs text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Cập nhật
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
