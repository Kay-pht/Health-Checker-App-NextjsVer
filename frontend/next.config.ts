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
};

export default nextConfig;
