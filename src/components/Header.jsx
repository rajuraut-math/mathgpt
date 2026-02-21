import React from 'react'

// Simple inline SVG icons
const BrainIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-1.66z"/>
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-1.66z"/>
  </svg>
)

const SettingsIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"/>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
  </svg>
)

const BackIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5"/>
    <polyline points="12 19 5 12 12 5"/>
  </svg>
)

const CrownIcon = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor">
    <path d="M2 20h20l-3-12-5 6-2-8-2 8-5-6-3 12z"/>
  </svg>
)

const BACK_VIEWS = ['subtopicList', 'diagnostic', 'tutorChat', 'practice', 'upgrade', 'settings']

const Header = ({ view, isPremium, subtopicName, chapterName, onBack, onSettings }) => {
  const showBack = BACK_VIEWS.includes(view)
  const showSubtitle = (view === 'tutorChat' || view === 'practice' || view === 'diagnostic') && subtopicName
  const showChapter = (view === 'subtopicList') && chapterName

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
      <div className="flex items-center h-14 px-4 gap-3">
        {/* Back button or Logo */}
        {showBack ? (
          <button
            onClick={onBack}
            className="p-2 -ml-2 rounded-xl hover:bg-slate-100 transition-colors text-slate-600"
            aria-label="Go back"
          >
            <BackIcon />
          </button>
        ) : (
          <div className="text-blue-600">
            <BrainIcon />
          </div>
        )}

        {/* Title area */}
        <div className="flex-1 min-w-0">
          {showSubtitle ? (
            <>
              <div className="font-semibold text-slate-800 text-sm leading-tight truncate">
                {subtopicName}
              </div>
              <div className="text-xs text-slate-400 leading-tight truncate">
                {view === 'practice' ? 'Practice Mode' : view === 'diagnostic' ? 'Diagnostic' : 'Learn Mode'}
              </div>
            </>
          ) : showChapter ? (
            <>
              <div className="font-semibold text-slate-800 text-sm leading-tight truncate">
                {chapterName}
              </div>
              <div className="text-xs text-slate-400">Subtopics</div>
            </>
          ) : (
            <>
              <span className="font-bold text-slate-800 text-base">MathGPT</span>
              <span className="text-xs text-slate-400 ml-1.5 hidden sm:inline">by Pinakin AI Labs</span>
            </>
          )}
        </div>

        {/* Right side: badge + settings */}
        <div className="flex items-center gap-2 shrink-0">
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

          <button
            onClick={onSettings}
            className="p-2 rounded-xl hover:bg-slate-100 transition-colors text-slate-500"
            aria-label="Settings"
          >
            <SettingsIcon />
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
