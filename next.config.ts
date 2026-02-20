import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "app.drdpharma.in",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "drdpharma.whdev.in", 
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;