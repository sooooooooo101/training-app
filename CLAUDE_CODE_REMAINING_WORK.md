# Claude Code 向け：残作業・仕上げ指示書

このドキュメントは、研修管理 SaaS（`training_app`）を **本番公開に耐える状態** にするための作業指示です。  
実装後は必ず `npm run lint` / `npx tsc -b --pretty false` / `npm run build` を通し、変更内容を日本語で要約してください。

---

## ゴール

- 既知のバグ・UX欠陥を解消する
- 採点 API（Edge Function）のセキュリティを本番水準に近づける
- README / ドキュメントの破損・不整合を直す
- デプロイ手順（`DEPLOY.md`）と実装の食い違いがあれば最小限で揃える

## 非ゴール（今回やらない）

- 大規模リファクタ・デザイン全面刷新
- 新機能の大量追加（必要最小限のガードのみ可）
- 課金・メール通知など未実装機能の新規実装

---

## 優先度 P0（必須）

### P0-1: フロント — 無限ローディング

**問題**  
`CourseView` / `QuizPage` で `id` または `tenantId` が欠けると `useEffect` 内で early return し、初期 `loading === true` のまま `setLoading(false)` が呼ばれない。

**対象ファイル**

- `src/pages/employee/CourseView.tsx`
- `src/pages/employee/QuizPage.tsx`

**受け入れ条件**

- `!id || !tenantId` のとき、無限に「読み込み中」にならない
- 可能なら `/employee` へ `replace` 遷移、またはトースト＋遷移（既存の `useT` を使用）
- 正常系の挙動は変えない

### P0-2: フロント — `QuizResult` の render 内 `navigate`

**問題**  
`result` が無いときレンダー中に `navigate` を実行しており、React の推奨と異なる。

**対象ファイル**

- `src/pages/employee/QuizResult.tsx`

**受け入れ条件**

- `useEffect` 等の副作用で遷移する、またはルートガードと整合した実装にする
- 直接 URL で `/employee/courses/:id/result` を開いた場合も破綻しない

### P0-3: Edge Function — 採点 API の検証強化

**問題（現状コード）**

- `Access-Control-Allow-Origin: *` で全オリジン許可
- PIN 認証後、`course_id` が **当該従業員のテナントに属するか** を検証していない可能性が高い（他テナントのコース UUID が推測・漏洩した場合のリスク）

**対象ファイル**

- `supabase/functions/submit-quiz/index.ts`

**受け入れ条件**

- 従業員の `tenant_id`（または同等）を取得し、`courses` の `tenant_id` と一致しない場合は **403/404** で拒否
- 可能なら `answers` 内の `question_id` / `choice_id` が **その `course_id` に属するか** を検証（不正な組み合わせを弾く）
- CORS: 本番では **許可オリジンを限定**する方針にする  
  - 環境変数 `ALLOWED_ORIGIN` または `ALLOWED_ORIGINS`（カンマ区切り）で制御  
  - 未設定時は開発用に限定的なフォールバックを `DEPLOY.md` に1行追記

**注意**  
Service Role を使うため、**必ずサーバー側で検証**すること。フロントの `tenantId` だけでは信用しない。

### P0-4: 環境変数 — `VITE_SUBMIT_QUIZ_URL` 未設定時

**問題**  
未設定だと `fetch(undefined)` になり採点が失敗する。

**対象**  
`src/pages/employee/QuizPage.tsx`（必要なら `src/lib/supabase.ts` 近辺にヘルパー）

**受け入れ条件**

- 未設定時はユーザー向けトースト（`useT`）で分かるメッセージを出し、提出をブロックするか、ビルド時警告は不要（実行時ガードで十分）

---

## 優先度 P1（強く推奨）

### P1-1: 認証ストア — 管理者ログイン時に従業員セッションを切る

**問題**  
`setAdmin` で `employee` をクリアしていない。同一ブラウザで役割が混在しうる。

**対象ファイル**

- `src/stores/authStore.ts`
- 呼び出し側に副作用がないか軽く確認（`LoginPage` の管理者ログイン/サインアップ）

**受け入れ条件**

- 管理者として `setAdmin` したとき `employee: null` にする（または同等の明示的クリア）
- 従業員ログイン時は既存どおり。管理者の `tenantId` と従業員用の整合は仕様に沿うこと

### P1-2: README の修復と事実整合

**問題**  
`README.md` 先頭に `HEAD` 行、末尾にコミットハッシュ行が混入。Markdown テーブル行が崩れている可能性。

**対象**

- `README.md`

**受け入れ条件**

- 混入行を削除し、読みやすい README にする
- **Tailwind のバージョン表記**を `package.json` と一致させる（現状依存は Tailwind 3 系）
- `.env.example` と README の環境変数一覧が一致していること

### P1-3: 従業員ログイン UX

**問題**  
検索結果 0 件のとき、フォームが出ず何も起きていないように見える（トースト依存）。

**対象**

- `src/pages/LoginPage.tsx`

**受け入れ条件**

- 0 件時に `useT` 経由の文言で一覧エリアに短い説明を出す、など **視覚的フィードバック** を1つ追加（過剰な UI 変更は不要）

---

## 優先度 P2（余力・仕様確認）

### P2-1: テナント ID 正規化の `.toLowerCase()`

**問題**  
DB が case-sensitive な UUID/文字列だと不一致の可能性。

**対象**

- `src/pages/LoginPage.tsx` の `normalizeTenantId`

**受け入れ条件**

- Supabase の `get_employees_by_tenant` / `tenant_id` の実体に合わせて、**必要なら lower をやめる**または DB 側で統一方針をコメントで README に1行

### P2-2: PIN の `sessionStorage`

**問題**  
セキュリティ上は弱い（共有端末・XSS）。

**受け入れ条件（最小）**  
README の「既知の制限」に1段落追記する **または** サーバー側セッションに移す（後者はスコープ大なので P2 で判断）

---

## 検証コマンド（必須）

リポジトリルート（`training_app/` 配下の Vite プロジェクト）で:

```bash
npm run lint
npx tsc -b --pretty false
npm run build
```

Edge Function を変更した場合は、`DEPLOY.md` に沿ってローカルまたはデプロイ後の動作確認手順を報告に書くこと。

---

## 最終報告フォーマット（Claude Code への出力依頼）

- 実施したタスク（P0/P1/P2 のどれか）
- 変更ファイル一覧
- 各変更の理由（1〜2文）
- 未実施・判断が必要な項目
- `lint` / `tsc` / `build` の結果

---

## 貼り付け用ショートプロンプト（Claude Code 最初の1メッセージ）

```
@CLAUDE_CODE_REMAINING_WORK.md を読み、P0 から順に実装してください。
最小変更・既存の useT / デザインに合わせること。
終わったら lint / tsc / build を実行し、日本語で最終報告してください。
```
