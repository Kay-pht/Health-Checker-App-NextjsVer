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
    domains: ["lh3.googleusercontent.com"], // 画像を許可するドメインを追加
  },
};

export default nextConfig;
