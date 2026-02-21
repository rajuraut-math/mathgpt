import React from 'react'

const CheckIcon = ({ className = '' }) => (
  <svg viewBox="0 0 24 24" className={`w-4 h-4 ${className}`} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)

const XIcon = ({ className = '' }) => (
  <svg viewBox="0 0 24 24" className={`w-4 h-4 ${className}`} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
)

const CrownIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M2 20h20l-3-12-5 6-2-8-2 8-5-6-3 12z"/>
  </svg>
)

const FEATURES = [
  { label: 'Chapter access', free: 'Choose 2 chapters', premium: 'All chapters, all grades' },
  { label: 'Daily AI interactions', free: '10 per day', premium: 'Unlimited' },
  { label: 'Practice questions', free: '3 per subtopic/day', premium: 'Unlimited' },
  { label: 'Languages', free: 'English, Hindi, Marathi', premium: 'English, Hindi, Marathi' },
  { label: 'Diagnostic tests', free: '✓', premium: '✓' },
  { label: 'CBSE PYQ mode', free: '✗', premium: 'Coming Soon' },
  { label: 'Session history', free: '✗', premium: 'Coming Soon' },
  { label: 'Timed exam mode', free: '✗', premium: 'Coming Soon' },
]

const UpgradeScreen = ({ isPremium, onUpgrade, onBack }) => {
  if (isPremium) {
    return (
      <div className="max-w-sm mx-auto px-4 py-12 text-center">
        <div className="text-6xl mb-4">👑</div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">You're Premium!</h2>
        <p className="text-slate-500 text-sm mb-8">
          Enjoy unlimited learning with full access to all CBSE chapters and features.
        </p>
        <button
          onClick={onBack}
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-2xl hover:bg-blue-700 transition-colors"
        >
          Continue Learning
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-8">
      {/* Hero */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-2xl mb-4">
          <span className="text-3xl">👑</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-800 mb-2">Learn Math Without Limits</h1>
        <p className="text-slate-500 text-sm">
          Replace expensive tuition. Your 24/7 Socratic math tutor for CBSE Grades 9–12.
        </p>
      </div>

      {/* Pricing cards */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        {/* Monthly */}
        <div className="flex-1 bg-white border-2 border-blue-500 rounded-2xl p-5 relative">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <span className="bg-blue-600 text-white text-xs font-bold px-3 py-0.5 rounded-full">POPULAR</span>
          </div>
          <div className="text-center">
            <p className="text-sm text-slate-500 mb-1">Monthly</p>
            <p className="text-3xl font-bold text-slate-800">₹249</p>
            <p className="text-xs text-slate-400 mt-0.5">per month</p>
          </div>
        </div>

        {/* Yearly */}
        <div className="flex-1 bg-white border-2 border-slate-200 rounded-2xl p-5">
          <div className="text-center">
            <p className="text-sm text-slate-500 mb-1">Yearly</p>
            <p className="text-3xl font-bold text-slate-800">₹1,999</p>
            <p className="text-xs text-green-600 font-semibold mt-0.5">Save ₹989 (33% off)</p>
          </div>
        </div>
      </div>

      {/* Feature comparison */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden mb-6">
        <div className="grid grid-cols-3 bg-slate-50 border-b border-slate-200">
          <div className="p-3 text-xs font-semibold text-slate-500">Feature</div>
          <div className="p-3 text-xs font-semibold text-slate-500 text-center">Free</div>
          <div className="p-3 text-xs font-semibold text-amber-600 text-center flex items-center justify-center gap-1">
            <CrownIcon />
            Premium
          </div>
        </div>

        {FEATURES.map((f, i) => (
          <div
            key={i}
            className={`grid grid-cols-3 border-b border-slate-100 last:border-0 ${i % 2 === 0 ? '' : 'bg-slate-50/50'}`}
          >
            <div className="p-3 text-xs text-slate-600">{f.label}</div>
            <div className="p-3 text-center">
              {f.free === '✓' ? (
                <CheckIcon className="text-green-500 mx-auto" />
              ) : f.free === '✗' ? (
                <XIcon className="text-slate-300 mx-auto" />
              ) : (
                <span className="text-xs text-slate-500">{f.free}</span>
              )}
            </div>
            <div className="p-3 text-center">
              {f.premium === 'Coming Soon' ? (
                <span className="text-xs text-slate-400 italic">Soon</span>
              ) : f.premium === '✓' ? (
                <CheckIcon className="text-green-500 mx-auto" />
              ) : f.premium === '✗' ? (
                <XIcon className="text-slate-300 mx-auto" />
              ) : (
                <span className="text-xs text-amber-700 font-medium">{f.premium}</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <button
        onClick={onUpgrade}
        className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition-colors text-base shadow-lg shadow-blue-200"
      >
        👑 Activate Premium (Demo)
      </button>
      <p className="text-center text-xs text-slate-400 mt-3">
        UPI and card payments coming soon. Demo mode — no payment required.
      </p>

      <button
        onClick={onBack}
        className="w-full mt-4 py-3 text-slate-500 hover:text-slate-700 text-sm transition-colors"
      >
        Back to learning
      </button>
    </div>
  )
}

export default UpgradeScreen
