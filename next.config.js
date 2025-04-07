/** @type {import('next').NextConfig} */

// Determine deployment target from environment variable
const deployTarget = process.env.DEPLOY_TARGET || 'development';

// Create environment-specific configuration
let nextConfig = {
  // Default configuration for all environments
  trailingSlash: true,
};

// GitHub Pages specific configuration
if (deployTarget === 'github') {
  nextConfig = {
    ...nextConfig,
    // Configure base path for GitHub Pages - needs to match repository name
    basePath: '/congduyen',
    
    // Set trailing slash to true for better compatibility with GitHub Pages
    trailingSlash: true,
    
    // Configure output for static export (used by GitHub Pages)
    output: 'export',
    
    // Disable image optimization since GitHub Pages doesn't support it
    images: {
      unoptimized: true,
    },
    
    // Necessary when using GitHub Pages to handle asset references correctly
    assetPrefix: '/congduyen',
  };
} 
// Vercel specific configuration
else if (deployTarget === 'vercel') {
  nextConfig = {
    ...nextConfig,
    // Vercel supports image optimization
    images: {
      unoptimized: false,
    },
  };
} 
// Local development configuration (default)
else {
  nextConfig = {
    ...nextConfig,
    // For local development, use similar settings as Vercel
    images: {
      unoptimized: false,
    },
  };
}

module.exports = nextConfig;

