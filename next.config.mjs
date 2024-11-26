/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export', // Enables static export
    images: {
        unoptimized: true, // Needed for static export if using the Image component
    },
    trailingSlash: false, // Ensures paths have trailing slashes (e.g., /about/ for GitHub Pages)
};

export default nextConfig;