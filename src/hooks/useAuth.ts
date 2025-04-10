'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { AuthAPI } from '@/lib/api-client';
import { ROUTES } from '@/lib/config';
import { useToastContext } from '@/contexts/ToastContext';

/**
 * Custom hook for authentication management
 * @returns Authentication state and functions
 */
export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();
  const { showSuccess, showError } = useToastContext();

  /**
   * Check if the user is authenticated
   */
  const checkAuth = useCallback(async () => {
    try {
      setIsLoading(true);
      const isAuth = await AuthAPI.checkSession();
      setIsAuthenticated(isAuth);
      return isAuth;
    } catch (error) {
      console.error('Error checking authentication:', error);
      setIsAuthenticated(false);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Login with password
   * @param password Password to login with
   */
  const login = useCallback(async (password: string) => {
    try {
      setIsLoading(true);
      const success = await AuthAPI.login(password);
      
      if (success) {
        setIsAuthenticated(true);
        showSuccess('Login successful');
        router.push(ROUTES.ADMIN.DASHBOARD);
        return true;
      } else {
        showError('Invalid password');
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      showError('An error occurred during login');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [router, showSuccess, showError]);

  /**
   * Logout the current user
   */
  const logout = useCallback(async () => {
    try {
      setIsLoading(true);
      await AuthAPI.logout();
      setIsAuthenticated(false);
      showSuccess('Logged out successfully');
      router.push(ROUTES.ADMIN.LOGIN);
    } catch (error) {
      console.error('Logout error:', error);
      showError('An error occurred during logout');
    } finally {
      setIsLoading(false);
    }
  }, [router, showSuccess, showError]);

  // Check authentication status on mount
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return {
    isAuthenticated,
    isLoading,
    login,
    logout,
    checkAuth,
  };
}
