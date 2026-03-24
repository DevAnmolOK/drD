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
      {
        protocol: "https",
        hostname: "drdpharma.in",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.drdpharma.in",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
