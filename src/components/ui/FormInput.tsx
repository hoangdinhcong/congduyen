'use client';

import React, { InputHTMLAttributes } from 'react';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  touched?: boolean;
  containerClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  errorClassName?: string;
}

/**
 * Reusable form input component with label and error handling
 */
export function FormInput({
  label,
  error,
  touched,
  containerClassName = '',
  labelClassName = '',
  inputClassName = '',
  errorClassName = '',
  id,
  ...props
}: FormInputProps) {
  const inputId = id || `input-${label.toLowerCase().replace(/\s+/g, '-')}`;
  const showError = touched && error;
  
  return (
    <div className={`mb-4 ${containerClassName}`}>
      <label 
        htmlFor={inputId}
        className={`block text-sm font-medium text-gray-700 mb-1 ${labelClassName}`}
      >
        {label}
      </label>
      <input
        id={inputId}
        className={`
          w-full px-3 py-2 border rounded-md shadow-sm focus:outline-hidden focus:ring-2 focus:ring-primary
          ${showError 
            ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
            : 'border-gray-300 focus:border-primary'
          }
          ${inputClassName}
        `}
        aria-invalid={showError ? 'true' : 'false'}
        aria-describedby={showError ? `${inputId}-error` : undefined}
        {...props}
      />
      {showError && (
        <p 
          id={`${inputId}-error`}
          className={`mt-1 text-sm text-red-600 ${errorClassName}`}
        >
          {error}
        </p>
      )}
    </div>
  );
}
