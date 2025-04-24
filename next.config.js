/** @type {import('next').NextConfig} */

/**
 * Next.js 15 configuration following latest best practices
 * @see https://nextjs.org/docs/app/api-reference/next-config-js
 */

// Determine deployment target from environment variable
const deployTarget = process.env.DEPLOY_TARGET || 'development';
const isNetlify = process.env.NETLIFY === 'true' || deployTarget === 'netlify';
const isVercel = process.env.VERCEL === '1' || deployTarget === 'vercel';
const isProduction = process.env.NODE_ENV === 'production';

// Base configuration for all environments
let nextConfig = {
  // Add trailing slash to URLs (helps with consistency across deployments)
  trailingSlash: true,

  // Recommended production settings
  poweredByHeader: false,  // Remove X-Powered-By header for security
  reactStrictMode: true,   // Enable React strict mode for better development

  // Optimize images across all environments
  images: {
    formats: ['image/avif', 'image/webp'],
    // Next.js 15 prefers remotePatterns over domains
    remotePatterns: [
      // Allow images from your own domains
      { protocol: 'https', hostname: 'congduyen.vercel.app' },
      { protocol: 'https', hostname: 'congduyen.netlify.app' },
      // Common image hosting services
      { protocol: 'https', hostname: '*.cloudinary.com' },
      { protocol: 'https', hostname: '*.unsplash.com' },
    ],
  },

  // Security headers externalized
  async headers() {
    const { securityHeaders } = require('./lib/security');
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },

  // Performance optimizations
  experimental: {
    // Server Actions configuration in Next.js 15
    serverActions: {
      allowedOrigins: ['localhost:3000, localhost:3001', 'congduyen.vercel.app', 'congduyen.netlify.app']
    },
    // Improved bundle optimization
    optimizePackageImports: ['@/components'],
  },

  // Only ignore ESLint errors in production builds
  eslint: {
    ignoreDuringBuilds: isProduction,
    // Don't run ESLint during development for faster refresh
    dirs: ['src'],
  },
};

// Vercel-specific configuration
if (isVercel) {
  nextConfig = {
    ...nextConfig,
    // Vercel handles image optimization well
    images: {
      ...nextConfig.images,
      // Additional Vercel-specific image settings if needed
    },
  };
}

module.exports = nextConfig;
