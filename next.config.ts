import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "app.drdpharma.in",
        pathname: "/**",
      },
      // Add more domains as needed
    ],
  },
};

export default nextConfig;
