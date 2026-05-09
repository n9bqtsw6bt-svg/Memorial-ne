import { POINTS } from '../data/exercises'
import './Results.css'

const MAX_SESSION_SCORE = 2 * POINTS.grammarFix + 2 * POINTS.wordChoice + 2 * POINTS.sentenceCombine + POINTS.writingPrompt

function formatTime(seconds) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}m ${s}s`
}

function getScoreMessage(pct) {
  if (pct === 100) return { emoji: '🏆', text: 'Perfect session — outstanding!' }
  if (pct >= 80) return { emoji: '⭐', text: 'Excellent work today!' }
  if (pct >= 60) return { emoji: '👍', text: 'Solid session. Keep it up!' }
  return { emoji: '📚', text: "Good effort. Each session builds on the last." }
}

function getTypeLabel(type) {
  return {
    grammarFix: 'Grammar',
    wordChoice: 'Word Choice',
    sentenceCombine: 'Sentence Combining',
    writingPrompt: 'Writing Prompt',
  }[type]
}

function getTypeColor(type) {
  return {
    grammarFix: 'grammar',
    wordChoice: 'word',
    sentenceCombine: 'sentence',
    writingPrompt: 'prompt',
  }[type]
}

export default function Results({ results, stats, onContinue }) {
  const { totalScore, exercises, scores, elapsed, mcCorrect, mcCount, isAlreadyDoneToday } = results
  const pct = Math.round((totalScore / MAX_SESSION_SCORE) * 100)
  const msg = getScoreMessage(pct)

  return (
    <div className="results">
      <div className="results-inner">
        {/* Score hero */}
        <div className="score-hero">
          <div className="score-emoji">{msg.emoji}</div>
          <h1 className="score-title">{msg.text}</h1>
          {!isAlreadyDoneToday && (
            <div className="xp-earned">+{totalScore} XP earned</div>
          )}
        </div>

        {/* Stats row */}
        <div className="result-stats">
          <div className="result-stat">
            <div className="rs-value">{totalScore}<span className="rs-max">/{MAX_SESSION_SCORE}</span></div>
            <div className="rs-label">Score</div>
          </div>
          <div className="result-stat">
            <div className="rs-value">{mcCorrect}<span className="rs-max">/{mcCount}</span></div>
            <div className="rs-label">MC Correct</div>
          </div>
          <div className="result-stat">
            <div className="rs-value">{formatTime(elapsed)}</div>
            <div className="rs-label">Time</div>
          </div>
          <div className="result-stat">
            <div className="rs-value">{stats.streak}</div>
            <div className="rs-label">Streak 🔥</div>
          </div>
        </div>

        {/* Score bar */}
        <div className="score-bar-wrapper">
          <div className="score-bar-track">
            <div
              className="score-bar-fill"
              style={{ width: `${pct}%` }}
            />
          </div>
          <div className="score-bar-label">{pct}% of maximum score</div>
        </div>

        {/* Exercise breakdown */}
        <div className="breakdown-section">
          <h2 className="breakdown-title">Exercise Review</h2>
          <div className="breakdown-list">
            {exercises.map((ex, i) => {
              const maxScore = POINTS[ex.type]
              const earned = scores[i]
              const isMC = ex.type === 'grammarFix' || ex.type === 'wordChoice'
              const correct = isMC ? earned === maxScore : null
              return (
                <div key={ex.id} className="breakdown-item">
                  <span className={`br-badge ${getTypeColor(ex.type)}`}>
                    {getTypeLabel(ex.type)}
                  </span>
                  <span className="br-concept">{ex.concept}</span>
                  <span className={`br-score ${isMC ? (correct ? 'br-correct' : 'br-incorrect') : 'br-neutral'}`}>
                    {isMC
                      ? correct ? `+${earned} ✓` : `+${earned} ✗`
                      : `+${earned}`}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Total account balance */}
        <div className="total-xp-card">
          <span className="total-xp-label">Total XP</span>
          <span className="total-xp-value">{stats.totalPoints.toLocaleString()} ⭐</span>
        </div>

        <button className="continue-btn" onClick={onContinue}>
          Back to Dashboard →
        </button>
      </div>
    </div>
  )
}
