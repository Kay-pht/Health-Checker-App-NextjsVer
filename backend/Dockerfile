# ベースイメージとしてNode.jsを使用
FROM node:20.18.0 AS build

# ルートディレクトリに移動
WORKDIR /app
COPY package.json package-lock.json ./

# バックエンドのビルド
RUN npm install
COPY . .
RUN npm run build

# 本番環境用のイメージを作成
FROM node:20.18.0 AS production

# バックエンドのビルド成果物をコピー
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules

# .envファイルをコピー
COPY .env .env

# バックエンドのサーバーを起動
WORKDIR /app/dist
CMD ["node", "server.mjs"]