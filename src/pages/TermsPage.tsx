import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/Button'

export function TermsPage() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-2xl mx-auto">
        <Button variant="secondary" size="sm" onClick={() => navigate(-1)} className="mb-6">
          ← 戻る
        </Button>
        <h1 className="text-2xl font-bold mb-2">利用規約</h1>
        <p className="text-sm text-gray-500 mb-8">最終更新日：2026年3月30日</p>

        <div className="bg-card border border-border rounded-card p-6 flex flex-col gap-8 text-sm text-gray-700 leading-relaxed">

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-3">第1条　サービスの内容</h2>
            <p>本サービス「研修管理システム」（以下「本サービス」）は、企業・店舗が従業員向けの研修コースおよびテストを作成・管理し、従業員が受講・受験できるSaaS型のトレーニング管理プラットフォームです。</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>管理者によるコース・テスト作成および従業員管理</li>
              <li>従業員によるコース受講・テスト受験・結果確認</li>
              <li>受講履歴・合否状況の管理</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-3">第2条　禁止事項</h2>
            <p>ユーザーは以下の行為を行ってはなりません。</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>他のユーザーのアカウントへの不正アクセス</li>
              <li>本サービスの運営を妨害する行為</li>
              <li>法令または公序良俗に反するコンテンツの登録・送信</li>
              <li>第三者の知的財産権・プライバシーを侵害する行為</li>
              <li>本サービスのリバースエンジニアリング・改ざん</li>
              <li>商業目的での無断転用・再販</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-3">第3条　責任の範囲</h2>
            <div className="bg-yellow-50 border border-yellow-200 rounded p-4 mb-3">
              <p className="font-semibold text-yellow-800 mb-1">⚠ 重要事項</p>
              <p className="text-yellow-700">本サービスは現状有姿（as-is）で提供されます。以下の事項について、当サービス運営者は一切の責任を負いません。</p>
            </div>
            <ul className="list-disc pl-5 space-y-1">
              <li>サービスの中断・停止・データ損失による損害</li>
              <li>ユーザーが登録したコンテンツの正確性・適法性</li>
              <li>本サービスを通じた従業員の研修効果・資格取得</li>
              <li>第三者によるアカウントへの不正アクセスにより生じた損害（ユーザーの管理不備による場合）</li>
              <li>天災・インフラ障害など不可抗力によるサービス停止</li>
            </ul>
            <p className="mt-3">当サービス運営者が損害賠償責任を負う場合であっても、その上限はユーザーが直近3ヶ月間に支払った利用料金相当額とします（無料プランの場合は0円）。</p>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-3">第4条　アカウント管理</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>管理者アカウントの登録情報は正確に入力してください</li>
              <li>パスワード・PINの管理はユーザー自身の責任です</li>
              <li>アカウントの第三者への譲渡・共有は禁止します</li>
              <li>不正利用を発見した場合は速やかにパスワードを変更し、運営者に連絡してください</li>
              <li>1テナントにつき1管理者アカウントを原則とします</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-3">第5条　サービス停止の条件</h2>
            <p>以下に該当する場合、事前通知なくアカウントを停止・削除することがあります。</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>本規約に違反した場合</li>
              <li>長期間（180日以上）にわたりサービスを利用していない場合</li>
              <li>虚偽の情報を登録した場合</li>
              <li>本サービスの運営・他ユーザーへの妨害行為が認められた場合</li>
            </ul>
            <p className="mt-3">また、運営者はサービスを30日前の予告をもって終了することができます。</p>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-3">第6条　規約の変更</h2>
            <p>本規約は必要に応じて変更することがあります。重要な変更がある場合はサービス上でお知らせします。変更後もサービスを継続して利用した場合、変更後の規約に同意したものとみなします。</p>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-3">第7条　準拠法・管轄</h2>
            <p>本規約は日本法に準拠し、紛争が生じた場合は日本の裁判所を管轄裁判所とします。</p>
          </section>

        </div>
      </div>
    </div>
  )
}
