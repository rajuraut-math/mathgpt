import React, { useState, useEffect, useCallback } from 'react'

import Header from './components/Header'
import Footer from './components/Footer'
import Modal from './components/Modal'
import Onboarding from './components/Onboarding'
import Dashboard from './components/Dashboard'
import SubtopicList from './components/SubtopicList'
import DiagnosticScreen from './components/DiagnosticScreen'
import ChatView from './components/ChatView'
import UpgradeScreen from './components/UpgradeScreen'
import Settings from './components/Settings'

// ── localStorage helpers ──────────────────────────────────────────────
const getToday = () => new Date().toISOString().split('T')[0]

const ls = {
  get: (key, fallback = null) => {
    try { return localStorage.getItem(key) ?? fallback } catch { return fallback }
  },
  set: (key, value) => {
    try { localStorage.setItem(key, String(value)) } catch { /* ignore */ }
  },
  getJSON: (key, fallback) => {
    try { return JSON.parse(localStorage.getItem(key)) ?? fallback } catch { return fallback }
  },
  setJSON: (key, value) => {
    try { localStorage.setItem(key, JSON.stringify(value)) } catch { /* ignore */ }
  },
}

// ── Main App ──────────────────────────────────────────────────────────
const App = () => {
  // ── Persistent user state (localStorage) ──────────────────────────
  const [onboardingComplete, setOnboardingComplete] = useState(
    () => ls.get('onboardingComplete') === 'true'
  )
  const [userGrade, setUserGrade] = useState(
    () => parseInt(ls.get('userGrade')) || null
  )
  const [userMathType, setUserMathType] = useState(
    () => ls.get('userMathType') || 'standard'
  )
  const [userLanguage, setUserLanguage] = useState(
    () => ls.get('userLanguage') || 'English'
  )
  const [userLearningStyle, setUserLearningStyle] = useState(
    () => ls.get('userLearningStyle') || 'Show me an example first'
  )
  const [isPremium, setIsPremium] = useState(
    () => ls.get('isPremium') === 'true'
  )
  const [freeChaptersChosen, setFreeChaptersChosen] = useState(
    () => ls.getJSON('freeChaptersChosen', [])
  )
  const [interactionCount, setInteractionCount] = useState(() => {
    const savedDate = ls.get('interactionDate')
    if (savedDate !== getToday()) return 0
    return parseInt(ls.get('interactionCount')) || 0
  })

  // ── Session navigation state ───────────────────────────────────────
  const [view, setView] = useState(() => onboardingComplete ? 'dashboard' : 'onboarding')
  const [selectedChapter, setSelectedChapter] = useState(null)
  const [selectedSubtopic, setSelectedSubtopic] = useState(null)
  const [mode, setMode] = useState('learn') // 'learn' | 'practice'
  const [diagnosticResult, setDiagnosticResult] = useState(null)

  // ── Modal state ────────────────────────────────────────────────────
  const [showLockedModal, setShowLockedModal] = useState(false)
  const [showLimitModal, setShowLimitModal] = useState(false)

  // Reset interaction count on new day
  useEffect(() => {
    const today = getToday()
    const savedDate = ls.get('interactionDate')
    if (savedDate !== today) {
      ls.set('interactionCount', '0')
      ls.set('interactionDate', today)
      setInteractionCount(0)
    }
  }, [])

  // ── Freemium helpers ───────────────────────────────────────────────
  const canAccessChapter = useCallback((chapterId) => {
    if (isPremium) return true
    if (freeChaptersChosen.length < 2) return true
    return freeChaptersChosen.includes(chapterId)
  }, [isPremium, freeChaptersChosen])

  const canInteract = useCallback(() => {
    if (isPremium) return true
    const today = getToday()
    const savedDate = ls.get('interactionDate')
    const count = savedDate !== today ? 0 : parseInt(ls.get('interactionCount')) || 0
    return count < 10
  }, [isPremium])

  const recordInteraction = useCallback(() => {
    if (isPremium) return
    const today = getToday()
    const savedDate = ls.get('interactionDate')
    const current = savedDate !== today ? 0 : parseInt(ls.get('interactionCount')) || 0
    const newCount = current + 1
    ls.set('interactionCount', String(newCount))
    ls.set('interactionDate', today)
    setInteractionCount(newCount)
  }, [isPremium])

  // ── Handlers ───────────────────────────────────────────────────────
  const handleOnboardingComplete = (data) => {
    setUserGrade(data.grade)
    setUserMathType(data.mathType || 'standard')
    setUserLanguage(data.language)
    setUserLearningStyle(data.learningStyle)
    setOnboardingComplete(true)
    ls.set('userGrade', String(data.grade))
    ls.set('userMathType', data.mathType || 'standard')
    ls.set('userLanguage', data.language)
    ls.set('userLearningStyle', data.learningStyle)
    ls.set('onboardingComplete', 'true')
    setView('dashboard')
  }

  const handleChapterSelect = (chapter) => {
    if (canAccessChapter(chapter.id)) {
      // If free user still has quota, lock in this chapter
      if (!isPremium && !freeChaptersChosen.includes(chapter.id) && freeChaptersChosen.length < 2) {
        const newChosen = [...freeChaptersChosen, chapter.id]
        setFreeChaptersChosen(newChosen)
        ls.setJSON('freeChaptersChosen', newChosen)
      }
      setSelectedChapter(chapter)
      setView('subtopicList')
    } else {
      setShowLockedModal(true)
    }
  }

  const handleLearn = (subtopic) => {
    setSelectedSubtopic(subtopic)
    setMode('learn')
    setDiagnosticResult(null)
    setView('diagnostic')
  }

  const handlePractice = (subtopic) => {
    setSelectedSubtopic(subtopic)
    setMode('practice')
    setDiagnosticResult(null)
    setView('diagnostic')
  }

  const handleDiagnosticComplete = (result) => {
    setDiagnosticResult(result)
    setView(mode === 'practice' ? 'practice' : 'tutorChat')
  }

  const handleUpgrade = () => {
    setIsPremium(true)
    ls.set('isPremium', 'true')
    setShowLockedModal(false)
    setShowLimitModal(false)
    setView('dashboard')
  }

  const handleLanguageChange = (lang) => {
    setUserLanguage(lang)
    ls.set('userLanguage', lang)
  }

  const handleLearningStyleChange = (style) => {
    setUserLearningStyle(style)
    ls.set('userLearningStyle', style)
  }

  const handleBack = () => {
    const backMap = {
      subtopicList: 'dashboard',
      diagnostic: 'subtopicList',
      tutorChat: 'subtopicList',
      practice: 'subtopicList',
      upgrade: 'dashboard',
      settings: 'dashboard',
    }
    setView(backMap[view] || 'dashboard')
  }

  const handleLimitHit = () => {
    setShowLimitModal(true)
  }

  // ── Render view ────────────────────────────────────────────────────
  const renderView = () => {
    if (!onboardingComplete) {
      return <Onboarding onComplete={handleOnboardingComplete} />
    }

    switch (view) {
      case 'dashboard':
        return (
          <Dashboard
            grade={userGrade}
            mathType={userMathType}
            isPremium={isPremium}
            freeChaptersChosen={freeChaptersChosen}
            onChapterSelect={handleChapterSelect}
            onShowUpgrade={() => setView('upgrade')}
          />
        )

      case 'subtopicList':
        return (
          <SubtopicList
            chapter={selectedChapter}
            grade={userGrade}
            onLearn={handleLearn}
            onPractice={handlePractice}
          />
        )

      case 'diagnostic':
        return (
          <DiagnosticScreen
            subtopic={selectedSubtopic}
            chapter={selectedChapter}
            grade={userGrade}
            mathType={userMathType}
            language={userLanguage}
            onComplete={handleDiagnosticComplete}
            onBack={() => setView('subtopicList')}
          />
        )

      case 'tutorChat':
      case 'practice':
        return (
          <ChatView
            key={`${view}-${selectedSubtopic?.name}`}
            subtopic={selectedSubtopic}
            chapter={selectedChapter}
            grade={userGrade}
            mathType={userMathType}
            language={userLanguage}
            learningStyle={userLearningStyle}
            diagnosticResult={diagnosticResult}
            mode={view === 'practice' ? 'practice' : 'learn'}
            isPremium={isPremium}
            interactionCount={interactionCount}
            canInteract={canInteract}
            recordInteraction={recordInteraction}
            onBack={() => setView('subtopicList')}
            onShowUpgrade={() => setView('upgrade')}
            onLimitHit={handleLimitHit}
          />
        )

      case 'upgrade':
        return (
          <UpgradeScreen
            isPremium={isPremium}
            onUpgrade={handleUpgrade}
            onBack={handleBack}
          />
        )

      case 'settings':
        return (
          <Settings
            grade={userGrade}
            mathType={userMathType}
            language={userLanguage}
            learningStyle={userLearningStyle}
            isPremium={isPremium}
            onLanguageChange={handleLanguageChange}
            onLearningStyleChange={handleLearningStyleChange}
            onUpgrade={() => setView('upgrade')}
            onBack={handleBack}
          />
        )

      default:
        return null
    }
  }

  // ── Views that use the full-height layout (no footer scroll padding) ─
  const isFullHeight = view === 'tutorChat' || view === 'practice'

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header (not shown during onboarding) */}
      {onboardingComplete && (
        <Header
          view={view}
          isPremium={isPremium}
          subtopicName={selectedSubtopic?.name}
          chapterName={selectedChapter?.name}
          onBack={handleBack}
          onGoHome={() => { setSelectedChapter(null); setSelectedSubtopic(null); setView('dashboard') }}
          onSettings={() => setView('settings')}
        />
      )}

      {/* Main content */}
      <main className={isFullHeight ? 'flex-1 overflow-hidden' : 'flex-1'}>
        {renderView()}
      </main>

      {/* Footer (not shown during onboarding or full-height chat) */}
      {onboardingComplete && !isFullHeight && <Footer />}

      {/* Locked Chapter Modal */}
      {showLockedModal && (
        <Modal
          title="Chapter Locked"
          message="This chapter requires Premium. Upgrade for full access to all chapters and grades."
          onClose={() => setShowLockedModal(false)}
          onAction={() => { setShowLockedModal(false); setView('upgrade') }}
          actionLabel="Upgrade to Premium"
          onSecondary={() => setShowLockedModal(false)}
          secondaryLabel="Not now"
        />
      )}

      {/* Interaction Limit Modal */}
      {showLimitModal && (
        <Modal
          title="Daily Limit Reached"
          message="You've used all 10 free interactions for today. Upgrade to Premium for unlimited learning, any time."
          onClose={() => setShowLimitModal(false)}
          onAction={() => { setShowLimitModal(false); setView('upgrade') }}
          actionLabel="Upgrade to Premium"
          onSecondary={() => setShowLimitModal(false)}
          secondaryLabel="Come back tomorrow"
        />
      )}
    </div>
  )
}

export default App
