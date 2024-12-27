import { configENV } from "./config";

const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: configENV.baseUrl + "/api/:path*",
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
