import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "exemplo.com",
      "picsum.photos",
      "uploadthing.com",
      "6qbx5sv3i2.ufs.sh",
      "utfs.io",
      "avatars.githubusercontent.com",
    ],
  },
};

export default nextConfig;
