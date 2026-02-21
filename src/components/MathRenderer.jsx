import React from 'react'
import katex from 'katex'

/**
 * Renders a string containing LaTeX math expressions ($...$ and $$...$$)
 * alongside regular text and newlines.
 */

const renderKaTeX = (tex, displayMode) => {
  try {
    return katex.renderToString(tex, {
      displayMode,
      throwOnError: false,
      strict: false,
      trust: false,
    })
  } catch {
    return displayMode ? `$$${tex}$$` : `$${tex}$`
  }
}

const splitByMath = (text) => {
  const segments = []
  // Match $$...$$ first (block), then $...$ (inline)
  const regex = /\$\$([\s\S]*?)\$\$|\$([^$\n]+?)\$/g
  let lastIndex = 0
  let match

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ type: 'text', content: text.slice(lastIndex, match.index) })
    }
    if (match[1] !== undefined) {
      segments.push({ type: 'block', content: match[1] })
    } else if (match[2] !== undefined) {
      segments.push({ type: 'inline', content: match[2] })
    }
    lastIndex = match.index + match[0].length
  }

  if (lastIndex < text.length) {
    segments.push({ type: 'text', content: text.slice(lastIndex) })
  }

  return segments
}

const MathRenderer = ({ text, className = '' }) => {
  if (!text) return null

  const segments = splitByMath(text)

  return (
    <span className={className}>
      {segments.map((seg, i) => {
        if (seg.type === 'block') {
          const html = renderKaTeX(seg.content, true)
          return (
            <span
              key={i}
              className="block my-1 overflow-x-auto"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          )
        }

        if (seg.type === 'inline') {
          const html = renderKaTeX(seg.content, false)
          return (
            <span
              key={i}
              dangerouslySetInnerHTML={{ __html: html }}
            />
          )
        }

        // Plain text — preserve newlines
        return (
          <span key={i}>
            {seg.content.split('\n').map((line, j) => (
              <React.Fragment key={j}>
                {j > 0 && <br />}
                {line}
              </React.Fragment>
            ))}
          </span>
        )
      })}
    </span>
  )
}

export default MathRenderer
