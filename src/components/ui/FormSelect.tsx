'use client';

import React, { SelectHTMLAttributes } from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface FormSelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  label: string;
  options: SelectOption[];
  error?: string;
  touched?: boolean;
  onChange: (value: string) => void;
  containerClassName?: string;
  labelClassName?: string;
  selectClassName?: string;
  errorClassName?: string;
}

/**
 * Reusable form select component with label and error handling
 */
export function FormSelect({
  label,
  options,
  error,
  touched,
  onChange,
  containerClassName = '',
  labelClassName = '',
  selectClassName = '',
  errorClassName = '',
  id,
  value,
  ...props
}: FormSelectProps) {
  const selectId = id || `select-${label.toLowerCase().replace(/\s+/g, '-')}`;
  const showError = touched && error;
  
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };
  
  return (
    <div className={`mb-4 ${containerClassName}`}>
      <label 
        htmlFor={selectId}
        className={`block text-sm font-medium text-gray-700 mb-1 ${labelClassName}`}
      >
        {label}
      </label>
      <select
        id={selectId}
        className={`
          w-full px-3 py-2 border rounded-md shadow-sm focus:outline-hidden focus:ring-2 focus:ring-primary
          ${showError 
            ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
            : 'border-gray-300 focus:border-primary'
          }
          ${selectClassName}
        `}
        value={value}
        onChange={handleChange}
        aria-invalid={showError ? 'true' : 'false'}
        aria-describedby={showError ? `${selectId}-error` : undefined}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {showError && (
        <p 
          id={`${selectId}-error`}
          className={`mt-1 text-sm text-red-600 ${errorClassName}`}
        >
          {error}
        </p>
      )}
    </div>
  );
}
