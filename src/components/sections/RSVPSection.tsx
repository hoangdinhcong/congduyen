'use client';

import React, { useState, useRef, useEffect } from 'react';
import SectionTitle from '../ui/SectionTitle';
import { Check, X, Heart } from 'lucide-react';
import { RSVPStatus } from '../../lib/types';
import AnonymousRSVPForm from '../ui/AnonymousRSVPForm';

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
    <section
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-white to-primary-light"
      id="rsvp"
    >
      <div className="container-wedding">
        <SectionTitle
          title="Phản Hồi Tham Dự"
          subtitle={isPersonalized
            ? `${guestName}, vui lòng cho chúng tôi biết bạn có thể tham dự không`
            : "Vui lòng điền thông tin của bạn để xác nhận tham dự"}
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
                    <Heart className="text-primary mx-auto mb-4" size={32} />
                    <h3 className="text-2xl font-serif mb-4 text-secondary">
                      Bạn sẽ tham dự đám cưới của chúng tôi chứ?
                    </h3>
                    <p className="text-gray-600 max-w-md mx-auto font-sans">
                      Chúng tôi rất vinh dự nếu bạn có thể đến chung vui trong ngày trọng đại này.
                      Vui lòng cho chúng tôi biết bạn có thể tham dự không.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-6 justify-center">
                    <button
                      onClick={() => handleRSVP('attending')}
                      disabled={submitting}
                      className="btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Check size={16} />
                      {submitting ? 'Đang gửi...' : 'Có, tôi sẽ tham dự'}
                    </button>

                    <button
                      onClick={() => handleRSVP('declined')}
                      disabled={submitting}
                      className="btn-outline flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <X size={16} />
                      {submitting ? 'Đang gửi...' : 'Rất tiếc, tôi không thể tham dự'}
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center py-4">
                  <div className="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6">
                    {status === 'attending' ? (
                      <div className="bg-green-100 w-full h-full rounded-full flex items-center justify-center shadow-md">
                        <Check className="text-green-600 animate-bounce" size={24} />
                      </div>
                    ) : (
                      <div className="bg-red-100 w-full h-full rounded-full flex items-center justify-center shadow-md">
                        <X className="text-red-600" size={24} />
                      </div>
                    )}
                  </div>

                  <h3 className="text-2xl font-serif mb-4 text-secondary">
                    {status === 'attending'
                      ? 'Bạn đã xác nhận tham dự!'
                      : 'Bạn đã từ chối lời mời.'}
                  </h3>

                  <p className="text-gray-600 mb-8 max-w-md mx-auto font-sans">
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
                <div className="mt-6 text-red-600 bg-red-50 p-3 rounded-md">
                  {error}
                </div>
              )}

              {success && (
                <div className="mt-6 text-green-600 bg-green-50 p-3 rounded-md flex items-center justify-center gap-2">
                  <Heart className="text-primary animate-heartbeat" size={16} />
                  <span>{success}</span>
                </div>
              )}
            </div>
          ) : (
            // Anonymous RSVP form
            <div className="bg-white p-8 md:p-10 rounded-lg shadow-md border border-primary-light">
              <AnonymousRSVPForm />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
