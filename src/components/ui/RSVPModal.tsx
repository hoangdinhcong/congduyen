'use client';

import React, { useState } from 'react';
import Modal from './Modal';
import { FaCheck, FaTimes, FaEnvelope } from 'react-icons/fa';

type RSVPModalProps = {
  isOpen: boolean;
  onClose: () => void;
  guestName?: string;
  guestId?: string;
  uniqueInviteId?: string;
  rsvpStatus?: 'pending' | 'attending' | 'declined';
};

export default function RSVPModal({
  isOpen,
  onClose,
  guestName = '',
  guestId = '',
  uniqueInviteId = '',
  rsvpStatus = 'pending'
}: RSVPModalProps) {
  const [status, setStatus] = useState<'pending' | 'attending' | 'declined'>(rsvpStatus);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRSVP = async (newStatus: 'attending' | 'declined') => {
    if (!guestId || !uniqueInviteId) {
      setError('Không thể xác định thông tin khách mời. Vui lòng thử lại sau.');
      return;
    }
    
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
        throw new Error(data.message || 'Không thể cập nhật phản hồi');
      }
      
      setStatus(newStatus);
      setSuccess(`Cảm ơn bạn! Phản hồi của bạn đã được ${newStatus === 'attending' ? 'xác nhận tham dự' : 'từ chối'}.`);
    } catch (err: unknown) {
      console.error('Lỗi cập nhật RSVP:', err);
      setError(err instanceof Error ? err.message : 'Đã xảy ra lỗi khi cập nhật phản hồi của bạn');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      title="Phản Hồi Tham Dự"
    >
      {status === 'pending' ? (
        <>
          <div className="mb-6 text-center">
            <FaEnvelope className="text-3xl text-primary mx-auto mb-4" />
            <h3 className="text-xl font-heading mb-3 text-secondary">
              {guestName ? `${guestName}, bạn` : 'Bạn'} sẽ tham dự đám cưới của chúng tôi chứ?
            </h3>
            <p className="text-gray-600">
              Chúng tôi rất vinh dự nếu bạn có thể đến chung vui trong ngày trọng đại này.
              Vui lòng cho chúng tôi biết bạn có thể tham dự không.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => handleRSVP('attending')}
              disabled={submitting}
              className="btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaCheck className="text-sm" />
              {submitting ? 'Đang gửi...' : 'Có, tôi sẽ tham dự'}
            </button>
            
            <button 
              onClick={() => handleRSVP('declined')}
              disabled={submitting}
              className="btn-outline flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaTimes className="text-sm" />
              {submitting ? 'Đang gửi...' : 'Rất tiếc, tôi không thể tham dự'}
            </button>
          </div>
        </>
      ) : (
        <div className="text-center py-2">
          <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
            {status === 'attending' ? (
              <div className="bg-green-100 w-full h-full rounded-full flex items-center justify-center shadow-md">
                <FaCheck className="text-green-600 text-xl animate-bounce" />
              </div>
            ) : (
              <div className="bg-red-100 w-full h-full rounded-full flex items-center justify-center shadow-md">
                <FaTimes className="text-red-600 text-xl" />
              </div>
            )}
          </div>
          
          <h3 className="text-xl font-heading mb-3 text-secondary">
            {status === 'attending' 
              ? 'Bạn đã xác nhận tham dự!' 
              : 'Bạn đã từ chối lời mời.'}
          </h3>
          
          <p className="text-gray-600 mb-6">
            {status === 'attending'
              ? 'Chúng tôi rất mong được gặp bạn! Cảm ơn bạn đã đồng hành cùng chúng tôi trong ngày đặc biệt này.'
              : 'Chúng tôi sẽ nhớ bạn, nhưng cảm ơn bạn đã thông báo. Chúng tôi đánh giá cao phản hồi của bạn.'}
          </p>
          
          <button
            onClick={() => setStatus('pending')}
            className="text-primary hover:text-primary-dark transition-colors duration-300 flex items-center gap-2 mx-auto"
          >
            <span className="underline">Thay đổi phản hồi của bạn</span>
          </button>
        </div>
      )}
      
      {error && (
        <div className="mt-4 text-red-600 bg-red-50 p-3 rounded-md">
          {error}
        </div>
      )}
      
      {success && (
        <div className="mt-4 text-green-600 bg-green-50 p-3 rounded-md">
          {success}
        </div>
      )}
    </Modal>
  );
}
