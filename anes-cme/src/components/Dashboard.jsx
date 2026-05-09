import { useMemo } from 'react';
import { TOPICS, allFlashcards, allCases, allQuestions } from '../data/index.js';
import { isDue, isMastered } from '../utils/spacedRepetition.js';

export default function Dashboard({ cardStates, quizHistory, caseProgress, onTabChange }) {
  const stats = useMemo(() => {
    const dueCount = allFlashcards.filter(c => isDue(cardStates[c.id] || { nextReview: 0 })).length;
    const masteredCount = allFlashcards.filter(c => isMastered(cardStates[c.id])).length;

    const topicStats = Object.keys(TOPICS).map(topicId => {
      const cards = allFlashcards.filter(c => c.topic === topicId);
      const mastered = cards.filter(c => isMastered(cardStates[c.id])).length;
      const seen = cards.filter(c => cardStates[c.id]?.repetitions > 0).length;
      const due = cards.filter(c => isDue(cardStates[c.id] || { nextReview: 0 })).length;
      return { topic: TOPICS[topicId], total: cards.length, mastered, seen, due };
    });

    const totalQuizzes = quizHistory.length;
    const avgScore = totalQuizzes > 0
      ? Math.round((quizHistory.reduce((sum, h) => sum + (h.score / h.total), 0) / totalQuizzes) * 100)
      : null;

    const completedCases = Object.values(caseProgress).filter(p => p.completed).length;

    return { dueCount, masteredCount, topicStats, avgScore, completedCases };
  }, [cardStates, quizHistory, caseProgress]);

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-subtitle">Your anesthesiology CME at a glance</p>
      </div>

      <div className="stat-grid">
        <StatCard
          value={stats.dueCount}
          label="Cards Due Today"
          color="#3B82F6"
          action={() => onTabChange('flashcards')}
          actionLabel="Review Now →"
        />
        <StatCard
          value={`${stats.masteredCount}/${allFlashcards.length}`}
          label="Cards Mastered"
          color="#10B981"
          action={() => onTabChange('mastery')}
          actionLabel="View Progress →"
        />
        <StatCard
          value={stats.avgScore !== null ? `${stats.avgScore}%` : '—'}
          label="Avg Quiz Score"
          color="#F59E0B"
          action={() => onTabChange('quiz')}
          actionLabel="Take Quiz →"
        />
        <StatCard
          value={`${stats.completedCases}/${allCases.length}`}
          label="Cases Completed"
          color="#EF4444"
          action={() => onTabChange('cases')}
          actionLabel="View Cases →"
        />
      </div>

      <h2 className="section-title">Progress by Topic</h2>
      <div className="topic-grid">
        {stats.topicStats.map(({ topic, total, mastered, seen, due }) => {
          const pct = Math.round((mastered / total) * 100);
          return (
            <div key={topic.id} className="topic-card" style={{ borderLeft: `4px solid ${topic.color}` }}>
              <div className="topic-card-header">
                <span className="topic-card-icon">{topic.icon}</span>
                <span className="topic-card-label">{topic.label}</span>
                <span className="topic-card-pct" style={{ color: topic.color }}>{pct}%</span>
              </div>
              <div className="progress-bar-track">
                <div
                  className="progress-bar-fill"
                  style={{ width: `${pct}%`, background: topic.color }}
                />
              </div>
              <div className="topic-card-stats">
                <span>{mastered}/{total} mastered</span>
                <span className="badge-due">{due} due</span>
              </div>
            </div>
          );
        })}
      </div>

      <h2 className="section-title">Quick Actions</h2>
      <div className="quick-actions">
        <button className="quick-btn" onClick={() => onTabChange('flashcards')}>
          <span className="quick-btn-icon">🗂</span>
          <strong>Spaced Repetition</strong>
          <span>Review cards due today</span>
        </button>
        <button className="quick-btn" onClick={() => onTabChange('quiz')}>
          <span className="quick-btn-icon">✓</span>
          <strong>Practice Quiz</strong>
          <span>{allQuestions.length} board-style MCQs</span>
        </button>
        <button className="quick-btn" onClick={() => onTabChange('cases')}>
          <span className="quick-btn-icon">🏥</span>
          <strong>Clinical Cases</strong>
          <span>{allCases.length} branching scenarios</span>
        </button>
        <button className="quick-btn" onClick={() => onTabChange('reference')}>
          <span className="quick-btn-icon">📋</span>
          <strong>Quick Reference</strong>
          <span>Drug tables & protocols</span>
        </button>
      </div>
    </div>
  );
}

function StatCard({ value, label, color, action, actionLabel }) {
  return (
    <div className="stat-card">
      <div className="stat-value" style={{ color }}>{value}</div>
      <div className="stat-label">{label}</div>
      {action && (
        <button className="stat-action" onClick={action} style={{ color }}>
          {actionLabel}
        </button>
      )}
    </div>
  );
}
