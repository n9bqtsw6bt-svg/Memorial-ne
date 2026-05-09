import { useState } from 'react'
import { useLocalStorage } from './hooks/useLocalStorage'
import Dashboard from './components/Dashboard'
import Session from './components/Session'
import Results from './components/Results'
import { generateSession } from './data/exercises'
import './App.css'

const INITIAL_STATS = {
  streak: 0,
  lastSessionDate: null,
  totalSessions: 0,
  totalPoints: 0,
  level: 1,
}

export default function App() {
  const [screen, setScreen] = useState('dashboard')
  const [currentSession, setCurrentSession] = useState(null)
  const [sessionResults, setSessionResults] = useState(null)
  const [stats, setStats] = useLocalStorage('writewell-stats', INITIAL_STATS)

  const startSession = () => {
    setCurrentSession(generateSession())
    setScreen('session')
  }

  const completeSession = (results) => {
    const today = new Date().toDateString()
    const yesterday = new Date(Date.now() - 86400000).toDateString()
    const isAlreadyDoneToday = stats.lastSessionDate === today

    if (!isAlreadyDoneToday) {
      const newStreak = stats.lastSessionDate === yesterday ? stats.streak + 1 : 1
      const newTotalPoints = stats.totalPoints + results.totalScore
      const newLevel = Math.floor(newTotalPoints / 500) + 1
      setStats({
        streak: newStreak,
        lastSessionDate: today,
        totalSessions: stats.totalSessions + 1,
        totalPoints: newTotalPoints,
        level: newLevel,
      })
    }

    setSessionResults({ ...results, isAlreadyDoneToday })
    setScreen('results')
  }

  const goToDashboard = () => {
    setScreen('dashboard')
    setCurrentSession(null)
    setSessionResults(null)
  }

  return (
    <div className="app">
      {screen === 'dashboard' && (
        <Dashboard stats={stats} onStartSession={startSession} />
      )}
      {screen === 'session' && currentSession && (
        <Session
          exercises={currentSession}
          onComplete={completeSession}
          onExit={goToDashboard}
        />
      )}
      {screen === 'results' && sessionResults && (
        <Results results={sessionResults} stats={stats} onContinue={goToDashboard} />
      )}
    </div>
  )
}
