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
    ],
  },

  // Recommended security headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' }, // Changed from DENY to allow embedding in your own site
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          // Add Content-Security-Policy for better security
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; img-src 'self' data: https:; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; font-src 'self' data: https:;"
          },
        ],
      },
    ];
  },

  // Redirects for handling social media sharing links
  async redirects() {
    return [
      {
        // Ensure invite links are properly handled
        source: '/invite/:uniqueGuestId',
        destination: '/invite/:uniqueGuestId',
        permanent: true,
      },
    ];
  },

  // Only ignore ESLint errors in production builds
  eslint: {
    ignoreDuringBuilds: isProduction,
    // Don't run ESLint during development for faster refresh
    dirs: ['src'],
  },
};

// Netlify-specific configuration
if (isNetlify) {
  nextConfig = {
    ...nextConfig,
    // For static site generation on Netlify
    output: 'export',
    // Disable image optimization for static export
    images: {
      ...nextConfig.images,
      unoptimized: true,
    },
  };
}

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
