import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.5"],
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 390, 412, 640, 768, 1024, 1280, 1440, 1920],
    imageSizes: [64, 96, 128, 256, 384],
  },
};

export default nextConfig;
