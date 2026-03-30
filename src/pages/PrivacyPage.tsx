import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/Button'

export function PrivacyPage() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-2xl mx-auto">
        <Button variant="secondary" size="sm" onClick={() => navigate(-1)} className="mb-6">
          ← 戻る
        </Button>
        <h1 className="text-2xl font-bold mb-2">プライバシーポリシー</h1>
        <p className="text-sm text-gray-500 mb-8">最終更新日：2026年3月30日</p>

        <div className="bg-card border border-border rounded-card p-6 flex flex-col gap-8 text-sm text-gray-700 leading-relaxed">

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-3">第1条　取得するデータ</h2>
            <p>本サービスは以下のデータを取得します。</p>
            <div className="mt-3 space-y-3">
              <div>
                <p className="font-semibold">【管理者】</p>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li>メールアドレス</li>
                  <li>管理者名</li>
                  <li>テナント名（店舗・企業名）</li>
                  <li>ログイン日時</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold">【従業員】</p>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li>氏名</li>
                  <li>PIN（ハッシュ化して保存）</li>
                  <li>受講履歴・テスト結果・スコア</li>
                  <li>回答ログ（問題・選択肢・正誤）</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold">【自動収集】</p>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li>アクセスログ（IPアドレス、ブラウザ情報）※インフラ側での自動収集</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-3">第2条　利用目的</h2>
            <p>取得したデータは以下の目的のみに使用します。</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>本サービスの提供・運営</li>
              <li>アカウント認証・セキュリティ確保</li>
              <li>受講状況・テスト結果の管理・表示</li>
              <li>サービス改善のための統計分析（個人を特定しない形式）</li>
              <li>重要なお知らせ・サービス変更の通知</li>
            </ul>
            <p className="mt-3">マーケティング目的での使用はしません。</p>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-3">第3条　第三者への提供</h2>
            <p>以下の場合を除き、第三者にデータを提供しません。</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>ユーザーの事前同意がある場合</li>
              <li>法令に基づく開示要求がある場合</li>
            </ul>
            <div className="mt-3 p-3 bg-gray-50 rounded border border-border">
              <p className="font-semibold mb-1">利用している外部サービス（業務委託）</p>
              <ul className="space-y-1">
                <li><span className="font-medium">Supabase</span>（米国）：データベース・認証基盤</li>
                <li><span className="font-medium">Cloudflare</span>（米国）：ホスティング・CDN</li>
              </ul>
              <p className="mt-2 text-xs text-gray-500">これらのサービスはデータ処理の委託先であり、独自の目的でデータを利用することはありません。</p>
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-3">第4条　データの保存期間</h2>
            <div className="space-y-2">
              <div className="flex gap-3">
                <span className="font-medium min-w-[140px]">管理者アカウント</span>
                <span>退会後30日間保持後、削除</span>
              </div>
              <div className="flex gap-3">
                <span className="font-medium min-w-[140px]">従業員データ</span>
                <span>管理者によって削除されるまで保持</span>
              </div>
              <div className="flex gap-3">
                <span className="font-medium min-w-[140px]">受講・テスト履歴</span>
                <span>アカウント削除時に削除</span>
              </div>
              <div className="flex gap-3">
                <span className="font-medium min-w-[140px]">アクセスログ</span>
                <span>最大90日間（インフラ側の設定に準拠）</span>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-3">第5条　セキュリティ</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>全通信はHTTPS（TLS）で暗号化</li>
              <li>PINはハッシュ化して保存（平文での保存なし）</li>
              <li>データベースへのアクセスはRow Level Security（RLS）で制限</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-3">第6条　ユーザーの権利</h2>
            <p>ユーザーは自身のデータについて以下の権利を有します。</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>データの開示・訂正・削除の請求</li>
              <li>アカウントの削除（管理画面またはお問い合わせ）</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-3">第7条　ポリシーの変更</h2>
            <p>本ポリシーは必要に応じて変更することがあります。重要な変更はサービス上でお知らせします。</p>
          </section>

        </div>
      </div>
    </div>
  )
}
