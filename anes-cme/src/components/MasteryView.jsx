import { useMemo } from 'react';
import { TOPICS, allFlashcards } from '../data/index.js';
import { masteryLevel, isMastered, isDue } from '../utils/spacedRepetition.js';

const LEVEL_LABELS = ['New', 'Learning', 'Young', 'Mature', 'Mastered'];
const LEVEL_COLORS = ['#CBD5E1', '#93C5FD', '#60A5FA', '#3B82F6', '#1D4ED8'];

export default function MasteryView({ cardStates }) {
  const topicData = useMemo(() => {
    return Object.keys(TOPICS).map(topicId => {
      const cards = allFlashcards.filter(c => c.topic === topicId);
      const levels = [0, 0, 0, 0, 0];
      cards.forEach(c => {
        const lvl = masteryLevel(cardStates[c.id]);
        levels[lvl]++;
      });
      const mastered = cards.filter(c => isMastered(cardStates[c.id])).length;
      const due = cards.filter(c => isDue(cardStates[c.id] || { nextReview: 0 })).length;
      return {
        topic: TOPICS[topicId],
        cards,
        levels,
        mastered,
        due,
        pct: Math.round((mastered / cards.length) * 100),
      };
    });
  }, [cardStates]);

  const totalCards = allFlashcards.length;
  const totalMastered = allFlashcards.filter(c => isMastered(cardStates[c.id])).length;
  const overallPct = Math.round((totalMastered / totalCards) * 100);

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Mastery Overview</h1>
        <p className="page-subtitle">Track your learning progress across all topics</p>
      </div>

      <div className="mastery-overall">
        <div className="mastery-overall-ring">
          <svg viewBox="0 0 120 120" width="120" height="120">
            <circle cx="60" cy="60" r="50" fill="none" stroke="#E2E8F0" strokeWidth="12" />
            <circle
              cx="60" cy="60" r="50"
              fill="none"
              stroke="#3B82F6"
              strokeWidth="12"
              strokeDasharray={`${2 * Math.PI * 50}`}
              strokeDashoffset={`${2 * Math.PI * 50 * (1 - overallPct / 100)}`}
              strokeLinecap="round"
              transform="rotate(-90 60 60)"
            />
            <text x="60" y="55" textAnchor="middle" fontSize="22" fontWeight="700" fill="#1E293B">{overallPct}%</text>
            <text x="60" y="72" textAnchor="middle" fontSize="10" fill="#64748B">mastered</text>
          </svg>
        </div>
        <div className="mastery-overall-stats">
          <div className="mastery-stat">
            <span className="mastery-stat-val">{totalMastered}</span>
            <span className="mastery-stat-lbl">Mastered</span>
          </div>
          <div className="mastery-stat">
            <span className="mastery-stat-val">{totalCards - totalMastered}</span>
            <span className="mastery-stat-lbl">Remaining</span>
          </div>
          <div className="mastery-stat">
            <span className="mastery-stat-val">{totalCards}</span>
            <span className="mastery-stat-lbl">Total Cards</span>
          </div>
        </div>
        <div className="mastery-legend">
          {LEVEL_LABELS.map((lbl, i) => (
            <span key={i} className="legend-item">
              <span className="legend-dot" style={{ background: LEVEL_COLORS[i] }} />
              {lbl}
            </span>
          ))}
        </div>
      </div>

      <h2 className="section-title">Topic Breakdown</h2>
      {topicData.map(({ topic, cards, levels, mastered, due, pct }) => (
        <div key={topic.id} className="mastery-topic-card">
          <div className="mastery-topic-header">
            <span className="mastery-topic-icon">{topic.icon}</span>
            <span className="mastery-topic-name">{topic.label}</span>
            <span className="mastery-topic-pct" style={{ color: topic.color }}>{pct}%</span>
          </div>

          <div className="mastery-bar-container">
            {levels.map((count, i) => (
              count > 0 && (
                <div
                  key={i}
                  className="mastery-bar-segment"
                  style={{
                    width: `${(count / cards.length) * 100}%`,
                    background: LEVEL_COLORS[i],
                  }}
                  title={`${LEVEL_LABELS[i]}: ${count} cards`}
                />
              )
            ))}
            {levels.every(l => l === 0) && (
              <div className="mastery-bar-segment" style={{ width: '100%', background: '#E2E8F0' }} />
            )}
          </div>

          <div className="mastery-topic-footer">
            <div className="mastery-level-counts">
              {LEVEL_LABELS.map((lbl, i) => (
                <span key={i} className="level-count" style={{ color: LEVEL_COLORS[i] }}>
                  {levels[i]} {lbl}
                </span>
              ))}
            </div>
            <span className="badge-due">{due} due for review</span>
          </div>
        </div>
      ))}
    </div>
  );
}
