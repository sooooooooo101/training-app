import { useLanguageStore } from '../stores/languageStore'
import type { LangCode } from './i18n'

const lp = {
  ja: {
    heroTitle: '飲食店向け研修システム',
    heroSub: 'チームをより速く育て、進捗を追跡し、品質を確保 — ひとつのプラットフォームで。',
    startFree: '無料で始める',
    tryDemo: 'デモを試す',
    featuresTitle: 'TrainKit の特徴',
    f1Title: '数分でトレーニング作成',
    f1Desc: '動画・画像・テキストでコースを作成。技術知識は不要。',
    f2Title: 'AIクイズ自動生成',
    f2Desc: 'AIがコース内容からクイズを自動生成します。',
    f3Title: '従業員の進捗を追跡',
    f3Desc: '全スタッフのスコアと受講状況を一目で確認。',
    comingSoon: '近日公開',
    useCasesTitle: '飲食店向けに設計',
    useCasesSub: '実際の飲食店オーナーが使うユースケース',
    uc1Title: 'スタッフのオンボーディング',
    uc1Desc: '新入社員を初日から即戦力に。',
    uc2Title: '衛生研修',
    uc2Desc: '全員が食品安全基準を満たせるよう徹底管理。',
    uc3Title: 'カスタマーサービス研修',
    uc3Desc: 'ゲスト対応・クレーム処理を標準化。',
    pricingTitle: 'シンプルな料金体系',
    freeDesc: '5名まで無料',
    proDesc: '無制限 + AI機能',
    ctaTitle: 'チームを育てる準備はできていますか？',
    ctaSub: '無料で始めよう — クレジットカード不要。',
    footerTerms: '利用規約',
    footerPrivacy: 'プライバシー',
    footerContact: 'お問い合わせ',
    // Demo
    demoBanner: '👋 これはデモです。ログイン不要 — 自由にお試しください！',
    demoMyTraining: 'マイトレーニング',
    demoHello: 'こんにちは、デモスタッフ 👋',
    demoStart: '研修を開始 →',
    demoBackHome: '← ホームに戻る',
    demoBack: '← 戻る',
    demoCta: 'このシステムをレストランに導入する →',
    demoCtaSub: 'このシステムをあなたのレストランで使いますか？',
    demoSubmit: '回答を提出',
    demoBackCourses: '← コース一覧に戻る',
    demoWellDone: 'よくできました！',
    demoKeepPracticing: '練習を続けましょう！',
    demoCorrect: '{score} / {total} 問正解',
    demoTakeQuiz: 'クイズを受ける（{n}問）',
    demoTenantName: 'さくらレストラン',
    demoAnswered: '{answered} / {total}',
  },
  en: {
    heroTitle: 'Training System for Restaurants',
    heroSub: 'Train your team faster, track progress, and ensure quality — all in one place.',
    startFree: 'Start Free',
    tryDemo: 'Try Demo',
    featuresTitle: 'Why TrainKit?',
    f1Title: 'Create training in minutes',
    f1Desc: 'Build courses with videos, images, and text. No technical skills needed.',
    f2Title: 'AI quiz generation',
    f2Desc: 'Using AI to automatically generate quizzes.',
    f3Title: 'Track employee performance',
    f3Desc: 'See quiz scores and training progress for every staff member.',
    comingSoon: 'Coming soon',
    useCasesTitle: 'Built for restaurants',
    useCasesSub: 'Real use cases from restaurant operators',
    uc1Title: 'Staff onboarding',
    uc1Desc: 'Get new hires productive from day one with structured training.',
    uc2Title: 'Hygiene training',
    uc2Desc: 'Ensure every team member meets food safety standards.',
    uc3Title: 'Customer service training',
    uc3Desc: 'Standardize how your team handles guests and complaints.',
    pricingTitle: 'Simple pricing',
    freeDesc: 'Up to 5 employees',
    proDesc: 'Unlimited employees + AI features',
    ctaTitle: 'Ready to train your team?',
    ctaSub: 'Start for free — no credit card required.',
    footerTerms: 'Terms',
    footerPrivacy: 'Privacy',
    footerContact: 'Contact',
    demoBanner: '👋 This is a demo. No login needed — explore freely!',
    demoMyTraining: 'My Training',
    demoHello: 'Hello, Demo Staff 👋',
    demoStart: 'Start training →',
    demoBackHome: '← Back to home',
    demoBack: '← Back',
    demoCta: 'Use this for my restaurant →',
    demoCtaSub: 'Ready to use this for your restaurant?',
    demoSubmit: 'Submit answers',
    demoBackCourses: 'Back to courses',
    demoWellDone: 'Well done!',
    demoKeepPracticing: 'Keep practicing!',
    demoCorrect: '{score} / {total} correct',
    demoTakeQuiz: 'Take quiz ({n} questions)',
    demoTenantName: 'Sakura Restaurant',
    demoAnswered: '{answered} / {total}',
  },
  vi: {
    heroTitle: 'Hệ thống đào tạo nhà hàng',
    heroSub: 'Đào tạo nhóm nhanh hơn, theo dõi tiến độ và đảm bảo chất lượng — tất cả trong một nơi.',
    startFree: 'Bắt đầu miễn phí',
    tryDemo: 'Dùng thử Demo',
    featuresTitle: 'Tại sao TrainKit?',
    f1Title: 'Tạo đào tạo trong vài phút',
    f1Desc: 'Xây dựng khóa học với video, hình ảnh và văn bản. Không cần kỹ năng kỹ thuật.',
    f2Title: 'Tạo quiz bằng AI',
    f2Desc: 'Sử dụng AI để tự động tạo các bài kiểm tra.',
    f3Title: 'Theo dõi hiệu suất nhân viên',
    f3Desc: 'Xem điểm và tiến độ học của từng nhân viên.',
    comingSoon: 'Sắp ra mắt',
    useCasesTitle: 'Được thiết kế cho nhà hàng',
    useCasesSub: 'Các trường hợp sử dụng thực tế từ chủ nhà hàng',
    uc1Title: 'Đào tạo nhân viên mới',
    uc1Desc: 'Giúp nhân viên mới làm việc hiệu quả ngay từ ngày đầu.',
    uc2Title: 'Đào tạo vệ sinh',
    uc2Desc: 'Đảm bảo mọi thành viên đáp ứng tiêu chuẩn an toàn thực phẩm.',
    uc3Title: 'Đào tạo dịch vụ khách hàng',
    uc3Desc: 'Chuẩn hóa cách nhóm của bạn phục vụ khách và xử lý khiếu nại.',
    pricingTitle: 'Giá đơn giản',
    freeDesc: 'Tối đa 5 nhân viên',
    proDesc: 'Không giới hạn + tính năng AI',
    ctaTitle: 'Sẵn sàng đào tạo nhóm của bạn?',
    ctaSub: 'Bắt đầu miễn phí — không cần thẻ tín dụng.',
    footerTerms: 'Điều khoản',
    footerPrivacy: 'Quyền riêng tư',
    footerContact: 'Liên hệ',
    demoBanner: '👋 Đây là demo. Không cần đăng nhập — khám phá tự do!',
    demoMyTraining: 'Đào tạo của tôi',
    demoHello: 'Xin chào, Nhân viên Demo 👋',
    demoStart: 'Bắt đầu đào tạo →',
    demoBackHome: '← Về trang chủ',
    demoBack: '← Quay lại',
    demoCta: 'Dùng cho nhà hàng của tôi →',
    demoCtaSub: 'Sẵn sàng dùng hệ thống này cho nhà hàng của bạn?',
    demoSubmit: 'Nộp câu trả lời',
    demoBackCourses: 'Về danh sách khóa học',
    demoWellDone: 'Xuất sắc!',
    demoKeepPracticing: 'Tiếp tục luyện tập!',
    demoCorrect: '{score} / {total} câu đúng',
    demoTakeQuiz: 'Làm bài kiểm tra ({n} câu)',
    demoTenantName: 'Nhà hàng Sakura',
    demoAnswered: '{answered} / {total}',
  },
  zh: {
    heroTitle: '餐厅培训管理系统',
    heroSub: '更快培训团队，追踪进度，确保品质 — 一站式管理。',
    startFree: '免费开始',
    tryDemo: '体验演示',
    featuresTitle: '为什么选择 TrainKit？',
    f1Title: '几分钟内创建培训',
    f1Desc: '使用视频、图片和文字创建课程，无需技术知识。',
    f2Title: 'AI 自动生成测验',
    f2Desc: '利用 AI 自动生成测验题目。',
    f3Title: '追踪员工表现',
    f3Desc: '查看每位员工的测验成绩和培训进度。',
    comingSoon: '即将推出',
    useCasesTitle: '专为餐厅设计',
    useCasesSub: '来自餐厅经营者的真实使用案例',
    uc1Title: '员工入职培训',
    uc1Desc: '让新员工从第一天起就能高效工作。',
    uc2Title: '卫生培训',
    uc2Desc: '确保每位团队成员符合食品安全标准。',
    uc3Title: '客户服务培训',
    uc3Desc: '统一团队接待客人和处理投诉的方式。',
    pricingTitle: '简单定价',
    freeDesc: '最多 5 名员工',
    proDesc: '无限员工 + AI 功能',
    ctaTitle: '准备好培训您的团队了吗？',
    ctaSub: '免费开始 — 无需信用卡。',
    footerTerms: '使用条款',
    footerPrivacy: '隐私政策',
    footerContact: '联系我们',
    demoBanner: '👋 这是演示模式。无需登录 — 自由探索！',
    demoMyTraining: '我的培训',
    demoHello: '你好，演示员工 👋',
    demoStart: '开始培训 →',
    demoBackHome: '← 返回首页',
    demoBack: '← 返回',
    demoCta: '为我的餐厅使用 →',
    demoCtaSub: '准备好在您的餐厅使用这个系统了吗？',
    demoSubmit: '提交答案',
    demoBackCourses: '返回课程列表',
    demoWellDone: '做得好！',
    demoKeepPracticing: '继续练习！',
    demoCorrect: '{score} / {total} 正确',
    demoTakeQuiz: '参加测验（{n} 题）',
    demoTenantName: '樱花餐厅',
    demoAnswered: '{answered} / {total}',
  },
  tl: {
    heroTitle: 'Sistema ng Pagsasanay para sa mga Restawran',
    heroSub: 'Sanayin ang iyong koponan nang mas mabilis, subaybayan ang progreso, at tiyaking may kalidad — lahat sa isang lugar.',
    startFree: 'Magsimulang Libre',
    tryDemo: 'Subukan ang Demo',
    featuresTitle: 'Bakit TrainKit?',
    f1Title: 'Gumawa ng pagsasanay sa ilang minuto',
    f1Desc: 'Bumuo ng mga kurso gamit ang video, larawan, at teksto. Hindi kailangan ng teknikal na kaalaman.',
    f2Title: 'Awtomatikong paglikha ng quiz gamit ang AI',
    f2Desc: 'Gumagamit ng AI para awtomatikong lumikha ng mga pagsubok.',
    f3Title: 'Subaybayan ang pagganap ng empleyado',
    f3Desc: 'Tingnan ang mga marka ng pagsubok at progreso ng pagsasanay ng bawat kawani.',
    comingSoon: 'Malapit nang dumating',
    useCasesTitle: 'Dinisenyo para sa mga restawran',
    useCasesSub: 'Tunay na mga kaso mula sa mga may-ari ng restawran',
    uc1Title: 'Onboarding ng kawani',
    uc1Desc: 'Gawing produktibo ang mga bagong empleyado mula sa unang araw.',
    uc2Title: 'Pagsasanay sa kalinisan',
    uc2Desc: 'Tiyakin na natutugunan ng bawat miyembro ang mga pamantayan sa kaligtasan ng pagkain.',
    uc3Title: 'Pagsasanay sa serbisyo sa customer',
    uc3Desc: 'I-standardize kung paano pinamamahalaan ng iyong koponan ang mga bisita at reklamo.',
    pricingTitle: 'Simpleng presyo',
    freeDesc: 'Hanggang 5 empleyado',
    proDesc: 'Walang limitasyon + AI features',
    ctaTitle: 'Handa na bang sanayin ang iyong koponan?',
    ctaSub: 'Magsimula nang libre — walang kailangang credit card.',
    footerTerms: 'Mga Tuntunin',
    footerPrivacy: 'Pribasidad',
    footerContact: 'Makipag-ugnayan',
    demoBanner: '👋 Ito ay isang demo. Hindi kailangan ng login — mag-explore nang libre!',
    demoMyTraining: 'Aking Pagsasanay',
    demoHello: 'Kamusta, Demo Staff 👋',
    demoStart: 'Simulan ang pagsasanay →',
    demoBackHome: '← Bumalik sa home',
    demoBack: '← Bumalik',
    demoCta: 'Gamitin para sa aking restawran →',
    demoCtaSub: 'Handa nang gamitin ito para sa iyong restawran?',
    demoSubmit: 'Isumite ang mga sagot',
    demoBackCourses: 'Bumalik sa mga kurso',
    demoWellDone: 'Magaling!',
    demoKeepPracticing: 'Magpatuloy sa pagsasanay!',
    demoCorrect: '{score} / {total} tama',
    demoTakeQuiz: 'Kumuha ng quiz ({n} tanong)',
    demoTenantName: 'Restawran Sakura',
    demoAnswered: '{answered} / {total}',
  },
  pt: {
    heroTitle: 'Sistema de Treinamento para Restaurantes',
    heroSub: 'Treine sua equipe mais rápido, acompanhe o progresso e garanta qualidade — tudo em um só lugar.',
    startFree: 'Começar Grátis',
    tryDemo: 'Experimentar Demo',
    featuresTitle: 'Por que TrainKit?',
    f1Title: 'Crie treinamentos em minutos',
    f1Desc: 'Monte cursos com vídeos, imagens e texto. Sem necessidade de habilidades técnicas.',
    f2Title: 'Geração de quiz com IA',
    f2Desc: 'Usando IA para gerar quizzes automaticamente.',
    f3Title: 'Acompanhe o desempenho dos funcionários',
    f3Desc: 'Veja pontuações e progresso de treinamento de cada colaborador.',
    comingSoon: 'Em breve',
    useCasesTitle: 'Feito para restaurantes',
    useCasesSub: 'Casos de uso reais de operadores de restaurantes',
    uc1Title: 'Integração de funcionários',
    uc1Desc: 'Torne os novos colaboradores produtivos desde o primeiro dia.',
    uc2Title: 'Treinamento de higiene',
    uc2Desc: 'Garanta que todos os membros atendam aos padrões de segurança alimentar.',
    uc3Title: 'Treinamento de atendimento ao cliente',
    uc3Desc: 'Padronize como sua equipe atende clientes e lida com reclamações.',
    pricingTitle: 'Preço simples',
    freeDesc: 'Até 5 funcionários',
    proDesc: 'Funcionários ilimitados + recursos de IA',
    ctaTitle: 'Pronto para treinar sua equipe?',
    ctaSub: 'Comece gratuitamente — sem cartão de crédito.',
    footerTerms: 'Termos',
    footerPrivacy: 'Privacidade',
    footerContact: 'Contato',
    demoBanner: '👋 Este é um demo. Sem necessidade de login — explore livremente!',
    demoMyTraining: 'Meu Treinamento',
    demoHello: 'Olá, Colaborador Demo 👋',
    demoStart: 'Iniciar treinamento →',
    demoBackHome: '← Voltar ao início',
    demoBack: '← Voltar',
    demoCta: 'Usar para meu restaurante →',
    demoCtaSub: 'Pronto para usar isso no seu restaurante?',
    demoSubmit: 'Enviar respostas',
    demoBackCourses: 'Voltar aos cursos',
    demoWellDone: 'Muito bem!',
    demoKeepPracticing: 'Continue praticando!',
    demoCorrect: '{score} / {total} corretas',
    demoTakeQuiz: 'Fazer quiz ({n} questões)',
    demoTenantName: 'Restaurante Sakura',
    demoAnswered: '{answered} / {total}',
  },
  ko: {
    heroTitle: '레스토랑을 위한 교육 시스템',
    heroSub: '팀을 더 빠르게 교육하고, 진도를 추적하며, 품질을 보장하세요 — 모두 한 곳에서.',
    startFree: '무료로 시작',
    tryDemo: '데모 체험',
    featuresTitle: 'TrainKit을 선택하는 이유',
    f1Title: '몇 분 만에 교육 과정 생성',
    f1Desc: '동영상, 이미지, 텍스트로 코스를 만드세요. 기술 지식 불필요.',
    f2Title: 'AI 퀴즈 자동 생성',
    f2Desc: 'AI를 사용하여 자동으로 퀴즈를 생성합니다.',
    f3Title: '직원 성과 추적',
    f3Desc: '모든 직원의 퀴즈 점수와 교육 진도를 확인하세요.',
    comingSoon: '곧 출시',
    useCasesTitle: '레스토랑을 위해 설계됨',
    useCasesSub: '레스토랑 운영자의 실제 사용 사례',
    uc1Title: '직원 온보딩',
    uc1Desc: '신입 직원이 첫날부터 생산적으로 일할 수 있도록 지원.',
    uc2Title: '위생 교육',
    uc2Desc: '모든 팀원이 식품 안전 기준을 충족하도록 보장.',
    uc3Title: '고객 서비스 교육',
    uc3Desc: '팀이 고객을 응대하고 불만을 처리하는 방식을 표준화.',
    pricingTitle: '간단한 요금제',
    freeDesc: '최대 직원 5명',
    proDesc: '무제한 직원 + AI 기능',
    ctaTitle: '팀 교육을 시작할 준비가 되셨나요?',
    ctaSub: '무료로 시작하세요 — 신용카드 불필요.',
    footerTerms: '이용약관',
    footerPrivacy: '개인정보처리방침',
    footerContact: '문의하기',
    demoBanner: '👋 이것은 데모입니다. 로그인 없이 자유롭게 체험하세요!',
    demoMyTraining: '내 교육',
    demoHello: '안녕하세요, 데모 직원 👋',
    demoStart: '교육 시작 →',
    demoBackHome: '← 홈으로 돌아가기',
    demoBack: '← 돌아가기',
    demoCta: '내 레스토랑에 사용하기 →',
    demoCtaSub: '레스토랑에서 이 시스템을 사용할 준비가 되셨나요?',
    demoSubmit: '답안 제출',
    demoBackCourses: '코스 목록으로 돌아가기',
    demoWellDone: '잘했어요!',
    demoKeepPracticing: '계속 연습하세요!',
    demoCorrect: '{score} / {total} 정답',
    demoTakeQuiz: '퀴즈 시작 ({n}문제)',
    demoTenantName: '사쿠라 레스토랑',
    demoAnswered: '{answered} / {total}',
  },
  id: {
    heroTitle: 'Sistem Pelatihan untuk Restoran',
    heroSub: 'Latih tim Anda lebih cepat, lacak kemajuan, dan pastikan kualitas — semua dalam satu tempat.',
    startFree: 'Mulai Gratis',
    tryDemo: 'Coba Demo',
    featuresTitle: 'Mengapa TrainKit?',
    f1Title: 'Buat pelatihan dalam hitungan menit',
    f1Desc: 'Buat kursus dengan video, gambar, dan teks. Tidak perlu keahlian teknis.',
    f2Title: 'Pembuatan kuis otomatis dengan AI',
    f2Desc: 'Menggunakan AI untuk membuat kuis secara otomatis.',
    f3Title: 'Lacak performa karyawan',
    f3Desc: 'Lihat nilai kuis dan kemajuan pelatihan setiap karyawan.',
    comingSoon: 'Segera hadir',
    useCasesTitle: 'Dirancang untuk restoran',
    useCasesSub: 'Kasus penggunaan nyata dari pemilik restoran',
    uc1Title: 'Orientasi staf',
    uc1Desc: 'Buat karyawan baru produktif sejak hari pertama.',
    uc2Title: 'Pelatihan kebersihan',
    uc2Desc: 'Pastikan setiap anggota tim memenuhi standar keamanan pangan.',
    uc3Title: 'Pelatihan layanan pelanggan',
    uc3Desc: 'Standardisasi cara tim Anda melayani tamu dan menangani keluhan.',
    pricingTitle: 'Harga sederhana',
    freeDesc: 'Hingga 5 karyawan',
    proDesc: 'Karyawan tak terbatas + fitur AI',
    ctaTitle: 'Siap melatih tim Anda?',
    ctaSub: 'Mulai gratis — tidak perlu kartu kredit.',
    footerTerms: 'Ketentuan',
    footerPrivacy: 'Privasi',
    footerContact: 'Kontak',
    demoBanner: '👋 Ini adalah demo. Tidak perlu login — jelajahi dengan bebas!',
    demoMyTraining: 'Pelatihan Saya',
    demoHello: 'Halo, Staf Demo 👋',
    demoStart: 'Mulai pelatihan →',
    demoBackHome: '← Kembali ke beranda',
    demoBack: '← Kembali',
    demoCta: 'Gunakan untuk restoran saya →',
    demoCtaSub: 'Siap menggunakan ini untuk restoran Anda?',
    demoSubmit: 'Kirim jawaban',
    demoBackCourses: 'Kembali ke kursus',
    demoWellDone: 'Bagus sekali!',
    demoKeepPracticing: 'Terus berlatih!',
    demoCorrect: '{score} / {total} benar',
    demoTakeQuiz: 'Ambil kuis ({n} pertanyaan)',
    demoTenantName: 'Restoran Sakura',
    demoAnswered: '{answered} / {total}',
  },
  th: {
    heroTitle: 'ระบบฝึกอบรมสำหรับร้านอาหาร',
    heroSub: 'ฝึกอบรมทีมได้เร็วขึ้น ติดตามความก้าวหน้า และรับประกันคุณภาพ — ทั้งหมดในที่เดียว',
    startFree: 'เริ่มต้นฟรี',
    tryDemo: 'ทดลองใช้ Demo',
    featuresTitle: 'ทำไมต้อง TrainKit?',
    f1Title: 'สร้างการฝึกอบรมได้ในไม่กี่นาที',
    f1Desc: 'สร้างคอร์สด้วยวิดีโอ รูปภาพ และข้อความ ไม่ต้องมีทักษะด้านเทคนิค',
    f2Title: 'สร้างควิซด้วย AI อัตโนมัติ',
    f2Desc: 'ใช้ AI สร้างแบบทดสอบโดยอัตโนมัติ',
    f3Title: 'ติดตามประสิทธิภาพของพนักงาน',
    f3Desc: 'ดูคะแนนและความก้าวหน้าการฝึกอบรมของพนักงานทุกคน',
    comingSoon: 'เร็วๆ นี้',
    useCasesTitle: 'ออกแบบมาสำหรับร้านอาหาร',
    useCasesSub: 'กรณีการใช้งานจริงจากเจ้าของร้านอาหาร',
    uc1Title: 'การรับพนักงานใหม่',
    uc1Desc: 'ทำให้พนักงานใหม่มีประสิทธิภาพตั้งแต่วันแรก',
    uc2Title: 'การฝึกอบรมด้านสุขอนามัย',
    uc2Desc: 'ตรวจสอบให้แน่ใจว่าสมาชิกทุกคนปฏิบัติตามมาตรฐานความปลอดภัยด้านอาหาร',
    uc3Title: 'การฝึกอบรมการบริการลูกค้า',
    uc3Desc: 'มาตรฐานการต้อนรับแขกและการจัดการข้อร้องเรียน',
    pricingTitle: 'ราคาที่เรียบง่าย',
    freeDesc: 'สูงสุด 5 คน',
    proDesc: 'ไม่จำกัดพนักงาน + ฟีเจอร์ AI',
    ctaTitle: 'พร้อมฝึกอบรมทีมของคุณแล้วหรือยัง?',
    ctaSub: 'เริ่มต้นฟรี — ไม่ต้องใช้บัตรเครดิต',
    footerTerms: 'ข้อกำหนด',
    footerPrivacy: 'ความเป็นส่วนตัว',
    footerContact: 'ติดต่อ',
    demoBanner: '👋 นี่คือเดโม ไม่ต้องเข้าสู่ระบบ — สำรวจได้อย่างอิสระ!',
    demoMyTraining: 'การฝึกอบรมของฉัน',
    demoHello: 'สวัสดี พนักงาน Demo 👋',
    demoStart: 'เริ่มการฝึกอบรม →',
    demoBackHome: '← กลับหน้าหลัก',
    demoBack: '← กลับ',
    demoCta: 'ใช้สำหรับร้านอาหารของฉัน →',
    demoCtaSub: 'พร้อมใช้งานสำหรับร้านอาหารของคุณแล้วหรือยัง?',
    demoSubmit: 'ส่งคำตอบ',
    demoBackCourses: 'กลับไปที่คอร์ส',
    demoWellDone: 'เยี่ยมมาก!',
    demoKeepPracticing: 'ฝึกฝนต่อไป!',
    demoCorrect: '{score} / {total} ถูกต้อง',
    demoTakeQuiz: 'ทำแบบทดสอบ ({n} ข้อ)',
    demoTenantName: 'ร้านอาหารซากุระ',
    demoAnswered: '{answered} / {total}',
  },
  ne: {
    heroTitle: 'रेस्टुरेन्टका लागि तालिम प्रणाली',
    heroSub: 'आफ्नो टोलीलाई छिटो प्रशिक्षण दिनुहोस्, प्रगति ट्र्याक गर्नुहोस् र गुणस्तर सुनिश्चित गर्नुहोस् — सबै एकै ठाउँमा।',
    startFree: 'नि:शुल्क सुरु गर्नुहोस्',
    tryDemo: 'डेमो प्रयास गर्नुहोस्',
    featuresTitle: 'TrainKit किन?',
    f1Title: 'केही मिनेटमा तालिम बनाउनुहोस्',
    f1Desc: 'भिडियो, तस्वीर र पाठसहित कोर्स बनाउनुहोस्। प्राविधिक ज्ञान आवश्यक छैन।',
    f2Title: 'AI क्विज स्वत: उत्पादन',
    f2Desc: 'AI प्रयोग गरेर स्वचालित रूपमा क्विज उत्पन्न गर्दछ।',
    f3Title: 'कर्मचारी प्रदर्शन ट्र्याक गर्नुहोस्',
    f3Desc: 'प्रत्येक कर्मचारीको स्कोर र प्रगति हेर्नुहोस्।',
    comingSoon: 'चाँडै आउँदैछ',
    useCasesTitle: 'रेस्टुरेन्टका लागि डिजाइन गरिएको',
    useCasesSub: 'रेस्टुरेन्ट सञ्चालकहरूको वास्तविक प्रयोग केसहरू',
    uc1Title: 'कर्मचारी अनबोर्डिङ',
    uc1Desc: 'नयाँ कर्मचारीहरूलाई पहिलो दिनदेखि नै उत्पादक बनाउनुहोस्।',
    uc2Title: 'स्वच्छता तालिम',
    uc2Desc: 'प्रत्येक टोली सदस्यले खाद्य सुरक्षा मापदण्ड पूरा गरेको सुनिश्चित गर्नुहोस्।',
    uc3Title: 'ग्राहक सेवा तालिम',
    uc3Desc: 'आफ्नो टोलीले अतिथि र गुनासाहरू कसरी सम्हाल्छ भनेर मानकीकरण गर्नुहोस्।',
    pricingTitle: 'सरल मूल्य निर्धारण',
    freeDesc: 'अधिकतम ५ कर्मचारी',
    proDesc: 'असीमित कर्मचारी + AI सुविधाहरू',
    ctaTitle: 'आफ्नो टोलीलाई प्रशिक्षण दिन तयार हुनुहुन्छ?',
    ctaSub: 'नि:शुल्क सुरु गर्नुहोस् — क्रेडिट कार्ड आवश्यक छैन।',
    footerTerms: 'सर्तहरू',
    footerPrivacy: 'गोपनीयता',
    footerContact: 'सम्पर्क',
    demoBanner: '👋 यो डेमो हो। लगइन आवश्यक छैन — स्वतन्त्र रूपमा अन्वेषण गर्नुहोस्!',
    demoMyTraining: 'मेरो तालिम',
    demoHello: 'नमस्ते, डेमो कर्मचारी 👋',
    demoStart: 'तालिम सुरु गर्नुहोस् →',
    demoBackHome: '← गृहपृष्ठमा फर्कनुहोस्',
    demoBack: '← फर्कनुहोस्',
    demoCta: 'मेरो रेस्टुरेन्टका लागि प्रयोग गर्नुहोस् →',
    demoCtaSub: 'तपाईंको रेस्टुरेन्टका लागि यो प्रयोग गर्न तयार हुनुहुन्छ?',
    demoSubmit: 'उत्तरहरू पेश गर्नुहोस्',
    demoBackCourses: 'कोर्सहरूमा फर्कनुहोस्',
    demoWellDone: 'राम्रो काम!',
    demoKeepPracticing: 'अभ्यास जारी राख्नुहोस्!',
    demoCorrect: '{score} / {total} सही',
    demoTakeQuiz: 'क्विज लिनुहोस् ({n} प्रश्न)',
    demoTenantName: 'सकुरा रेस्टुरेन्ट',
    demoAnswered: '{answered} / {total}',
  },
  my: {
    heroTitle: 'စားသောက်ဆိုင်များအတွက် လေ့ကျင့်ရေးစနစ်',
    heroSub: 'သင့်အဖွဲ့အား ပိုမိုမြန်ဆန်စွာ သင်တန်းပေးပါ၊ တိုးတက်မှုကို ခြေရာခံပါ၊ အရည်အသွေးကို သေချာပါ — အားလုံးကို တစ်နေရာတည်းမှ။',
    startFree: 'အခမဲ့ စတင်ပါ',
    tryDemo: 'ဒီမိုကြည့်ပါ',
    featuresTitle: 'ဘာကြောင့် TrainKit?',
    f1Title: 'မိနစ်အနည်းငယ်အတွင်း သင်တန်းဖန်တီးပါ',
    f1Desc: 'ဗီဒီယို၊ ပုံများနှင့် စာသားဖြင့် သင်တန်းများ ဖန်တီးပါ။ နည်းပညာဆိုင်ရာ ကျွမ်းကျင်မှု မလိုအပ်ပါ။',
    f2Title: 'AI ဖြင့် စစ်မေးခွန်း အလိုအလျောက် ဖန်တီးခြင်း',
    f2Desc: 'AI ကို အသုံးပြု၍ စစ်မေးခွန်းများကို အလိုအလျောက် ဖန်တီးပါ။',
    f3Title: 'ဝန်ထမ်းစွမ်းဆောင်ရည် ခြေရာခံပါ',
    f3Desc: 'ဝန်ထမ်းတိုင်း၏ စစ်မေးခွန်းရမှတ်နှင့် သင်တန်းတိုးတက်မှုကို ကြည့်ပါ။',
    comingSoon: 'မကြာမီ လာမည်',
    useCasesTitle: 'စားသောက်ဆိုင်များအတွက် ဒီဇိုင်းထုတ်ထားသည်',
    useCasesSub: 'စားသောက်ဆိုင် ပိုင်ရှင်များထံမှ အမှန်တကယ် အသုံးပြုမှု ဥပမာများ',
    uc1Title: 'ဝန်ထမ်း အသစ် လက်ခံရေး',
    uc1Desc: 'ဝန်ထမ်းသစ်များကို ပထမနေ့မှ ထိရောက်အောင် ပြုလုပ်ပါ။',
    uc2Title: 'သန့်ရှင်းရေး သင်တန်း',
    uc2Desc: 'အဖွဲ့ဝင်တိုင်း စားသောက်ကုန် ဘေးကင်းရေး စံနှုန်းများနှင့် ကိုက်ညီကြောင်း သေချာပါစေ။',
    uc3Title: 'ဖောက်သည် ဝန်ဆောင်မှု သင်တန်း',
    uc3Desc: 'သင့်အဖွဲ့မှ ဧည့်သည်များကို ဆက်ဆံပုံနှင့် တိုင်ကြားချက်များ ဖြေရှင်းပုံကို စံနှုန်းချပါ။',
    pricingTitle: 'ရိုးရှင်းသော စျေးနှုန်း',
    freeDesc: 'ဝန်ထမ်း ၅ ဦးအထိ',
    proDesc: 'ဝန်ထမ်း အကန့်အသတ်မရှိ + AI အင်္ဂါရပ်များ',
    ctaTitle: 'သင့်အဖွဲ့အား သင်တန်းပေးရန် အဆင်သင့်ဖြစ်ပြီလား?',
    ctaSub: 'အခမဲ့ စတင်ပါ — ခရက်ဒစ်ကတ် မလိုအပ်ပါ။',
    footerTerms: 'စည်းမျဉ်းများ',
    footerPrivacy: 'ကိုယ်ရေးကိုယ်တာ',
    footerContact: 'ဆက်သွယ်ပါ',
    demoBanner: '👋 ဤသည် ဒီမိုဖြစ်သည်။ အကောင့်ဝင်ရန် မလိုပါ — လွတ်လပ်စွာ စူးစမ်းပါ!',
    demoMyTraining: 'ကျွန်ုပ်၏ သင်တန်း',
    demoHello: 'မင်္ဂလာပါ၊ ဒီမို ဝန်ထမ်း 👋',
    demoStart: 'သင်တန်း စတင်ပါ →',
    demoBackHome: '← မူလပင်မသို့ ပြန်သွားပါ',
    demoBack: '← ပြန်သွားပါ',
    demoCta: 'ကျွန်ုပ်၏ စားသောက်ဆိုင်အတွက် အသုံးပြုပါ →',
    demoCtaSub: 'သင့်စားသောက်ဆိုင်အတွက် ဤစနစ်ကို အသုံးပြုရန် အဆင်သင့်ဖြစ်ပြီလား?',
    demoSubmit: 'အဖြေများ တင်သွင်းပါ',
    demoBackCourses: 'သင်တန်းများသို့ ပြန်သွားပါ',
    demoWellDone: 'ကောင်းသောလုပ်ဆောင်မှု!',
    demoKeepPracticing: 'ဆက်လက် လေ့ကျင့်ပါ!',
    demoCorrect: '{score} / {total} မှန်သည်',
    demoTakeQuiz: 'စစ်မေးခွန်း ဖြေဆိုပါ ({n} မေးခွန်း)',
    demoTenantName: 'ဆာကူရာ စားသောက်ဆိုင်',
    demoAnswered: '{answered} / {total}',
  },
} as const

type LpDict = typeof lp.en
type LpKey = keyof LpDict

function replaceLpParams(str: string, params?: Record<string, string | number>): string {
  if (!params) return str
  let result = str
  for (const [k, v] of Object.entries(params)) {
    result = result.replace(`{${k}}`, String(v))
  }
  return result
}

export function translateLp(lang: LangCode, key: LpKey, params?: Record<string, string | number>): string {
  const dict = (lp[lang] as LpDict | undefined) ?? lp.en
  const str = dict[key] ?? lp.en[key]
  return replaceLpParams(str, params)
}

// ─── Demo course data ────────────────────────────────────────────────────────

type Choice = { id: string; body: string }
type Question = { id: string; body: string; choices: Choice[]; correct: string }
type Course = { id: string; title: string; description: string; emoji: string; content: string; quiz: Question[] }

const demoCourses: Record<LangCode, Course[]> = {
  ja: [
    {
      id: 'hygiene',
      title: '飲食店の衛生管理基礎',
      description: '全スタッフが知っておくべき食品安全・衛生の基本。',
      emoji: '🧼',
      content: `**なぜ衛生管理が大切か**

食品安全はすべての飲食店の基盤です。不十分な衛生管理は食中毒・保健所への違反・評判の失墜を招きます。

**基本的な実践**

1. **手洗い** — 食品を扱う前、生肉に触れた後、トイレを使用した後は、少なくとも20秒間手を洗ってください。

2. **温度管理** — 温かい食品は60℃以上、冷たい食品は5℃以下に保ちます。食品を「危険温度帯」（5〜60℃）に2時間以上放置しないでください。

3. **交差汚染の防止** — 生肉、野菜、調理済み食品には別々のまな板と器具を使用します。冷蔵庫では生肉を調理済み食品の下に保管してください。

4. **表面の消毒** — 食品に触れる表面はサービス中に4時間ごと、生肉との接触後は直ちに清掃・消毒してください。

5. **個人の衛生** — 爪を短く清潔に保ちます。食品を扱う際は装飾品を着用しないでください。体調不良の際は出勤を控えてください。`,
      quiz: [
        {
          id: 'q1',
          body: '食品を扱う前に手を洗う時間はどのくらいですか？',
          choices: [
            { id: 'a', body: '5秒' },
            { id: 'b', body: '10秒' },
            { id: 'c', body: '20秒' },
            { id: 'd', body: '60秒' },
          ],
          correct: 'c',
        },
        {
          id: 'q2',
          body: '食品の「危険温度帯」はどの範囲ですか？',
          choices: [
            { id: 'a', body: '0℃〜10℃' },
            { id: 'b', body: '5℃〜60℃' },
            { id: 'c', body: '10℃〜70℃' },
            { id: 'd', body: '20℃〜80℃' },
          ],
          correct: 'b',
        },
        {
          id: 'q3',
          body: '冷蔵庫で生肉はどこに保管すべきですか？',
          choices: [
            { id: 'a', body: '最上段' },
            { id: 'b', body: '野菜の隣' },
            { id: 'c', body: '調理済み食品の下' },
            { id: 'd', body: 'どこでも問題ない' },
          ],
          correct: 'c',
        },
      ],
    },
    {
      id: 'service',
      title: 'カスタマーサービス基礎',
      description: '毎回最高のゲスト体験を提供するための基本。',
      emoji: '😊',
      content: `**ゲスト体験はあなたから始まる**

ゲストとのすべてのやり取りが、あなたのお店への印象を決めます。素晴らしいサービスは、初回来店客を常連客に変えます。

**基本原則**

1. **迅速な挨拶** — 忙しくても、来店から30秒以内にゲストに声をかけましょう。「いらっしゃいませ、すぐに参ります！」の一言が大きな違いを生みます。

2. **積極的な傾聴** — ゲストが話しているときは、しっかりと向き合います。注文内容を復唱して確認しましょう。

3. **メニューを熟知する** — アレルゲンや調理方法を含め、すべての料理を説明できるよう準備しましょう。分からない場合は必ず確認し、推測で答えないでください。

4. **クレームはHEATで対応**
   - **H**ear（最後まで話を聞く）
   - **E**mpathize（共感する：「おっしゃる通りです」）
   - **A**pologize（誠意をもって謝罪する）
   - **T**ake action（すぐに対処する）

5. **お見送りも大切** — 名前が分かる場合は名前で呼びかけましょう。また来店を促す言葉を添えて。温かいお見送りは歓迎と同じくらい重要です。`,
      quiz: [
        {
          id: 'q1',
          body: 'ゲストが来店したら何秒以内に声をかけるべきですか？',
          choices: [
            { id: 'a', body: '30秒以内' },
            { id: 'b', body: '2分以内' },
            { id: 'c', body: '今の作業が終わってから' },
            { id: 'd', body: '着席してから' },
          ],
          correct: 'a',
        },
        {
          id: 'q2',
          body: '料理について確信が持てない場合はどうすべきですか？',
          choices: [
            { id: 'a', body: '一番良さそうな回答をする' },
            { id: 'b', body: '「美味しいですよ」と伝える' },
            { id: 'c', body: '正しい情報を確認する' },
            { id: 'd', body: '別の料理を勧める' },
          ],
          correct: 'c',
        },
        {
          id: 'q3',
          body: 'クレーム対応の「HEAT」で「A」は何を意味しますか？',
          choices: [
            { id: 'a', body: '質問する（Ask）' },
            { id: 'b', body: '誠意をもって謝罪する（Apologize）' },
            { id: 'c', body: 'エスカレーションを避ける（Avoid）' },
            { id: 'd', body: '素早く行動する（Act）' },
          ],
          correct: 'b',
        },
      ],
    },
  ],

  en: [
    {
      id: 'hygiene',
      title: 'Restaurant hygiene basics',
      description: 'Essential food safety and hygiene practices for all restaurant staff.',
      emoji: '🧼',
      content: `**Why hygiene matters**

Food safety is the foundation of every restaurant. Poor hygiene can cause foodborne illness, health code violations, and permanent damage to your reputation.

**Key practices**

1. **Handwashing** — Wash hands for at least 20 seconds before handling food, after touching raw meat, and after using the restroom.

2. **Temperature control** — Keep hot foods above 60°C and cold foods below 5°C. Never leave food in the "danger zone" (5–60°C) for more than 2 hours.

3. **Cross-contamination prevention** — Use separate cutting boards and utensils for raw meat, vegetables, and ready-to-eat foods. Always store raw meat below ready-to-eat foods in the refrigerator.

4. **Surface sanitization** — Clean and sanitize all food-contact surfaces every 4 hours during service, and immediately after contact with raw meat.

5. **Personal hygiene** — Keep fingernails short and clean. Do not wear jewelry while handling food. Stay home when sick.`,
      quiz: [
        {
          id: 'q1',
          body: 'How long should you wash your hands before handling food?',
          choices: [
            { id: 'a', body: '5 seconds' },
            { id: 'b', body: '10 seconds' },
            { id: 'c', body: '20 seconds' },
            { id: 'd', body: '60 seconds' },
          ],
          correct: 'c',
        },
        {
          id: 'q2',
          body: 'What is the "danger zone" temperature range for food?',
          choices: [
            { id: 'a', body: '0°C – 10°C' },
            { id: 'b', body: '5°C – 60°C' },
            { id: 'c', body: '10°C – 70°C' },
            { id: 'd', body: '20°C – 80°C' },
          ],
          correct: 'b',
        },
        {
          id: 'q3',
          body: 'Where should raw meat be stored in the refrigerator?',
          choices: [
            { id: 'a', body: 'On the top shelf' },
            { id: 'b', body: 'Next to vegetables' },
            { id: 'c', body: 'Below ready-to-eat foods' },
            { id: 'd', body: 'It does not matter' },
          ],
          correct: 'c',
        },
      ],
    },
    {
      id: 'service',
      title: 'Customer service 101',
      description: 'How to deliver exceptional guest experiences every time.',
      emoji: '😊',
      content: `**The guest experience starts with you**

Every interaction with a guest shapes how they feel about your restaurant. Great service turns first-time visitors into loyal regulars.

**Core principles**

1. **Greet promptly** — Acknowledge guests within 30 seconds of arrival, even if you're busy. A simple "Welcome, I'll be right with you!" goes a long way.

2. **Listen actively** — Give guests your full attention when they're speaking. Repeat back their order to confirm accuracy.

3. **Know your menu** — Be prepared to explain every dish, including allergens and preparation methods. If you don't know, find out — don't guess.

4. **Handle complaints with HEAT**
   - **H**ear them out (let them finish)
   - **E**mpathize ("I completely understand")
   - **A**pologize sincerely
   - **T**ake action immediately

5. **The farewell matters** — Thank guests by name if you know it. Invite them to return. A warm goodbye is as important as the welcome.`,
      quiz: [
        {
          id: 'q1',
          body: 'How quickly should you acknowledge a guest who has arrived?',
          choices: [
            { id: 'a', body: 'Within 30 seconds' },
            { id: 'b', body: 'Within 2 minutes' },
            { id: 'c', body: 'When you finish your current task' },
            { id: 'd', body: 'After they sit down' },
          ],
          correct: 'a',
        },
        {
          id: 'q2',
          body: 'What should you do if a guest asks about a dish you are unsure about?',
          choices: [
            { id: 'a', body: 'Make your best guess' },
            { id: 'b', body: "Tell them it's delicious" },
            { id: 'c', body: 'Find out the correct information' },
            { id: 'd', body: 'Recommend a different dish' },
          ],
          correct: 'c',
        },
        {
          id: 'q3',
          body: 'What does the "A" in HEAT stand for when handling complaints?',
          choices: [
            { id: 'a', body: 'Ask questions' },
            { id: 'b', body: 'Apologize sincerely' },
            { id: 'c', body: 'Avoid escalation' },
            { id: 'd', body: 'Act quickly' },
          ],
          correct: 'b',
        },
      ],
    },
  ],

  vi: [
    {
      id: 'hygiene',
      title: 'Kiến thức vệ sinh nhà hàng cơ bản',
      description: 'Thực hành vệ sinh và an toàn thực phẩm thiết yếu cho tất cả nhân viên.',
      emoji: '🧼',
      content: `**Tại sao vệ sinh quan trọng**

An toàn thực phẩm là nền tảng của mọi nhà hàng. Vệ sinh kém có thể gây ngộ độc thực phẩm, vi phạm quy định y tế và làm tổn hại danh tiếng vĩnh viễn.

**Các thực hành chính**

1. **Rửa tay** — Rửa tay ít nhất 20 giây trước khi xử lý thực phẩm, sau khi chạm vào thịt sống và sau khi sử dụng nhà vệ sinh.

2. **Kiểm soát nhiệt độ** — Giữ thực phẩm nóng trên 60°C và thực phẩm lạnh dưới 5°C. Không để thực phẩm trong "vùng nguy hiểm" (5–60°C) quá 2 giờ.

3. **Ngăn ngừa ô nhiễm chéo** — Dùng thớt và dụng cụ riêng cho thịt sống, rau và thực phẩm ăn liền. Luôn bảo quản thịt sống dưới thực phẩm ăn liền trong tủ lạnh.

4. **Khử trùng bề mặt** — Làm sạch và khử trùng tất cả bề mặt tiếp xúc thực phẩm 4 giờ một lần và ngay sau khi tiếp xúc với thịt sống.

5. **Vệ sinh cá nhân** — Giữ móng tay ngắn và sạch. Không đeo trang sức khi xử lý thực phẩm. Nghỉ ở nhà khi bị bệnh.`,
      quiz: [
        {
          id: 'q1',
          body: 'Bạn nên rửa tay bao lâu trước khi xử lý thực phẩm?',
          choices: [
            { id: 'a', body: '5 giây' },
            { id: 'b', body: '10 giây' },
            { id: 'c', body: '20 giây' },
            { id: 'd', body: '60 giây' },
          ],
          correct: 'c',
        },
        {
          id: 'q2',
          body: 'Phạm vi nhiệt độ "vùng nguy hiểm" của thực phẩm là bao nhiêu?',
          choices: [
            { id: 'a', body: '0°C – 10°C' },
            { id: 'b', body: '5°C – 60°C' },
            { id: 'c', body: '10°C – 70°C' },
            { id: 'd', body: '20°C – 80°C' },
          ],
          correct: 'b',
        },
        {
          id: 'q3',
          body: 'Thịt sống nên được bảo quản ở đâu trong tủ lạnh?',
          choices: [
            { id: 'a', body: 'Kệ trên cùng' },
            { id: 'b', body: 'Bên cạnh rau' },
            { id: 'c', body: 'Dưới thực phẩm ăn liền' },
            { id: 'd', body: 'Không quan trọng' },
          ],
          correct: 'c',
        },
      ],
    },
    {
      id: 'service',
      title: 'Dịch vụ khách hàng cơ bản',
      description: 'Cách mang lại trải nghiệm tuyệt vời cho khách mỗi lần.',
      emoji: '😊',
      content: `**Trải nghiệm khách hàng bắt đầu từ bạn**

Mỗi tương tác với khách hàng định hình cảm nhận của họ về nhà hàng. Dịch vụ tốt biến khách lần đầu thành khách quen.

**Nguyên tắc cốt lõi**

1. **Chào đón kịp thời** — Chú ý đến khách trong vòng 30 giây kể từ khi họ đến, dù bạn bận. Một câu "Xin chào, tôi sẽ phục vụ ngay!" rất có ý nghĩa.

2. **Lắng nghe tích cực** — Tập trung hoàn toàn khi khách nói. Nhắc lại đơn gọi để xác nhận.

3. **Biết rõ thực đơn** — Sẵn sàng giải thích mọi món ăn, bao gồm chất gây dị ứng và cách chế biến. Nếu không biết, hãy tìm hiểu — đừng đoán.

4. **Xử lý phàn nàn bằng HEAT**
   - **H**ear — Lắng nghe đến cùng
   - **E**mpathize — Đồng cảm ("Tôi hoàn toàn hiểu")
   - **A**pologize — Xin lỗi chân thành
   - **T**ake action — Hành động ngay

5. **Lời tạm biệt quan trọng** — Cảm ơn khách bằng tên nếu bạn biết. Mời họ quay lại. Lời tạm biệt ấm áp cũng quan trọng như lời chào đón.`,
      quiz: [
        {
          id: 'q1',
          body: 'Bạn nên chú ý đến khách trong bao lâu kể từ khi họ đến?',
          choices: [
            { id: 'a', body: 'Trong vòng 30 giây' },
            { id: 'b', body: 'Trong vòng 2 phút' },
            { id: 'c', body: 'Khi bạn hoàn thành việc hiện tại' },
            { id: 'd', body: 'Sau khi họ ngồi xuống' },
          ],
          correct: 'a',
        },
        {
          id: 'q2',
          body: 'Bạn nên làm gì nếu khách hỏi về món ăn mà bạn không chắc?',
          choices: [
            { id: 'a', body: 'Đoán câu trả lời tốt nhất' },
            { id: 'b', body: 'Nói rằng nó ngon' },
            { id: 'c', body: 'Tìm hiểu thông tin chính xác' },
            { id: 'd', body: 'Gợi ý món khác' },
          ],
          correct: 'c',
        },
        {
          id: 'q3',
          body: '"A" trong HEAT khi xử lý phàn nàn có nghĩa là gì?',
          choices: [
            { id: 'a', body: 'Đặt câu hỏi (Ask)' },
            { id: 'b', body: 'Xin lỗi chân thành (Apologize)' },
            { id: 'c', body: 'Tránh leo thang (Avoid)' },
            { id: 'd', body: 'Hành động nhanh (Act)' },
          ],
          correct: 'b',
        },
      ],
    },
  ],

  zh: [
    {
      id: 'hygiene',
      title: '餐厅卫生基础知识',
      description: '所有餐厅员工必须掌握的食品安全与卫生实践。',
      emoji: '🧼',
      content: `**为什么卫生很重要**

食品安全是每家餐厅的基础。卫生差会导致食物中毒、违反卫生法规，并对声誉造成永久损害。

**关键实践**

1. **洗手** — 在处理食物前、接触生肉后以及使用洗手间后，至少洗手20秒。

2. **温度控制** — 热食保持在60°C以上，冷食保持在5°C以下。不要将食物在"危险温度区"（5–60°C）放置超过2小时。

3. **防止交叉污染** — 生肉、蔬菜和即食食品使用不同的砧板和器具。冰箱中生肉始终放在即食食品的下方。

4. **表面消毒** — 每4小时清洁消毒所有食品接触面，接触生肉后立即清洁。

5. **个人卫生** — 保持指甲短而干净。处理食物时不佩戴首饰。生病时留在家中。`,
      quiz: [
        {
          id: 'q1',
          body: '处理食物前应该洗手多长时间？',
          choices: [
            { id: 'a', body: '5秒' },
            { id: 'b', body: '10秒' },
            { id: 'c', body: '20秒' },
            { id: 'd', body: '60秒' },
          ],
          correct: 'c',
        },
        {
          id: 'q2',
          body: '食品的"危险温度区"是哪个范围？',
          choices: [
            { id: 'a', body: '0°C – 10°C' },
            { id: 'b', body: '5°C – 60°C' },
            { id: 'c', body: '10°C – 70°C' },
            { id: 'd', body: '20°C – 80°C' },
          ],
          correct: 'b',
        },
        {
          id: 'q3',
          body: '生肉应该存放在冰箱的哪个位置？',
          choices: [
            { id: 'a', body: '最上层' },
            { id: 'b', body: '蔬菜旁边' },
            { id: 'c', body: '即食食品下方' },
            { id: 'd', body: '放哪都可以' },
          ],
          correct: 'c',
        },
      ],
    },
    {
      id: 'service',
      title: '客户服务基础',
      description: '每次为客人提供卓越体验的方法。',
      emoji: '😊',
      content: `**客人体验从你开始**

与客人的每一次互动都决定了他们对餐厅的感受。出色的服务能将首次光顾的客人变成忠实常客。

**核心原则**

1. **迅速问候** — 即使繁忙，也要在客人到达后30秒内打招呼。一句简单的"欢迎光临，请稍等！"会产生很大的不同。

2. **积极倾听** — 客人说话时给予全部注意力。复述订单以确认准确性。

3. **熟悉菜单** — 准备好解释每道菜，包括过敏原和烹饪方式。如果不知道，请查明——不要猜测。

4. **用HEAT处理投诉**
   - **H**ear — 让他们说完
   - **E**mpathize — 表示同情（"我完全理解"）
   - **A**pologize — 真诚道歉
   - **T**ake action — 立即采取行动

5. **告别同样重要** — 如果知道客人的名字，请称呼他们。邀请他们再次光临。温暖的告别与欢迎同样重要。`,
      quiz: [
        {
          id: 'q1',
          body: '客人到达后应该多快注意到他们？',
          choices: [
            { id: 'a', body: '30秒内' },
            { id: 'b', body: '2分钟内' },
            { id: 'c', body: '完成当前任务后' },
            { id: 'd', body: '他们坐下后' },
          ],
          correct: 'a',
        },
        {
          id: 'q2',
          body: '如果客人询问你不确定的菜品，你应该怎么做？',
          choices: [
            { id: 'a', body: '说出你最好的猜测' },
            { id: 'b', body: '告诉他们很好吃' },
            { id: 'c', body: '查明正确信息' },
            { id: 'd', body: '推荐其他菜品' },
          ],
          correct: 'c',
        },
        {
          id: 'q3',
          body: '处理投诉时HEAT中的"A"代表什么？',
          choices: [
            { id: 'a', body: '提问（Ask）' },
            { id: 'b', body: '真诚道歉（Apologize）' },
            { id: 'c', body: '避免升级（Avoid）' },
            { id: 'd', body: '迅速行动（Act）' },
          ],
          correct: 'b',
        },
      ],
    },
  ],

  tl: [
    {
      id: 'hygiene',
      title: 'Pangunahing kaalaman sa kalinisan ng restawran',
      description: 'Mahahalagang gawi sa kaligtasan ng pagkain at kalinisan para sa lahat ng kawani.',
      emoji: '🧼',
      content: `**Bakit mahalaga ang kalinisan**

Ang kaligtasan ng pagkain ang pundasyon ng bawat restawran. Ang mahinang kalinisan ay maaaring magdulot ng pagkalason sa pagkain, paglabag sa mga regulasyon, at permanenteng pinsala sa reputasyon.

**Mga pangunahing gawi**

1. **Paghuhugas ng kamay** — Hugasan ang mga kamay nang hindi bababa sa 20 segundo bago hawakan ang pagkain, pagkatapos hawakan ang hilaw na karne, at pagkatapos gumamit ng banyo.

2. **Kontrol sa temperatura** — Panatilihing mainit ang mga pagkain sa itaas ng 60°C at malamig na pagkain sa ibaba ng 5°C. Huwag hayaang ang pagkain sa "danger zone" (5–60°C) nang higit sa 2 oras.

3. **Pag-iwas sa cross-contamination** — Gumamit ng hiwalay na cutting board at kagamitan para sa hilaw na karne, gulay, at ready-to-eat na pagkain. Palaging itago ang hilaw na karne sa ibaba ng ready-to-eat na pagkain sa ref.

4. **Pagdidisimpekta ng ibabaw** — Linisin at disimpektahin ang lahat ng ibabaw na nakikipag-ugnayan sa pagkain tuwing 4 na oras at kaagad pagkatapos makipag-ugnayan sa hilaw na karne.

5. **Personal na kalinisan** — Panatilihing maikli at malinis ang mga kuko. Huwag magsuot ng alahas habang humahawak ng pagkain. Manatili sa bahay kapag may sakit.`,
      quiz: [
        {
          id: 'q1',
          body: 'Gaano katagal dapat hugasan ang mga kamay bago hawakan ang pagkain?',
          choices: [
            { id: 'a', body: '5 segundo' },
            { id: 'b', body: '10 segundo' },
            { id: 'c', body: '20 segundo' },
            { id: 'd', body: '60 segundo' },
          ],
          correct: 'c',
        },
        {
          id: 'q2',
          body: 'Ano ang hanay ng temperatura ng "danger zone" para sa pagkain?',
          choices: [
            { id: 'a', body: '0°C – 10°C' },
            { id: 'b', body: '5°C – 60°C' },
            { id: 'c', body: '10°C – 70°C' },
            { id: 'd', body: '20°C – 80°C' },
          ],
          correct: 'b',
        },
        {
          id: 'q3',
          body: 'Saan dapat itago ang hilaw na karne sa ref?',
          choices: [
            { id: 'a', body: 'Sa pinaka-itaas na istante' },
            { id: 'b', body: 'Sa tabi ng mga gulay' },
            { id: 'c', body: 'Sa ilalim ng ready-to-eat na pagkain' },
            { id: 'd', body: 'Kahit saan ay ok lang' },
          ],
          correct: 'c',
        },
      ],
    },
    {
      id: 'service',
      title: 'Pangunahing serbisyo sa customer',
      description: 'Paano magbigay ng natatanging karanasan sa bisita sa bawat pagkakataon.',
      emoji: '😊',
      content: `**Ang karanasan ng bisita ay nagsisimula sa iyo**

Ang bawat pakikipag-ugnayan sa bisita ay humuhubog sa kanilang pakiramdam tungkol sa iyong restawran. Ang mahusay na serbisyo ay nagpapalit ng mga unang bisita sa tapat na mga regular.

**Mga pangunahing prinsipyo**

1. **Batiin agad** — Kilalanin ang mga bisita sa loob ng 30 segundo ng pagdating, kahit ikaw ay abala. Ang simpleng "Maligayang pagdating, sandali lang po!" ay napakalaking tulong.

2. **Makinig nang aktibo** — Bigyan ng buong atensyon ang mga bisita habang nagsasalita. Ulitin ang order para kumpirmahin ang kawastuhan.

3. **Alamin ang menu** — Maging handa na ipaliwanag ang bawat putahe, kabilang ang mga allergen at paraan ng pagluluto. Kung hindi mo alam, alamin — huwag hulaan.

4. **Harapin ang mga reklamo gamit ang HEAT**
   - **H**ear — Pakinggan hanggang matapos
   - **E**mpathize — Magpakita ng empatiya ("Ganap kong naiintindihan")
   - **A**pologize — Humingi ng tapat na paumanhin
   - **T**ake action — Kumilos agad

5. **Mahalaga rin ang pagpapaalam** — Salamatan ang mga bisita sa kanilang pangalan kung alam mo. Imbitahan silang bumalik. Ang mainit na pagpapaalam ay kasinghalaga ng pagtanggap.`,
      quiz: [
        {
          id: 'q1',
          body: 'Gaano kabilis dapat kilalanin ang bisita na dumating?',
          choices: [
            { id: 'a', body: 'Sa loob ng 30 segundo' },
            { id: 'b', body: 'Sa loob ng 2 minuto' },
            { id: 'c', body: 'Kapag natapos na ang kasalukuyang gawain' },
            { id: 'd', body: 'Pagkatapos maupo' },
          ],
          correct: 'a',
        },
        {
          id: 'q2',
          body: 'Ano ang dapat gawin kung tinanong ng bisita ang tungkol sa putaheng hindi ka sigurado?',
          choices: [
            { id: 'a', body: 'Hulaan ang pinakamahusay na sagot' },
            { id: 'b', body: "Sabihing masarap ito" },
            { id: 'c', body: 'Alamin ang tamang impormasyon' },
            { id: 'd', body: 'Magrekomenda ng ibang putahe' },
          ],
          correct: 'c',
        },
        {
          id: 'q3',
          body: 'Ano ang kahulugan ng "A" sa HEAT kapag hinaharap ang mga reklamo?',
          choices: [
            { id: 'a', body: 'Magtanong (Ask)' },
            { id: 'b', body: 'Humingi ng tapat na paumanhin (Apologize)' },
            { id: 'c', body: 'Iwasan ang escalation (Avoid)' },
            { id: 'd', body: 'Kumilos nang mabilis (Act)' },
          ],
          correct: 'b',
        },
      ],
    },
  ],

  pt: [
    {
      id: 'hygiene',
      title: 'Noções básicas de higiene em restaurantes',
      description: 'Práticas essenciais de segurança alimentar e higiene para todos os funcionários.',
      emoji: '🧼',
      content: `**Por que a higiene é importante**

A segurança alimentar é a base de todo restaurante. Má higiene pode causar intoxicação alimentar, violações de normas sanitárias e danos permanentes à reputação.

**Práticas fundamentais**

1. **Lavagem das mãos** — Lave as mãos por pelo menos 20 segundos antes de manusear alimentos, após tocar em carne crua e após usar o banheiro.

2. **Controle de temperatura** — Mantenha alimentos quentes acima de 60°C e frios abaixo de 5°C. Nunca deixe alimentos na "zona de perigo" (5–60°C) por mais de 2 horas.

3. **Prevenção de contaminação cruzada** — Use tábuas e utensílios separados para carne crua, vegetais e alimentos prontos. Sempre armazene carne crua abaixo de alimentos prontos na geladeira.

4. **Sanitização de superfícies** — Limpe e higienize todas as superfícies em contato com alimentos a cada 4 horas e imediatamente após contato com carne crua.

5. **Higiene pessoal** — Mantenha as unhas curtas e limpas. Não use joias ao manipular alimentos. Fique em casa quando estiver doente.`,
      quiz: [
        {
          id: 'q1',
          body: 'Por quanto tempo você deve lavar as mãos antes de manipular alimentos?',
          choices: [
            { id: 'a', body: '5 segundos' },
            { id: 'b', body: '10 segundos' },
            { id: 'c', body: '20 segundos' },
            { id: 'd', body: '60 segundos' },
          ],
          correct: 'c',
        },
        {
          id: 'q2',
          body: 'Qual é a faixa de temperatura da "zona de perigo" para alimentos?',
          choices: [
            { id: 'a', body: '0°C – 10°C' },
            { id: 'b', body: '5°C – 60°C' },
            { id: 'c', body: '10°C – 70°C' },
            { id: 'd', body: '20°C – 80°C' },
          ],
          correct: 'b',
        },
        {
          id: 'q3',
          body: 'Onde a carne crua deve ser armazenada na geladeira?',
          choices: [
            { id: 'a', body: 'Na prateleira de cima' },
            { id: 'b', body: 'Ao lado dos vegetais' },
            { id: 'c', body: 'Abaixo dos alimentos prontos' },
            { id: 'd', body: 'Não importa' },
          ],
          correct: 'c',
        },
      ],
    },
    {
      id: 'service',
      title: 'Atendimento ao cliente básico',
      description: 'Como proporcionar experiências excepcionais aos clientes sempre.',
      emoji: '😊',
      content: `**A experiência do cliente começa com você**

Cada interação com um cliente molda a impressão que ele tem do restaurante. Um ótimo serviço transforma visitantes ocasionais em clientes fiéis.

**Princípios fundamentais**

1. **Cumprimentar prontamente** — Reconheça os clientes em até 30 segundos da chegada, mesmo que esteja ocupado. Um simples "Bem-vindo, já te atendo!" faz grande diferença.

2. **Ouvir ativamente** — Dê atenção total enquanto o cliente fala. Repita o pedido para confirmar a precisão.

3. **Conhecer o cardápio** — Esteja pronto para explicar cada prato, incluindo alérgenos e métodos de preparo. Se não souber, descubra — não adivinhe.

4. **Tratar reclamações com HEAT**
   - **H**ear — Deixe terminar de falar
   - **E**mpathize — Demonstre empatia ("Entendo completamente")
   - **A**pologize — Peça desculpas sinceramente
   - **T**ake action — Aja imediatamente

5. **A despedida importa** — Agradeça pelo nome se souber. Convide o retorno. Uma despedida calorosa é tão importante quanto a recepção.`,
      quiz: [
        {
          id: 'q1',
          body: 'Em quanto tempo você deve reconhecer um cliente que chegou?',
          choices: [
            { id: 'a', body: 'Em 30 segundos' },
            { id: 'b', body: 'Em 2 minutos' },
            { id: 'c', body: 'Quando terminar a tarefa atual' },
            { id: 'd', body: 'Depois que ele sentar' },
          ],
          correct: 'a',
        },
        {
          id: 'q2',
          body: 'O que fazer se um cliente perguntar sobre um prato que você não tem certeza?',
          choices: [
            { id: 'a', body: 'Dar o melhor palpite' },
            { id: 'b', body: 'Dizer que é delicioso' },
            { id: 'c', body: 'Descobrir a informação correta' },
            { id: 'd', body: 'Recomendar outro prato' },
          ],
          correct: 'c',
        },
        {
          id: 'q3',
          body: 'O que o "A" em HEAT significa ao lidar com reclamações?',
          choices: [
            { id: 'a', body: 'Fazer perguntas (Ask)' },
            { id: 'b', body: 'Pedir desculpas sinceramente (Apologize)' },
            { id: 'c', body: 'Evitar escalada (Avoid)' },
            { id: 'd', body: 'Agir rapidamente (Act)' },
          ],
          correct: 'b',
        },
      ],
    },
  ],

  ko: [
    {
      id: 'hygiene',
      title: '레스토랑 위생 기초',
      description: '모든 레스토랑 직원을 위한 필수 식품 안전 및 위생 실천.',
      emoji: '🧼',
      content: `**위생이 중요한 이유**

식품 안전은 모든 레스토랑의 기반입니다. 불충분한 위생 관리는 식중독, 보건 규정 위반, 영구적인 평판 손상을 초래할 수 있습니다.

**핵심 실천 사항**

1. **손 씻기** — 식품을 취급하기 전, 생고기를 만진 후, 화장실 사용 후 최소 20초 동안 손을 씻으세요.

2. **온도 관리** — 뜨거운 음식은 60°C 이상, 차가운 음식은 5°C 이하로 유지하세요. 음식을 "위험 온도 구간"(5–60°C)에 2시간 이상 방치하지 마세요.

3. **교차 오염 방지** — 생고기, 채소, 즉석 섭취 식품에는 별도의 도마와 도구를 사용하세요. 냉장고에서 생고기는 항상 즉석 섭취 식품 아래에 보관하세요.

4. **표면 소독** — 식품 접촉 표면은 서비스 중 4시간마다, 생고기와 접촉 즉시 세척 및 소독하세요.

5. **개인위생** — 손톱을 짧고 청결하게 유지하세요. 식품 취급 시 장신구를 착용하지 마세요. 아플 때는 집에서 쉬세요.`,
      quiz: [
        {
          id: 'q1',
          body: '식품을 취급하기 전 손을 몇 초 동안 씻어야 하나요?',
          choices: [
            { id: 'a', body: '5초' },
            { id: 'b', body: '10초' },
            { id: 'c', body: '20초' },
            { id: 'd', body: '60초' },
          ],
          correct: 'c',
        },
        {
          id: 'q2',
          body: '식품의 "위험 온도 구간"은 어느 범위인가요?',
          choices: [
            { id: 'a', body: '0°C – 10°C' },
            { id: 'b', body: '5°C – 60°C' },
            { id: 'c', body: '10°C – 70°C' },
            { id: 'd', body: '20°C – 80°C' },
          ],
          correct: 'b',
        },
        {
          id: 'q3',
          body: '냉장고에서 생고기는 어디에 보관해야 하나요?',
          choices: [
            { id: 'a', body: '최상단 선반' },
            { id: 'b', body: '채소 옆' },
            { id: 'c', body: '즉석 섭취 식품 아래' },
            { id: 'd', body: '어디든 상관없음' },
          ],
          correct: 'c',
        },
      ],
    },
    {
      id: 'service',
      title: '고객 서비스 기초',
      description: '매번 탁월한 고객 경험을 제공하는 방법.',
      emoji: '😊',
      content: `**고객 경험은 당신에서 시작됩니다**

고객과의 모든 상호작용이 레스토랑에 대한 인상을 결정합니다. 훌륭한 서비스는 첫 방문 고객을 단골로 만듭니다.

**핵심 원칙**

1. **신속한 인사** — 바쁘더라도 고객 도착 후 30초 이내에 인사하세요. "어서오세요, 잠시만요!"라는 간단한 말이 큰 차이를 만듭니다.

2. **적극적인 경청** — 고객이 말할 때 온전히 집중하세요. 정확성을 확인하기 위해 주문을 반복하세요.

3. **메뉴 숙지** — 알레르겐과 조리 방법을 포함하여 모든 요리를 설명할 준비를 하세요. 모르면 확인하고 — 추측하지 마세요.

4. **HEAT로 불만 처리**
   - **H**ear — 끝까지 들어주기
   - **E**mpathize — 공감하기 ("충분히 이해합니다")
   - **A**pologize — 진심으로 사과하기
   - **T**ake action — 즉시 조치하기

5. **작별 인사도 중요합니다** — 이름을 알면 이름으로 감사 인사를 하세요. 재방문을 권유하세요. 따뜻한 작별은 환영만큼 중요합니다.`,
      quiz: [
        {
          id: 'q1',
          body: '도착한 고객을 얼마나 빨리 맞이해야 하나요?',
          choices: [
            { id: 'a', body: '30초 이내' },
            { id: 'b', body: '2분 이내' },
            { id: 'c', body: '현재 업무가 끝났을 때' },
            { id: 'd', body: '앉은 후' },
          ],
          correct: 'a',
        },
        {
          id: 'q2',
          body: '확신이 없는 요리에 대해 고객이 물으면 어떻게 해야 하나요?',
          choices: [
            { id: 'a', body: '최선의 추측으로 답한다' },
            { id: 'b', body: '맛있다고 말한다' },
            { id: 'c', body: '정확한 정보를 확인한다' },
            { id: 'd', body: '다른 요리를 추천한다' },
          ],
          correct: 'c',
        },
        {
          id: 'q3',
          body: '불만 처리 시 HEAT에서 "A"는 무엇을 의미하나요?',
          choices: [
            { id: 'a', body: '질문하기 (Ask)' },
            { id: 'b', body: '진심으로 사과하기 (Apologize)' },
            { id: 'c', body: '확대 피하기 (Avoid)' },
            { id: 'd', body: '빠르게 행동하기 (Act)' },
          ],
          correct: 'b',
        },
      ],
    },
  ],

  id: [
    {
      id: 'hygiene',
      title: 'Dasar-dasar kebersihan restoran',
      description: 'Praktik keamanan pangan dan kebersihan penting untuk semua staf restoran.',
      emoji: '🧼',
      content: `**Mengapa kebersihan penting**

Keamanan pangan adalah fondasi setiap restoran. Kebersihan yang buruk dapat menyebabkan keracunan makanan, pelanggaran kode kesehatan, dan kerusakan reputasi permanen.

**Praktik utama**

1. **Mencuci tangan** — Cuci tangan setidaknya 20 detik sebelum menangani makanan, setelah menyentuh daging mentah, dan setelah menggunakan toilet.

2. **Kontrol suhu** — Pertahankan makanan panas di atas 60°C dan makanan dingin di bawah 5°C. Jangan biarkan makanan di "zona bahaya" (5–60°C) lebih dari 2 jam.

3. **Pencegahan kontaminasi silang** — Gunakan talenan dan peralatan terpisah untuk daging mentah, sayuran, dan makanan siap saji. Selalu simpan daging mentah di bawah makanan siap saji di lemari es.

4. **Sanitasi permukaan** — Bersihkan dan sanitasi semua permukaan yang bersentuhan dengan makanan setiap 4 jam dan segera setelah kontak dengan daging mentah.

5. **Kebersihan pribadi** — Jaga kuku tetap pendek dan bersih. Jangan kenakan perhiasan saat menangani makanan. Tetap di rumah saat sakit.`,
      quiz: [
        {
          id: 'q1',
          body: 'Berapa lama Anda harus mencuci tangan sebelum menangani makanan?',
          choices: [
            { id: 'a', body: '5 detik' },
            { id: 'b', body: '10 detik' },
            { id: 'c', body: '20 detik' },
            { id: 'd', body: '60 detik' },
          ],
          correct: 'c',
        },
        {
          id: 'q2',
          body: 'Apa rentang suhu "zona bahaya" untuk makanan?',
          choices: [
            { id: 'a', body: '0°C – 10°C' },
            { id: 'b', body: '5°C – 60°C' },
            { id: 'c', body: '10°C – 70°C' },
            { id: 'd', body: '20°C – 80°C' },
          ],
          correct: 'b',
        },
        {
          id: 'q3',
          body: 'Di mana daging mentah harus disimpan di lemari es?',
          choices: [
            { id: 'a', body: 'Di rak paling atas' },
            { id: 'b', body: 'Di sebelah sayuran' },
            { id: 'c', body: 'Di bawah makanan siap saji' },
            { id: 'd', body: 'Di mana saja tidak masalah' },
          ],
          correct: 'c',
        },
      ],
    },
    {
      id: 'service',
      title: 'Layanan pelanggan dasar',
      description: 'Cara memberikan pengalaman tamu yang luar biasa setiap saat.',
      emoji: '😊',
      content: `**Pengalaman tamu dimulai dari Anda**

Setiap interaksi dengan tamu membentuk perasaan mereka tentang restoran Anda. Layanan yang luar biasa mengubah pengunjung pertama menjadi pelanggan setia.

**Prinsip inti**

1. **Sapa segera** — Sambut tamu dalam 30 detik kedatangan, meski Anda sibuk. Kalimat sederhana "Selamat datang, sebentar lagi kami layani!" sangat berarti.

2. **Dengarkan secara aktif** — Berikan perhatian penuh saat tamu berbicara. Ulangi pesanan untuk konfirmasi.

3. **Kuasai menu** — Siap menjelaskan setiap hidangan, termasuk alergen dan cara memasaknya. Jika tidak tahu, cari tahu — jangan tebak.

4. **Tangani keluhan dengan HEAT**
   - **H**ear — Biarkan mereka selesai berbicara
   - **E**mpathize — Tunjukkan empati ("Saya sepenuhnya mengerti")
   - **A**pologize — Minta maaf dengan tulus
   - **T**ake action — Bertindak segera

5. **Perpisahan juga penting** — Ucapkan terima kasih dengan nama jika Anda tahu. Undang mereka kembali. Perpisahan yang hangat sama pentingnya dengan sambutan.`,
      quiz: [
        {
          id: 'q1',
          body: 'Seberapa cepat Anda harus menyambut tamu yang datang?',
          choices: [
            { id: 'a', body: 'Dalam 30 detik' },
            { id: 'b', body: 'Dalam 2 menit' },
            { id: 'c', body: 'Saat menyelesaikan tugas saat ini' },
            { id: 'd', body: 'Setelah mereka duduk' },
          ],
          correct: 'a',
        },
        {
          id: 'q2',
          body: 'Apa yang harus dilakukan jika tamu bertanya tentang hidangan yang tidak Anda yakin?',
          choices: [
            { id: 'a', body: 'Berikan tebakan terbaik' },
            { id: 'b', body: 'Katakan itu lezat' },
            { id: 'c', body: 'Cari informasi yang benar' },
            { id: 'd', body: 'Rekomendasikan hidangan lain' },
          ],
          correct: 'c',
        },
        {
          id: 'q3',
          body: 'Apa yang dimaksud "A" dalam HEAT saat menangani keluhan?',
          choices: [
            { id: 'a', body: 'Ajukan pertanyaan (Ask)' },
            { id: 'b', body: 'Minta maaf dengan tulus (Apologize)' },
            { id: 'c', body: 'Hindari eskalasi (Avoid)' },
            { id: 'd', body: 'Bertindak cepat (Act)' },
          ],
          correct: 'b',
        },
      ],
    },
  ],

  th: [
    {
      id: 'hygiene',
      title: 'ความรู้พื้นฐานด้านสุขอนามัยของร้านอาหาร',
      description: 'การปฏิบัติด้านความปลอดภัยของอาหารและสุขอนามัยที่จำเป็นสำหรับพนักงานทุกคน',
      emoji: '🧼',
      content: `**ทำไมสุขอนามัยถึงสำคัญ**

ความปลอดภัยของอาหารคือรากฐานของร้านอาหารทุกแห่ง สุขอนามัยที่ไม่ดีอาจทำให้เกิดการเจ็บป่วยจากอาหาร การละเมิดกฎระเบียบด้านสุขภาพ และความเสียหายต่อชื่อเสียงอย่างถาวร

**แนวปฏิบัติหลัก**

1. **การล้างมือ** — ล้างมือนานอย่างน้อย 20 วินาทีก่อนจัดการอาหาร หลังสัมผัสเนื้อดิบ และหลังใช้ห้องน้ำ

2. **การควบคุมอุณหภูมิ** — รักษาอาหารร้อนให้สูงกว่า 60°C และอาหารเย็นให้ต่ำกว่า 5°C อย่าทิ้งอาหารไว้ใน "โซนอันตราย" (5–60°C) นานกว่า 2 ชั่วโมง

3. **การป้องกันการปนเปื้อนข้าม** — ใช้เขียงและอุปกรณ์แยกสำหรับเนื้อดิบ ผัก และอาหารพร้อมรับประทาน เก็บเนื้อดิบไว้ใต้อาหารพร้อมรับประทานในตู้เย็นเสมอ

4. **การฆ่าเชื้อบนพื้นผิว** — ทำความสะอาดและฆ่าเชื้อพื้นผิวที่สัมผัสอาหารทุก 4 ชั่วโมง และทันทีหลังสัมผัสเนื้อดิบ

5. **สุขอนามัยส่วนตัว** — เล็บสั้นและสะอาด ไม่สวมเครื่องประดับขณะจัดการอาหาร หยุดพักที่บ้านเมื่อป่วย`,
      quiz: [
        {
          id: 'q1',
          body: 'ควรล้างมือนานเท่าไรก่อนจัดการอาหาร?',
          choices: [
            { id: 'a', body: '5 วินาที' },
            { id: 'b', body: '10 วินาที' },
            { id: 'c', body: '20 วินาที' },
            { id: 'd', body: '60 วินาที' },
          ],
          correct: 'c',
        },
        {
          id: 'q2',
          body: '"โซนอันตราย" สำหรับอาหารอยู่ในช่วงอุณหภูมิใด?',
          choices: [
            { id: 'a', body: '0°C – 10°C' },
            { id: 'b', body: '5°C – 60°C' },
            { id: 'c', body: '10°C – 70°C' },
            { id: 'd', body: '20°C – 80°C' },
          ],
          correct: 'b',
        },
        {
          id: 'q3',
          body: 'ควรเก็บเนื้อดิบไว้ที่ไหนในตู้เย็น?',
          choices: [
            { id: 'a', body: 'ชั้นบนสุด' },
            { id: 'b', body: 'ข้างๆ ผัก' },
            { id: 'c', body: 'ใต้อาหารพร้อมรับประทาน' },
            { id: 'd', body: 'ที่ไหนก็ได้' },
          ],
          correct: 'c',
        },
      ],
    },
    {
      id: 'service',
      title: 'การบริการลูกค้าพื้นฐาน',
      description: 'วิธีมอบประสบการณ์ที่ยอดเยี่ยมแก่ผู้ใช้บริการทุกครั้ง',
      emoji: '😊',
      content: `**ประสบการณ์ของแขกเริ่มต้นที่คุณ**

ทุกการโต้ตอบกับแขกกำหนดความรู้สึกที่มีต่อร้านอาหารของคุณ การบริการที่ยอดเยี่ยมเปลี่ยนผู้เข้าใช้ครั้งแรกให้เป็นลูกค้าประจำ

**หลักการหลัก**

1. **ทักทายทันที** — ยอมรับแขกภายใน 30 วินาทีหลังมาถึง แม้จะยุ่ง คำพูดง่ายๆ ว่า "ยินดีต้อนรับ รอสักครู่นะครับ/ค่ะ!" มีความหมายมาก

2. **ฟังอย่างตั้งใจ** — ให้ความสนใจเต็มที่ขณะแขกพูด ทวนคำสั่งซื้อเพื่อยืนยันความถูกต้อง

3. **รู้จักเมนู** — พร้อมอธิบายทุกเมนู รวมถึงสารก่อภูมิแพ้และวิธีปรุง ถ้าไม่รู้ให้ค้นหา อย่าเดา

4. **จัดการข้อร้องเรียนด้วย HEAT**
   - **H**ear — ฟังจนจบ
   - **E**mpathize — แสดงความเข้าใจ ("ผม/หนูเข้าใจอย่างสมบูรณ์")
   - **A**pologize — ขอโทษอย่างจริงใจ
   - **T**ake action — ดำเนินการทันที

5. **การลาก็สำคัญ** — ขอบคุณแขกโดยเรียกชื่อหากรู้ เชิญให้กลับมาอีก การอำลาที่อบอุ่นสำคัญเท่ากับการต้อนรับ`,
      quiz: [
        {
          id: 'q1',
          body: 'ควรทักทายแขกที่มาถึงภายในกี่วินาที?',
          choices: [
            { id: 'a', body: 'ภายใน 30 วินาที' },
            { id: 'b', body: 'ภายใน 2 นาที' },
            { id: 'c', body: 'เมื่อทำงานปัจจุบันเสร็จ' },
            { id: 'd', body: 'หลังจากนั่งลงแล้ว' },
          ],
          correct: 'a',
        },
        {
          id: 'q2',
          body: 'ควรทำอย่างไรหากแขกถามเกี่ยวกับเมนูที่คุณไม่แน่ใจ?',
          choices: [
            { id: 'a', body: 'เดาคำตอบที่ดีที่สุด' },
            { id: 'b', body: 'บอกว่าอร่อยมาก' },
            { id: 'c', body: 'ค้นหาข้อมูลที่ถูกต้อง' },
            { id: 'd', body: 'แนะนำเมนูอื่น' },
          ],
          correct: 'c',
        },
        {
          id: 'q3',
          body: '"A" ใน HEAT เมื่อจัดการข้อร้องเรียนหมายถึงอะไร?',
          choices: [
            { id: 'a', body: 'ถามคำถาม (Ask)' },
            { id: 'b', body: 'ขอโทษอย่างจริงใจ (Apologize)' },
            { id: 'c', body: 'หลีกเลี่ยงการบานปลาย (Avoid)' },
            { id: 'd', body: 'ดำเนินการเร็ว (Act)' },
          ],
          correct: 'b',
        },
      ],
    },
  ],

  ne: [
    {
      id: 'hygiene',
      title: 'रेस्टुरेन्ट स्वच्छता आधारभूत',
      description: 'सबै रेस्टुरेन्ट कर्मचारीका लागि आवश्यक खाद्य सुरक्षा र स्वच्छता अभ्यास।',
      emoji: '🧼',
      content: `**स्वच्छता किन महत्त्वपूर्ण छ**

खाद्य सुरक्षा प्रत्येक रेस्टुरेन्टको आधार हो। खराब स्वच्छताले खाद्य विषाक्तता, स्वास्थ्य नियम उल्लंघन र स्थायी प्रतिष्ठा क्षति निम्त्याउन सक्छ।

**मुख्य अभ्यासहरू**

1. **हात धुनु** — खाना ह्यान्डल गर्नुअघि, कच्चा मासु छोएपछि र शौचालय प्रयोग गरेपछि कम्तीमा २० सेकेन्ड हात धुनुस्।

2. **तापक्रम नियन्त्रण** — तातो खाना ६०°C माथि र चिसो खाना ५°C तल राख्नुस्। खाना "खतरा क्षेत्र" (५–६०°C) मा २ घण्टाभन्दा बढी राख्नु हुँदैन।

3. **क्रस-कन्ट्यामिनेशन रोकथाम** — कच्चा मासु, तरकारी र तयार खानाका लागि छुट्टाछुट्टै काटिने बोर्ड र भाँडाकुँडा प्रयोग गर्नुस्। फ्रिजमा कच्चा मासु सधैं तयार खानाको तल राख्नुस्।

4. **सतह सफाइ** — खाना सम्पर्क सतहहरू सेवाको बेलामा हरेक ४ घण्टामा र कच्चा मासुसँग सम्पर्क भएपछि तुरुन्त सफा र कीटाणुरहित गर्नुस्।

5. **व्यक्तिगत स्वच्छता** — नङ छोटो र सफा राख्नुस्। खाना ह्यान्डल गर्दा गहना नलगाउनुस्। बिरामी हुँदा घरमा बस्नुस्।`,
      quiz: [
        {
          id: 'q1',
          body: 'खाना ह्यान्डल गर्नुअघि हात कति सेकेन्ड धुनुपर्छ?',
          choices: [
            { id: 'a', body: '५ सेकेन्ड' },
            { id: 'b', body: '१० सेकेन्ड' },
            { id: 'c', body: '२० सेकेन्ड' },
            { id: 'd', body: '६० सेकेन्ड' },
          ],
          correct: 'c',
        },
        {
          id: 'q2',
          body: 'खाना "खतरा क्षेत्र" तापक्रम दायरा के हो?',
          choices: [
            { id: 'a', body: '०°C – १०°C' },
            { id: 'b', body: '५°C – ६०°C' },
            { id: 'c', body: '१०°C – ७०°C' },
            { id: 'd', body: '२०°C – ८०°C' },
          ],
          correct: 'b',
        },
        {
          id: 'q3',
          body: 'फ्रिजमा कच्चा मासु कहाँ राख्नुपर्छ?',
          choices: [
            { id: 'a', body: 'सबैभन्दा माथिल्लो शेल्फ' },
            { id: 'b', body: 'तरकारीको छेउमा' },
            { id: 'c', body: 'तयार खानाको तल' },
            { id: 'd', body: 'जहाँ पनि हुन्छ' },
          ],
          correct: 'c',
        },
      ],
    },
    {
      id: 'service',
      title: 'ग्राहक सेवा आधारभूत',
      description: 'हरेक पटक अतिथिलाई असाधारण अनुभव दिने तरिका।',
      emoji: '😊',
      content: `**अतिथि अनुभव तपाईंबाट सुरु हुन्छ**

अतिथिसँगको हरेक अन्तरक्रियाले तपाईंको रेस्टुरेन्टप्रतिको उनीहरूको भावना निर्धारण गर्छ। उत्कृष्ट सेवाले पहिलो पटक आएका आगन्तुकलाई नियमित ग्राहकमा बदल्छ।

**मुख्य सिद्धान्तहरू**

1. **तुरुन्त अभिवादन** — व्यस्त भए पनि, आगमनको ३० सेकेन्डभित्र अतिथिलाई स्वागत गर्नुस्। "स्वागत छ, अहिलेनै आउँछु!" भन्ने सरल शब्दले ठूलो फरक पार्छ।

2. **सक्रिय सुन्नु** — अतिथि बोल्दा पूरा ध्यान दिनुस्। सटीकता पुष्टि गर्न अर्डर दोहोर्याउनुस्।

3. **मेनु जान्नु** — एलर्जेन र पकाउने तरिका सहित हरेक खाना व्याख्या गर्न तयार हुनुस्। थाहा नभए पत्ता लगाउनुस् — अनुमान नगर्नुस्।

4. **HEAT ले गुनासो समाधान**
   - **H**ear — अन्त्यसम्म सुन्नु
   - **E**mpathize — सहानुभूति देखाउनु ("मैले पूर्ण रूपमा बुझेँ")
   - **A**pologize — इमानदारीसाथ माफी माग्नु
   - **T**ake action — तुरुन्त कार्य गर्नु

5. **बिदाइ पनि महत्त्वपूर्ण छ** — नाम थाहा छ भने नामले धन्यवाद दिनुस्। फर्कन निमन्त्रणा दिनुस्। न्यानो बिदाइ स्वागतजस्तै महत्त्वपूर्ण छ।`,
      quiz: [
        {
          id: 'q1',
          body: 'आएको अतिथिलाई कति छिटो अभिवादन गर्नुपर्छ?',
          choices: [
            { id: 'a', body: '३० सेकेन्डभित्र' },
            { id: 'b', body: '२ मिनेटभित्र' },
            { id: 'c', body: 'हालको काम सकिएपछि' },
            { id: 'd', body: 'बसेपछि' },
          ],
          correct: 'a',
        },
        {
          id: 'q2',
          body: 'अतिथिले थाहा नभएको खाना बारे सोधे के गर्नुपर्छ?',
          choices: [
            { id: 'a', body: 'सबैभन्दा राम्रो अनुमान दिनु' },
            { id: 'b', body: 'स्वादिष्ट छ भन्नु' },
            { id: 'c', body: 'सही जानकारी पत्ता लगाउनु' },
            { id: 'd', body: 'अर्को खाना सिफारिस गर्नु' },
          ],
          correct: 'c',
        },
        {
          id: 'q3',
          body: 'गुनासो समाधानमा HEAT को "A" ले के बुझाउँछ?',
          choices: [
            { id: 'a', body: 'प्रश्न सोध्नु (Ask)' },
            { id: 'b', body: 'इमानदारीसाथ माफी माग्नु (Apologize)' },
            { id: 'c', body: 'वृद्धि टाल्नु (Avoid)' },
            { id: 'd', body: 'छिटो कार्य गर्नु (Act)' },
          ],
          correct: 'b',
        },
      ],
    },
  ],

  my: [
    {
      id: 'hygiene',
      title: 'စားသောက်ဆိုင် သန့်ရှင်းရေး အခြေခံ',
      description: 'ဝန်ထမ်းအားလုံးအတွက် မရှိမဖြစ်သော စားသောက်ကုန် ဘေးကင်းရေးနှင့် သန့်ရှင်းရေး အလေ့အကျင့်များ',
      emoji: '🧼',
      content: `**သန့်ရှင်းရေး အဘယ်ကြောင့် အရေးကြီးသနည်း**

စားသောက်ကုန် ဘေးကင်းရေးသည် စားသောက်ဆိုင်တိုင်း၏ အခြေခံဖြစ်သည်။ မသန့်ရှင်းသောနေရာတွင် ကြောင်ပိုးပျောက်ခြင်း၊ ကျန်းမာရေး ဥပဒေချိုးဖောက်ခြင်းနှင့် နာမည်ပျက်ခြင်း ဖြစ်နိုင်သည်။

**အဓိက အလေ့အကျင့်များ**

1. **လက်ဆေးခြင်း** — အစားအသောက် ကိုင်တွယ်ခြင်းမပြုမီ၊ အမဲသားကြမ်း ထိတွေ့ပြီးနောက်နှင့် အိမ်သာသုံးပြီးနောက် အနည်းဆုံး ၂၀ မိနစ် လက်ဆေးပါ။

2. **အပူချိန် ထိန်းချုပ်ခြင်း** — ပူသော အစားအစာများကို ၆၀°C အထက်နှင့် အေးသော အစားအစာများကို ၅°C အောက်တွင် ထားပါ။ အစားအစာများကို "အန္တရာယ်ဇုန်" (၅–၆၀°C) တွင် ၂ နာရီထက်ပို မထားပါနှင့်။

3. **ဆန့်ကျင်ဘက် ညစ်ညမ်းမှု ကာကွယ်ခြင်း** — အမဲသားကြမ်း၊ ဟင်းသီးဟင်းရွက်နှင့် ချက်ပြုတ်ပြီး အစားအစာများအတွက် သီးသန့် ဓားနှင့် ကိရိယာများ သုံးပါ။ ရေခဲသေတ္တာတွင် အမဲသားကြမ်းကို ချက်ပြုတ်ပြီး အစားအစာ အောက်တွင် အမြဲထားပါ။

4. **မျက်နှာပြင် ပိုးသတ်ခြင်း** — ဝန်ဆောင်မှုအတောအတွင်း ၄ နာရီတိုင်းနှင့် အမဲသားကြမ်းနှင့် ထိတွေ့ပြီးနောက် ချက်ချင်း အစားအစာထိတွေ့မည့် မျက်နှာပြင်များ သန့်ရှင်း ပိုးသတ်ပါ။

5. **ကိုယ်ရေးကိုယ်တာ သန့်ရှင်းရေး** — လက်သည်းများကို တိုနှင့်သန့်ရှင်းအောင် ထားပါ။ အစားအစာ ကိုင်တွယ်ချိန် လက်ဝတ်ရတနာ မဝတ်ဆင်ပါနှင့်။ နာမကျန်းဖြစ်ပါက အိမ်တွင် နားပါ။`,
      quiz: [
        {
          id: 'q1',
          body: 'အစားအသောက် ကိုင်တွယ်ခြင်းမပြုမီ လက်ဆေးသင့်သည့် အချိန်မှာ?',
          choices: [
            { id: 'a', body: '၅ စက္ကန့်' },
            { id: 'b', body: '၁၀ စက္ကန့်' },
            { id: 'c', body: '၂၀ စက္ကန့်' },
            { id: 'd', body: '၆၀ စက္ကန့်' },
          ],
          correct: 'c',
        },
        {
          id: 'q2',
          body: 'အစားအသောက်အတွက် "အန္တရာယ်ဇုန်" အပူချိန် အကွာအဝေးမှာ?',
          choices: [
            { id: 'a', body: '၀°C – ၁၀°C' },
            { id: 'b', body: '၅°C – ၆၀°C' },
            { id: 'c', body: '၁၀°C – ၇၀°C' },
            { id: 'd', body: '၂၀°C – ၈၀°C' },
          ],
          correct: 'b',
        },
        {
          id: 'q3',
          body: 'ရေခဲသေတ္တာတွင် အမဲသားကြမ်းကို ဘယ်နေရာတွင် သိမ်းဆည်းသင့်သနည်း?',
          choices: [
            { id: 'a', body: 'အပေါ်ဆုံး棚 ပေါ်' },
            { id: 'b', body: 'ဟင်းသီးဟင်းရွက် အဘေး' },
            { id: 'c', body: 'ချက်ပြုတ်ပြီး အစားအစာ အောက်' },
            { id: 'd', body: 'ဘယ်နေရာမဆို ရသည်' },
          ],
          correct: 'c',
        },
      ],
    },
    {
      id: 'service',
      title: 'ဖောက်သည် ဝန်ဆောင်မှု အခြေခံ',
      description: 'တိုင်းတာ ဧည့်သည်များအား အထူးကောင်းမွန်သော အတွေ့အကြုံ ပေးနည်း',
      emoji: '😊',
      content: `**ဧည့်သည် အတွေ့အကြုံ သင့်ထံမှ စတင်သည်**

ဧည့်သည်နှင့် ဆက်ဆံသည့် အပြန်အလှန် တိုင်းသည် သင့်စားသောက်ဆိုင်အပေါ် ၎င်းတို့၏ ခံစားချက်ကို ဖော်ဆောင်သည်။ ကောင်းမွန်သော ဝန်ဆောင်မှုသည် ပထမဆုံး လာသော ဧည့်သည်များကို ပုံမှန် ဖောက်သည်များသို့ ပြောင်းလဲသည်။

**အဓိက မူများ**

1. **ချက်ချင်း နှုတ်ဆက်ခြင်း** — အလုပ်များသော်လည်း ဧည့်သည် ရောက်ရှိပြီး ၃၀ စက္ကန့်အတွင်း အသိအမှတ်ပြုပါ။ "ကြိုဆိုပါသည်၊ ခဏ နေပါ!" ဟု ရိုးရှင်းစွာ ပြောဆိုခြင်းသည် များစွာ ကူညီနိုင်သည်။

2. **တက်ကြွစွာ နားထောင်ခြင်း** — ဧည့်သည် ပြောနေသည့် အချိန် အာရုံစိုက်ပါ။ မှန်ကန်မှု အတည်ပြုရန် order ကို ထပ်မံ ပြောဆိုပါ။

3. **မီနူးကို သိကျွမ်းခြင်း** — ဓာတ်ဒဏ်ခံစေသောပစ္စည်း နှင့် ချက်ပြုတ်နည်းများ အပါအဝင် ဟင်းလ်ာ တိုင်းကို ရှင်းပြရန် အဆင်သင့် ဖြစ်ပါ။ မသိပါက ရှာဖွေပါ — ခန့်မှန်းမပါနှင့်။

4. **HEAT ဖြင့် တိုင်ကြားချက်များ ကိုင်တွယ်ခြင်း**
   - **H**ear — ပြောဆိုပြီးသည်အထိ နားထောင်ပါ
   - **E**mpathize — စာနာမှု ပြပါ ("ကျွန်ုပ် အပြည့်အဝ နားလည်ပါသည်")
   - **A**pologize — ရိုးသားစွာ တောင်းပန်ပါ
   - **T**ake action — ချက်ချင်း ဆောင်ရွက်ပါ

5. **ထွက်ခွာသည့် အချိန်လည်း အရေးကြီးသည်** — နာမည် သိပါက နာမည်ဖြင့် ကျေးဇူးတင်ပါ။ ပြန်လည် လာရောက်ရန် ဖိတ်ကြားပါ။ နွေးထွေးသော နှုတ်ဆက်ခြင်းသည် ကြိုဆိုမှုနှင့် တညီတညွတ်တည်း အရေးကြီးသည်။`,
      quiz: [
        {
          id: 'q1',
          body: 'ရောက်ရှိလာသော ဧည့်သည်ကို မည်မျှ မြန်မြန် အသိအမှတ်ပြုသင့်သနည်း?',
          choices: [
            { id: 'a', body: '၃၀ စက္ကန့်အတွင်း' },
            { id: 'b', body: '၂ မိနစ်အတွင်း' },
            { id: 'c', body: 'လက်ရှိ အလုပ် ပြီးဆုံးသည့်အချိန်' },
            { id: 'd', body: 'ထိုင်ပြီးနောက်' },
          ],
          correct: 'a',
        },
        {
          id: 'q2',
          body: 'ဧည့်သည် မသေချာသော ဟင်းလ်ာနှင့်ပတ်သက်ပြီး မေးမြန်းပါက ဘာလုပ်သင့်သနည်း?',
          choices: [
            { id: 'a', body: 'အကောင်းဆုံး ခန့်မှန်းချက် ပေးပါ' },
            { id: 'b', body: 'အရသာ ကောင်းသည်ဟု ပြောပါ' },
            { id: 'c', body: 'မှန်ကန်သော သတင်းအချက်အလက် ရှာဖွေပါ' },
            { id: 'd', body: 'အခြား ဟင်းလ်ာ အကြံပြုပါ' },
          ],
          correct: 'c',
        },
        {
          id: 'q3',
          body: 'တိုင်ကြားချက် ကိုင်တွယ်ရာတွင် HEAT ၏ "A" သည် ဘာကို ဆိုလိုသနည်း?',
          choices: [
            { id: 'a', body: 'မေးမြန်းခြင်း (Ask)' },
            { id: 'b', body: 'ရိုးသားစွာ တောင်းပန်ခြင်း (Apologize)' },
            { id: 'c', body: 'တိုးချဲ့မှု ရှောင်ရှားခြင်း (Avoid)' },
            { id: 'd', body: 'မြန်မြန် ဆောင်ရွက်ခြင်း (Act)' },
          ],
          correct: 'b',
        },
      ],
    },
  ],
}

export function getDemoCourses(lang: LangCode): Course[] {
  return demoCourses[lang] ?? demoCourses.en
}

export function useLpT() {
  const { lang } = useLanguageStore()
  return (key: LpKey, params?: Record<string, string | number>) => translateLp(lang, key, params)
}
