const MODEL = 'claude-haiku-4-5'
const API_URL = '/api/messages'

/**
 * Non-streaming API call — used for diagnostic & evaluation.
 * The API key is kept server-side; this call goes to our Express proxy.
 */
export const callClaude = async (systemPrompt, messages, maxTokens = 1024) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: maxTokens,
      system: systemPrompt,
      messages,
    }),
  })

  if (!response.ok) {
    let msg = `HTTP ${response.status}`
    try {
      const err = await response.json()
      msg = err.error?.message || msg
    } catch { /* ignore */ }
    throw new Error(msg)
  }

  const data = await response.json()
  return data.content[0]?.text ?? ''
}

/**
 * Streaming API call — used for chat messages.
 * onChunk(accumulated: string) called on every token.
 * Returns the full accumulated string.
 */
export const callClaudeStream = async (systemPrompt, messages, onChunk, maxTokens = 1024) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: maxTokens,
      stream: true,
      system: systemPrompt,
      messages,
    }),
  })

  if (!response.ok) {
    let msg = `HTTP ${response.status}`
    try {
      const err = await response.json()
      msg = err.error?.message || msg
    } catch { /* ignore */ }
    throw new Error(msg)
  }

  const reader = response.body.getReader()
  const decoder = new TextDecoder()
  let accumulated = ''

  while (true) {
    const { done, value } = await reader.read()
    if (done) break

    const chunk = decoder.decode(value, { stream: true })
    const lines = chunk.split('\n')

    for (const line of lines) {
      if (!line.startsWith('data: ')) continue
      const data = line.slice(6).trim()
      if (!data || data === '[DONE]') continue

      try {
        const parsed = JSON.parse(data)
        if (parsed.type === 'content_block_delta' && parsed.delta?.type === 'text_delta') {
          accumulated += parsed.delta.text
          onChunk(accumulated)
        }
      } catch { /* ignore JSON parse errors */ }
    }
  }

  return accumulated
}

/**
 * Parse MCQ questions from Claude's response text.
 * Expected format:
 *   Q1: question text
 *   A) option
 *   B) option
 *   C) option
 *   D) option
 *   Answer: A
 */
export const parseMCQs = (text) => {
  const questions = []
  // Split on question markers
  const blocks = text.split(/(?=\bQ\d+[:.]\s)/).filter(b => b.trim())

  for (const block of blocks) {
    const lines = block.split('\n').map(l => l.trim()).filter(l => l)
    if (!lines.length) continue

    const qMatch = lines[0].match(/^Q\d+[:.]\s*(.+)/)
    if (!qMatch) continue

    const question = qMatch[1].trim()
    const options = {}
    let answer = null

    for (const line of lines.slice(1)) {
      const optMatch = line.match(/^([A-D])[).]\s*(.+)/)
      if (optMatch) options[optMatch[1]] = optMatch[2].trim()

      const ansMatch = line.match(/^(?:Answer|Correct Answer)[:.]\s*([A-D])/i)
      if (ansMatch) answer = ansMatch[1]
    }

    if (question && Object.keys(options).length >= 2) {
      questions.push({ question, options, answer })
    }
  }

  return questions
}

/**
 * Parse DIAGNOSTIC_RESULT from Claude's evaluation response.
 */
export const parseDiagnosticResult = (text) => {
  const match = text.match(/DIAGNOSTIC_RESULT:\s*(Beginner|Needs Revision|Ready to Advance)/i)
  if (!match) return null
  // Normalize casing
  const raw = match[1].toLowerCase()
  if (raw === 'beginner') return 'Beginner'
  if (raw.includes('revision')) return 'Needs Revision'
  if (raw.includes('advance')) return 'Ready to Advance'
  return 'Needs Revision'
}
