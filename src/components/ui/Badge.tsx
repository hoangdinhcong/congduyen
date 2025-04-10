'use client';

import React from 'react';

type BadgeVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

/**
 * Reusable badge component with various styles
 */
export function Badge({
  children,
  variant = 'primary',
  className = '',
}: BadgeProps) {
  // Variant styles
  const variantStyles = {
    primary: 'bg-primary-light text-primary-dark',
    secondary: 'bg-gray-100 text-gray-800',
    success: 'bg-green-100 text-green-800',
    danger: 'bg-red-100 text-red-800',
    warning: 'bg-yellow-100 text-yellow-800',
    info: 'bg-blue-100 text-blue-800',
  };
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  );
}
