import { configENV } from "./config";

const nextConfig = {
  // experimental: {
  //   appDir: true,
  // },
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
