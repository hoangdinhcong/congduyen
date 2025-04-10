'use client';

import { useState, useCallback } from 'react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

/**
 * Custom hook for managing toast notifications
 * @returns Toast management functions and state
 */
export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  /**
   * Dismiss a toast notification by ID
   * @param id Toast ID
   */
  const dismissToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  /**
   * Show a toast notification
   * @param message Toast message
   * @param type Toast type
   */
  const showToast = useCallback((message: string, type: ToastType = 'info') => {
    const id = Date.now().toString();
    
    setToasts(prev => [...prev, { id, message, type }]);
    
    // Auto-dismiss after 5 seconds
    setTimeout(() => {
      dismissToast(id);
    }, 5000);
  }, [dismissToast]);

  return {
    toasts,
    showToast,
    dismissToast,
    showSuccess: (message: string) => showToast(message, 'success'),
    showError: (message: string) => showToast(message, 'error'),
    showInfo: (message: string) => showToast(message, 'info'),
    showWarning: (message: string) => showToast(message, 'warning'),
  };
}
