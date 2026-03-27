HEAD
HEAD
# training-app

# 研修管理システム

飲食店・サービス業向けのマルチテナント型 SaaS 研修管理アプリです。
管理者がコース・問題を作成し、従業員がスマホで受講・テストを受けられます。

## 主な機能

- **管理者**
  - コース（セクション・画像・動画・問題）の作成・編集・削除
  - 従業員の追加・削除
  - 受講進捗・スコアの確認
  - AI（Gemini）による確認テスト自動生成

- **従業員**
  - テナントID + PIN でログイン（パスワード不要）
  - コース受講（テキスト・画像・YouTube 動画対応）
  - 確認テスト受験・合否判定

- **多言語対応**（11言語）
  - 日本語 / English / 中文 / Tiếng Việt / Filipino / Português / 한국어 / Bahasa Indonesia / ภาษาไทย / नेपाली / မြန်မာဘာသာ

## 技術スタック

| 分類 | 採用技術 |

| フロントエンド | React 19 + TypeScript + Vite |
| スタイル | TailwindCSS v4 |
| 状態管理 | Zustand（localStorage/sessionStorage 永続化） |
| バックエンド | Supabase（PostgreSQL + Auth + Storage + Edge Functions） |
| AI | Google Gemini API（問題自動生成） |
| デプロイ | Vercel（推奨） |

## セットアップ

```bash
# 依存関係インストール
npm install

# 環境変数設定
cp .env.example .env.local
# .env.local を編集して各値を入力

# 開発サーバー起動
npm run dev
```

## 環境変数

| 変数名 | 説明 |

| `VITE_SUPABASE_URL` | Supabase プロジェクト URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase 匿名キー |
| `VITE_SUBMIT_QUIZ_URL` | Edge Function URL（採点処理） |
| `VITE_GEMINI_API_KEY` | Google Gemini API キー（任意・未設定で AI 生成ボタン非表示） |

## スクリプト

```bash
npm run dev      # 開発サーバー起動
npm run build    # プロダクションビルド
npm run lint     # ESLint 実行
npm run preview  # ビルド結果プレビュー
```

## デプロイ

[DEPLOY.md](./DEPLOY.md) を参照してください。
3ff7ec6 (Initial release: multi-tenant training management SaaS)
65fdbcf (Initial release: multi-tenant training management SaaS)
