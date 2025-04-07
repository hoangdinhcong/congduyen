/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure base path for GitHub Pages - needs to match repository name
  basePath: '/congduyen',
  
  // Set trailing slash to true for better compatibility with GitHub Pages
  trailingSlash: true,

  // Configure output for static export (used by GitHub Pages)
  output: 'export',

  // Optionally disable image optimization since GitHub Pages doesn't support it
  images: {
    unoptimized: true,
  },

  // Necessary when using GitHub Pages to handle asset references correctly
  assetPrefix: '/congduyen',
};

module.exports = nextConfig;

