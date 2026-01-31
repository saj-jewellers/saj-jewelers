import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    minimumCacheTTL: 31536000, // aggressive caching for our static-like jewelry images
  },
};

export default nextConfig;
