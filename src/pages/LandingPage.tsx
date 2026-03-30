import { useNavigate } from 'react-router-dom'
import { LanguageSelector } from '../components/ui/LanguageSelector'
import { useLpT } from '../lib/lpI18n'

export function LandingPage() {
  const navigate = useNavigate()
  const t = useLpT()

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-border px-4 py-3 flex items-center justify-between gap-3">
        <span className="font-bold text-primary text-lg">TrainKit</span>
        <div className="flex items-center gap-3">
          <LanguageSelector />
          <button
            onClick={() => navigate('/app')}
            className="bg-primary text-white text-sm font-semibold px-4 py-2 rounded-input hover:bg-primary-dark transition-colors whitespace-nowrap"
          >
            {t('startFree')}
          </button>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-primary-light px-4 py-16 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-4">
            {t('heroTitle')}
          </h1>
          <p className="text-gray-600 text-base sm:text-lg mb-8 max-w-xl mx-auto">
            {t('heroSub')}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => navigate('/app')}
              className="bg-primary text-white text-base font-semibold px-8 py-3 rounded-input hover:bg-primary-dark transition-colors"
            >
              {t('startFree')}
            </button>
            <button
              onClick={() => navigate('/demo')}
              className="bg-white text-primary text-base font-semibold px-8 py-3 rounded-input border border-primary hover:bg-primary-light transition-colors"
            >
              {t('tryDemo')}
            </button>
          </div>
        </section>

        {/* Features */}
        <section className="px-4 py-14 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">{t('featuresTitle')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white border border-border rounded-card p-6 text-center">
              <div className="text-4xl mb-3">⚡</div>
              <h3 className="font-bold text-gray-900 mb-2">{t('f1Title')}</h3>
              <p className="text-sm text-gray-500">{t('f1Desc')}</p>
            </div>
            <div className="bg-white border border-border rounded-card p-6 text-center relative">
              <div className="text-4xl mb-3">🤖</div>
              <h3 className="font-bold text-gray-900 mb-2">{t('f2Title')}</h3>
              <p className="text-sm text-gray-500">{t('f2Desc')}</p>
              <span className="absolute top-3 right-3 bg-primary-light text-primary text-xs font-semibold px-2 py-0.5 rounded-full">
                {t('comingSoon')}
              </span>
            </div>
            <div className="bg-white border border-border rounded-card p-6 text-center">
              <div className="text-4xl mb-3">📊</div>
              <h3 className="font-bold text-gray-900 mb-2">{t('f3Title')}</h3>
              <p className="text-sm text-gray-500">{t('f3Desc')}</p>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="bg-background px-4 py-14">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-3">{t('useCasesTitle')}</h2>
            <p className="text-gray-500 text-center mb-10">{t('useCasesSub')}</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white border border-border rounded-card p-5">
                <div className="text-2xl mb-2">🧑‍🍳</div>
                <h3 className="font-bold text-gray-800 mb-1">{t('uc1Title')}</h3>
                <p className="text-sm text-gray-500">{t('uc1Desc')}</p>
              </div>
              <div className="bg-white border border-border rounded-card p-5">
                <div className="text-2xl mb-2">🧼</div>
                <h3 className="font-bold text-gray-800 mb-1">{t('uc2Title')}</h3>
                <p className="text-sm text-gray-500">{t('uc2Desc')}</p>
              </div>
              <div className="bg-white border border-border rounded-card p-5">
                <div className="text-2xl mb-2">😊</div>
                <h3 className="font-bold text-gray-800 mb-1">{t('uc3Title')}</h3>
                <p className="text-sm text-gray-500">{t('uc3Desc')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="px-4 py-14 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">{t('pricingTitle')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-xl mx-auto">
            <div className="bg-white border-2 border-primary rounded-card p-6 text-center">
              <h3 className="font-bold text-gray-900 text-lg mb-1">Free</h3>
              <p className="text-3xl font-bold text-primary mb-2">$0</p>
              <p className="text-sm text-gray-500 mb-4">{t('freeDesc')}</p>
              <button
                onClick={() => navigate('/app')}
                className="w-full bg-primary text-white text-sm font-semibold py-2 rounded-input hover:bg-primary-dark transition-colors"
              >
                {t('startFree')}
              </button>
            </div>
            <div className="bg-white border border-border rounded-card p-6 text-center opacity-60">
              <h3 className="font-bold text-gray-900 text-lg mb-1">Pro</h3>
              <p className="text-3xl font-bold text-gray-400 mb-2">—</p>
              <p className="text-sm text-gray-400 mb-4">{t('proDesc')}</p>
              <span className="inline-block bg-gray-100 text-gray-500 text-sm font-semibold py-2 px-4 rounded-input w-full">
                {t('comingSoon')}
              </span>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="bg-primary px-4 py-14 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">{t('ctaTitle')}</h2>
          <p className="text-primary-light mb-8">{t('ctaSub')}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => navigate('/app')}
              className="bg-white text-primary text-base font-semibold px-8 py-3 rounded-input hover:bg-primary-light transition-colors"
            >
              {t('startFree')}
            </button>
            <button
              onClick={() => navigate('/demo')}
              className="bg-transparent text-white text-base font-semibold px-8 py-3 rounded-input border border-white hover:bg-primary-dark transition-colors"
            >
              {t('tryDemo')}
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-border px-4 py-6 text-center text-sm text-gray-400">
        <div className="flex flex-wrap justify-center gap-6 mb-2">
          <a href="/terms" className="hover:text-gray-700 transition-colors">{t('footerTerms')}</a>
          <a href="/privacy" className="hover:text-gray-700 transition-colors">{t('footerPrivacy')}</a>
          <a href="mailto:contact@trainkit.app" className="hover:text-gray-700 transition-colors">{t('footerContact')}</a>
        </div>
        <p>© 2026 TrainKit. All rights reserved.</p>
      </footer>
    </div>
  )
}
