import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",

  // Your product folder
  basePath: "/orbit-ai",
  assetPrefix: "/orbit-ai",

  trailingSlash: true,

  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },
};

export default nextConfig;