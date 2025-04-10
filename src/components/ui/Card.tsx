'use client';

import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  title?: string | ReactNode;
  footer?: ReactNode;
  className?: string;
  titleClassName?: string;
  bodyClassName?: string;
  footerClassName?: string;
}

/**
 * Reusable card component with optional title and footer
 */
export function Card({
  children,
  title,
  footer,
  className = '',
  titleClassName = '',
  bodyClassName = '',
  footerClassName = '',
}: CardProps) {
  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}>
      {title && (
        <div className={`px-6 py-4 border-b border-gray-100 ${titleClassName}`}>
          {typeof title === 'string' ? (
            <h3 className="text-lg font-medium text-secondary">{title}</h3>
          ) : (
            title
          )}
        </div>
      )}
      
      <div className={`px-6 py-4 ${bodyClassName}`}>
        {children}
      </div>
      
      {footer && (
        <div className={`px-6 py-4 border-t border-gray-100 ${footerClassName}`}>
          {footer}
        </div>
      )}
    </div>
  );
}
