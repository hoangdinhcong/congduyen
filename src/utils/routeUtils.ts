'use client';

import { usePathname } from 'next/navigation';

/**
 * Hook to determine which perspective (bride or groom) is currently being viewed
 * @returns Object with isBride and isGroom boolean values
 */
export function useRoutePerspective() {
  const pathname = usePathname();
  
  return {
    isBride: pathname?.includes('/bride'),
    isGroom: pathname?.includes('/groom'),
    isInvite: pathname?.includes('/invite'),
    isHome: pathname === '/',
  };
}
