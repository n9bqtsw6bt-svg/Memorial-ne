import './Dashboard.css'

const LEVEL_NAMES = ['', 'Apprentice', 'Practitioner', 'Proficient', 'Advanced', 'Expert', 'Master']

const RESEARCH_TIPS = [
  {
    title: 'Why Sentence Combining Works',
    body: 'Research by Hillocks (1986) found that sentence-combining exercises produce greater gains in writing quality than free writing alone. Combining short sentences trains your brain to recognize syntactic patterns and use them naturally in your own prose.',
  },
  {
    title: 'The Power of Deliberate Practice',
    body: "Ericsson's research on expertise shows that improvement requires focused effort on specific weaknesses, not just repetition. This app targets identified grammar gaps so each session builds directly on the last.",
  },
  {
    title: 'Spaced Repetition and Retention',
    body: 'Cognitive science shows that spacing practice across multiple days dramatically improves long-term retention. Daily 15-minute sessions outperform a single two-hour weekly study session by a wide margin.',
  },
  {
    title: 'Why Feedback Accelerates Learning',
    body: 'Research on corrective feedback (Bitchener & Ferris, 2012) shows that focused, explicit feedback on specific grammar points leads to measurable improvement. Every explanation in this app is designed to teach the rule, not just flag the error.',
  },
  {
    title: 'Retrieval Practice vs. Re-reading',
    body: 'Testing yourself on grammar rules — retrieval practice — is far more effective than simply reviewing them. Every quiz here is a retrieval event. Research shows that even getting an answer wrong strengthens long-term memory more than passively re-reading.',
  },
  {
    title: 'Active Voice and Cognitive Load',
    body: "Studies on reading comprehension show that active-voice sentences are processed faster and remembered more accurately than passive-voice equivalents. Medical writing, in particular, benefits from clarity — your reader's cognitive load is already high.",
  },
  {
    title: 'Fluency Writing and Automaticity',
    body: "Krashen's (1994) research on writing fluency suggests that regular, low-stakes writing builds automaticity — the ability to compose without consciously monitoring every rule. Short daily prompts are exactly what builds this kind of fluid confidence.",
  },
]

function getLevelName(level) {
  return LEVEL_NAMES[Math.min(level, LEVEL_NAMES.length - 1)]
}

function getLevelProgress(totalPoints) {
  return ((totalPoints % 500) / 500) * 100
}

function getPointsToNext(totalPoints) {
  return 500 - (totalPoints % 500)
}

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
}

export default function Dashboard({ stats, onStartSession }) {
  const today = new Date().toDateString()
  const doneToday = stats.lastSessionDate === today
  const tip = RESEARCH_TIPS[stats.totalSessions % RESEARCH_TIPS.length]
  const levelProgress = getLevelProgress(stats.totalPoints)
  const pointsToNext = getPointsToNext(stats.totalPoints)

  return (
    <div className="dashboard">
      <header className="dash-header">
        <div className="logo">
          <span className="logo-mark">✍</span>
          <span className="logo-name">WriteWell</span>
        </div>
        <p className="logo-sub">Daily Writing Practice</p>
      </header>

      <main className="dash-main">
        <div className="greeting-block">
          <h1 className="greeting-title">{getGreeting()}, Doctor</h1>
          <p className="greeting-sub">
            {doneToday
              ? "You've completed today's session — excellent work."
              : "Your 15-minute practice is ready."}
          </p>
        </div>

        {/* Stats row */}
        <div className="stats-row">
          <div className="stat-card">
            <div className="stat-emoji">🔥</div>
            <div className="stat-value">{stats.streak}</div>
            <div className="stat-label">Day Streak</div>
          </div>
          <div className="stat-card">
            <div className="stat-emoji">⭐</div>
            <div className="stat-value">{stats.totalPoints.toLocaleString()}</div>
            <div className="stat-label">Total XP</div>
          </div>
          <div className="stat-card">
            <div className="stat-emoji">📋</div>
            <div className="stat-value">{stats.totalSessions}</div>
            <div className="stat-label">Sessions</div>
          </div>
        </div>

        {/* Level card */}
        <div className="level-card">
          <div className="level-top">
            <div className="level-info">
              <span className="level-badge">Level {stats.level}</span>
              <span className="level-name">{getLevelName(stats.level)}</span>
            </div>
            <span className="level-next">{pointsToNext} XP to Level {stats.level + 1}</span>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${levelProgress}%` }} />
          </div>
        </div>

        {/* Today's session card */}
        <div className="session-card">
          <div className="session-card-top">
            <h2>Today&rsquo;s Practice</h2>
            <span className="time-chip">⏱ 15–20 min</span>
          </div>
          <ul className="exercise-breakdown">
            <li>
              <span className="ex-badge grammar">G</span>
              2 Grammar error exercises
            </li>
            <li>
              <span className="ex-badge word">W</span>
              2 Word choice exercises
            </li>
            <li>
              <span className="ex-badge sentence">S</span>
              2 Sentence-combining challenges
            </li>
            <li>
              <span className="ex-badge prompt">P</span>
              1 Writing prompt
            </li>
          </ul>
          <button className={`start-btn ${doneToday ? 'secondary' : ''}`} onClick={onStartSession}>
            {doneToday ? 'Practice Again' : 'Start Practice →'}
          </button>
          {doneToday && (
            <p className="done-note">✓ Session completed today. Come back tomorrow to keep your streak!</p>
          )}
        </div>

        {/* Research corner */}
        <div className="research-card">
          <div className="research-label">Research Corner</div>
          <h3 className="research-title">{tip.title}</h3>
          <p className="research-body">{tip.body}</p>
        </div>
      </main>
    </div>
  )
}
