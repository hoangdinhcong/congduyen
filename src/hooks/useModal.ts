'use client';

import { useState, useCallback } from 'react';

/**
 * Custom hook for managing modal state
 * @param initialState Initial open state of the modal
 * @returns Modal management functions and state
 */
export function useModal(initialState: boolean = false) {
  const [isOpen, setIsOpen] = useState<boolean>(initialState);
  
  /**
   * Open the modal
   */
  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);
  
  /**
   * Close the modal
   */
  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);
  
  /**
   * Toggle the modal state
   */
  const toggleModal = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);
  
  return {
    isOpen,
    openModal,
    closeModal,
    toggleModal
  };
}
