/** @type {import('next').NextConfig} */

// Determine deployment target from environment variable
const deployTarget = process.env.DEPLOY_TARGET || 'development';

// Create environment-specific configuration
let nextConfig = {
  // Default configuration for all environments
  trailingSlash: true,
  // Ignore ESLint errors during builds
  eslint: {
    // Warning: only use this in production, not during development
    ignoreDuringBuilds: true,
  },
};

// Vercel specific configuration
if (deployTarget === 'vercel') {
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
