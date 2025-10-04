import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.cnbcfm.com',
        port: '',
        pathname: '/api/v1/image/**',
      },
      {
        protocol: 'https',
        hostname: 'static2.finnhub.io',
        port: '',
        pathname: '/file/publicdatany/finnhubimage/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
