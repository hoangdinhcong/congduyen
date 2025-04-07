/**
 * Utility function to handle image paths for different deployment environments
 * 
 * This automatically prepends the base path (/congduyen) for GitHub Pages
 * while keeping local development and Vercel deployment paths working correctly.
 */

const BASE_PATH = '/congduyen';

/**
 * Returns the correct path for an image, based on the deployment environment
 * @param path - The relative path to the image (e.g., '/next.svg' or 'next.svg')
 * @returns The corrected path for the current environment
 */
export function getImagePath(path: string): string {
  // Remove leading slash if present for consistency
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // Check deployment target from environment variable
  const deployTarget = process.env.DEPLOY_TARGET || 'development';
  
  // Only prepend the base path for GitHub Pages deployment
  if (deployTarget === 'github') {
    return `${BASE_PATH}/${cleanPath}`;
  }
  
  // For Vercel or local development, just use the root-relative path
  return `/${cleanPath}`;
}

export default getImagePath;

