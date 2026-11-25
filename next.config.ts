import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  // The site is one page now; keep the old page URLs working.
  async redirects() {
    return [
      { source: "/my-work", destination: "/#work", permanent: true },
      { source: "/services", destination: "/#services", permanent: true },
      { source: "/my-blogs", destination: "/#writing", permanent: true },
      { source: "/about-me", destination: "/#about", permanent: true },
    ];
  },
};

export default nextConfig;
