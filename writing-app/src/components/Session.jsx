import { useState, useEffect, useRef } from 'react'
import GrammarFix from './exercises/GrammarFix'
import WordChoice from './exercises/WordChoice'
import SentenceCombine from './exercises/SentenceCombine'
import WritingPrompt from './exercises/WritingPrompt'
import { POINTS } from '../data/exercises'
import './Session.css'

const TYPE_LABELS = {
  grammarFix: 'Grammar',
  wordChoice: 'Word Choice',
  sentenceCombine: 'Sentence Combining',
  writingPrompt: 'Writing Prompt',
}

const TYPE_COLORS = {
  grammarFix: 'grammar',
  wordChoice: 'word',
  sentenceCombine: 'sentence',
  writingPrompt: 'prompt',
}

function formatTime(seconds) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

export default function Session({ exercises, onComplete, onExit }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [scores, setScores] = useState([])
  const [answered, setAnswered] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const timerRef = useRef(null)

  useEffect(() => {
    timerRef.current = setInterval(() => setElapsed((e) => e + 1), 1000)
    return () => clearInterval(timerRef.current)
  }, [])

  const current = exercises[currentIndex]
  const total = exercises.length
  const progressPct = (currentIndex / total) * 100

  const handleAnswer = (score) => {
    setScores((prev) => [...prev, score])
    setAnswered(true)
  }

  const handleNext = () => {
    if (currentIndex + 1 >= total) {
      clearInterval(timerRef.current)
      const allScores = [...scores]
      const totalScore = allScores.reduce((a, b) => a + b, 0)
      const mcExercises = exercises.filter(
        (ex) => ex.type === 'grammarFix' || ex.type === 'wordChoice'
      )
      const mcCount = mcExercises.length
      const mcCorrect = exercises.reduce((acc, ex, i) => {
        if (ex.type === 'grammarFix' || ex.type === 'wordChoice') {
          return acc + (allScores[i] === POINTS[ex.type] ? 1 : 0)
        }
        return acc
      }, 0)
      onComplete({
        totalScore,
        exercises,
        scores: allScores,
        elapsed,
        mcCorrect,
        mcCount,
      })
    } else {
      setCurrentIndex((i) => i + 1)
      setAnswered(false)
    }
  }

  const isWarning = elapsed >= 15 * 60
  const isDanger = elapsed >= 20 * 60

  return (
    <div className="session">
      {/* Top bar */}
      <div className="session-topbar">
        <button className="exit-btn" onClick={onExit} title="Return to dashboard">
          ← Dashboard
        </button>
        <div className="session-progress-label">
          Exercise {currentIndex + 1} of {total}
        </div>
        <div className={`session-timer ${isWarning ? 'warn' : ''} ${isDanger ? 'danger' : ''}`}>
          ⏱ {formatTime(elapsed)}
        </div>
      </div>

      {/* Progress bar */}
      <div className="session-progress-track">
        <div className="session-progress-fill" style={{ width: `${progressPct}%` }} />
      </div>

      {/* Exercise type badge */}
      <div className="exercise-type-row">
        <span className={`type-badge ${TYPE_COLORS[current.type]}`}>
          {TYPE_LABELS[current.type]}
        </span>
        <span className="concept-label">{current.concept}</span>
        <span className="points-label">+{POINTS[current.type]} XP</span>
      </div>

      {/* Exercise content — key on exercise id forces fresh state for each exercise */}
      <div className="exercise-container">
        {current.type === 'grammarFix' && (
          <GrammarFix key={current.id} exercise={current} onAnswer={handleAnswer} />
        )}
        {current.type === 'wordChoice' && (
          <WordChoice key={current.id} exercise={current} onAnswer={handleAnswer} />
        )}
        {current.type === 'sentenceCombine' && (
          <SentenceCombine key={current.id} exercise={current} onAnswer={handleAnswer} />
        )}
        {current.type === 'writingPrompt' && (
          <WritingPrompt key={current.id} exercise={current} onAnswer={handleAnswer} />
        )}
      </div>

      {/* Next button — appears after answering */}
      {answered && (
        <div className="next-row">
          <button className="next-btn" onClick={handleNext}>
            {currentIndex + 1 >= total ? 'See Results →' : 'Next Exercise →'}
          </button>
        </div>
      )}
    </div>
  )
}
