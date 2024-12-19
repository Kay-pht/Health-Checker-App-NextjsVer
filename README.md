# Health Checker by AI

AIを活用した食生活診断アプリケーション

---

## プロジェクト概要

このアプリは、食生活を手軽に見直し、健康をサポートするウェブアプリケーションです。主な特徴は以下の通りです。  
- 食材ごとの摂取頻度を入力するだけで、栄養素の不足を診断します。  
- 個々のユーザーに合わせた食品提案を提供し、健康改善を支援します。  
- 簡潔で使いやすいUIと高速な通信を採用し、快適なユーザー体験を目指します。  

### 主な目的
栄養学に詳しくないユーザーでも、自分の食生活について簡単にフィードバックを得られる仕組みを提供します。

---

## 使用技術

### バックエンド
- デプロイ先: AWS App Runner  
- 開発環境: Node.js, TypeScript  
- データベース: MongoDB  
- テスト: Jest  
- コンテナ化: Docker
- API: OpenAI API  

### フロントエンド
- デプロイ先: Vercel  
- 開発環境: TypeScript, Next.js (App Router)  
- 認証機能: Firebase Auth  
- スタイリング: TailwindCSS, Material UI 

### その他
- バージョン管理: GitHub  
- プロキシ: Cloudflare (カスタムドメイン対応)  

---

### 工夫した点
1. トークンとCookieの設計: Firebase AuthとHTTP-only Cookieを組み合わせた安全な認証。
2. デプロイ: VercelとAWS App Runnerを使用し、スケーラブルな環境を構築。
3. 動的データ取得: サーバーサイドレンダリング(SSR)を活用。  
4. Clowdflareを利用して、異なるドメイン間のCookieの受け渡しを可能に。
5. Jestを使用してユニットテストを実施。 

