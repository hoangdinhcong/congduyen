// lib/security.js
// Centralized security headers for Next.js and Vercel

const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  {
    key: 'Content-Security-Policy',
    value: "default-src 'self'; img-src 'self' data: https: *.cloudinary.com *.unsplash.com; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://maps.googleapis.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' data: https: https://fonts.gstatic.com; connect-src 'self' https://*.supabase.co; frame-src 'self' https://www.google.com https://maps.google.com;"
  }
];

module.exports = { securityHeaders };
