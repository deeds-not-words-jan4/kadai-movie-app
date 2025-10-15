# Kadai App

Next.js で作成された TMDB API を使った映画アプリです。

## セットアップ

### 1. 依存関係をインストール

```bash
npm install
```

### 2. 環境変数を設定

プロジェクトルートに `.env.local` ファイルを作成し、以下を設定してください：

```
TMDB_BASE_URL=https://api.themoviedb.org/3
TMDB_API_KEY=your_api_key_here
```

APIキーは [TMDB Settings](https://www.themoviedb.org/settings/api) から取得できます。

## 開発サーバーの起動

```bash
npm run dev
```

開発サーバーは http://localhost:3000 で起動します。

## ページ

- `/` - ホームページ
- `/tmdb-test` - 人気映画一覧ページ

## ビルド

```bash
npm run build
npm start
```
