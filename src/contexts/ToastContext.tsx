'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useToast, Toast, ToastType } from '@/hooks/useToast';

interface ToastContextType {
  toasts: Toast[];
  showToast: (message: string, type?: ToastType) => void;
  dismissToast: (id: string) => void;
  showSuccess: (message: string) => void;
  showError: (message: string) => void;
  showInfo: (message: string) => void;
  showWarning: (message: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

/**
 * Provider component for toast notifications
 */
export function ToastProvider({ children }: { children: ReactNode }) {
  const toastMethods = useToast();
  
  return (
    <ToastContext.Provider value={toastMethods}>
      {children}
      <ToastContainer toasts={toastMethods.toasts} dismissToast={toastMethods.dismissToast} />
    </ToastContext.Provider>
  );
}

/**
 * Hook to use the toast context
 */
export function useToastContext() {
  const context = useContext(ToastContext);
  
  if (context === undefined) {
    throw new Error('useToastContext must be used within a ToastProvider');
  }
  
  return context;
}

/**
 * Toast container component
 */
function ToastContainer({ 
  toasts, 
  dismissToast 
}: { 
  toasts: Toast[]; 
  dismissToast: (id: string) => void;
}) {
  if (toasts.length === 0) return null;
  
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`px-4 py-3 rounded-md shadow-md flex items-center justify-between max-w-md transform transition-all duration-300 ease-in-out animate-slideIn
            ${toast.type === 'success' ? 'bg-green-100 text-green-800 border-l-4 border-green-500' : ''}
            ${toast.type === 'error' ? 'bg-red-100 text-red-800 border-l-4 border-red-500' : ''}
            ${toast.type === 'warning' ? 'bg-yellow-100 text-yellow-800 border-l-4 border-yellow-500' : ''}
            ${toast.type === 'info' ? 'bg-blue-100 text-blue-800 border-l-4 border-blue-500' : ''}
          `}
        >
          <p className="mr-4">{toast.message}</p>
          <button
            onClick={() => dismissToast(toast.id)}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
            aria-label="Close"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
}
