export default {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://backend:5050/api/:path*", // プロキシ先のバックエンドサーバー
      },
    ];
  },
  // 他のNext.jsの設定をここに追加
};
