'use client';

import React from 'react';

type LoadingSpinnerProps = {
  size?: 'small' | 'medium' | 'large';
  color?: 'primary' | 'white' | 'gray';
  className?: string;
};

const LoadingSpinner = ({
  size = 'medium',
  color = 'primary',
  className = '',
}: LoadingSpinnerProps) => {
  const sizeClasses = {
    small: 'h-4 w-4 border-2',
    medium: 'h-8 w-8 border-2',
    large: 'h-12 w-12 border-3',
  };

  const colorClasses = {
    primary: 'border-primary-light border-t-primary',
    white: 'border-gray-200 border-t-white',
    gray: 'border-gray-200 border-t-gray-600',
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div
        className={`animate-spin rounded-full ${sizeClasses[size]} ${colorClasses[color]}`}
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

// Full-page loading overlay
export const LoadingOverlay = () => {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-80 flex items-center justify-center z-50">
      <div className="text-center">
        <LoadingSpinner size="large" />
        <p className="mt-4 text-gray-600 font-medium">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
