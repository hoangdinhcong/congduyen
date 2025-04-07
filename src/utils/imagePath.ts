/**
 * Utility function to handle image paths for both development and GitHub Pages production environments
 * 
 * This automatically prepends the base path (/congduyen) in production while keeping
 * local development paths working correctly.
 */

const BASE_PATH = '/congduyen';

/**
 * Returns the correct path for an image, adding the base path in production
 * @param path - The relative path to the image (e.g., '/next.svg' or 'next.svg')
 * @returns The corrected path for the current environment
 */
export function getImagePath(path: string): string {
  // Remove leading slash if present for consistency
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // In production (GitHub Pages), prepend the base path
  if (process.env.NODE_ENV === 'production') {
    return `${BASE_PATH}/${cleanPath}`;
  }
  
  // In development, just use the root-relative path
  return `/${cleanPath}`;
}

export default getImagePath;

