import React, { useState, useEffect, useRef } from 'react'
import { callClaudeStream } from '../api'
import { buildSystemPrompt } from '../systemPrompt'
import MathRenderer from './MathRenderer'

// ── Icons ─────────────────────────────────────────────────────────────
const SendIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13"/>
    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
)

const ThumbUpIcon = ({ filled }) => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
  </svg>
)

const ThumbDownIcon = ({ filled }) => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"/>
  </svg>
)

const KeyboardIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="M6 8h.01M10 8h.01M14 8h.01M18 8h.01M8 12h.01M12 12h.01M16 12h.01M7 16h10"/>
  </svg>
)

const HelpIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
    <line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
)

// ── Math Keyboard ─────────────────────────────────────────────────────
const MATH_SYMBOLS = [
  'x', 'y', '²', '√', 'π', '(', ')', '=',
  '/', '*', '+', '-', '^', '≠', '±', 'θ',
  '∫', 'Σ', '∞', '≤', '≥', '≈', '→', 'Δ',
]

const MathKeyboard = ({ onInsert }) => (
  <div className="bg-slate-50 border-t border-slate-200 px-3 py-3">
    <div className="flex flex-wrap gap-1.5">
      {MATH_SYMBOLS.map((sym) => (
        <button
          key={sym}
          onClick={() => onInsert(sym)}
          className="w-9 h-9 flex items-center justify-center bg-white border border-slate-200 rounded-lg text-slate-700 font-mono text-sm hover:bg-blue-50 hover:border-blue-300 transition-colors"
        >
          {sym}
        </button>
      ))}
    </div>
  </div>
)

// ── Thinking indicator ────────────────────────────────────────────────
const ThinkingIndicator = () => (
  <div className="flex items-center gap-2 px-4 py-3">
    <div className="flex gap-1">
      {[0, 1, 2].map(i => (
        <div
          key={i}
          className="w-2 h-2 rounded-full bg-blue-400 thinking-dot"
          style={{ animationDelay: `${i * 0.2}s` }}
        />
      ))}
    </div>
    <span className="text-slate-400 text-sm italic">MathGPT is thinking...</span>
  </div>
)

// ── Chat Message ──────────────────────────────────────────────────────
const ChatMessage = ({ msg, onFeedback }) => {
  const isUser = msg.role === 'user'

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-3`}>
      {!isUser && (
        <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold mr-2 mt-1 shrink-0">
          M
        </div>
      )}

      <div className={`max-w-[85%] ${isUser ? 'items-end' : 'items-start'} flex flex-col`}>
        <div
          className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
            isUser
              ? 'bg-blue-600 text-white rounded-br-sm'
              : 'bg-white border border-slate-200 text-slate-800 rounded-bl-sm shadow-sm'
          }`}
        >
          {isUser ? (
            <span>{msg.content}</span>
          ) : (
            <MathRenderer text={msg.content} />
          )}
        </div>

        {/* Feedback buttons for AI messages */}
        {!isUser && msg.content && (
          <div className="flex gap-1.5 mt-1.5 px-1">
            <button
              onClick={() => onFeedback(msg.id, 'up')}
              className={`p-1.5 rounded-lg transition-colors ${
                msg.feedback === 'up' ? 'text-green-600 bg-green-50' : 'text-slate-300 hover:text-green-500 hover:bg-green-50'
              }`}
              aria-label="Helpful"
            >
              <ThumbUpIcon filled={msg.feedback === 'up'} />
            </button>
            <button
              onClick={() => onFeedback(msg.id, 'down')}
              className={`p-1.5 rounded-lg transition-colors ${
                msg.feedback === 'down' ? 'text-red-500 bg-red-50' : 'text-slate-300 hover:text-red-400 hover:bg-red-50'
              }`}
              aria-label="Not helpful"
            >
              <ThumbDownIcon filled={msg.feedback === 'down'} />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

// ── Main ChatView ─────────────────────────────────────────────────────
let msgCounter = 0
const newId = () => `msg-${++msgCounter}-${Date.now()}`

const ChatView = ({
  subtopic,
  chapter,
  grade,
  mathType,
  language,
  learningStyle,
  diagnosticResult,
  mode, // 'learn' | 'practice'
  isPremium,
  interactionCount,
  canInteract,
  recordInteraction,
  onBack,
  onShowUpgrade,
  onLimitHit,
}) => {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showMathKb, setShowMathKb] = useState(false)
  const [showHelp, setShowHelp] = useState(false)
  const [streamingContent, setStreamingContent] = useState('')
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  const maxInteractions = 10
  const interactionsLeft = maxInteractions - interactionCount

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, streamingContent, isLoading])

  // In practice mode, send an opening message automatically
  useEffect(() => {
    if (mode === 'practice') {
      const practiceCount = isPremium ? '3–5' : '3'
      const openingMsg = `Please generate ${practiceCount} practice questions on "${subtopic.name}" for me to solve. Present them one at a time.`
      sendMessage(openingMsg, true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const buildSysPrompt = () =>
    buildSystemPrompt(
      grade,
      mathType,
      language,
      learningStyle,
      diagnosticResult,
      mode,
      subtopic.name,
      chapter.name
    )

  const sendMessage = async (text, isAuto = false) => {
    if (!text.trim()) return

    if (!canInteract()) {
      onLimitHit()
      return
    }

    const userMsg = { id: newId(), role: 'user', content: text.trim() }
    const updatedMessages = [...messages, userMsg]

    setMessages(updatedMessages)
    if (!isAuto) setInput('')
    setIsLoading(true)
    setStreamingContent('')

    if (!isAuto) recordInteraction()

    const apiMessages = updatedMessages.map(({ role, content }) => ({ role, content }))

    try {
      let fullContent = ''
      await callClaudeStream(
        buildSysPrompt(),
        apiMessages,
        (accumulated) => {
          fullContent = accumulated
          setStreamingContent(accumulated)
        },
        1024
      )

      const aiMsg = { id: newId(), role: 'assistant', content: fullContent, feedback: null }
      setMessages(prev => [...prev, aiMsg])
      setStreamingContent('')
    } catch (err) {
      const errMsg = {
        id: newId(),
        role: 'assistant',
        content: `Sorry, I encountered an error: ${err.message}. Please check your API key or try again.`,
        feedback: null,
      }
      setMessages(prev => [...prev, errMsg])
      setStreamingContent('')
    } finally {
      setIsLoading(false)
    }
  }

  const handleFeedback = (msgId, type) => {
    setMessages(prev =>
      prev.map(m => m.id === msgId ? { ...m, feedback: m.feedback === type ? null : type } : m)
    )
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (!isLoading) sendMessage(input)
    }
  }

  const insertSymbol = (sym) => {
    const el = inputRef.current
    if (!el) return
    const start = el.selectionStart
    const end = el.selectionEnd
    const newVal = input.slice(0, start) + sym + input.slice(end)
    setInput(newVal)
    // restore cursor position
    setTimeout(() => {
      el.focus()
      el.setSelectionRange(start + sym.length, start + sym.length)
    }, 0)
  }

  const handleSend = () => {
    if (!isLoading && input.trim()) sendMessage(input)
  }

  return (
    <div className="flex flex-col h-[calc(100vh-56px)]">
      {/* Top bar with context info */}
      <div className="bg-white border-b border-slate-100 px-4 py-2 flex items-center justify-between shrink-0">
        <div className="text-xs text-slate-500">
          <span className="font-medium text-slate-700">{mode === 'practice' ? '✏️ Practice' : '📘 Learn'}</span>
          {' · '}
          {diagnosticResult && (
            <span className="text-blue-600 font-medium">{diagnosticResult}</span>
          )}
        </div>

        <div className="flex items-center gap-3">
          {/* Interaction count (free users) */}
          {!isPremium && (
            <span className={`text-xs font-medium ${interactionsLeft <= 3 ? 'text-orange-500' : 'text-slate-400'}`}>
              {interactionsLeft} left today
            </span>
          )}

          {/* Help button */}
          <div className="relative">
            <button
              onClick={() => setShowHelp(!showHelp)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-blue-500 hover:bg-blue-50 transition-colors"
              aria-label="Help"
            >
              <HelpIcon />
            </button>
            {showHelp && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-slate-800 text-white text-xs rounded-xl p-3 shadow-lg z-20">
                <p className="font-semibold mb-1.5">💡 Tip</p>
                <p className="text-slate-300 leading-relaxed">
                  Type <span className="font-mono bg-slate-700 px-1 rounded">"just show me"</span> if you want a direct explanation instead of hints.
                </p>
                <button onClick={() => setShowHelp(false)} className="mt-2 text-slate-400 hover:text-white">✕ Close</button>
              </div>
            )}
          </div>

          {/* Math keyboard toggle */}
          <button
            onClick={() => setShowMathKb(!showMathKb)}
            className={`p-1.5 rounded-lg transition-colors ${
              showMathKb ? 'text-blue-600 bg-blue-50' : 'text-slate-400 hover:text-blue-500 hover:bg-blue-50'
            }`}
            aria-label="Math keyboard"
          >
            <KeyboardIcon />
          </button>
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-4 py-4 scrollbar-hide">
        {messages.length === 0 && !isLoading && mode === 'learn' && (
          <div className="text-center py-12">
            <div className="text-4xl mb-3">📘</div>
            <p className="text-slate-500 text-sm font-medium">
              Ready to learn <span className="text-blue-600 font-semibold">{subtopic.name}</span>?
            </p>
            <p className="text-slate-400 text-xs mt-2">Ask any question or say "let's start" to begin.</p>
          </div>
        )}

        {messages.map((msg) => (
          <ChatMessage key={msg.id} msg={msg} onFeedback={handleFeedback} />
        ))}

        {/* Streaming message */}
        {isLoading && streamingContent && (
          <div className="flex justify-start mb-3">
            <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold mr-2 mt-1 shrink-0">
              M
            </div>
            <div className="max-w-[85%] px-4 py-3 rounded-2xl rounded-bl-sm bg-white border border-slate-200 text-sm leading-relaxed text-slate-800 shadow-sm">
              <MathRenderer text={streamingContent} />
              <span className="inline-block w-0.5 h-4 bg-blue-400 ml-0.5 animate-pulse align-text-bottom" />
            </div>
          </div>
        )}

        {/* Loading dots (before any streaming) */}
        {isLoading && !streamingContent && <ThinkingIndicator />}

        <div ref={messagesEndRef} />
      </div>

      {/* Upgrade prompt (when limit hit inline) */}
      {!isPremium && interactionsLeft === 0 && (
        <div className="bg-orange-50 border-t border-orange-200 px-4 py-3 flex items-center justify-between shrink-0">
          <p className="text-sm text-orange-700 font-medium">Daily limit reached</p>
          <button
            onClick={onShowUpgrade}
            className="text-xs font-bold text-orange-600 bg-orange-100 hover:bg-orange-200 px-3 py-1.5 rounded-lg transition-colors"
          >
            Upgrade →
          </button>
        </div>
      )}

      {/* Math keyboard */}
      {showMathKb && <MathKeyboard onInsert={insertSymbol} />}

      {/* Input area */}
      <div className="bg-white border-t border-slate-200 px-4 py-3 shrink-0">
        <div className="flex items-end gap-2">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={
              !isPremium && interactionsLeft === 0
                ? 'Upgrade to continue chatting...'
                : mode === 'practice'
                ? 'Type your answer...'
                : 'Ask a question or request a hint...'
            }
            disabled={!isPremium && interactionsLeft === 0}
            rows={1}
            className="flex-1 resize-none bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 disabled:opacity-50 disabled:cursor-not-allowed max-h-32"
            style={{ overflowY: 'auto' }}
            onInput={(e) => {
              e.target.style.height = 'auto'
              e.target.style.height = Math.min(e.target.scrollHeight, 128) + 'px'
            }}
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim() || (!isPremium && interactionsLeft === 0)}
            className="w-11 h-11 flex items-center justify-center bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 text-white rounded-2xl transition-colors shrink-0"
            aria-label="Send"
          >
            <SendIcon />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChatView
