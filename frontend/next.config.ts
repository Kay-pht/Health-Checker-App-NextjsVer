import { configENV } from "./config";

// 修正箇所: 設定オブジェクトを変数に代入
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
