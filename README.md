# [AI 食生活診断アプリ](https://www.healthchecker.app/) - HealthChecker.app

AI があなたの食生活を分析し、最適な栄養素と食品を提案するアプリ「AI 食生活診断テスト」です。

## 👀 デモ

![デモ動画](https://github.com/Kay-pht/Health-Checker-App-NextjsVer/blob/main/frontend/public/images/README_pf_intro.gif)

## 📝 概要

ユーザーは、表示された 4 択の質問にいくつか回答するだけで、自身の食生活を診断できます。
AI が回答を分析し、不足している栄養素とそれを補うための最適な食品を提案します。

## ✨ 特徴

- **4 択の質問に答えるだけ**：各食品の摂取頻度を 4 択から選ぶだけのシンプルな UI。
- **AI による栄養診断**：栄養学の専門知識がなくても、AI が自動で分析・提案。
- **食生活スコア**: 食生活を点数化し、可視化。
- **ログイン機能**：ユーザー登録(任意)をすることで、過去の診断結果を一覧で確認可能（登録なしでも利用可能）。

## 💻 動作環境

- **ブラウザ**: Chrome, Firefox, Safari, Edge (各最新版を推奨)
- **OS**: Windows, macOS, Linux (各最新版を推奨)

## 🛠️ 使用技術・ライブラリ・フレームワーク

- **フロントエンド**

- **Next.js (v15, App Router)**: React フレームワーク
  - **TypeScript**: 静的型付け言語
  - **Tailwind CSS**: CSS フレームワーク
  - **Material UI**: UI コンポーネントライブラリ
  - **zod**: スキーマバリデーションライブラリ
  - **Vercel**: デプロイプラットフォーム
  - **Cloudflare**: プロキシ、CDN

- **バックエンド**

- **Node.js**: JavaScript ランタイム
  - **Express**: Web アプリケーションフレームワーク
  - **TypeScript**: 静的型付け言語
  - **zod**: スキーマバリデーションライブラリ
  - **Docker**: コンテナ化プラットフォーム
  - **AWS App Runner**: デプロイプラットフォーム
  - **ECR**: コンテナレジストリ

- **データベース**

- **MongoDB**: NoSQL データベース

- **認証**

- **Firebase Auth**: 認証サービス

- **バージョン管理**

- **Git**: バージョン管理システム
  - **GitHub**: ホスティングサービス

- **テスト**

- **Jest**: テストフレームワーク

- **CI/CD**

- **GitHub Actions**: CI/CD パイプライン
  - **Vercel (デフォルト)**: CD

- **外部 API**
    - **OpenAI**: API (Gemini への移行を検討中)

## 👨‍💻 使用方法・使い方

1.  [HealthChecker.app](https://www.healthchecker.app/) にアクセスします。
2.  4 択の質問に回答していきます(約 3 分)。
3.  回答が完了すると、AI が食生活を分析し、結果を表示します。
4.  ユーザー登録(任意)をすることで、過去の診断結果を保存できます。

## 👤 開発者情報

- X: [@wannabean_eng](https://twitter.com/wannabean_eng)

## 🚀 今後の予定・TODO

- DI コンテナの導入
- フロントエンドのテスト拡充 (React Testing Library など)
- セッションクッキーの導入による SSR の実現
- 他分野の AI 診断アプリへの応用
