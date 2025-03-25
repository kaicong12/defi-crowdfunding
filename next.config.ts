import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: false,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: "*.bing.net",
      },
      {
        protocol: 'https',
        hostname: "*.placeholder.com",
      },
    ]
  },
};

export default nextConfig;
