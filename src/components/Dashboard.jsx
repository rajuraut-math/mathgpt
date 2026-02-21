import React, { useState } from 'react'
import { getChapters } from '../curriculum'

const LockIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
)

const CrownIcon = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor">
    <path d="M2 20h20l-3-12-5 6-2-8-2 8-5-6-3 12z"/>
  </svg>
)

const ChapterCard = ({ chapter, isLocked, isChosen, isPremium, onClick, chosenCount }) => {
  const [showTooltip, setShowTooltip] = useState(false)

  const handleClick = () => {
    onClick(chapter)
  }

  const boardCount = chapter.subtopics.filter(s => !s.isFormativeOnly).length
  const formativeCount = chapter.subtopics.filter(s => s.isFormativeOnly).length

  return (
    <div className="relative">
      <button
        onClick={handleClick}
        className={`w-full text-left p-4 rounded-2xl border-2 transition-all ${
          isLocked
            ? 'border-slate-200 bg-slate-50 opacity-75'
            : isChosen
            ? 'border-blue-400 bg-blue-50 shadow-sm'
            : 'border-slate-200 bg-white hover:border-blue-400 hover:shadow-sm'
        }`}
        onMouseEnter={() => isLocked && setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h3 className={`font-semibold text-sm leading-tight ${isLocked ? 'text-slate-500' : 'text-slate-800'}`}>
              {chapter.name}
            </h3>
            <p className="text-xs text-slate-400 mt-1.5">
              {chapter.subtopics.length} subtopics
              {formativeCount > 0 && (
                <span className="ml-1 text-slate-400">· {formativeCount} formative-only</span>
              )}
            </p>
          </div>

          <div className="shrink-0">
            {isLocked ? (
              <div className="flex items-center gap-1">
                <span className="flex items-center gap-0.5 bg-amber-100 text-amber-600 text-xs font-semibold px-2 py-0.5 rounded-full">
                  <CrownIcon />
                  PRO
                </span>
                <span className="text-slate-400">
                  <LockIcon />
                </span>
              </div>
            ) : isChosen ? (
              <span className="bg-blue-100 text-blue-600 text-xs font-semibold px-2 py-0.5 rounded-full">
                Unlocked
              </span>
            ) : chosenCount < 2 && !isPremium ? (
              <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-0.5 rounded-full">
                Free
              </span>
            ) : null}
          </div>
        </div>
      </button>

      {/* Tooltip for locked chapters */}
      {showTooltip && isLocked && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 z-20 w-56 bg-slate-800 text-white text-xs rounded-xl p-3 shadow-lg pointer-events-none">
          <p className="font-semibold mb-1">Premium Required</p>
          <p className="text-slate-300">Upgrade for full access to all chapters across all grades.</p>
          <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-slate-800 rotate-45"/>
        </div>
      )}
    </div>
  )
}

const Dashboard = ({ grade, mathType, isPremium, freeChaptersChosen, onChapterSelect, onShowUpgrade }) => {
  const chapters = getChapters(grade, mathType)
  const mathTypeLabel = mathType === 'applied' ? 'Applied Mathematics' : 'Mathematics'

  const canAccessChapter = (chapterId) => {
    if (isPremium) return true
    if (freeChaptersChosen.length < 2) return true
    return freeChaptersChosen.includes(chapterId)
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      {/* Dashboard header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">
          Grade {grade} {mathTypeLabel}
        </h1>
        <p className="text-slate-500 text-sm mt-1">CBSE Curriculum · {chapters.length} chapters</p>

        {!isPremium && freeChaptersChosen.length < 2 && (
          <div className="mt-3 bg-blue-50 border border-blue-200 rounded-2xl p-3">
            <p className="text-sm text-blue-700">
              <span className="font-semibold">Free Plan:</span> Choose any{' '}
              <span className="font-bold">{2 - freeChaptersChosen.length}</span> more chapter
              {2 - freeChaptersChosen.length !== 1 ? 's' : ''} to unlock. Tap to select!
            </p>
          </div>
        )}

        {!isPremium && freeChaptersChosen.length === 2 && (
          <div className="mt-3 bg-slate-50 border border-slate-200 rounded-2xl p-3 flex items-center justify-between">
            <p className="text-sm text-slate-600">
              <span className="font-semibold">2 chapters unlocked.</span> Upgrade for all chapters.
            </p>
            <button
              onClick={onShowUpgrade}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 ml-2 shrink-0"
            >
              Upgrade ›
            </button>
          </div>
        )}
      </div>

      {/* Chapter grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {chapters.map((chapter) => {
          const isLocked = !canAccessChapter(chapter.id)
          const isChosen = freeChaptersChosen.includes(chapter.id)
          return (
            <ChapterCard
              key={chapter.id}
              chapter={chapter}
              isLocked={isLocked}
              isChosen={isChosen}
              isPremium={isPremium}
              chosenCount={freeChaptersChosen.length}
              onClick={onChapterSelect}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Dashboard
