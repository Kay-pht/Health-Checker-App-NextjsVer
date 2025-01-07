FROM node:20.18.0 AS build

WORKDIR /app
COPY package.json package-lock.json ./

RUN npm install
COPY . .
RUN npm run build

FROM node:20.18.0 AS production

WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules

COPY .env .env

# バックエンドのサーバーを起動
WORKDIR /app/dist
CMD ["node", "server.mjs"]