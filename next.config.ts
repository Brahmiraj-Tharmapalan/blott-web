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
      // Common news/image CDNs observed in publisher feeds
      {
        protocol: 'https',
        hostname: 'assets.bwbx.io', // Bloomberg
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.cnn.com', // CNN
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'media.cnn.com', // CNN media
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'static01.nyt.com', // NYTimes
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.insider.com', // Business Insider
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 's.yimg.com', // Yahoo images
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'media.zenfs.com', // Yahoo media
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
