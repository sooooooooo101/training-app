# デプロイ手順 (Supabase + Vercel)

## 前提条件

- [Supabase](https://supabase.com) アカウント
- [Vercel](https://vercel.com) アカウント
- [Node.js](https://nodejs.org) 18 以上
- [Supabase CLI](https://supabase.com/docs/guides/cli) (`npm install -g supabase`)

---

## 1. Supabase セットアップ

### 1-1. プロジェクト作成

1. Supabase ダッシュボードで「New project」を作成
2. プロジェクトが起動したら **Settings > API** を開く
3. 以下の値をメモする
   - `Project URL`（→ `VITE_SUPABASE_URL`）
   - `anon public` キー（→ `VITE_SUPABASE_ANON_KEY`）

### 1-2. データベーススキーマ適用

SQL Editor で以下のテーブルを作成してください（スキーマは `supabase/migrations/` 以下を参照）。

主要テーブル:
- `tenants` — テナント（店舗）情報
- `admins` — 管理者アカウント
- `employees` — 従業員（PIN 認証）
- `courses` — 研修コース
- `sections` — コースのセクション
- `questions` — 確認テスト問題
- `choices` — 問題の選択肢
- `progress` — 受講進捗・スコア

### 1-3. Row Level Security (RLS)

各テーブルに `tenant_id` による RLS ポリシーを設定し、テナント間のデータ分離を確保してください。

### 1-4. Storage バケット作成

1. Supabase ダッシュボードの **Storage** で `training-images` バケットを作成
2. バケットポリシーで認証済みユーザーのみアップロードを許可

### 1-5. Edge Function デプロイ（採点処理）

```bash
supabase login
supabase link --project-ref <your-project-ref>
supabase functions deploy submit-quiz
```

デプロイ後の URL が `VITE_SUBMIT_QUIZ_URL` になります:
```
https://<your-project>.supabase.co/functions/v1/submit-quiz
```

---

## 2. Vercel デプロイ

### 2-1. リポジトリ接続

1. [Vercel ダッシュボード](https://vercel.com/dashboard) で「New Project」
2. GitHub / GitLab リポジトリをインポート
3. **Framework Preset** に `Vite` を選択

### 2-2. 環境変数設定

Vercel の **Settings > Environment Variables** に以下を追加:

| 変数名 | 値 |
|--------|----|
| `VITE_SUPABASE_URL` | Supabase Project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase anon key |
| `VITE_SUBMIT_QUIZ_URL` | Edge Function URL |
| `VITE_GEMINI_API_KEY` | Gemini API キー（任意） |

### 2-3. ビルド設定

| 項目 | 値 |
|------|----|
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Install Command | `npm install` |

### 2-4. デプロイ

「Deploy」ボタンを押すとビルドが始まります。
以降は main ブランチへのプッシュで自動デプロイされます。

---

## 3. 初期データ投入

1. Supabase ダッシュボードの **Authentication > Users** で管理者アカウントを作成
2. `admins` テーブルに対応するレコードを挿入
3. アプリにログインして従業員・コースを追加

---

## 4. カスタムドメイン設定（任意）

Vercel の **Settings > Domains** でカスタムドメインを追加できます。

Supabase の **Authentication > URL Configuration** で `Site URL` と `Redirect URLs` を更新してください:
```
Site URL: https://your-domain.com
Redirect URLs: https://your-domain.com/**
```

---

## 5. ビルド前チェック

```bash
# 型チェック
npx tsc -b --noEmit

# Lint
npm run lint

# プロダクションビルド確認
npm run build
```

---

## トラブルシューティング

| 症状 | 対処法 |
|------|--------|
| ログインできない | Supabase の RLS ポリシーと `admins` テーブルのレコードを確認 |
| 画像がアップロードできない | Storage バケットのポリシーを確認 |
| テスト採点が失敗する | `submit-quiz` Edge Function がデプロイされているか確認 |
| AI 生成ボタンが表示されない | `VITE_GEMINI_API_KEY` が設定されているか確認 |
