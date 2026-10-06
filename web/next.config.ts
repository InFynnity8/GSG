import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      // Neon Object Storage (uploads from the admin panel)
      { protocol: "https", hostname: "**.aws.neon.tech" },
    ],
  },
};

export default nextConfig;
