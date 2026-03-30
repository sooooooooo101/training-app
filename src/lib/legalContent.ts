import type { LangCode } from './i18n'

export type LegalSection = {
  title: string
  paragraphs?: string[]
  items?: string[]
  warning?: string
  subsections?: { title: string; items: string[] }[]
  table?: { label: string; value: string }[]
  note?: string
}

export type LegalDoc = {
  title: string
  updatedAt: string
  sections: LegalSection[]
}

export type LegalContent = {
  terms: LegalDoc
  privacy: LegalDoc
  back: string
  downloadPdf: string
  downloadPdfError: string
  termsLink: string
  privacyLink: string
  reportLink: string
}

/** デフォルトの通報・問い合わせフォーム（`VITE_REPORT_FORM_URL` 未設定時） */
const DEFAULT_REPORT_FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSeEgkJL8Q7CrxaGkYWAy6YKo659ozKcmBYX-Qvl0TIzbeOUEA/viewform?usp=dialog'

export function getReportFormUrl(): string {
  const v = import.meta.env.VITE_REPORT_FORM_URL
  if (typeof v === 'string' && v.trim() !== '') return v.trim()
  return DEFAULT_REPORT_FORM_URL
}

const content: Record<LangCode, LegalContent> = {
  ja: {
    back: '← 戻る',
    downloadPdf: 'PDFをダウンロード',
    downloadPdfError: 'PDFの作成に失敗しました',
    termsLink: '利用規約',
    privacyLink: 'プライバシーポリシー',
    reportLink: '通報・お問い合わせ',
    terms: {
      title: '利用規約',
      updatedAt: '最終更新日：2026年3月30日',
      sections: [
        {
          title: '第1条　サービスの内容',
          paragraphs: ['本サービス「研修管理システム」は、企業・店舗が従業員向けの研修コースおよびテストを作成・管理し、従業員が受講・受験できるSaaS型のトレーニング管理プラットフォームです。'],
          items: ['管理者によるコース・テスト作成および従業員管理', '従業員によるコース受講・テスト受験・結果確認', '受講履歴・合否状況の管理'],
        },
        {
          title: '第2条　禁止事項',
          paragraphs: ['ユーザーは以下の行為を行ってはなりません。'],
          items: ['他のユーザーのアカウントへの不正アクセス', '本サービスの運営を妨害する行為', '法令または公序良俗に反するコンテンツの登録・送信', '第三者の知的財産権・プライバシーを侵害する行為', '本サービスのリバースエンジニアリング・改ざん', '商業目的での無断転用・再販'],
        },
        {
          title: '第3条　責任の範囲',
          warning: '本サービスは現状有姿（as-is）で提供されます。以下の事項について、当サービス運営者は一切の責任を負いません。',
          items: ['サービスの中断・停止・データ損失による損害', 'ユーザーが登録したコンテンツの正確性・適法性', '本サービスを通じた従業員の研修効果・資格取得', '第三者によるアカウントへの不正アクセスにより生じた損害（ユーザーの管理不備による場合）', '天災・インフラ障害など不可抗力によるサービス停止'],
          paragraphs: ['当サービス運営者が損害賠償責任を負う場合であっても、その上限はユーザーが直近3ヶ月間に支払った利用料金相当額とします（無料プランの場合は0円）。'],
        },
        {
          title: '第4条　アカウント管理',
          items: ['管理者アカウントの登録情報は正確に入力してください', 'パスワード・PINの管理はユーザー自身の責任です', 'アカウントの第三者への譲渡・共有は禁止します', '不正利用を発見した場合は速やかにパスワードを変更し、運営者に連絡してください', '1テナントにつき1管理者アカウントを原則とします'],
        },
        {
          title: '第5条　サービス停止の条件',
          paragraphs: ['以下に該当する場合、事前通知なくアカウントを停止・削除することがあります。'],
          items: ['本規約に違反した場合', '長期間（180日以上）にわたりサービスを利用していない場合', '虚偽の情報を登録した場合', '本サービスの運営・他ユーザーへの妨害行為が認められた場合'],
          note: 'また、運営者はサービスを30日前の予告をもって終了することができます。',
        },
        {
          title: '第6条　規約の変更',
          paragraphs: ['本規約は必要に応じて変更することがあります。重要な変更がある場合はサービス上でお知らせします。変更後もサービスを継続して利用した場合、変更後の規約に同意したものとみなします。'],
        },
        {
          title: '第7条　準拠法・管轄',
          paragraphs: ['本規約は日本法に準拠し、紛争が生じた場合は日本の裁判所を管轄裁判所とします。'],
        },
      ],
    },
    privacy: {
      title: 'プライバシーポリシー',
      updatedAt: '最終更新日：2026年3月30日',
      sections: [
        {
          title: '第1条　取得するデータ',
          subsections: [
            { title: '管理者', items: ['メールアドレス', '管理者名', 'テナント名（店舗・企業名）', 'ログイン日時'] },
            { title: '従業員', items: ['氏名', 'PIN（ハッシュ化して保存）', '受講履歴・テスト結果・スコア', '回答ログ（問題・選択肢・正誤）'] },
            { title: '自動収集', items: ['アクセスログ（IPアドレス、ブラウザ情報）※インフラ側での自動収集'] },
          ],
        },
        {
          title: '第2条　利用目的',
          paragraphs: ['取得したデータは以下の目的のみに使用します。'],
          items: ['本サービスの提供・運営', 'アカウント認証・セキュリティ確保', '受講状況・テスト結果の管理・表示', 'サービス改善のための統計分析（個人を特定しない形式）', '重要なお知らせ・サービス変更の通知'],
          note: 'マーケティング目的での使用はしません。',
        },
        {
          title: '第3条　第三者への提供',
          paragraphs: ['以下の場合を除き、第三者にデータを提供しません。'],
          items: ['ユーザーの事前同意がある場合', '法令に基づく開示要求がある場合'],
          subsections: [
            { title: '利用している外部サービス（業務委託）', items: ['Supabase（米国）：データベース・認証基盤', 'Cloudflare（米国）：ホスティング・CDN'] },
          ],
          note: 'これらのサービスはデータ処理の委託先であり、独自の目的でデータを利用することはありません。',
        },
        {
          title: '第4条　データの保存期間',
          table: [
            { label: '管理者アカウント', value: '退会後30日間保持後、削除' },
            { label: '従業員データ', value: '管理者によって削除されるまで保持' },
            { label: '受講・テスト履歴', value: 'アカウント削除時に削除' },
            { label: 'アクセスログ', value: '最大90日間（インフラ側の設定に準拠）' },
          ],
        },
        {
          title: '第5条　セキュリティ',
          items: ['全通信はHTTPS（TLS）で暗号化', 'PINはハッシュ化して保存（平文での保存なし）', 'データベースへのアクセスはRow Level Security（RLS）で制限'],
        },
        {
          title: '第6条　ユーザーの権利',
          paragraphs: ['ユーザーは自身のデータについて以下の権利を有します。'],
          items: ['データの開示・訂正・削除の請求', 'アカウントの削除（管理画面またはお問い合わせ）'],
        },
        {
          title: '第7条　ポリシーの変更',
          paragraphs: ['本ポリシーは必要に応じて変更することがあります。重要な変更はサービス上でお知らせします。'],
        },
      ],
    },
  },

  en: {
    back: '← Back',
    downloadPdf: 'Download PDF',
    downloadPdfError: 'Could not create PDF',
    termsLink: 'Terms of Service',
    privacyLink: 'Privacy Policy',
    reportLink: 'Report / Contact',
    terms: {
      title: 'Terms of Service',
      updatedAt: 'Last updated: March 30, 2026',
      sections: [
        {
          title: 'Article 1 – Service Description',
          paragraphs: ['The "Training Management System" (the "Service") is a SaaS training management platform that allows businesses and stores to create and manage training courses and tests for employees, and for employees to take those courses and tests.'],
          items: ['Course and test creation and employee management by administrators', 'Course enrollment, test-taking, and result viewing by employees', 'Management of training history and pass/fail status'],
        },
        {
          title: 'Article 2 – Prohibited Activities',
          paragraphs: ['Users must not engage in the following activities:'],
          items: ['Unauthorized access to other users\' accounts', 'Any action that disrupts the operation of the Service', 'Uploading or transmitting content that violates laws or public morality', 'Infringement of third-party intellectual property rights or privacy', 'Reverse engineering or tampering with the Service', 'Unauthorized commercial use or resale'],
        },
        {
          title: 'Article 3 – Limitation of Liability',
          warning: 'The Service is provided "as-is." The operator shall not be liable for any of the following:',
          items: ['Damages caused by service interruption, suspension, or data loss', 'Accuracy or legality of content registered by users', 'Training effectiveness or certifications obtained through the Service', 'Damages caused by unauthorized access to accounts due to user negligence', 'Service suspension due to force majeure such as natural disasters or infrastructure failures'],
          paragraphs: ['Even if the operator is found liable for damages, the maximum liability shall not exceed the amount the user paid in the preceding 3 months (zero for free plan users).'],
        },
        {
          title: 'Article 4 – Account Management',
          items: ['Provide accurate information when registering an administrator account', 'Users are responsible for managing their own passwords and PINs', 'Transferring or sharing accounts with third parties is prohibited', 'If unauthorized use is discovered, change your password immediately and contact the operator', 'One administrator account per tenant is the general rule'],
        },
        {
          title: 'Article 5 – Service Termination',
          paragraphs: ['Accounts may be suspended or deleted without prior notice in the following cases:'],
          items: ['Violation of these Terms', 'No use of the Service for an extended period (180 days or more)', 'Registration of false information', 'Acts that disrupt Service operations or harm other users'],
          note: 'The operator may also terminate the Service with 30 days\' prior notice.',
        },
        {
          title: 'Article 6 – Changes to Terms',
          paragraphs: ['These Terms may be revised as needed. Users will be notified of important changes through the Service. Continued use of the Service after changes constitutes acceptance of the revised Terms.'],
        },
        {
          title: 'Article 7 – Governing Law and Jurisdiction',
          paragraphs: ['These Terms are governed by the laws of Japan. Any disputes shall be subject to the exclusive jurisdiction of the courts of Japan.'],
        },
      ],
    },
    privacy: {
      title: 'Privacy Policy',
      updatedAt: 'Last updated: March 30, 2026',
      sections: [
        {
          title: 'Article 1 – Data We Collect',
          subsections: [
            { title: 'Administrators', items: ['Email address', 'Administrator name', 'Tenant name (business/store name)', 'Login timestamp'] },
            { title: 'Employees', items: ['Full name', 'PIN (stored as a hash)', 'Training history, test results, and scores', 'Answer logs (questions, choices, correct/incorrect)'] },
            { title: 'Automatically Collected', items: ['Access logs (IP address, browser information) – collected automatically by infrastructure'] },
          ],
        },
        {
          title: 'Article 2 – How We Use Your Data',
          paragraphs: ['Collected data is used only for the following purposes:'],
          items: ['Providing and operating the Service', 'Account authentication and security', 'Managing and displaying training progress and test results', 'Statistical analysis for service improvement (in non-personally identifiable form)', 'Notifications of important announcements and service changes'],
          note: 'Data will not be used for marketing purposes.',
        },
        {
          title: 'Article 3 – Third-Party Sharing',
          paragraphs: ['We do not share data with third parties except in the following cases:'],
          items: ['With prior consent of the user', 'When required by law'],
          subsections: [
            { title: 'External Services Used (Data Processors)', items: ['Supabase (USA): Database and authentication', 'Cloudflare (USA): Hosting and CDN'] },
          ],
          note: 'These services are data processors and do not use your data for their own purposes.',
        },
        {
          title: 'Article 4 – Data Retention',
          table: [
            { label: 'Administrator accounts', value: 'Retained for 30 days after account deletion, then deleted' },
            { label: 'Employee data', value: 'Retained until deleted by the administrator' },
            { label: 'Training and test history', value: 'Deleted upon account deletion' },
            { label: 'Access logs', value: 'Up to 90 days (per infrastructure settings)' },
          ],
        },
        {
          title: 'Article 5 – Security',
          items: ['All communications are encrypted via HTTPS (TLS)', 'PINs are stored as hashes (never stored in plain text)', 'Database access is restricted by Row Level Security (RLS)'],
        },
        {
          title: 'Article 6 – Your Rights',
          paragraphs: ['Users have the following rights regarding their data:'],
          items: ['Request disclosure, correction, or deletion of data', 'Delete your account (via the admin panel or by contacting us)'],
        },
        {
          title: 'Article 7 – Changes to This Policy',
          paragraphs: ['This Policy may be revised as needed. Important changes will be announced through the Service.'],
        },
      ],
    },
  },

  vi: {
    back: '← Quay lại',
    downloadPdf: 'Tải xuống PDF',
    downloadPdfError: 'Không thể tạo PDF',
    termsLink: 'Điều khoản dịch vụ',
    privacyLink: 'Chính sách bảo mật',
    reportLink: 'Báo cáo / Liên hệ',
    terms: {
      title: 'Điều khoản dịch vụ',
      updatedAt: 'Cập nhật lần cuối: 30 tháng 3 năm 2026',
      sections: [
        {
          title: 'Điều 1 – Mô tả dịch vụ',
          paragraphs: ['"Hệ thống quản lý đào tạo" (sau đây gọi là "Dịch vụ") là nền tảng quản lý đào tạo SaaS cho phép doanh nghiệp tạo và quản lý các khóa học, bài kiểm tra dành cho nhân viên.'],
          items: ['Quản trị viên tạo khóa học, bài kiểm tra và quản lý nhân viên', 'Nhân viên đăng ký khóa học, làm bài kiểm tra và xem kết quả', 'Quản lý lịch sử học tập và kết quả đạt/không đạt'],
        },
        {
          title: 'Điều 2 – Các hành vi bị cấm',
          paragraphs: ['Người dùng không được thực hiện các hành vi sau:'],
          items: ['Truy cập trái phép vào tài khoản của người dùng khác', 'Cản trở hoạt động của Dịch vụ', 'Đăng tải nội dung vi phạm pháp luật hoặc đạo đức xã hội', 'Xâm phạm quyền sở hữu trí tuệ hoặc quyền riêng tư của bên thứ ba', 'Dịch ngược hoặc giả mạo Dịch vụ', 'Sử dụng lại hoặc bán lại cho mục đích thương mại mà không được phép'],
        },
        {
          title: 'Điều 3 – Giới hạn trách nhiệm',
          warning: 'Dịch vụ được cung cấp "nguyên trạng". Nhà vận hành không chịu trách nhiệm về bất kỳ điều nào sau đây:',
          items: ['Thiệt hại do gián đoạn, tạm dừng dịch vụ hoặc mất dữ liệu', 'Tính chính xác hoặc hợp pháp của nội dung người dùng đăng ký', 'Hiệu quả đào tạo của nhân viên thông qua Dịch vụ', 'Thiệt hại do truy cập trái phép vào tài khoản do lỗi quản lý của người dùng', 'Tạm ngừng dịch vụ do bất khả kháng như thiên tai hoặc sự cố cơ sở hạ tầng'],
          paragraphs: ['Ngay cả khi nhà vận hành chịu trách nhiệm bồi thường thiệt hại, mức tối đa bằng số tiền người dùng đã thanh toán trong 3 tháng gần nhất (bằng 0 đối với gói miễn phí).'],
        },
        {
          title: 'Điều 4 – Quản lý tài khoản',
          items: ['Cung cấp thông tin chính xác khi đăng ký tài khoản quản trị viên', 'Người dùng chịu trách nhiệm quản lý mật khẩu và PIN của mình', 'Nghiêm cấm chuyển nhượng hoặc chia sẻ tài khoản với bên thứ ba', 'Nếu phát hiện sử dụng trái phép, hãy đổi mật khẩu ngay và liên hệ nhà vận hành', 'Mỗi tenant chỉ có một tài khoản quản trị viên'],
        },
        {
          title: 'Điều 5 – Điều kiện tạm ngừng dịch vụ',
          paragraphs: ['Tài khoản có thể bị tạm ngừng hoặc xóa mà không cần thông báo trước trong các trường hợp sau:'],
          items: ['Vi phạm Điều khoản này', 'Không sử dụng Dịch vụ trong thời gian dài (180 ngày trở lên)', 'Đăng ký thông tin sai lệch', 'Hành vi cản trở hoạt động Dịch vụ hoặc gây hại cho người dùng khác'],
          note: 'Nhà vận hành cũng có thể chấm dứt Dịch vụ với thông báo trước 30 ngày.',
        },
        { title: 'Điều 6 – Thay đổi điều khoản', paragraphs: ['Điều khoản này có thể được sửa đổi khi cần. Những thay đổi quan trọng sẽ được thông báo qua Dịch vụ. Tiếp tục sử dụng Dịch vụ sau khi thay đổi đồng nghĩa với việc chấp nhận Điều khoản mới.'] },
        { title: 'Điều 7 – Luật điều chỉnh và quyền tài phán', paragraphs: ['Điều khoản này được điều chỉnh bởi pháp luật Nhật Bản. Mọi tranh chấp thuộc thẩm quyền của tòa án Nhật Bản.'] },
      ],
    },
    privacy: {
      title: 'Chính sách bảo mật',
      updatedAt: 'Cập nhật lần cuối: 30 tháng 3 năm 2026',
      sections: [
        {
          title: 'Điều 1 – Dữ liệu chúng tôi thu thập',
          subsections: [
            { title: 'Quản trị viên', items: ['Địa chỉ email', 'Tên quản trị viên', 'Tên tenant (tên doanh nghiệp/cửa hàng)', 'Thời gian đăng nhập'] },
            { title: 'Nhân viên', items: ['Họ và tên', 'PIN (lưu trữ dưới dạng hash)', 'Lịch sử học tập, kết quả kiểm tra và điểm số', 'Nhật ký câu trả lời (câu hỏi, lựa chọn, đúng/sai)'] },
            { title: 'Thu thập tự động', items: ['Nhật ký truy cập (địa chỉ IP, thông tin trình duyệt) – thu thập tự động bởi cơ sở hạ tầng'] },
          ],
        },
        { title: 'Điều 2 – Mục đích sử dụng', paragraphs: ['Dữ liệu thu thập chỉ được sử dụng cho các mục đích sau:'], items: ['Cung cấp và vận hành Dịch vụ', 'Xác thực tài khoản và bảo mật', 'Quản lý và hiển thị tiến độ học tập và kết quả kiểm tra', 'Phân tích thống kê để cải thiện dịch vụ (ở dạng không nhận dạng cá nhân)', 'Thông báo về các thay đổi quan trọng của dịch vụ'], note: 'Dữ liệu sẽ không được sử dụng cho mục đích tiếp thị.' },
        { title: 'Điều 3 – Chia sẻ với bên thứ ba', paragraphs: ['Chúng tôi không chia sẻ dữ liệu với bên thứ ba ngoại trừ:'], items: ['Khi có sự đồng ý trước của người dùng', 'Khi pháp luật yêu cầu'], subsections: [{ title: 'Dịch vụ bên ngoài được sử dụng', items: ['Supabase (Mỹ): Cơ sở dữ liệu và xác thực', 'Cloudflare (Mỹ): Lưu trữ và CDN'] }], note: 'Các dịch vụ này là đơn vị xử lý dữ liệu và không sử dụng dữ liệu của bạn cho mục đích riêng của họ.' },
        { title: 'Điều 4 – Thời gian lưu trữ dữ liệu', table: [{ label: 'Tài khoản quản trị viên', value: 'Lưu 30 ngày sau khi xóa tài khoản, sau đó xóa' }, { label: 'Dữ liệu nhân viên', value: 'Lưu cho đến khi quản trị viên xóa' }, { label: 'Lịch sử học tập và kiểm tra', value: 'Xóa khi tài khoản bị xóa' }, { label: 'Nhật ký truy cập', value: 'Tối đa 90 ngày (theo cài đặt cơ sở hạ tầng)' }] },
        { title: 'Điều 5 – Bảo mật', items: ['Tất cả thông tin liên lạc được mã hóa qua HTTPS (TLS)', 'PIN được lưu trữ dưới dạng hash (không lưu văn bản thuần)', 'Quyền truy cập cơ sở dữ liệu bị giới hạn bởi Row Level Security (RLS)'] },
        { title: 'Điều 6 – Quyền của người dùng', paragraphs: ['Người dùng có các quyền sau đối với dữ liệu của mình:'], items: ['Yêu cầu tiết lộ, chỉnh sửa hoặc xóa dữ liệu', 'Xóa tài khoản (qua bảng quản trị hoặc liên hệ với chúng tôi)'] },
        { title: 'Điều 7 – Thay đổi chính sách', paragraphs: ['Chính sách này có thể được sửa đổi khi cần. Những thay đổi quan trọng sẽ được thông báo qua Dịch vụ.'] },
      ],
    },
  },

  zh: {
    back: '← 返回',
    downloadPdf: '下载PDF',
    downloadPdfError: '无法生成PDF',
    termsLink: '服务条款',
    privacyLink: '隐私政策',
    reportLink: '举报 / 联系我们',
    terms: {
      title: '服务条款',
      updatedAt: '最后更新：2026年3月30日',
      sections: [
        { title: '第1条　服务内容', paragraphs: ['"培训管理系统"（以下简称"本服务"）是一个SaaS培训管理平台，允许企业和店铺为员工创建和管理培训课程及测试。'], items: ['管理员创建课程、测试并管理员工', '员工参加课程、进行测试并查看结果', '管理培训历史和合格/不合格状态'] },
        { title: '第2条　禁止行为', paragraphs: ['用户不得从事以下行为：'], items: ['未经授权访问其他用户的账户', '妨碍本服务运营的行为', '上传或发送违反法律或公共道德的内容', '侵犯第三方知识产权或隐私', '对本服务进行逆向工程或篡改', '未经授权用于商业目的或转售'] },
        { title: '第3条　责任范围', warning: '本服务按"现状"提供。运营者对以下事项不承担任何责任：', items: ['因服务中断、暂停或数据丢失造成的损害', '用户注册内容的准确性或合法性', '通过本服务取得的员工培训效果或资格', '因用户管理疏失导致账户被第三方未经授权访问所造成的损害', '因自然灾害或基础设施故障等不可抗力导致的服务暂停'], paragraphs: ['即使运营者承担赔偿责任，最高赔偿额不超过用户在过去3个月内支付的费用（免费计划为0元）。'] },
        { title: '第4条　账户管理', items: ['注册管理员账户时请提供准确信息', '用户自行负责管理密码和PIN', '禁止将账户转让或共享给第三方', '发现未经授权使用时，请立即更改密码并联系运营者', '每个租户原则上只有一个管理员账户'] },
        { title: '第5条　服务停止条件', paragraphs: ['在以下情况下，可能在不提前通知的情况下暂停或删除账户：'], items: ['违反本条款', '长期（180天以上）未使用本服务', '注册虚假信息', '存在妨碍服务运营或损害其他用户的行为'], note: '运营者也可在提前30天通知的情况下终止本服务。' },
        { title: '第6条　条款变更', paragraphs: ['本条款可能根据需要进行修订。重要变更将通过本服务通知用户。变更后继续使用本服务即视为接受修订后的条款。'] },
        { title: '第7条　准据法和管辖', paragraphs: ['本条款受日本法律管辖。任何纠纷均由日本法院管辖。'] },
      ],
    },
    privacy: {
      title: '隐私政策',
      updatedAt: '最后更新：2026年3月30日',
      sections: [
        { title: '第1条　收集的数据', subsections: [{ title: '管理员', items: ['电子邮件地址', '管理员姓名', '租户名称（企业/店铺名称）', '登录时间'] }, { title: '员工', items: ['姓名', 'PIN（以哈希形式存储）', '培训历史、测试结果和分数', '答题日志（问题、选项、正确/错误）'] }, { title: '自动收集', items: ['访问日志（IP地址、浏览器信息）——由基础设施自动收集'] }] },
        { title: '第2条　使用目的', paragraphs: ['收集的数据仅用于以下目的：'], items: ['提供和运营本服务', '账户认证和安全保障', '管理和显示培训进度及测试结果', '以非个人可识别形式进行统计分析以改进服务', '通知重要公告和服务变更'], note: '数据不会用于营销目的。' },
        { title: '第3条　第三方共享', paragraphs: ['除以下情况外，我们不向第三方共享数据：'], items: ['用户事先同意', '法律要求披露'], subsections: [{ title: '使用的外部服务（数据处理商）', items: ['Supabase（美国）：数据库和认证', 'Cloudflare（美国）：托管和CDN'] }], note: '这些服务是数据处理商，不会将您的数据用于其自身目的。' },
        { title: '第4条　数据保留期限', table: [{ label: '管理员账户', value: '账户删除后保留30天，然后删除' }, { label: '员工数据', value: '保留至管理员删除为止' }, { label: '培训和测试历史', value: '账户删除时删除' }, { label: '访问日志', value: '最多90天（依据基础设施设置）' }] },
        { title: '第5条　安全', items: ['所有通信通过HTTPS（TLS）加密', 'PIN以哈希形式存储（不以明文存储）', '数据库访问受行级安全（RLS）限制'] },
        { title: '第6条　用户权利', paragraphs: ['用户对自己的数据拥有以下权利：'], items: ['请求披露、更正或删除数据', '删除账户（通过管理面板或联系我们）'] },
        { title: '第7条　政策变更', paragraphs: ['本政策可能根据需要进行修订。重要变更将通过本服务通知。'] },
      ],
    },
  },

  tl: {
    back: '← Bumalik',
    downloadPdf: 'I-download ang PDF',
    downloadPdfError: 'Hindi makagawa ng PDF',
    termsLink: 'Mga Tuntunin ng Serbisyo',
    privacyLink: 'Patakaran sa Privacy',
    reportLink: 'Mag-ulat / Makipag-ugnayan',
    terms: {
      title: 'Mga Tuntunin ng Serbisyo',
      updatedAt: 'Huling na-update: Marso 30, 2026',
      sections: [
        { title: 'Artikulo 1 – Paglalarawan ng Serbisyo', paragraphs: ['Ang "Training Management System" ay isang SaaS na platform para sa mga negosyo na lumikha at pamahalaan ang mga kurso at pagsusulit para sa mga empleyado.'], items: ['Paglikha ng kurso, pagsusulit, at pamamahala ng empleyado ng mga admin', 'Pagsali sa kurso, pagsagot sa pagsusulit, at pagtingin sa resulta ng mga empleyado', 'Pamamahala ng kasaysayan ng pagsasanay at katayuan ng pumasa/bumagsak'] },
        { title: 'Artikulo 2 – Mga Ipinagbabawal', paragraphs: ['Hindi dapat gawin ng mga gumagamit ang mga sumusunod:'], items: ['Hindi awtorisadong pag-access sa account ng ibang gumagamit', 'Anumang aksyong nakakagambala sa operasyon ng Serbisyo', 'Pag-upload ng nilalaman na lumalabag sa batas o moralidad', 'Paglabag sa karapatang intelektwal o privacy ng ikatlong partido', 'Reverse engineering o pagbabago ng Serbisyo', 'Hindi awtorisadong komersyal na paggamit o muling pagbebenta'] },
        { title: 'Artikulo 3 – Limitasyon ng Pananagutan', warning: 'Ang Serbisyo ay ibinibigay nang "as-is." Ang operator ay hindi mananagot sa sumusunod:', items: ['Pinsalang dulot ng pagkaantala o pagkawala ng data', 'Katumpakan o legalidad ng nilalaman na irinehistro ng gumagamit', 'Epekto ng pagsasanay o mga kwalipikasyong nakuha sa pamamagitan ng Serbisyo', 'Pinsalang dulot ng hindi awtorisadong pag-access dahil sa kapabayaan ng gumagamit', 'Pagkaantala ng serbisyo dahil sa force majeure'], paragraphs: ['Kahit na ang operator ay managot, ang maximum na halaga ay katumbas ng bayad ng gumagamit sa nakaraang 3 buwan (zero para sa libreng plano).'] },
        { title: 'Artikulo 4 – Pamamahala ng Account', items: ['Magbigay ng tumpak na impormasyon kapag nagpaparehistro', 'Ang mga gumagamit ay responsable sa pamamahala ng kanilang password at PIN', 'Ipinagbabawal ang paglipat o pagbabahagi ng account sa ikatlong partido', 'Kung natuklasan ang hindi awtorisadong paggamit, palitan agad ang password at makipag-ugnayan sa operator', 'Isang admin account bawat tenant ang pangkalahatang patakaran'] },
        { title: 'Artikulo 5 – Mga Kondisyon ng Pagtatapos ng Serbisyo', paragraphs: ['Maaaring suspindihin o burahin ang mga account nang walang paunang abiso sa mga sumusunod na kaso:'], items: ['Paglabag sa Mga Tuntuning ito', 'Hindi paggamit ng Serbisyo nang matagal (180 araw o higit pa)', 'Pagpaparehistro ng maling impormasyon', 'Mga aksyong nakakagambala sa Serbisyo o nakakasama sa ibang gumagamit'], note: 'Maaari ding tapusin ng operator ang Serbisyo na may 30 araw na paunang abiso.' },
        { title: 'Artikulo 6 – Mga Pagbabago sa Mga Tuntunin', paragraphs: ['Ang mga tuntuning ito ay maaaring baguhin kung kinakailangan. Ang mga mahahalagang pagbabago ay ipaaalam sa pamamagitan ng Serbisyo.'] },
        { title: 'Artikulo 7 – Namamahalang Batas at Hurisdiksyon', paragraphs: ['Ang mga tuntuning ito ay pinamamahalaan ng mga batas ng Japan.'] },
      ],
    },
    privacy: {
      title: 'Patakaran sa Privacy',
      updatedAt: 'Huling na-update: Marso 30, 2026',
      sections: [
        { title: 'Artikulo 1 – Data na Kinokolekta Namin', subsections: [{ title: 'Mga Admin', items: ['Email address', 'Pangalan ng admin', 'Pangalan ng tenant (negosyo/tindahan)', 'Timestamp ng login'] }, { title: 'Mga Empleyado', items: ['Buong pangalan', 'PIN (nakaimbak bilang hash)', 'Kasaysayan ng pagsasanay, resulta ng pagsusulit, at marka', 'Mga log ng sagot'] }, { title: 'Awtomatikong Nakolekta', items: ['Mga access log (IP address, impormasyon ng browser)'] }] },
        { title: 'Artikulo 2 – Paano Namin Ginagamit ang Iyong Data', paragraphs: ['Ang nakolektang data ay ginagamit lamang para sa mga sumusunod na layunin:'], items: ['Pagbibigay at pagpapatakbo ng Serbisyo', 'Pagpapatunay ng account at seguridad', 'Pamamahala at pagpapakita ng pag-unlad ng pagsasanay at mga resulta ng pagsusulit', 'Pagsusuri ng istatistika para sa pagpapabuti ng serbisyo', 'Mga abiso ng mahahalagang anunsyo at pagbabago ng serbisyo'], note: 'Ang data ay hindi gagamitin para sa mga layuning pangmarketing.' },
        { title: 'Artikulo 3 – Pagbabahagi sa Ikatlong Partido', paragraphs: ['Hindi kami nagbabahagi ng data sa mga ikatlong partido maliban sa:'], items: ['Sa paunang pahintulot ng gumagamit', 'Kapag hinihiling ng batas'], subsections: [{ title: 'Mga Ginagamit na Panlabas na Serbisyo', items: ['Supabase (USA): Database at pagpapatunay', 'Cloudflare (USA): Hosting at CDN'] }] },
        { title: 'Artikulo 4 – Pagpapanatili ng Data', table: [{ label: 'Mga admin account', value: 'Napanatili nang 30 araw pagkatapos burahin, pagkatapos ay tinanggal' }, { label: 'Data ng empleyado', value: 'Napanatili hanggang tanggalin ng admin' }, { label: 'Kasaysayan ng pagsasanay at pagsusulit', value: 'Tinanggal sa pagtanggal ng account' }, { label: 'Mga access log', value: 'Hanggang 90 araw' }] },
        { title: 'Artikulo 5 – Seguridad', items: ['Lahat ng komunikasyon ay naka-encrypt sa pamamagitan ng HTTPS (TLS)', 'Ang mga PIN ay nakaimbak bilang mga hash', 'Ang pag-access sa database ay pinaghihigpitan ng Row Level Security (RLS)'] },
        { title: 'Artikulo 6 – Iyong Mga Karapatan', paragraphs: ['Ang mga gumagamit ay may mga sumusunod na karapatan:'], items: ['Humiling ng pagsisiwalat, pagwawasto, o pagtanggal ng data', 'Burahin ang account (sa pamamagitan ng admin panel o pakikipag-ugnayan sa amin)'] },
        { title: 'Artikulo 7 – Mga Pagbabago sa Patakarang ito', paragraphs: ['Ang patakarang ito ay maaaring baguhin kung kinakailangan.'] },
      ],
    },
  },

  pt: {
    back: '← Voltar',
    downloadPdf: 'Baixar PDF',
    downloadPdfError: 'Não foi possível criar o PDF',
    termsLink: 'Termos de Serviço',
    privacyLink: 'Política de Privacidade',
    reportLink: 'Denunciar / Contato',
    terms: {
      title: 'Termos de Serviço',
      updatedAt: 'Última atualização: 30 de março de 2026',
      sections: [
        { title: 'Artigo 1 – Descrição do Serviço', paragraphs: ['O "Sistema de Gerenciamento de Treinamento" é uma plataforma SaaS que permite às empresas criar e gerenciar cursos e testes de treinamento para funcionários.'], items: ['Criação de cursos, testes e gerenciamento de funcionários por administradores', 'Participação em cursos, realização de testes e visualização de resultados pelos funcionários', 'Gerenciamento do histórico de treinamento e status de aprovação/reprovação'] },
        { title: 'Artigo 2 – Atividades Proibidas', paragraphs: ['Os usuários não devem realizar as seguintes atividades:'], items: ['Acesso não autorizado a contas de outros usuários', 'Qualquer ação que interrompa a operação do Serviço', 'Upload ou transmissão de conteúdo que viole leis ou moral pública', 'Violação de direitos de propriedade intelectual ou privacidade de terceiros', 'Engenharia reversa ou adulteração do Serviço', 'Uso comercial não autorizado ou revenda'] },
        { title: 'Artigo 3 – Limitação de Responsabilidade', warning: 'O Serviço é fornecido "como está". O operador não se responsabiliza por:', items: ['Danos causados por interrupção do serviço ou perda de dados', 'Precisão ou legalidade do conteúdo registrado pelos usuários', 'Eficácia do treinamento ou certificações obtidas por meio do Serviço', 'Danos causados por acesso não autorizado devido a negligência do usuário', 'Suspensão do serviço por força maior'], paragraphs: ['Mesmo que o operador seja responsável por danos, o valor máximo não excederá o valor pago pelo usuário nos 3 meses anteriores (zero para planos gratuitos).'] },
        { title: 'Artigo 4 – Gerenciamento de Conta', items: ['Forneça informações precisas ao registrar uma conta de administrador', 'Os usuários são responsáveis pelo gerenciamento de suas próprias senhas e PINs', 'É proibido transferir ou compartilhar contas com terceiros', 'Se uso não autorizado for descoberto, altere a senha imediatamente e contate o operador', 'Uma conta de administrador por inquilino é a regra geral'] },
        { title: 'Artigo 5 – Rescisão do Serviço', paragraphs: ['As contas podem ser suspensas ou excluídas sem aviso prévio nos seguintes casos:'], items: ['Violação destes Termos', 'Não uso do Serviço por período prolongado (180 dias ou mais)', 'Registro de informações falsas', 'Atos que perturbem as operações do Serviço ou prejudiquem outros usuários'], note: 'O operador também pode encerrar o Serviço com 30 dias de aviso prévio.' },
        { title: 'Artigo 6 – Alterações nos Termos', paragraphs: ['Estes Termos podem ser revisados conforme necessário. Mudanças importantes serão notificadas através do Serviço.'] },
        { title: 'Artigo 7 – Lei Aplicável e Jurisdição', paragraphs: ['Estes Termos são regidos pelas leis do Japão.'] },
      ],
    },
    privacy: {
      title: 'Política de Privacidade',
      updatedAt: 'Última atualização: 30 de março de 2026',
      sections: [
        { title: 'Artigo 1 – Dados que Coletamos', subsections: [{ title: 'Administradores', items: ['Endereço de e-mail', 'Nome do administrador', 'Nome do inquilino (nome da empresa/loja)', 'Timestamp de login'] }, { title: 'Funcionários', items: ['Nome completo', 'PIN (armazenado como hash)', 'Histórico de treinamento, resultados de testes e pontuações', 'Logs de respostas'] }, { title: 'Coletados Automaticamente', items: ['Logs de acesso (endereço IP, informações do navegador)'] }] },
        { title: 'Artigo 2 – Como Usamos Seus Dados', paragraphs: ['Os dados coletados são usados apenas para os seguintes fins:'], items: ['Fornecimento e operação do Serviço', 'Autenticação de conta e segurança', 'Gerenciamento e exibição do progresso do treinamento e resultados de testes', 'Análise estatística para melhoria do serviço', 'Notificações de anúncios importantes e alterações do serviço'], note: 'Os dados não serão usados para fins de marketing.' },
        { title: 'Artigo 3 – Compartilhamento com Terceiros', paragraphs: ['Não compartilhamos dados com terceiros, exceto:'], items: ['Com consentimento prévio do usuário', 'Quando exigido por lei'], subsections: [{ title: 'Serviços Externos Utilizados', items: ['Supabase (EUA): Banco de dados e autenticação', 'Cloudflare (EUA): Hospedagem e CDN'] }] },
        { title: 'Artigo 4 – Retenção de Dados', table: [{ label: 'Contas de administrador', value: 'Retidas por 30 dias após exclusão, depois excluídas' }, { label: 'Dados de funcionários', value: 'Retidos até serem excluídos pelo administrador' }, { label: 'Histórico de treinamento e testes', value: 'Excluído quando a conta é excluída' }, { label: 'Logs de acesso', value: 'Até 90 dias' }] },
        { title: 'Artigo 5 – Segurança', items: ['Todas as comunicações são criptografadas via HTTPS (TLS)', 'PINs são armazenados como hashes', 'O acesso ao banco de dados é restrito por Row Level Security (RLS)'] },
        { title: 'Artigo 6 – Seus Direitos', paragraphs: ['Os usuários têm os seguintes direitos sobre seus dados:'], items: ['Solicitar divulgação, correção ou exclusão de dados', 'Excluir conta (via painel administrativo ou contato)'] },
        { title: 'Artigo 7 – Alterações nesta Política', paragraphs: ['Esta Política pode ser revisada conforme necessário.'] },
      ],
    },
  },

  ko: {
    back: '← 돌아가기',
    downloadPdf: 'PDF 다운로드',
    downloadPdfError: 'PDF를 만들 수 없습니다',
    termsLink: '이용약관',
    privacyLink: '개인정보처리방침',
    reportLink: '신고 / 문의',
    terms: {
      title: '이용약관',
      updatedAt: '최종 업데이트: 2026년 3월 30일',
      sections: [
        { title: '제1조　서비스 내용', paragraphs: ['"연수 관리 시스템"은 기업과 점포가 직원을 위한 연수 과정 및 테스트를 생성·관리하고, 직원이 수강 및 수험할 수 있는 SaaS 형태의 트레이닝 관리 플랫폼입니다.'], items: ['관리자에 의한 과정·테스트 생성 및 직원 관리', '직원에 의한 과정 수강·테스트 응시·결과 확인', '수강 이력·합격 여부 관리'] },
        { title: '제2조　금지 사항', paragraphs: ['이용자는 다음 행위를 해서는 안 됩니다.'], items: ['다른 이용자의 계정에 대한 무단 접근', '본 서비스 운영을 방해하는 행위', '법령 또는 공서양속에 반하는 콘텐츠 등록·송신', '제3자의 지적재산권·프라이버시 침해', '본 서비스의 역공학·변조', '상업적 목적의 무단 전용·재판매'] },
        { title: '제3조　책임의 범위', warning: '본 서비스는 현상 그대로(as-is) 제공됩니다. 다음 사항에 대해 운영자는 일절 책임을 지지 않습니다.', items: ['서비스 중단·정지·데이터 손실로 인한 손해', '이용자가 등록한 콘텐츠의 정확성·적법성', '본 서비스를 통한 직원의 연수 효과·자격 취득', '이용자의 관리 부실로 인한 제3자의 무단 접근으로 발생한 손해', '천재지변·인프라 장애 등 불가항력으로 인한 서비스 정지'], paragraphs: ['운영자가 손해배상 책임을 지는 경우에도 그 상한은 이용자가 최근 3개월 동안 지불한 이용료 상당액으로 합니다(무료 플랜의 경우 0원).'] },
        { title: '제4조　계정 관리', items: ['관리자 계정 등록 시 정확한 정보를 입력해 주세요', '비밀번호·PIN 관리는 이용자 본인의 책임입니다', '계정의 제3자 양도·공유는 금지합니다', '무단 이용 발견 시 즉시 비밀번호를 변경하고 운영자에게 연락해 주세요', '1테넌트당 1관리자 계정을 원칙으로 합니다'] },
        { title: '제5조　서비스 정지 조건', paragraphs: ['다음에 해당하는 경우 사전 통지 없이 계정을 정지·삭제할 수 있습니다.'], items: ['본 약관을 위반한 경우', '장기간(180일 이상) 서비스를 이용하지 않은 경우', '허위 정보를 등록한 경우', '서비스 운영·다른 이용자에 대한 방해 행위가 인정되는 경우'], note: '또한 운영자는 30일 전 예고를 통해 서비스를 종료할 수 있습니다.' },
        { title: '제6조　약관의 변경', paragraphs: ['본 약관은 필요에 따라 변경될 수 있습니다. 중요한 변경이 있을 경우 서비스를 통해 공지합니다.'] },
        { title: '제7조　준거법·관할', paragraphs: ['본 약관은 일본법에 준거하며, 분쟁 발생 시 일본 법원을 관할 법원으로 합니다.'] },
      ],
    },
    privacy: {
      title: '개인정보처리방침',
      updatedAt: '최종 업데이트: 2026년 3월 30일',
      sections: [
        { title: '제1조　수집하는 데이터', subsections: [{ title: '관리자', items: ['이메일 주소', '관리자 이름', '테넌트 이름(점포·기업명)', '로그인 일시'] }, { title: '직원', items: ['이름', 'PIN(해시로 저장)', '수강 이력·테스트 결과·점수', '답안 로그(문제·선택지·정오)'] }, { title: '자동 수집', items: ['액세스 로그(IP 주소, 브라우저 정보) ※인프라 측 자동 수집'] }] },
        { title: '제2조　이용 목적', paragraphs: ['수집한 데이터는 다음 목적으로만 사용합니다.'], items: ['본 서비스의 제공·운영', '계정 인증·보안 확보', '수강 상황·테스트 결과의 관리·표시', '서비스 개선을 위한 통계 분석(개인을 특정하지 않는 형식)', '중요 공지·서비스 변경 사항 통보'], note: '마케팅 목적으로는 사용하지 않습니다.' },
        { title: '제3조　제3자 제공', paragraphs: ['다음의 경우를 제외하고 제3자에게 데이터를 제공하지 않습니다.'], items: ['이용자의 사전 동의가 있는 경우', '법령에 의한 공개 요청이 있는 경우'], subsections: [{ title: '이용 중인 외부 서비스(업무 위탁)', items: ['Supabase(미국): 데이터베이스·인증 기반', 'Cloudflare(미국): 호스팅·CDN'] }], note: '이 서비스들은 데이터 처리 수탁자이며 독자적인 목적으로 데이터를 사용하지 않습니다.' },
        { title: '제4조　데이터 보존 기간', table: [{ label: '관리자 계정', value: '탈퇴 후 30일 보존 후 삭제' }, { label: '직원 데이터', value: '관리자가 삭제할 때까지 보존' }, { label: '수강·테스트 이력', value: '계정 삭제 시 삭제' }, { label: '액세스 로그', value: '최대 90일(인프라 설정에 준함)' }] },
        { title: '제5조　보안', items: ['모든 통신은 HTTPS(TLS)로 암호화', 'PIN은 해시로 저장(평문 저장 없음)', '데이터베이스 접근은 Row Level Security(RLS)로 제한'] },
        { title: '제6조　이용자의 권리', paragraphs: ['이용자는 자신의 데이터에 대해 다음 권리를 가집니다.'], items: ['데이터 공개·정정·삭제 청구', '계정 삭제(관리 화면 또는 문의)'] },
        { title: '제7조　방침의 변경', paragraphs: ['본 방침은 필요에 따라 변경될 수 있습니다.'] },
      ],
    },
  },

  id: {
    back: '← Kembali',
    downloadPdf: 'Unduh PDF',
    downloadPdfError: 'Gagal membuat PDF',
    termsLink: 'Syarat Layanan',
    privacyLink: 'Kebijakan Privasi',
    reportLink: 'Laporan / Hubungi Kami',
    terms: {
      title: 'Syarat Layanan',
      updatedAt: 'Terakhir diperbarui: 30 Maret 2026',
      sections: [
        { title: 'Pasal 1 – Deskripsi Layanan', paragraphs: ['"Sistem Manajemen Pelatihan" adalah platform manajemen pelatihan SaaS yang memungkinkan bisnis membuat dan mengelola kursus dan tes pelatihan untuk karyawan.'], items: ['Pembuatan kursus, tes, dan manajemen karyawan oleh administrator', 'Pengambilan kursus, mengikuti tes, dan melihat hasil oleh karyawan', 'Manajemen riwayat pelatihan dan status lulus/tidak lulus'] },
        { title: 'Pasal 2 – Aktivitas yang Dilarang', paragraphs: ['Pengguna tidak boleh melakukan aktivitas berikut:'], items: ['Akses tidak sah ke akun pengguna lain', 'Tindakan yang mengganggu operasi Layanan', 'Mengunggah konten yang melanggar hukum atau moral', 'Pelanggaran hak kekayaan intelektual atau privasi pihak ketiga', 'Rekayasa balik atau pemalsuan Layanan', 'Penggunaan komersial yang tidak sah atau penjualan kembali'] },
        { title: 'Pasal 3 – Batasan Tanggung Jawab', warning: 'Layanan disediakan "apa adanya". Operator tidak bertanggung jawab atas:', items: ['Kerusakan yang disebabkan oleh gangguan layanan atau kehilangan data', 'Keakuratan atau legalitas konten yang didaftarkan pengguna', 'Efektivitas pelatihan atau sertifikasi yang diperoleh melalui Layanan', 'Kerusakan akibat akses tidak sah karena kelalaian pengguna', 'Penghentian layanan karena force majeure'], paragraphs: ['Bahkan jika operator bertanggung jawab atas kerusakan, jumlah maksimum tidak melebihi jumlah yang dibayar pengguna dalam 3 bulan sebelumnya (nol untuk paket gratis).'] },
        { title: 'Pasal 4 – Manajemen Akun', items: ['Berikan informasi yang akurat saat mendaftar akun administrator', 'Pengguna bertanggung jawab untuk mengelola kata sandi dan PIN mereka sendiri', 'Dilarang mentransfer atau berbagi akun dengan pihak ketiga', 'Jika penggunaan tidak sah ditemukan, segera ubah kata sandi dan hubungi operator', 'Satu akun administrator per tenant adalah aturan umum'] },
        { title: 'Pasal 5 – Penghentian Layanan', paragraphs: ['Akun dapat ditangguhkan atau dihapus tanpa pemberitahuan sebelumnya dalam kasus berikut:'], items: ['Pelanggaran Syarat ini', 'Tidak menggunakan Layanan untuk jangka waktu lama (180 hari atau lebih)', 'Pendaftaran informasi palsu', 'Tindakan yang mengganggu operasi Layanan atau merugikan pengguna lain'], note: 'Operator juga dapat mengakhiri Layanan dengan pemberitahuan 30 hari sebelumnya.' },
        { title: 'Pasal 6 – Perubahan Syarat', paragraphs: ['Syarat ini dapat direvisi sesuai kebutuhan. Perubahan penting akan diberitahukan melalui Layanan.'] },
        { title: 'Pasal 7 – Hukum yang Berlaku dan Yurisdiksi', paragraphs: ['Syarat ini diatur oleh hukum Jepang.'] },
      ],
    },
    privacy: {
      title: 'Kebijakan Privasi',
      updatedAt: 'Terakhir diperbarui: 30 Maret 2026',
      sections: [
        { title: 'Pasal 1 – Data yang Kami Kumpulkan', subsections: [{ title: 'Administrator', items: ['Alamat email', 'Nama administrator', 'Nama tenant (nama bisnis/toko)', 'Timestamp login'] }, { title: 'Karyawan', items: ['Nama lengkap', 'PIN (disimpan sebagai hash)', 'Riwayat pelatihan, hasil tes, dan skor', 'Log jawaban'] }, { title: 'Dikumpulkan Secara Otomatis', items: ['Log akses (alamat IP, informasi browser)'] }] },
        { title: 'Pasal 2 – Cara Kami Menggunakan Data Anda', paragraphs: ['Data yang dikumpulkan hanya digunakan untuk tujuan berikut:'], items: ['Menyediakan dan mengoperasikan Layanan', 'Autentikasi akun dan keamanan', 'Mengelola dan menampilkan kemajuan pelatihan dan hasil tes', 'Analisis statistik untuk peningkatan layanan', 'Pemberitahuan pengumuman penting dan perubahan layanan'], note: 'Data tidak akan digunakan untuk tujuan pemasaran.' },
        { title: 'Pasal 3 – Berbagi dengan Pihak Ketiga', paragraphs: ['Kami tidak berbagi data dengan pihak ketiga kecuali:'], items: ['Dengan persetujuan sebelumnya dari pengguna', 'Ketika diwajibkan oleh hukum'], subsections: [{ title: 'Layanan Eksternal yang Digunakan', items: ['Supabase (AS): Database dan autentikasi', 'Cloudflare (AS): Hosting dan CDN'] }] },
        { title: 'Pasal 4 – Retensi Data', table: [{ label: 'Akun administrator', value: 'Disimpan 30 hari setelah penghapusan, kemudian dihapus' }, { label: 'Data karyawan', value: 'Disimpan hingga dihapus oleh administrator' }, { label: 'Riwayat pelatihan dan tes', value: 'Dihapus saat akun dihapus' }, { label: 'Log akses', value: 'Hingga 90 hari' }] },
        { title: 'Pasal 5 – Keamanan', items: ['Semua komunikasi dienkripsi melalui HTTPS (TLS)', 'PIN disimpan sebagai hash', 'Akses database dibatasi oleh Row Level Security (RLS)'] },
        { title: 'Pasal 6 – Hak Anda', paragraphs: ['Pengguna memiliki hak berikut atas data mereka:'], items: ['Meminta pengungkapan, koreksi, atau penghapusan data', 'Menghapus akun (melalui panel admin atau menghubungi kami)'] },
        { title: 'Pasal 7 – Perubahan Kebijakan', paragraphs: ['Kebijakan ini dapat direvisi sesuai kebutuhan.'] },
      ],
    },
  },

  th: {
    back: '← กลับ',
    downloadPdf: 'ดาวน์โหลด PDF',
    downloadPdfError: 'สร้าง PDF ไม่สำเร็จ',
    termsLink: 'ข้อกำหนดการให้บริการ',
    privacyLink: 'นโยบายความเป็นส่วนตัว',
    reportLink: 'รายงาน / ติดต่อเรา',
    terms: {
      title: 'ข้อกำหนดการให้บริการ',
      updatedAt: 'อัปเดตล่าสุด: 30 มีนาคม 2026',
      sections: [
        { title: 'ข้อ 1 – คำอธิบายบริการ', paragraphs: ['"ระบบการจัดการการฝึกอบรม" คือแพลตฟอร์ม SaaS ที่ให้ธุรกิจสร้างและจัดการหลักสูตรและแบบทดสอบสำหรับพนักงาน'], items: ['ผู้ดูแลระบบสร้างหลักสูตร แบบทดสอบ และจัดการพนักงาน', 'พนักงานลงทะเบียนหลักสูตร ทำแบบทดสอบ และดูผลลัพธ์', 'จัดการประวัติการฝึกอบรมและสถานะผ่าน/ไม่ผ่าน'] },
        { title: 'ข้อ 2 – กิจกรรมที่ห้าม', paragraphs: ['ผู้ใช้ต้องไม่กระทำสิ่งต่อไปนี้:'], items: ['การเข้าถึงบัญชีผู้ใช้อื่นโดยไม่ได้รับอนุญาต', 'การกระทำใดๆ ที่ขัดขวางการดำเนินการของบริการ', 'การอัปโหลดเนื้อหาที่ละเมิดกฎหมายหรือศีลธรรม', 'การละเมิดทรัพย์สินทางปัญญาหรือความเป็นส่วนตัวของบุคคลที่สาม', 'การทำวิศวกรรมย้อนกลับหรือดัดแปลงบริการ', 'การใช้งานเชิงพาณิชย์โดยไม่ได้รับอนุญาต'] },
        { title: 'ข้อ 3 – ขอบเขตความรับผิด', warning: 'บริการนี้ให้บริการ "ตามที่เป็น" ผู้ดำเนินการไม่รับผิดชอบต่อ:', items: ['ความเสียหายจากการหยุดชะงักของบริการหรือการสูญหายของข้อมูล', 'ความถูกต้องหรือความชอบด้วยกฎหมายของเนื้อหาที่ลงทะเบียน', 'ประสิทธิภาพการฝึกอบรมหรือคุณสมบัติที่ได้รับ', 'ความเสียหายจากการเข้าถึงโดยไม่ได้รับอนุญาตเนื่องจากความประมาทของผู้ใช้', 'การหยุดบริการเนื่องจากเหตุสุดวิสัย'], paragraphs: ['แม้ว่าผู้ดำเนินการจะต้องรับผิดชอบต่อความเสียหาย จำนวนสูงสุดจะไม่เกินจำนวนที่ผู้ใช้ชำระในช่วง 3 เดือนก่อนหน้า (ศูนย์สำหรับแผนฟรี)'] },
        { title: 'ข้อ 4 – การจัดการบัญชี', items: ['ให้ข้อมูลที่ถูกต้องเมื่อลงทะเบียนบัญชีผู้ดูแลระบบ', 'ผู้ใช้รับผิดชอบในการจัดการรหัสผ่านและ PIN ของตนเอง', 'ห้ามโอนหรือแบ่งปันบัญชีกับบุคคลที่สาม', 'หากพบการใช้งานโดยไม่ได้รับอนุญาต ให้เปลี่ยนรหัสผ่านทันที'] },
        { title: 'ข้อ 5 – เงื่อนไขการยุติบริการ', paragraphs: ['บัญชีอาจถูกระงับหรือลบโดยไม่แจ้งล่วงหน้าในกรณีต่อไปนี้:'], items: ['ละเมิดข้อกำหนดเหล่านี้', 'ไม่ใช้บริการเป็นเวลานาน (180 วันขึ้นไป)', 'ลงทะเบียนข้อมูลเท็จ', 'การกระทำที่ขัดขวางการดำเนินงานหรือเป็นอันตรายต่อผู้ใช้รายอื่น'] },
        { title: 'ข้อ 6 – การเปลี่ยนแปลงข้อกำหนด', paragraphs: ['ข้อกำหนดเหล่านี้อาจได้รับการแก้ไขตามความจำเป็น'] },
        { title: 'ข้อ 7 – กฎหมายที่ใช้บังคับ', paragraphs: ['ข้อกำหนดเหล่านี้อยู่ภายใต้บังคับของกฎหมายญี่ปุ่น'] },
      ],
    },
    privacy: {
      title: 'นโยบายความเป็นส่วนตัว',
      updatedAt: 'อัปเดตล่าสุด: 30 มีนาคม 2026',
      sections: [
        { title: 'ข้อ 1 – ข้อมูลที่เรารวบรวม', subsections: [{ title: 'ผู้ดูแลระบบ', items: ['ที่อยู่อีเมล', 'ชื่อผู้ดูแลระบบ', 'ชื่อผู้เช่า (ชื่อธุรกิจ/ร้านค้า)', 'เวลาเข้าสู่ระบบ'] }, { title: 'พนักงาน', items: ['ชื่อเต็ม', 'PIN (เก็บเป็น hash)', 'ประวัติการฝึกอบรม ผลการทดสอบ และคะแนน', 'บันทึกคำตอบ'] }, { title: 'รวบรวมโดยอัตโนมัติ', items: ['บันทึกการเข้าถึง (ที่อยู่ IP ข้อมูลเบราว์เซอร์)'] }] },
        { title: 'ข้อ 2 – วิธีใช้ข้อมูลของคุณ', paragraphs: ['ข้อมูลที่รวบรวมใช้เพื่อวัตถุประสงค์ต่อไปนี้เท่านั้น:'], items: ['ให้บริการและดำเนินการบริการ', 'การยืนยันตัวตนบัญชีและความปลอดภัย', 'จัดการและแสดงความคืบหน้าการฝึกอบรมและผลการทดสอบ', 'การวิเคราะห์ทางสถิติเพื่อปรับปรุงบริการ', 'การแจ้งเตือนประกาศสำคัญ'] },
        { title: 'ข้อ 3 – การแบ่งปันกับบุคคลที่สาม', paragraphs: ['เราไม่แบ่งปันข้อมูลกับบุคคลที่สาม ยกเว้น:'], items: ['ด้วยความยินยอมล่วงหน้าของผู้ใช้', 'เมื่อกฎหมายกำหนด'], subsections: [{ title: 'บริการภายนอกที่ใช้', items: ['Supabase (สหรัฐฯ): ฐานข้อมูลและการยืนยันตัวตน', 'Cloudflare (สหรัฐฯ): โฮสติ้งและ CDN'] }] },
        { title: 'ข้อ 4 – การเก็บรักษาข้อมูล', table: [{ label: 'บัญชีผู้ดูแลระบบ', value: 'เก็บ 30 วันหลังลบ จากนั้นลบ' }, { label: 'ข้อมูลพนักงาน', value: 'เก็บจนกว่าผู้ดูแลระบบจะลบ' }, { label: 'ประวัติการฝึกอบรมและการทดสอบ', value: 'ลบเมื่อลบบัญชี' }, { label: 'บันทึกการเข้าถึง', value: 'สูงสุด 90 วัน' }] },
        { title: 'ข้อ 5 – ความปลอดภัย', items: ['การสื่อสารทั้งหมดเข้ารหัสผ่าน HTTPS (TLS)', 'PIN เก็บเป็น hash', 'การเข้าถึงฐานข้อมูลถูกจำกัดโดย Row Level Security (RLS)'] },
        { title: 'ข้อ 6 – สิทธิ์ของคุณ', paragraphs: ['ผู้ใช้มีสิทธิ์ต่อไปนี้เกี่ยวกับข้อมูลของตน:'], items: ['ขอการเปิดเผย แก้ไข หรือลบข้อมูล', 'ลบบัญชี (ผ่านแผงผู้ดูแลระบบหรือติดต่อเรา)'] },
        { title: 'ข้อ 7 – การเปลี่ยนแปลงนโยบาย', paragraphs: ['นโยบายนี้อาจได้รับการแก้ไขตามความจำเป็น'] },
      ],
    },
  },

  ne: {
    back: '← फिर्ता',
    downloadPdf: 'PDF डाउनलोड गर्नुहोस्',
    downloadPdfError: 'PDF बनाउन सकिएन',
    termsLink: 'सेवाका सर्तहरू',
    privacyLink: 'गोपनीयता नीति',
    reportLink: 'रिपोर्ट / सम्पर्क',
    terms: {
      title: 'सेवाका सर्तहरू',
      updatedAt: 'अन्तिम अपडेट: मार्च ३०, २०२६',
      sections: [
        { title: 'धारा १ – सेवाको विवरण', paragraphs: ['"प्रशिक्षण व्यवस्थापन प्रणाली" एक SaaS प्लेटफर्म हो जसले व्यवसायहरूलाई कर्मचारीका लागि प्रशिक्षण पाठ्यक्रम र परीक्षणहरू सिर्जना र व्यवस्थापन गर्न अनुमति दिन्छ।'], items: ['प्रशासकद्वारा पाठ्यक्रम, परीक्षण सिर्जना र कर्मचारी व्यवस्थापन', 'कर्मचारीद्वारा पाठ्यक्रम भर्ना, परीक्षण र नतिजा हेर्ने', 'प्रशिक्षण इतिहास र उत्तीर्ण/अनुत्तीर्ण स्थिति व्यवस्थापन'] },
        { title: 'धारा २ – निषेधित गतिविधिहरू', paragraphs: ['प्रयोगकर्ताले निम्न कार्यहरू गर्न हुँदैन:'], items: ['अन्य प्रयोगकर्ताको खातामा अनाधिकृत पहुँच', 'सेवाको सञ्चालनमा बाधा पुर्याउने कार्य', 'कानुन वा नैतिकता विरुद्धको सामग्री अपलोड गर्ने', 'तेस्रो पक्षको बौद्धिक सम्पत्ति वा गोपनीयताको उल्लंघन', 'सेवाको रिभर्स इन्जिनियरिङ वा छेडछाड', 'अनाधिकृत व्यावसायिक प्रयोग वा पुनर्बिक्री'] },
        { title: 'धारा ३ – दायित्वको सीमा', warning: 'सेवा "जस्तो छ" आधारमा प्रदान गरिन्छ। सञ्चालकले निम्नको लागि कुनै जिम्मेवारी लिँदैन:', items: ['सेवा अवरोध वा डेटा हानिबाट भएको क्षति', 'प्रयोगकर्ताद्वारा दर्ता गरिएको सामग्रीको सटीकता वा वैधता', 'सेवाद्वारा प्राप्त प्रशिक्षण प्रभाव वा योग्यताहरू', 'प्रयोगकर्ताको लापरवाहीले भएको अनाधिकृत पहुँचबाट क्षति', 'अप्रत्याशित घटनाका कारण सेवा अवरोध'] },
        { title: 'धारा ४ – खाता व्यवस्थापन', items: ['प्रशासक खाता दर्ता गर्दा सही जानकारी प्रदान गर्नुहोस्', 'प्रयोगकर्ताहरू आफ्नै पासवर्ड र PIN व्यवस्थापनको लागि जिम्मेवार छन्', 'तेस्रो पक्षलाई खाता हस्तान्तरण वा साझा गर्न निषेध छ'] },
        { title: 'धारा ५ – सेवा समाप्तिका सर्तहरू', paragraphs: ['निम्न अवस्थामा खाता निलम्बन वा मेटाउन सकिन्छ:'], items: ['यी सर्तहरूको उल्लंघन', 'लामो समयसम्म (१८० दिन वा बढी) सेवा प्रयोग नगर्नु', 'गलत जानकारी दर्ता गर्नु'] },
        { title: 'धारा ६ – सर्तहरूमा परिवर्तन', paragraphs: ['यी सर्तहरू आवश्यक अनुसार परिमार्जन गर्न सकिन्छ।'] },
        { title: 'धारा ७ – लागू कानुन', paragraphs: ['यी सर्तहरू जापानको कानुनद्वारा नियन्त्रित छन्।'] },
      ],
    },
    privacy: {
      title: 'गोपनीयता नीति',
      updatedAt: 'अन्तिम अपडेट: मार्च ३०, २०२६',
      sections: [
        { title: 'धारा १ – हामीले सङ्कलन गर्ने डेटा', subsections: [{ title: 'प्रशासकहरू', items: ['इमेल ठेगाना', 'प्रशासकको नाम', 'टेनेन्टको नाम', 'लगइन समय'] }, { title: 'कर्मचारीहरू', items: ['पूरा नाम', 'PIN (ह्यासको रूपमा सङ्ग्रहित)', 'प्रशिक्षण इतिहास, परीक्षण नतिजा र अंक', 'उत्तर लगहरू'] }, { title: 'स्वचालित रूपमा सङ्कलित', items: ['पहुँच लगहरू (IP ठेगाना, ब्राउजर जानकारी)'] }] },
        { title: 'धारा २ – डेटा प्रयोगको उद्देश्य', items: ['सेवा प्रदान र सञ्चालन', 'खाता प्रमाणीकरण र सुरक्षा', 'प्रशिक्षण प्रगति र परीक्षण नतिजा व्यवस्थापन', 'सेवा सुधारको लागि सांख्यिकीय विश्लेषण', 'महत्त्वपूर्ण सूचनाहरू'] },
        { title: 'धारा ३ – तेस्रो पक्षसँग साझेदारी', paragraphs: ['हामी तेस्रो पक्षसँग डेटा साझा गर्दैनौँ, बाहेक:'], items: ['प्रयोगकर्ताको पूर्व सहमतिमा', 'कानुनले आवश्यक गर्दा'], subsections: [{ title: 'प्रयोग गरिएका बाह्य सेवाहरू', items: ['Supabase (अमेरिका): डेटाबेस र प्रमाणीकरण', 'Cloudflare (अमेरिका): होस्टिङ र CDN'] }] },
        { title: 'धारा ४ – डेटा भण्डारण अवधि', table: [{ label: 'प्रशासक खाताहरू', value: 'मेटाएपछि ३० दिन, त्यसपछि मेटाइन्छ' }, { label: 'कर्मचारी डेटा', value: 'प्रशासकले मेटाउँदासम्म' }, { label: 'प्रशिक्षण र परीक्षण इतिहास', value: 'खाता मेटाउँदा मेटाइन्छ' }, { label: 'पहुँच लगहरू', value: 'अधिकतम ९० दिन' }] },
        { title: 'धारा ५ – सुरक्षा', items: ['सबै सञ्चार HTTPS (TLS) मार्फत एन्क्रिप्टेड', 'PIN ह्यासको रूपमा सङ्ग्रहित', 'डेटाबेस पहुँच Row Level Security द्वारा सीमित'] },
        { title: 'धारा ६ – प्रयोगकर्ताको अधिकार', items: ['डेटा खुलासा, सुधार वा मेटाउन अनुरोध', 'खाता मेटाउने'] },
        { title: 'धारा ७ – नीतिमा परिवर्तन', paragraphs: ['यो नीति आवश्यक अनुसार परिमार्जन गर्न सकिन्छ।'] },
      ],
    },
  },

  my: {
    back: '← နောက်သို့',
    downloadPdf: 'PDF ဒေါင်းလုဒ်',
    downloadPdfError: 'PDF ဖန်တီး၍မရပါ',
    termsLink: 'ဝန်ဆောင်မှု သဘောတူညီချက်',
    privacyLink: 'ကိုယ်ရေးကိုယ်တာ မူဝါဒ',
    reportLink: 'တိုင်ကြားရန် / ဆက်သွယ်ရန်',
    terms: {
      title: 'ဝန်ဆောင်မှု သဘောတူညီချက်',
      updatedAt: 'နောက်ဆုံးမွမ်းမံသည့်နေ့: မတ် ၃၀, ၂၀၂၆',
      sections: [
        { title: 'အပိုဒ် ၁ – ဝန်ဆောင်မှု ဖော်ပြချက်', paragraphs: ['"လေ့ကျင့်ရေး စီမံခန့်ခွဲမှု စနစ်" သည် စီးပွားရေး လုပ်ငန်းများအတွက် ဝန်ထမ်းများ၏ သင်တန်းနှင့် စာမေးပွဲများကို ဖန်တီးနိုင်သော SaaS ပလက်ဖောင်း တစ်ခုဖြစ်သည်။'], items: ['စီမံခန့်ခွဲသူများ သင်တန်းများ၊ စာမေးပွဲများနှင့် ဝန်ထမ်းစီမံခန့်ခွဲမှု', 'ဝန်ထမ်းများ သင်တန်းတက်ရောက်ခြင်း၊ စာမေးပွဲဖြေဆိုခြင်းနှင့် ရလဒ်ကြည့်ရှုခြင်း', 'လေ့ကျင့်မှုမှတ်တမ်းနှင့် အောင်/ကျ အခြေအနေ စီမံခန့်ခွဲမှု'] },
        { title: 'အပိုဒ် ၂ – တားမြစ်ထားသောလုပ်ဆောင်ချက်များ', paragraphs: ['အသုံးပြုသူများသည် အောက်ပါလုပ်ဆောင်ချက်များကို မပြုလုပ်ရ:'], items: ['အခြားအသုံးပြုသူ၏ အကောင့်သို့ ခွင့်ပြုချက်မဲ့ ဝင်ရောက်ခြင်း', 'ဝန်ဆောင်မှု ဆောင်ရွက်မှုကို နှောင့်ယှက်သောလုပ်ဆောင်ချက်', 'ဥပဒေနှင့် ဆန့်ကျင်သောအကြောင်းအရာများ တင်ခြင်း', 'တတိယပါတီ၏ မူပိုင်ခွင့် သို့မဟုတ် ကိုယ်ရေးကိုယ်တာကို ချိုးဖောက်ခြင်း'] },
        { title: 'အပိုဒ် ၃ – တာဝန်ယူမှု အကန့်အသတ်', warning: 'ဝန်ဆောင်မှုကို "ဖြစ်သည့်အတိုင်း" ပေးဆောင်သည်။ ဆောင်ရွက်သူသည် အောက်ပါအချက်များအတွက် တာဝန်မယူပါ:', items: ['ဝန်ဆောင်မှုရပ်ဆိုင်းမှု သို့မဟုတ် ဒေတာဆုံးရှုံးမှုကြောင့် ဖြစ်သောထိခိုက်မှု', 'အသုံးပြုသူ မှတ်ပုံတင်သောအကြောင်းအရာ၏ တိကျမှု', 'ဝန်ဆောင်မှုမှတဆင့် ရရှိသောလေ့ကျင့်မှု အကျိုးသက်ရောက်မှု', 'အသုံးပြုသူ၏ ပေါ့ဆမှုကြောင့် ဖြစ်သောထိခိုက်မှု', 'သဘာဝဘေးဒဏ်ကြောင့် ဝန်ဆောင်မှုရပ်ဆိုင်းမှု'] },
        { title: 'အပိုဒ် ၄ – အကောင့် စီမံခန့်ခွဲမှု', items: ['စီမံခန့်ခွဲသူ အကောင့် မှတ်ပုံတင်ရာတွင် တိကျသောအချက်အလက် ပေးဆောင်ပါ', 'မိမိ၏ စကားဝှက်နှင့် PIN စီမံခန့်ခွဲမှုသည် မိမိ၏ တာဝန်ဖြစ်သည်', 'အကောင့်ကို တတိယပါတီသို့ လွှဲပြောင်းခြင်း သို့မဟုတ် မျှဝေခြင်း မပြုလုပ်ရ'] },
        { title: 'အပိုဒ် ၅ – ဝန်ဆောင်မှု ရပ်စဲသောအခြေအနေ', paragraphs: ['အောက်ပါကိစ္စရပ်များတွင် အကောင့်ကို ကြိုတင်အကြောင်းကြားမှုမပါဘဲ ရပ်ဆိုင်း သို့မဟုတ် ဖျက်ပစ်နိုင်သည်:'], items: ['ဤသဘောတူညီချက်ကို ချိုးဖောက်ခြင်း', 'ကြာရှည်စွာ (၁၈၀ ရက် သို့မဟုတ် ထိုထက်ပို) ဝန်ဆောင်မှု အသုံးမပြုခြင်း', 'မမှန်သောအချက်အလက် မှတ်ပုံတင်ခြင်း'] },
        { title: 'အပိုဒ် ၆ – သဘောတူညီချက် ပြောင်းလဲခြင်း', paragraphs: ['ဤသဘောတူညီချက်ကို လိုအပ်သလို ပြင်ဆင်နိုင်သည်။'] },
        { title: 'အပိုဒ် ၇ – သက်ဆိုင်သောဥပဒေ', paragraphs: ['ဤသဘောတူညီချက်သည် ဂျပန် ဥပဒေဖြင့် စီမံဆောင်ရွက်သည်။'] },
      ],
    },
    privacy: {
      title: 'ကိုယ်ရေးကိုယ်တာ မူဝါဒ',
      updatedAt: 'နောက်ဆုံးမွမ်းမံသည့်နေ့: မတ် ၃၀, ၂၀၂၆',
      sections: [
        { title: 'အပိုဒ် ၁ – ကျွန်ုပ်တို့ စုဆောင်းသောဒေတာ', subsections: [{ title: 'စီမံခန့်ခွဲသူများ', items: ['အီးမေးလ်လိပ်စာ', 'စီမံခန့်ခွဲသူ အမည်', 'Tenant အမည်', 'ဝင်ရောက်သည့်အချိန်'] }, { title: 'ဝန်ထမ်းများ', items: ['နာမည်အပြည့်', 'PIN (hash အဖြစ်သိမ်းဆည်း)', 'လေ့ကျင့်မှုမှတ်တမ်း၊ စစ်ဆေးမှုရလဒ်နှင့် အမှတ်', 'အဖြေ မှတ်တမ်းများ'] }, { title: 'အလိုအလျောက် စုဆောင်းသော', items: ['ဝင်ရောက်မှု မှတ်တမ်းများ (IP လိပ်စာ၊ ဘရောက်ဆာ အချက်အလက်)'] }] },
        { title: 'အပိုဒ် ၂ – ဒေတာ အသုံးပြုပုံ', items: ['ဝန်ဆောင်မှု ပေးဆောင်ခြင်းနှင့် ဆောင်ရွက်ခြင်း', 'အကောင့် အတည်ပြုခြင်းနှင့် လုံခြုံရေး', 'လေ့ကျင့်မှု တိုးတက်မှုနှင့် စစ်ဆေးမှုရလဒ် စီမံခန့်ခွဲမှု', 'ဝန်ဆောင်မှု တိုးတက်မှုအတွက် စာရင်းဇယား ခွဲခြမ်းစိတ်ဖြာမှု', 'အရေးကြီးသော ကြေငြာချက်များ'] },
        { title: 'အပိုဒ် ၃ – တတိယပါတီနှင့် မျှဝေခြင်း', paragraphs: ['အောက်ပါကိစ္စများမှ လွဲ၍ ဒေတာကို တတိယပါတီနှင့် မျှဝေမပေးပါ:'], items: ['အသုံးပြုသူ၏ ကြိုတင်သဘောတူညီချက်', 'ဥပဒေအရ လိုအပ်သောအခါ'], subsections: [{ title: 'အသုံးပြုသော ပြင်ပဝန်ဆောင်မှုများ', items: ['Supabase (အမေရိကန်): ဒေတာဘေ့စ်နှင့် အတည်ပြုခြင်း', 'Cloudflare (အမေရိကန်): Hosting နှင့် CDN'] }] },
        { title: 'အပိုဒ် ၄ – ဒေတာ သိမ်းဆည်းကာလ', table: [{ label: 'စီမံခန့်ခွဲသူ အကောင့်', value: 'ဖျက်ပြီး ၃၀ ရက်ကြာ သိမ်းဆည်းပြီး ဖျက်ပစ်' }, { label: 'ဝန်ထမ်း ဒေတာ', value: 'စီမံခန့်ခွဲသူ မဖျက်မချင်း' }, { label: 'လေ့ကျင့်မှုနှင့် စစ်ဆေးမှု မှတ်တမ်း', value: 'အကောင့် ဖျက်သောအခါ ဖျက်ပစ်' }, { label: 'ဝင်ရောက်မှု မှတ်တမ်း', value: 'အများဆုံး ၉၀ ရက်' }] },
        { title: 'အပိုဒ် ၅ – လုံခြုံရေး', items: ['ဆက်သွယ်မှုအားလုံးကို HTTPS (TLS) ဖြင့် ကုဒ်ဝှက်', 'PIN ကို hash အဖြစ်သိမ်းဆည်း', 'ဒေတာဘေ့စ် ဝင်ရောက်မှုကို Row Level Security ဖြင့် ကန့်သတ်'] },
        { title: 'အပိုဒ် ၆ – အသုံးပြုသူ အခွင့်အရေး', items: ['ဒေတာ ဖော်ထုတ်ခြင်း၊ ပြင်ဆင်ခြင်း သို့မဟုတ် ဖျက်ခြင်း တောင်းဆိုနိုင်', 'အကောင့် ဖျက်နိုင်'] },
        { title: 'အပိုဒ် ၇ – မူဝါဒ ပြောင်းလဲခြင်း', paragraphs: ['ဤမူဝါဒကို လိုအပ်သလို ပြင်ဆင်နိုင်သည်။'] },
      ],
    },
  },
}

export function getLegalContent(lang: LangCode): LegalContent {
  return content[lang] ?? content.ja
}
