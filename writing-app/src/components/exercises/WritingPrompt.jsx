import { useState } from 'react'
import { POINTS } from '../../data/exercises'
import './Exercise.css'

const WRITING_TIPS = [
  'Vary your sentence openings — not every sentence needs to start with "I" or "The."',
  'Read your sentences aloud. If you run out of breath, the sentence is probably too long.',
  'Specific details are more powerful than general statements. "A crowded OR at 5:45 AM" beats "a busy morning."',
  'Every sentence should earn its place. If removing it loses nothing, cut it.',
  'Strong verbs do more work than adverb-verb pairs. "She insisted" beats "she said strongly."',
]

export default function WritingPrompt({ exercise, onAnswer }) {
  const [text, setText] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const { instruction, prompt, tip, minWords } = exercise
  const [craftTip] = useState(
    () => WRITING_TIPS[Math.floor(Math.random() * WRITING_TIPS.length)]
  )

  const words = text.trim().split(/\s+/).filter(Boolean)
  const wordCount = words.length
  const meetsMinimum = wordCount >= minWords

  const handleSubmit = () => {
    if (!meetsMinimum) return
    setSubmitted(true)
    onAnswer(POINTS.writingPrompt)
  }

  return (
    <div className="exercise">
      <p className="ex-instruction">{instruction}</p>

      {/* Prompt card */}
      <div className="prompt-card">
        <div className="prompt-quote-mark">"</div>
        <p className="prompt-text">{prompt}</p>
      </div>

      {/* Writing tip */}
      <div className="writing-tip">
        <span className="tip-label">✍ Tip</span>
        <span className="tip-text">{tip}</span>
      </div>

      {/* Textarea */}
      <div className="write-area-wrapper">
        <textarea
          className="prompt-textarea"
          placeholder="Begin writing here…"
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={submitted}
          rows={8}
        />
        <div className="word-count-row">
          <span className={`word-count ${meetsMinimum ? 'meets-min' : wordCount > 0 ? 'has-words' : ''}`}>
            {wordCount} / {minWords} words minimum
          </span>
          {!meetsMinimum && wordCount > 0 && (
            <span className="words-needed">{minWords - wordCount} more to go</span>
          )}
          {meetsMinimum && <span className="min-met">✓ Minimum reached</span>}
        </div>
      </div>

      {!submitted && (
        <button
          className="check-btn"
          onClick={handleSubmit}
          disabled={!meetsMinimum}
        >
          Submit Writing
        </button>
      )}

      {submitted && (
        <div className="feedback-box feedback-correct">
          <div className="feedback-header">✓ Great work — {wordCount} words written!</div>
          <p className="feedback-explanation">
            You completed today&rsquo;s writing challenge. Regular short writing sessions build
            the automaticity that makes composing feel natural over time.
          </p>
          <div className="craft-tip">
            <span className="craft-tip-label">Craft tip to consider next time:</span>
            <span className="craft-tip-text">{craftTip}</span>
          </div>
        </div>
      )}
    </div>
  )
}
