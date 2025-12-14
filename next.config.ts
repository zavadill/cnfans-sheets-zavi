import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    loader: 'cloudinary',
    path: 'https://res.cloudinary.com/dguddgiut/image/upload/',
  },
};

export default nextConfig;

