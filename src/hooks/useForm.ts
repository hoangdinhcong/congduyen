'use client';

import { useState, useCallback } from 'react';

type ValidationRule<T> = {
  validate: (value: any, formValues: T) => boolean;
  message: string;
};

type FieldValidation<T> = {
  [K in keyof T]?: ValidationRule<T>[];
};

/**
 * Custom hook for form state management and validation
 * @param initialValues Initial form values
 * @param validationRules Validation rules for form fields
 * @returns Form state and management functions
 */
export function useForm<T extends Record<string, any>>(
  initialValues: T,
  validationRules?: FieldValidation<T>
) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  /**
   * Validate a specific field
   * @param field Field name
   * @returns True if field is valid
   */
  const validateField = useCallback((field: keyof T): boolean => {
    if (!validationRules || !validationRules[field]) {
      return true;
    }
    
    const fieldRules = validationRules[field] || [];
    
    for (const rule of fieldRules) {
      if (!rule.validate(values[field], values)) {
        setErrors(prev => ({ ...prev, [field]: rule.message }));
        return false;
      }
    }
    
    // Clear error if validation passes
    setErrors(prev => ({ ...prev, [field]: undefined }));
    return true;
  }, [validationRules, values]);

  /**
   * Handle input change
   * @param field Field name
   * @param value Field value
   */
  const handleChange = useCallback((field: keyof T, value: any) => {
    setValues(prev => ({ ...prev, [field]: value }));
    
    // Clear error when value changes
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  }, [errors, setErrors]);

  /**
   * Handle input blur
   * @param field Field name
   */
  const handleBlur = useCallback((field: keyof T) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    
    // Validate field on blur if rules exist
    if (validationRules && validationRules[field]) {
      validateField(field);
    }
  }, [validationRules, validateField]);

  /**
   * Validate all form fields
   * @returns True if form is valid
   */
  const validateForm = useCallback((): boolean => {
    if (!validationRules) {
      return true;
    }
    
    let isValid = true;
    const newErrors: Partial<Record<keyof T, string>> = {};
    
    // Mark all fields as touched
    const allTouched: Partial<Record<keyof T, boolean>> = {};
    Object.keys(values).forEach(key => {
      allTouched[key as keyof T] = true;
    });
    setTouched(allTouched);
    
    // Validate each field
    Object.keys(validationRules).forEach(key => {
      const field = key as keyof T;
      const fieldRules = validationRules[field] || [];
      
      for (const rule of fieldRules) {
        if (!rule.validate(values[field], values)) {
          newErrors[field] = rule.message;
          isValid = false;
          break;
        }
      }
    });
    
    setErrors(newErrors);
    return isValid;
  }, [validationRules, values, setErrors]);

  /**
   * Reset form to initial values
   */
  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  /**
   * Set form values
   * @param newValues New form values
   */
  const setFormValues = useCallback((newValues: Partial<T>) => {
    setValues(prev => ({ ...prev, ...newValues }));
  }, []);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    setIsSubmitting,
    handleChange,
    handleBlur,
    validateField,
    validateForm,
    resetForm,
    setFormValues
  };
}

/**
 * Common validation rules
 */
export const validationRules = {
  required: (message: string = 'This field is required') => ({
    validate: (value: any) => {
      if (value === undefined || value === null) return false;
      if (typeof value === 'string') return value.trim() !== '';
      if (Array.isArray(value)) return value.length > 0;
      return true;
    },
    message
  }),
  
  email: (message: string = 'Please enter a valid email address') => ({
    validate: (value: string) => {
      if (!value) return true; // Skip if empty (use required rule for required fields)
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      return emailRegex.test(value);
    },
    message
  }),
  
  minLength: (min: number, message?: string) => ({
    validate: (value: string) => {
      if (!value) return true; // Skip if empty
      return value.length >= min;
    },
    message: message || `Must be at least ${min} characters`
  }),
  
  maxLength: (max: number, message?: string) => ({
    validate: (value: string) => {
      if (!value) return true; // Skip if empty
      return value.length <= max;
    },
    message: message || `Must be no more than ${max} characters`
  }),
  
  pattern: (pattern: RegExp, message: string) => ({
    validate: (value: string) => {
      if (!value) return true; // Skip if empty
      return pattern.test(value);
    },
    message
  }),
  
  match: <T extends Record<string, any>>(
    field: keyof T,
    message: string = 'Fields do not match'
  ) => ({
    validate: (value: any, formValues: T) => {
      return value === formValues[field];
    },
    message
  })
};
