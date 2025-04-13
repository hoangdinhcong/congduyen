/**
 * Utility function to handle image paths for different deployment environments
 */

/**
 * Returns the correct path for an image
 * @param path - The relative path to the image (e.g., '/next.svg' or 'next.svg')
 * @returns The corrected path
 */
export function getImagePath(path: string): string {
  // Remove leading slash if present for consistency
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // Return root-relative path
  return `/${cleanPath}`;
}

export default getImagePath;

