import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  assetPrefix: "/",
  images: { unoptimized: true },
  async rewrites() {
    const apiTarget = (process.env.API_PROXY_TARGET ?? "http://localhost:8080").replace(/\/$/, "");

    return [
      {
        source: "/api/:path*",
        destination: `${apiTarget}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
