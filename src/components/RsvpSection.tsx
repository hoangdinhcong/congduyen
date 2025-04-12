"use client";

import React, { useState, useRef, useEffect } from "react";
import { Check, X, Heart, Phone } from "lucide-react";
import { Guest, RSVPStatus, GuestSide } from "@/lib/types";
import { showToast } from "@/components/ui/ToastProvider";
import { FormInput } from "./ui/FormInput";
import { Button } from "./ui/Button";
import { Button as ButtonShadcn } from "./ui/shadcn/button";

import { Alert } from "./ui/Alert";
import { useForm, validationRules } from "@/hooks/useForm";
import weddingData from '@/data/data.json';
import { useRoutePerspective } from '@/utils/routeUtils';
import { useAnonymousRSVP } from '@/hooks/useAnonymousRSVP';

type RsvpSectionProps = {
  guest?: Guest;
  uniqueInviteId?: string;
  rsvpStatus?: RSVPStatus;
};

const RsvpSection = ({
  guest,
  rsvpStatus = "pending"
}: RsvpSectionProps) => {
  // State management
  const [status, setStatus] = useState<RSVPStatus>(guest?.rsvp_status || rsvpStatus);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  let { isBride, isGroom, isHome } = useRoutePerspective();
  if(!!guest) {
    isBride = guest.side === 'bride';
    isGroom = guest.side === 'groom';
  }

  const isPersonalized = !!guest;
  const guestId = guest?.id;
  const guestName = guest?.name;
  const uniqueInviteId = guest?.unique_invite_id;

  // Refs for intersection observer
  const sectionRef = useRef<HTMLElement>(null);

  // Intersection observer for animation
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

  // Handle RSVP submission for personalized invites
  const handleRSVP = async (newStatus: "attending" | "declined") => {
    // Validate required props for personalized flow
    if (!isPersonalized || !guestId || !uniqueInviteId) return;

    // Prevent duplicate submissions
    if (submitting || status === newStatus) return;

    setSubmitting(true);
    setError("");

    try {
      const response = await fetch(`/api/rsvp/${uniqueInviteId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ rsvp_status: newStatus }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Không thể cập nhật phản hồi");
      }

      // Update local state on success
      setStatus(newStatus);

      // Show toast notification
      showToast.success(`Phản hồi của bạn đã được ghi nhận`);
    } catch (err: unknown) {
      console.error("Lỗi cập nhật RSVP:", err);
      const errorMessage = err instanceof Error ? err.message : "Đã xảy ra lỗi khi cập nhật phản hồi của bạn";
      setError(errorMessage);

      // Show toast notification
      showToast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  // Non-personalized RSVP form state and handlers
  const { submitAnonymousRSVP } = useAnonymousRSVP();

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
      side: (isBride ? 'bride' : isGroom ? 'groom' : '') as GuestSide | '',
      rsvp_status: 'attending' as RSVPStatus,
    },
    {
      name: [validationRules.required('Vui lòng nhập tên của bạn')],
      side: [validationRules.required('Vui lòng chọn bên của bạn')],
    }
  );

  const [formSuccess, setFormSuccess] = useState(false);

  const handleSubmitAnonymous = async (e: React.FormEvent) => {
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
        setFormSuccess(true);
        resetForm();
      } else {
        showToast.error('Không thể gửi phản hồi. Vui lòng thử lại.');
      }
    } catch (err) {
      console.error('Lỗi gửi RSVP:', err);
      showToast.error('Đã xảy ra lỗi khi gửi phản hồi của bạn');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="rsvp"
      className="bg-primary/20"
    >
      <div className="section-container max-w-md mx-auto">

        <h2 className="section-title">Xác Nhận Tham Dự</h2>

        <div
          className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          {isPersonalized ? (
            <div className="bg-white p-8 md:p-10 rounded-lg shadow-md border border-primary-light text-center relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-primary opacity-30"></div>
              <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-primary opacity-30"></div>

              {status === "pending" ? (
                <>
                  <div className="mb-8">
                    <Heart className="text-primary mx-auto mb-4" size={32} />
                    <h3 className="text-2xl font-serif mb-4">
                      Bạn sẽ tham dự đám cưới của chúng mình chứ?
                    </h3>
                    <p className="text-gray-600 max-w-md mx-auto font-sans">
                      Chúng mình rất vinh dự nếu bạn có thể đến chung vui trong ngày trọng đại này.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-6 justify-center">
                    <button
                      onClick={() => handleRSVP("attending")}
                      disabled={submitting}
                      className="button-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Check size={16} />
                      {submitting ? "Đang gửi..." : "Có, tôi sẽ tham dự"}
                    </button>

                    <button
                      onClick={() => handleRSVP("declined")}
                      disabled={submitting}
                      className="button-outline flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <X size={16} />
                      {submitting ? "Đang gửi..." : "Rất tiếc, tôi không thể tham dự"}
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center py-4">
                  <div className="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6">
                    {status === "attending" ? (
                      <div className="bg-green-100 w-full h-full rounded-full flex items-center justify-center shadow-md">
                        <Check className="text-green-600 animate-bounce" size={24} />
                      </div>
                    ) : (
                      <div className="bg-red-100 w-full h-full rounded-full flex items-center justify-center shadow-md">
                        <X className="text-red-600" size={24} />
                      </div>
                    )}
                  </div>

                  <h3 className="text-2xl font-serif mb-4">
                    {status === "attending"
                      ? `${guestName} sẽ tham dự 😍`
                      : `${guestName} đã không thể sắp xếp được.`}
                  </h3>

                  <p className="text-gray-600 mb-8 max-w-md mx-auto font-sans">
                    {status === "attending"
                      ? `Rất mong được gặp ${guestName}! Cảm ơn bạn đã đồng hành cùng chúng mình trong ngày đặc biệt này.`
                      : `Cám ơn đã cho chúng mình biết, Hẹn gặp ${guestName} một dịp khác sớm nhé.`}
                  </p>

                  <button
                    onClick={() => setStatus("pending")}
                    className="text-primary hover:text-primary-dark transition-colors duration-300 flex items-center gap-2 mx-auto"
                  >
                    <span className="underline">Thay đổi phản hồi của bạn</span>
                  </button>
                </div>
              )}

              {error && (
                <div className="mt-6 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
                  {error}
                </div>
              )}
            </div>
          ) : (
            <div
              className="bg-white p-8 rounded-lg shadow-sm fade-in"
              style={{ animationDelay: "0.3s" }}
            >
              {formSuccess ? (
                <div className="text-center py-6">
                  <div className="w-20 h-20 mx-auto rounded-full bg-green-100 flex items-center justify-center mb-6 shadow-md">
                    <Check className="text-green-600 animate-bounce" size={24} />
                  </div>

                  <h3 className="text-xl font-serif mb-4">
                    Cảm ơn bạn!
                  </h3>

                  <p className="text-gray-600 mb-6 font-sans">
                    Phản hồi của bạn đã được ghi nhận. Chúng mình rất mong được gặp bạn trong ngày đặc biệt này!
                  </p>

                  <div className="flex justify-center">
                    <Heart className="text-primary animate-heartbeat" size={24} />
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmitAnonymous} className="space-y-6">

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
                      label="Họ tên"
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

                    {!isBride && !isGroom && (
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Bạn là khách mời của <span className="text-red-500">*</span>
                        </label>

                        <div className="flex gap-3">
                          <button
                            type="button"
                            className={`flex-1 py-2.5 px-4 rounded-lg border transition-all ${values.side === 'bride'
                              ? 'bg-primary text-white border-primary'
                              : 'border-gray-300 hover:border-primary hover:bg-primary-light/30'
                              }`}
                            onClick={() => handleChange('side', 'bride')}
                          >
                            Cô dâu
                          </button>

                          <button
                            type="button"
                            className={`flex-1 py-2.5 px-4 rounded-lg border transition-all ${values.side === 'groom'
                              ? 'bg-primary text-white border-primary'
                              : 'border-gray-300 hover:border-primary hover:bg-primary-light/30'
                              }`}
                            onClick={() => handleChange('side', 'groom')}
                          >
                            Chú rể
                          </button>
                        </div>

                        {errors.side && touched.side && (
                          <p className="text-red-500 text-sm mt-1">{errors.side}</p>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="pt-4">
                    <Button
                      type="submit"
                      variant="primary"
                      isLoading={isSubmitting}
                      icon={<Check />}
                      className="w-full"
                    >
                      {isSubmitting ? "Đang xử lý..." : "Xác nhận tham dự"}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>

        <div className="text-center mt-12 text-gray-600 fade-in font-sans" style={{ animationDelay: "0.4s" }}>
          <p className="font-sans">Xác nhận giúp chúng mình trước ngày 24 tháng 4, 2025 nha, để chúng mình chuẩn bị và đón tiếp bạn tốt nhất</p>
          <p className="mt-2 font-sans">Nếu bạn cần hỗ trợ, cứ nhắn chúng mình 🥂</p>

          <div className="flex justify-center gap-4 mt-4">
            {(isBride || isHome) && (
              <ButtonShadcn
                variant="outline"
                size="sm"
                className="flex items-center gap-2 text-gray-900"
                onClick={() => window.open(`tel:${weddingData.contact.bride.phone}`, '_blank')}
              >
                <Phone size={16} />
                <span>Liên hệ Cô dâu</span>
              </ButtonShadcn>
            )}
            {(isGroom || isHome) && (
              <ButtonShadcn
                variant="outline"
                size="sm"
                className="flex items-center gap-2 text-gray-900"
                onClick={() => window.open(`tel:${weddingData.contact.groom.phone}`, '_blank')}
              >
                <Phone size={16} />
                <span>Liên hệ Chú rể</span>
              </ButtonShadcn>
            )}
          </div>
        </div>
      </div>
    </section >
  );
};

export default RsvpSection;
