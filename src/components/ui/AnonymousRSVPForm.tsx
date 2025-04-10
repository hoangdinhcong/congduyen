'use client';

import React from 'react';
import { FaCheck, FaHeart, FaUser } from 'react-icons/fa';
import { GuestSide, RSVPStatus } from '@/lib/types';
import { useForm, validationRules } from '@/hooks/useForm';
import { useGuestContext } from '@/contexts/GuestContext';
import { useToastContext } from '@/contexts/ToastContext';
import { FormInput } from './FormInput';
import { FormSelect } from './FormSelect';
import { Button } from './Button';
import { Alert } from './Alert';

/**
 * Anonymous RSVP form component
 * Allows guests to submit an RSVP without a unique invitation link
 */
export default function AnonymousRSVPForm() {
  const { submitAnonymousRSVP } = useGuestContext();
  const { showSuccess, showError } = useToastContext();
  
  const {
    values,
    errors,
    touched,
    isSubmitting,
    setIsSubmitting,
    handleChange,
    handleBlur,
    validateForm,
    resetForm,
  } = useForm(
    {
      name: '',
      side: '' as GuestSide | '',
      rsvp_status: 'attending' as RSVPStatus,
    },
    {
      name: [validationRules.required('Vui lòng nhập tên của bạn')],
      side: [validationRules.required('Vui lòng chọn bên của bạn')],
    }
  );
  
  const [success, setSuccess] = React.useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const result = await submitAnonymousRSVP({
        name: values.name,
        side: values.side as GuestSide,
        rsvp_status: values.rsvp_status,
      });
      
      if (result) {
        setSuccess(true);
        showSuccess('Cảm ơn bạn! Phản hồi của bạn đã được ghi nhận.');
        resetForm();
      } else {
        showError('Không thể gửi phản hồi. Vui lòng thử lại.');
      }
    } catch (err) {
      console.error('Lỗi gửi RSVP:', err);
      showError('Đã xảy ra lỗi khi gửi phản hồi của bạn');
    } finally {
      setIsSubmitting(false);
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
        
        {Object.values(errors).some(error => error) && (
          <Alert 
            variant="error" 
            title="Vui lòng kiểm tra lại thông tin"
          >
            Vui lòng điền đầy đủ các trường bắt buộc.
          </Alert>
        )}
        
        <div className="space-y-4">
          <FormInput
            label="Họ và tên"
            id="name"
            name="name"
            value={values.name}
            onChange={(e) => handleChange('name', e.target.value)}
            onBlur={() => handleBlur('name')}
            error={errors.name}
            touched={touched.name}
            placeholder="Nhập họ và tên của bạn"
            required
          />
          
          <FormSelect
            label="Bạn là khách mời của"
            id="side"
            options={[
              { value: '', label: 'Chọn bên' },
              { value: 'bride', label: 'Cô dâu (Mỹ Duyên)' },
              { value: 'groom', label: 'Chú rể (Hoàng Công)' },
            ]}
            value={values.side}
            onChange={(value) => handleChange('side', value)}
            onBlur={() => handleBlur('side')}
            error={errors.side}
            touched={touched.side}
            required
          />
        </div>
        
        <div className="pt-4">
          <Button
            type="submit"
            variant="primary"
            isLoading={isSubmitting}
            icon={<FaCheck />}
            className="w-full"
          >
            Xác nhận tham dự
          </Button>
        </div>
      </form>
    </div>
  );
}
