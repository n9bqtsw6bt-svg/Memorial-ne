import { useState } from 'react'
import { POINTS } from '../../data/exercises'
import './Exercise.css'

export default function SentenceCombine({ exercise, onAnswer, answered }) {
  const [userText, setUserText] = useState('')
  const [showExample, setShowExample] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [selfScore, setSelfScore] = useState(null)

  const { instruction, sentences, hint, exampleAnswer, concept } = exercise

  const wordCount = userText.trim().split(/\s+/).filter(Boolean).length

  const handleReveal = () => {
    if (!submitted) {
      setShowExample(true)
      setSubmitted(true)
    }
  }

  const handleSelfAssess = (achieved) => {
    const score = achieved ? POINTS.sentenceCombine : Math.round(POINTS.sentenceCombine * 0.5)
    setSelfScore(score)
    onAnswer(score)
  }

  return (
    <div className="exercise">
      <p className="ex-instruction">{instruction}</p>

      {/* Source sentences */}
      <div className="source-sentences">
        {sentences.map((s, i) => (
          <div key={i} className="source-sentence">
            <span className="source-num">{i + 1}</span>
            <span>{s}</span>
          </div>
        ))}
      </div>

      {/* Hint */}
      {hint && (
        <details className="hint-details">
          <summary className="hint-toggle">💡 Show hint</summary>
          <p className="hint-text">{hint}</p>
        </details>
      )}

      {/* Writing area */}
      <div className="write-area-wrapper">
        <textarea
          className="combine-textarea"
          placeholder="Write your combined sentence here…"
          value={userText}
          onChange={(e) => setUserText(e.target.value)}
          disabled={submitted}
          rows={4}
        />
        <div className="word-count-row">
          <span className={`word-count ${wordCount > 0 ? 'has-words' : ''}`}>
            {wordCount} word{wordCount !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {!submitted && (
        <button
          className="check-btn"
          onClick={handleReveal}
          disabled={wordCount < 3}
        >
          Reveal Example Answer
        </button>
      )}

      {showExample && (
        <div className="feedback-box feedback-neutral">
          <div className="feedback-header">📝 One strong way to combine these:</div>
          <blockquote className="example-answer">{exampleAnswer}</blockquote>
          <p className="feedback-note">
            Your answer does not need to match word-for-word. Focus on whether your sentence
            is grammatically complete, flows naturally, and preserves all the key information.
          </p>
        </div>
      )}

      {submitted && selfScore === null && (
        <div className="self-assess-block">
          <p className="self-assess-question">
            How well did your sentence achieve a similar result?
          </p>
          <div className="self-assess-btns">
            <button className="assess-btn assess-yes" onClick={() => handleSelfAssess(true)}>
              ✓ Yes — I captured the key ideas smoothly
            </button>
            <button className="assess-btn assess-partial" onClick={() => handleSelfAssess(false)}>
              ~ Partially — I'll keep practicing
            </button>
          </div>
        </div>
      )}

      {selfScore !== null && (
        <div className="score-awarded">
          +{selfScore} XP earned
        </div>
      )}
    </div>
  )
}
