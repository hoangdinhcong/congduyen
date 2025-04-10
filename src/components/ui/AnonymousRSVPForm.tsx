'use client';

import React, { useState } from 'react';
import { FaCheck, FaHeart, FaUser } from 'react-icons/fa';
import { AnonymousRSVP } from '@/lib/types';
import { showToast } from './ToastProvider';

export default function AnonymousRSVPForm() {
  const [formData, setFormData] = useState<AnonymousRSVP>({
    name: '',
    side: undefined,
    rsvp_status: 'attending', // Always set to attending since form submission means acceptance
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name.trim()) {
      setError('Vui lòng nhập tên của bạn');
      return;
    }

    setSubmitting(true);
    setError('');
    
    try {
      const response = await fetch('/api/rsvp/anonymous', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Không thể gửi phản hồi');
      }
      
      setSuccess(true);
      showToast.success('Cảm ơn bạn! Phản hồi của bạn đã được ghi nhận.');
      
      // Reset form after successful submission
      setFormData({
        name: '',
        side: undefined,
        rsvp_status: 'attending',
      });
    } catch (err: unknown) {
      console.error('Lỗi gửi RSVP:', err);
      setError(err instanceof Error ? err.message : 'Đã xảy ra lỗi khi gửi phản hồi của bạn');
      showToast.error('Đã xảy ra lỗi. Vui lòng thử lại.');
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="text-center py-6">
        <div className="w-20 h-20 mx-auto rounded-full bg-green-100 flex items-center justify-center mb-6 shadow-md">
          <FaCheck className="text-green-600 text-2xl animate-bounce" />
        </div>
        
        <h3 className="text-xl font-heading mb-4 text-secondary">
          Cảm ơn bạn!
        </h3>
        
        <p className="text-gray-600 mb-6">
          Phản hồi của bạn đã được ghi nhận. Chúng tôi rất mong được gặp bạn trong ngày đặc biệt này!
        </p>
        
        <div className="flex justify-center">
          <FaHeart className="text-primary animate-heartbeat text-2xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 md:p-8 rounded-lg shadow-md border border-primary-light">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="text-center mb-6">
          <FaUser className="text-3xl text-primary mx-auto mb-4" />
          <h3 className="text-xl font-heading mb-2 text-secondary">
            Xác Nhận Tham Dự
          </h3>
          <p className="text-gray-600 text-sm">
            Vui lòng điền thông tin của bạn để xác nhận tham dự đám cưới
          </p>
        </div>
        
        {error && (
          <div className="text-red-600 bg-red-50 p-3 rounded-md text-sm">
            {error}
          </div>
        )}
        
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Họ và tên <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nhập họ và tên của bạn"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              required
            />
          </div>
          
          <div>
            <label htmlFor="side" className="block text-sm font-medium text-gray-700 mb-1">
              Bạn là khách mời của <span className="text-red-500">*</span>
            </label>
            <select
              id="side"
              name="side"
              value={formData.side || ''}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              required
            >
              <option value="" disabled>Chọn bên</option>
              <option value="bride">Cô dâu (Mỹ Duyên)</option>
              <option value="groom">Chú rể (Hoàng Công)</option>
            </select>
          </div>
        </div>
        
        <div className="pt-4">
          <button
            type="submit"
            disabled={submitting}
            className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? (
              <>
                <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                Đang gửi...
              </>
            ) : (
              <>
                <FaCheck className="text-sm" />
                Xác nhận tham dự
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
