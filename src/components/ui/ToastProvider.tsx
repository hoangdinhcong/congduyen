'use client';

import { Toaster, toast } from 'react-hot-toast';

export const ToastProvider = () => {
  return <Toaster position="bottom-right" toastOptions={{
    style: {
      background: '#ffffff',
      color: '#171717',
      border: '1px solid #e5e7eb',
      padding: '16px',
      borderRadius: '8px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    },
    success: {
      style: {
        background: '#f0fdf4',
        border: '1px solid #22c55e',
      },
      iconTheme: {
        primary: '#22c55e',
        secondary: '#ffffff',
      },
    },
    error: {
      style: {
        background: '#fef2f2',
        border: '1px solid #ef4444',
      },
      iconTheme: {
        primary: '#ef4444',
        secondary: '#ffffff',
      },
    },
    duration: 3000,
  }} />;
};

// Helper functions to show toast messages
export const showToast = {
  success: (message: string) => toast.success(message),
  error: (message: string) => toast.error(message),
  loading: (message: string) => toast.loading(message),
  custom: (message: string) => toast(message),
  dismiss: (toastId?: string) => {
    if (toastId) {
      toast.dismiss(toastId);
    } else {
      toast.dismiss();
    }
  }
};
