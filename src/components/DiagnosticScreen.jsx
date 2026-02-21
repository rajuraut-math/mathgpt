import React, { useState, useEffect } from 'react'
import { callClaude, parseMCQs, parseDiagnosticResult } from '../api'
import { buildDiagnosticSystemPrompt } from '../systemPrompt'

const RESULT_CONFIG = {
  'Beginner': {
    emoji: '🌱',
    color: 'bg-green-50 border-green-200 text-green-700',
    badge: 'bg-green-100 text-green-700',
    label: 'Beginner',
    desc: "No worries — everyone starts somewhere. MathGPT will use simple examples and guide you step by step.",
  },
  'Needs Revision': {
    emoji: '📖',
    color: 'bg-amber-50 border-amber-200 text-amber-700',
    badge: 'bg-amber-100 text-amber-700',
    label: 'Needs Revision',
    desc: "You have some foundation! MathGPT will focus on clearing up any misconceptions before moving forward.",
  },
  'Ready to Advance': {
    emoji: '🚀',
    color: 'bg-blue-50 border-blue-200 text-blue-700',
    badge: 'bg-blue-100 text-blue-700',
    label: 'Ready to Advance',
    desc: "Excellent prerequisite knowledge! MathGPT will challenge you with advanced variations.",
  },
}

const ThinkingDots = () => (
  <div className="flex gap-1.5">
    {[0, 1, 2].map(i => (
      <div
        key={i}
        className="w-2.5 h-2.5 rounded-full bg-blue-400 thinking-dot"
        style={{ animationDelay: `${i * 0.2}s` }}
      />
    ))}
  </div>
)

const DiagnosticScreen = ({ subtopic, chapter, grade, mathType, language, onComplete, onBack }) => {
  const [phase, setPhase] = useState('loading') // loading | questions | evaluating | result | error
  const [questions, setQuestions] = useState([])
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState([])
  const [rawResponse, setRawResponse] = useState('')
  const [result, setResult] = useState(null)
  const [resultExplanation, setResultExplanation] = useState('')
  const [error, setError] = useState(null)

  useEffect(() => {
    generateQuestions()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const generateQuestions = async () => {
    setPhase('loading')
    setError(null)
    try {
      const sysPrompt = buildDiagnosticSystemPrompt(grade, mathType, language, subtopic.name)
      const msgs = [
        {
          role: 'user',
          content: `Generate exactly 4 MCQ questions to assess prerequisite knowledge for the subtopic "${subtopic.name}" from chapter "${chapter.name}" (CBSE Grade ${grade}).`,
        },
      ]
      const response = await callClaude(sysPrompt, msgs, 1200)
      setRawResponse(response)

      const parsed = parseMCQs(response)
      if (parsed.length === 0) {
        // Fallback: try to use the response as-is but generate a default
        setError('Could not parse questions. Please try again.')
        setPhase('error')
        return
      }

      setQuestions(parsed.slice(0, 4))
      setAnswers(new Array(Math.min(parsed.length, 4)).fill(null))
      setPhase('questions')
    } catch (err) {
      setError(err.message || 'Failed to generate questions.')
      setPhase('error')
    }
  }

  const handleAnswer = (letter) => {
    const newAnswers = [...answers]
    newAnswers[currentQ] = letter
    setAnswers(newAnswers)

    if (currentQ < questions.length - 1) {
      // Move to next question after a short delay
      setTimeout(() => setCurrentQ(currentQ + 1), 400)
    }
  }

  const allAnswered = answers.length > 0 && answers.every(a => a !== null)

  const handleEvaluate = async () => {
    setPhase('evaluating')
    try {
      const sysPrompt = buildDiagnosticSystemPrompt(grade, mathType, language, subtopic.name)
      const answerSummary = questions
        .map((q, i) => `Q${i + 1}: ${answers[i] || 'Not answered'}`)
        .join(', ')

      const msgs = [
        {
          role: 'user',
          content: `Generate exactly 4 MCQ questions to assess prerequisite knowledge for the subtopic "${subtopic.name}" from chapter "${chapter.name}" (CBSE Grade ${grade}).`,
        },
        { role: 'assistant', content: rawResponse },
        {
          role: 'user',
          content: `I have answered all 4 questions. My answers are: ${answerSummary}. Please evaluate and give the DIAGNOSTIC_RESULT.`,
        },
      ]

      const evalResponse = await callClaude(sysPrompt, msgs, 600)
      const diagResult = parseDiagnosticResult(evalResponse) || 'Needs Revision'

      // Extract explanation (text after the DIAGNOSTIC_RESULT line)
      const afterResult = evalResponse.replace(/DIAGNOSTIC_RESULT:.*(\r?\n|$)/i, '').trim()
      setResultExplanation(afterResult || RESULT_CONFIG[diagResult].desc)
      setResult(diagResult)
      setPhase('result')
    } catch {
      // On error, default to Needs Revision
      setResult('Needs Revision')
      setResultExplanation(RESULT_CONFIG['Needs Revision'].desc)
      setPhase('result')
    }
  }

  const handleStart = () => {
    onComplete(result)
  }

  // ── LOADING ──────────────────────────────────────────────────────────
  if (phase === 'loading' || phase === 'evaluating') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 px-4">
        <ThinkingDots />
        <p className="text-slate-500 text-sm">
          {phase === 'loading' ? 'MathGPT is generating your diagnostic...' : 'Evaluating your answers...'}
        </p>
      </div>
    )
  }

  // ── ERROR ─────────────────────────────────────────────────────────────
  if (phase === 'error') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 px-4 text-center">
        <div className="text-4xl">⚠️</div>
        <h2 className="font-bold text-slate-700 text-lg">Oops!</h2>
        <p className="text-slate-500 text-sm max-w-xs">{error}</p>
        <div className="flex gap-3">
          <button
            onClick={generateQuestions}
            className="px-5 py-2.5 bg-blue-600 text-white rounded-xl font-semibold text-sm hover:bg-blue-700"
          >
            Try Again
          </button>
          <button
            onClick={() => onComplete('Needs Revision')}
            className="px-5 py-2.5 bg-slate-100 text-slate-700 rounded-xl font-semibold text-sm hover:bg-slate-200"
          >
            Skip Diagnostic
          </button>
        </div>
      </div>
    )
  }

  // ── RESULT ────────────────────────────────────────────────────────────
  if (phase === 'result' && result) {
    const config = RESULT_CONFIG[result]
    return (
      <div className="max-w-sm mx-auto px-4 py-8 flex flex-col items-center text-center gap-6">
        <div className="text-6xl">{config.emoji}</div>
        <div>
          <h2 className="text-xl font-bold text-slate-800 mb-2">Diagnostic Complete!</h2>
          <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold ${config.badge}`}>
            {config.label}
          </span>
        </div>
        <div className={`w-full border rounded-2xl p-4 text-sm leading-relaxed ${config.color}`}>
          {resultExplanation || config.desc}
        </div>
        <button
          onClick={handleStart}
          className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition-colors text-base"
        >
          Start Learning →
        </button>
      </div>
    )
  }

  // ── QUESTIONS ─────────────────────────────────────────────────────────
  const q = questions[currentQ]
  const OPTIONS = ['A', 'B', 'C', 'D']

  return (
    <div className="max-w-lg mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-6 text-center">
        <h2 className="text-base font-semibold text-slate-500">Quick Check</h2>
        <p className="text-lg font-bold text-slate-800 mt-0.5">Let's see where you are</p>
        <p className="text-xs text-slate-400 mt-1">{subtopic.name}</p>
      </div>

      {/* Progress */}
      <div className="flex gap-1.5 mb-6">
        {questions.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-colors ${
              i < currentQ ? 'bg-blue-600' : i === currentQ ? 'bg-blue-400' : 'bg-slate-200'
            }`}
          />
        ))}
      </div>

      {/* Question card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm mb-4">
        <div className="text-xs font-semibold text-blue-600 mb-2">Question {currentQ + 1} of {questions.length}</div>
        <p className="text-slate-800 font-medium leading-relaxed">{q.question}</p>
      </div>

      {/* Options */}
      <div className="flex flex-col gap-3 mb-6">
        {OPTIONS.filter(opt => q.options[opt]).map((opt) => (
          <button
            key={opt}
            onClick={() => handleAnswer(opt)}
            disabled={answers[currentQ] !== null}
            className={`w-full text-left px-4 py-3.5 rounded-2xl border-2 font-medium text-sm transition-all ${
              answers[currentQ] === opt
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : answers[currentQ] !== null
                ? 'border-slate-200 bg-slate-50 text-slate-400 cursor-default'
                : 'border-slate-200 hover:border-blue-400 hover:bg-blue-50 text-slate-700'
            }`}
          >
            <span className="font-bold mr-2">{opt})</span>
            {q.options[opt]}
          </button>
        ))}
      </div>

      {/* Navigation */}
      <div className="flex gap-3">
        {currentQ > 0 && (
          <button
            onClick={() => setCurrentQ(currentQ - 1)}
            className="px-4 py-2.5 bg-slate-100 text-slate-600 rounded-xl text-sm font-medium hover:bg-slate-200"
          >
            ← Back
          </button>
        )}

        <div className="flex-1" />

        {currentQ < questions.length - 1 ? (
          <button
            onClick={() => answers[currentQ] !== null && setCurrentQ(currentQ + 1)}
            disabled={answers[currentQ] === null}
            className="px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold disabled:opacity-40 hover:bg-blue-700 transition-colors"
          >
            Next →
          </button>
        ) : allAnswered ? (
          <button
            onClick={handleEvaluate}
            className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors"
          >
            See Results →
          </button>
        ) : (
          <button
            disabled
            className="px-5 py-2.5 bg-blue-200 text-white rounded-xl text-sm font-semibold cursor-default"
          >
            Answer to continue
          </button>
        )}
      </div>
    </div>
  )
}

export default DiagnosticScreen
