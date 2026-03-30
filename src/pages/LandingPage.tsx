import { useNavigate } from 'react-router-dom'

export function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-border px-4 py-3 flex items-center justify-between">
        <span className="font-bold text-primary text-lg">TrainKit</span>
        <button
          onClick={() => navigate('/app')}
          className="bg-primary text-white text-sm font-semibold px-4 py-2 rounded-input hover:bg-primary-dark transition-colors"
        >
          Start Free
        </button>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-primary-light px-4 py-16 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-4">
            Training System for Restaurants
          </h1>
          <p className="text-gray-600 text-base sm:text-lg mb-8 max-w-xl mx-auto">
            Train your team faster, track progress, and ensure quality — all in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => navigate('/app')}
              className="bg-primary text-white text-base font-semibold px-8 py-3 rounded-input hover:bg-primary-dark transition-colors"
            >
              Start Free
            </button>
            <button
              onClick={() => navigate('/demo')}
              className="bg-white text-primary text-base font-semibold px-8 py-3 rounded-input border border-primary hover:bg-primary-light transition-colors"
            >
              Try Demo
            </button>
          </div>
        </section>

        {/* Features */}
        <section className="px-4 py-14 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">Why TrainKit?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white border border-border rounded-card p-6 text-center">
              <div className="text-4xl mb-3">⚡</div>
              <h3 className="font-bold text-gray-900 mb-2">Create training in minutes</h3>
              <p className="text-sm text-gray-500">Build courses with videos, images, and text. No technical skills needed.</p>
            </div>
            <div className="bg-white border border-border rounded-card p-6 text-center relative">
              <div className="text-4xl mb-3">🤖</div>
              <h3 className="font-bold text-gray-900 mb-2">AI quiz generation</h3>
              <p className="text-sm text-gray-500">Using AI to automatically generate quizzes.</p>
              <span className="absolute top-3 right-3 bg-primary-light text-primary text-xs font-semibold px-2 py-0.5 rounded-full">Coming soon</span>
            </div>
            <div className="bg-white border border-border rounded-card p-6 text-center">
              <div className="text-4xl mb-3">📊</div>
              <h3 className="font-bold text-gray-900 mb-2">Track employee performance</h3>
              <p className="text-sm text-gray-500">See quiz scores and training progress for every staff member.</p>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="bg-background px-4 py-14">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-3">Built for restaurants</h2>
            <p className="text-gray-500 text-center mb-10">Real use cases from restaurant operators</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white border border-border rounded-card p-5">
                <div className="text-2xl mb-2">🧑‍🍳</div>
                <h3 className="font-bold text-gray-800 mb-1">Staff onboarding</h3>
                <p className="text-sm text-gray-500">Get new hires productive from day one with structured training.</p>
              </div>
              <div className="bg-white border border-border rounded-card p-5">
                <div className="text-2xl mb-2">🧼</div>
                <h3 className="font-bold text-gray-800 mb-1">Hygiene training</h3>
                <p className="text-sm text-gray-500">Ensure every team member meets food safety standards.</p>
              </div>
              <div className="bg-white border border-border rounded-card p-5">
                <div className="text-2xl mb-2">😊</div>
                <h3 className="font-bold text-gray-800 mb-1">Customer service training</h3>
                <p className="text-sm text-gray-500">Standardize how your team handles guests and complaints.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="px-4 py-14 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">Simple pricing</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-xl mx-auto">
            <div className="bg-white border-2 border-primary rounded-card p-6 text-center">
              <h3 className="font-bold text-gray-900 text-lg mb-1">Free</h3>
              <p className="text-3xl font-bold text-primary mb-2">$0</p>
              <p className="text-sm text-gray-500 mb-4">Up to 5 employees</p>
              <button
                onClick={() => navigate('/app')}
                className="w-full bg-primary text-white text-sm font-semibold py-2 rounded-input hover:bg-primary-dark transition-colors"
              >
                Start Free
              </button>
            </div>
            <div className="bg-white border border-border rounded-card p-6 text-center opacity-60">
              <h3 className="font-bold text-gray-900 text-lg mb-1">Pro</h3>
              <p className="text-3xl font-bold text-gray-400 mb-2">—</p>
              <p className="text-sm text-gray-400 mb-4">Unlimited employees + AI features</p>
              <span className="inline-block bg-gray-100 text-gray-500 text-sm font-semibold py-2 px-4 rounded-input w-full">Coming soon</span>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="bg-primary px-4 py-14 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">Ready to train your team?</h2>
          <p className="text-primary-light mb-8">Start for free — no credit card required.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => navigate('/app')}
              className="bg-white text-primary text-base font-semibold px-8 py-3 rounded-input hover:bg-primary-light transition-colors"
            >
              Start Free
            </button>
            <button
              onClick={() => navigate('/demo')}
              className="bg-transparent text-white text-base font-semibold px-8 py-3 rounded-input border border-white hover:bg-primary-dark transition-colors"
            >
              Try Demo
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-border px-4 py-6 text-center text-sm text-gray-400">
        <div className="flex flex-wrap justify-center gap-6 mb-2">
          <a href="/terms" className="hover:text-gray-700 transition-colors">Terms</a>
          <a href="/privacy" className="hover:text-gray-700 transition-colors">Privacy</a>
          <a href="mailto:contact@trainkit.app" className="hover:text-gray-700 transition-colors">Contact</a>
        </div>
        <p>© 2026 TrainKit. All rights reserved.</p>
      </footer>
    </div>
  )
}
