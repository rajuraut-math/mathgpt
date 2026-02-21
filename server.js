import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = process.env.PORT || 3001
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY

if (!ANTHROPIC_API_KEY) {
  console.error('ERROR: ANTHROPIC_API_KEY is not set. Create a .env file with ANTHROPIC_API_KEY=sk-ant-...')
  process.exit(1)
}

// Serve the built React app in production
app.use(express.static(path.join(__dirname, 'dist')))

// Allow requests from the Vite dev server (local development only)
app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:4173'] }))
app.use(express.json())

app.post('/api/messages', async (req, res) => {
  const isStreaming = req.body.stream === true

  try {
    const anthropicRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify(req.body),
    })

    if (!anthropicRes.ok) {
      let errorBody = { message: `HTTP ${anthropicRes.status}` }
      try {
        const parsed = await anthropicRes.json()
        errorBody = parsed.error || errorBody
      } catch { /* ignore */ }
      return res.status(anthropicRes.status).json({ error: errorBody })
    }

    if (isStreaming) {
      res.setHeader('Content-Type', 'text/event-stream')
      res.setHeader('Cache-Control', 'no-cache')
      res.setHeader('Connection', 'keep-alive')

      const reader = anthropicRes.body.getReader()
      const decoder = new TextDecoder()

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        res.write(decoder.decode(value, { stream: true }))
      }
      res.end()
    } else {
      const data = await anthropicRes.json()
      res.json(data)
    }
  } catch (err) {
    res.status(500).json({ error: { message: err.message || 'Internal server error' } })
  }
})

// SPA fallback — send index.html for any non-API route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

app.listen(PORT, () => {
  console.log(`MathGPT server running on port ${PORT}`)
})
