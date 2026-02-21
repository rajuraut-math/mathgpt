import React from 'react'

const LANGUAGES = ['English', 'हिंदी (Hindi)', 'मराठी (Marathi)']
const LANG_VALUES = ['English', 'Hindi', 'Marathi']

const LEARNING_STYLES = [
  'Show me an example first',
  'Let me try a problem first',
  'Explain the theory first',
]

const CrownIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
    <path d="M2 20h20l-3-12-5 6-2-8-2 8-5-6-3 12z"/>
  </svg>
)

const Row = ({ label, value }) => (
  <div className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
    <span className="text-sm text-slate-500">{label}</span>
    <span className="text-sm font-medium text-slate-800">{value}</span>
  </div>
)

const Settings = ({
  grade,
  mathType,
  language,
  learningStyle,
  isPremium,
  onLanguageChange,
  onLearningStyleChange,
  onUpgrade,
  onBack,
}) => {
  const mathTypeLabel = mathType === 'applied' ? 'Applied Math' : 'Standard Math'
  const langIndex = LANG_VALUES.indexOf(language)
  const displayLang = langIndex >= 0 ? LANGUAGES[langIndex] : language

  return (
    <div className="max-w-lg mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Settings</h1>

      {/* Profile section */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 mb-5">
        <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">Profile</h2>
        <Row label="Grade" value={`Grade ${grade}`} />
        <Row label="Math Type" value={mathTypeLabel} />
        <div className="flex items-center justify-between py-3">
          <span className="text-sm text-slate-500">Plan</span>
          {isPremium ? (
            <span className="flex items-center gap-1 bg-amber-100 text-amber-700 text-xs font-bold px-2.5 py-1 rounded-full">
              <CrownIcon />
              PREMIUM
            </span>
          ) : (
            <span className="bg-slate-100 text-slate-500 text-xs font-bold px-2.5 py-1 rounded-full">
              FREE
            </span>
          )}
        </div>
      </div>

      {/* Language preference */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 mb-5">
        <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">Explanation Language</h2>
        <div className="flex flex-col gap-2">
          {LANG_VALUES.map((val, i) => (
            <button
              key={val}
              onClick={() => onLanguageChange(val)}
              className={`w-full text-left px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all ${
                language === val
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-slate-200 text-slate-700 hover:border-blue-300 hover:bg-slate-50'
              }`}
            >
              {LANGUAGES[i]}
            </button>
          ))}
        </div>
      </div>

      {/* Learning style */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 mb-5">
        <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">Learning Style</h2>
        <div className="flex flex-col gap-2">
          {LEARNING_STYLES.map((style) => (
            <button
              key={style}
              onClick={() => onLearningStyleChange(style)}
              className={`w-full text-left px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all ${
                learningStyle === style
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-slate-200 text-slate-700 hover:border-blue-300 hover:bg-slate-50'
              }`}
            >
              {style}
            </button>
          ))}
        </div>
      </div>

      {/* Upgrade (if free) */}
      {!isPremium && (
        <button
          onClick={onUpgrade}
          className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition-colors mb-4"
        >
          👑 Upgrade to Premium — ₹249/month
        </button>
      )}

      <button
        onClick={onBack}
        className="w-full py-3 text-slate-500 hover:text-slate-700 text-sm transition-colors"
      >
        ← Back to Dashboard
      </button>
    </div>
  )
}

export default Settings
