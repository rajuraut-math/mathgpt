import React, { useState } from 'react'

const LEARNING_STYLES = [
  { value: 'Show me an example first', label: 'Show me an example first', desc: 'Learn by seeing worked examples' },
  { value: 'Let me try a problem first', label: 'Let me try a problem first', desc: 'Dive straight into solving' },
  { value: 'Explain the theory first', label: 'Explain the theory first', desc: 'Understand concepts before practice' },
]

const LANGUAGES = [
  { value: 'English', label: 'English' },
  { value: 'Hindi', label: 'हिंदी (Hindi)' },
  { value: 'Marathi', label: 'मराठी (Marathi)' },
]

const ProgressBar = ({ current, total }) => (
  <div className="flex gap-1.5 mb-8">
    {Array.from({ length: total }).map((_, i) => (
      <div
        key={i}
        className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
          i < current ? 'bg-blue-600' : i === current ? 'bg-blue-300' : 'bg-slate-200'
        }`}
      />
    ))}
  </div>
)

const Onboarding = ({ onComplete }) => {
  const [step, setStep] = useState(0)
  const [grade, setGrade] = useState(null)
  const [mathType, setMathType] = useState('standard')
  const [language, setLanguage] = useState(null)
  const [learningStyle, setLearningStyle] = useState(null)

  const totalSteps = grade === 11 || grade === 12 ? 4 : 3
  const currentProgress = step + 1

  const handleGrade = (g) => {
    setGrade(g)
    if (g === 11 || g === 12) {
      setStep(1) // show math type question
    } else {
      setMathType('standard')
      setStep(2) // skip to language
    }
  }

  const handleMathType = (mt) => {
    setMathType(mt)
    setStep(2)
  }

  const handleLanguage = (lang) => {
    setLanguage(lang)
    setStep(3)
  }

  const handleLearningStyle = (style) => {
    setLearningStyle(style)
    onComplete({ grade, mathType, language, learningStyle: style })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex flex-col items-center justify-center px-4 py-12">
      {/* Logo */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl shadow-lg mb-4">
          <span className="text-3xl">🧠</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-800">MathGPT</h1>
        <p className="text-slate-500 text-sm mt-1">by Pinakin AI Labs</p>
      </div>

      {/* Card */}
      <div className="w-full max-w-sm bg-white rounded-3xl shadow-xl p-7">
        <ProgressBar current={step} total={grade === 11 || grade === 12 ? 4 : 3} />

        {/* Step 0: Grade */}
        {step === 0 && (
          <>
            <h2 className="text-xl font-bold text-slate-800 mb-1">Welcome!</h2>
            <p className="text-slate-500 text-sm mb-6">Let's personalise your learning experience. Which grade are you in?</p>
            <div className="grid grid-cols-2 gap-3">
              {[9, 10, 11, 12].map((g) => (
                <button
                  key={g}
                  onClick={() => handleGrade(g)}
                  className="py-4 rounded-2xl border-2 border-slate-200 hover:border-blue-500 hover:bg-blue-50 font-semibold text-slate-700 transition-all"
                >
                  Grade {g}
                </button>
              ))}
            </div>
          </>
        )}

        {/* Step 1: Math type (Grade 11/12 only) */}
        {step === 1 && (
          <>
            <h2 className="text-xl font-bold text-slate-800 mb-1">Which Math?</h2>
            <p className="text-slate-500 text-sm mb-6">What type of Mathematics are you studying in Grade {grade}?</p>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => handleMathType('standard')}
                className="py-4 px-5 rounded-2xl border-2 border-slate-200 hover:border-blue-500 hover:bg-blue-50 text-left transition-all"
              >
                <div className="font-semibold text-slate-800">Standard Math</div>
                <div className="text-xs text-slate-500 mt-0.5">Subject code 041</div>
              </button>
              <button
                onClick={() => handleMathType('applied')}
                className="py-4 px-5 rounded-2xl border-2 border-slate-200 hover:border-blue-500 hover:bg-blue-50 text-left transition-all"
              >
                <div className="font-semibold text-slate-800">Applied Math</div>
                <div className="text-xs text-slate-500 mt-0.5">Subject code 241</div>
              </button>
            </div>
          </>
        )}

        {/* Step 2: Language */}
        {step === 2 && (
          <>
            <h2 className="text-xl font-bold text-slate-800 mb-1">Language</h2>
            <p className="text-slate-500 text-sm mb-6">What language do you prefer for explanations?</p>
            <div className="flex flex-col gap-3">
              {LANGUAGES.map(({ value, label }) => (
                <button
                  key={value}
                  onClick={() => handleLanguage(value)}
                  className="py-4 px-5 rounded-2xl border-2 border-slate-200 hover:border-blue-500 hover:bg-blue-50 font-medium text-slate-800 text-left transition-all"
                >
                  {label}
                </button>
              ))}
            </div>
          </>
        )}

        {/* Step 3: Learning style */}
        {step === 3 && (
          <>
            <h2 className="text-xl font-bold text-slate-800 mb-1">Learning Style</h2>
            <p className="text-slate-500 text-sm mb-6">How do you learn best?</p>
            <div className="flex flex-col gap-3">
              {LEARNING_STYLES.map(({ value, label, desc }) => (
                <button
                  key={value}
                  onClick={() => handleLearningStyle(value)}
                  className="py-4 px-5 rounded-2xl border-2 border-slate-200 hover:border-blue-500 hover:bg-blue-50 text-left transition-all"
                >
                  <div className="font-semibold text-slate-800 text-sm">{label}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{desc}</div>
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      <p className="text-xs text-slate-400 mt-6 text-center">
        Your preferences are saved locally and never shared.
      </p>
    </div>
  )
}

export default Onboarding
