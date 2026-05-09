import { useState } from 'react'
import { POINTS } from '../../data/exercises'
import './Exercise.css'

export default function WordChoice({ exercise, onAnswer, answered }) {
  const [selected, setSelected] = useState(null)
  const [submitted, setSubmitted] = useState(false)

  const { instruction, before, after, options, correctIndex, explanation } = exercise

  const handleSubmit = () => {
    if (selected === null) return
    setSubmitted(true)
    const score = selected === correctIndex ? POINTS.wordChoice : 0
    onAnswer(score)
  }

  const getOptionClass = (i) => {
    if (!submitted) return selected === i ? 'option selected' : 'option'
    if (i === correctIndex) return 'option correct'
    if (i === selected && selected !== correctIndex) return 'option incorrect'
    return 'option'
  }

  return (
    <div className="exercise">
      <p className="ex-instruction">{instruction}</p>

      {/* Fill-in-the-blank sentence display */}
      <div className="ex-sentence-box fill-blank">
        <p className="ex-sentence">
          {before}
          <span className={`blank-slot ${submitted ? (selected === correctIndex ? 'blank-correct' : 'blank-incorrect') : selected !== null ? 'blank-filled' : ''}`}>
            {selected !== null ? options[selected] : '________'}
          </span>
          {after}
        </p>
      </div>

      <div className="options-list options-inline">
        {options.map((opt, i) => (
          <button
            key={i}
            className={getOptionClass(i)}
            onClick={() => !submitted && setSelected(i)}
            disabled={submitted}
          >
            <span className="option-marker">
              {submitted
                ? i === correctIndex
                  ? '✓'
                  : i === selected && selected !== correctIndex
                  ? '✗'
                  : String.fromCharCode(65 + i)
                : String.fromCharCode(65 + i)}
            </span>
            <span className="option-text">{opt}</span>
          </button>
        ))}
      </div>

      {!submitted && (
        <button
          className="check-btn"
          onClick={handleSubmit}
          disabled={selected === null}
        >
          Check Answer
        </button>
      )}

      {submitted && (
        <div className={`feedback-box ${selected === correctIndex ? 'feedback-correct' : 'feedback-incorrect'}`}>
          <div className="feedback-header">
            {selected === correctIndex
              ? `✓ Correct! "${options[correctIndex]}" is right.`
              : `✗ The correct answer is "${options[correctIndex]}"`}
          </div>
          <p className="feedback-explanation">{explanation}</p>
        </div>
      )}
    </div>
  )
}
