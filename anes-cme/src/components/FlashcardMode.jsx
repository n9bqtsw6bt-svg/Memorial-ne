import { useState, useMemo, useCallback } from 'react';
import { TOPICS, allFlashcards } from '../data/index.js';
import { isDue, createCardState, computeNextReview, masteryLevel } from '../utils/spacedRepetition.js';

const QUALITY_BUTTONS = [
  { quality: 0, label: 'Again', desc: 'Forgot completely', color: '#EF4444' },
  { quality: 2, label: 'Hard', desc: 'Significant effort', color: '#F59E0B' },
  { quality: 4, label: 'Good', desc: 'Remembered well', color: '#3B82F6' },
  { quality: 5, label: 'Easy', desc: 'Instantly recalled', color: '#10B981' },
];

export default function FlashcardMode({ cardStates, onUpdateCardState }) {
  const [selectedTopic, setSelectedTopic] = useState('all');
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sessionDone, setSessionDone] = useState(false);
  const [sessionStats, setSessionStats] = useState({ reviewed: 0, correct: 0 });

  const deck = useMemo(() => {
    const filtered = selectedTopic === 'all'
      ? allFlashcards
      : allFlashcards.filter(c => c.topic === selectedTopic);
    return filtered.filter(c => isDue(cardStates[c.id] || { nextReview: 0 }));
  }, [selectedTopic, cardStates]);

  const newCards = useMemo(() => {
    const filtered = selectedTopic === 'all'
      ? allFlashcards
      : allFlashcards.filter(c => c.topic === selectedTopic);
    return filtered.filter(c => !cardStates[c.id]);
  }, [selectedTopic, cardStates]);

  const studyDeck = useMemo(() => {
    if (deck.length > 0) return deck;
    return newCards.slice(0, 10);
  }, [deck, newCards]);

  const currentCard = studyDeck[currentIndex];

  const handleFlip = useCallback(() => setIsFlipped(f => !f), []);

  const handleRate = useCallback((quality) => {
    if (!currentCard) return;

    const existing = cardStates[currentCard.id] || createCardState();
    const next = computeNextReview(existing, quality);
    onUpdateCardState(currentCard.id, next);

    setSessionStats(prev => ({
      reviewed: prev.reviewed + 1,
      correct: quality >= 3 ? prev.correct + 1 : prev.correct,
    }));

    const nextIndex = currentIndex + 1;
    if (nextIndex >= studyDeck.length) {
      setSessionDone(true);
    } else {
      setCurrentIndex(nextIndex);
      setIsFlipped(false);
    }
  }, [currentCard, cardStates, currentIndex, studyDeck, onUpdateCardState]);

  const handleRestart = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setSessionDone(false);
    setSessionStats({ reviewed: 0, correct: 0 });
  };

  if (sessionDone) {
    return (
      <div className="page">
        <div className="page-header">
          <h1 className="page-title">Session Complete!</h1>
        </div>
        <div className="session-complete">
          <div className="session-score">
            {Math.round((sessionStats.correct / sessionStats.reviewed) * 100)}%
          </div>
          <p className="session-score-label">
            {sessionStats.correct} / {sessionStats.reviewed} correct
          </p>
          <p className="session-next">Your cards are now scheduled for spaced review.</p>
          <div className="session-actions">
            <button className="btn-primary" onClick={handleRestart}>Review More</button>
          </div>
        </div>
      </div>
    );
  }

  if (studyDeck.length === 0) {
    return (
      <div className="page">
        <div className="page-header">
          <h1 className="page-title">Flashcards</h1>
        </div>
        <TopicFilter selected={selectedTopic} onChange={setSelectedTopic} />
        <div className="empty-state">
          <div className="empty-icon">🎉</div>
          <h2>All caught up!</h2>
          <p>No cards are due for review right now. Check back later or explore a different topic.</p>
        </div>
      </div>
    );
  }

  const topic = TOPICS[currentCard.topic];
  const level = masteryLevel(cardStates[currentCard.id]);

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Flashcards</h1>
        <p className="page-subtitle">{currentIndex + 1} / {studyDeck.length} cards</p>
      </div>

      <TopicFilter selected={selectedTopic} onChange={setSelectedTopic} />

      <div className="flashcard-progress">
        <div
          className="flashcard-progress-fill"
          style={{ width: `${(currentIndex / studyDeck.length) * 100}%` }}
        />
      </div>

      <div className="flashcard-meta">
        <span className="topic-pill" style={{ background: topic.bg, color: topic.color }}>
          {topic.icon} {topic.label}
        </span>
        <span className="category-pill">{currentCard.category}</span>
        <span className="level-pill">Level {level}/4</span>
      </div>

      <div className={`flashcard ${isFlipped ? 'flashcard--flipped' : ''}`} onClick={handleFlip}>
        <div className="flashcard-inner">
          <div className="flashcard-face flashcard-front">
            <div className="flashcard-face-label">Question</div>
            <div className="flashcard-text">{currentCard.front}</div>
            <div className="flashcard-hint">Tap to reveal answer</div>
          </div>
          <div className="flashcard-face flashcard-back">
            <div className="flashcard-face-label">Answer</div>
            <div className="flashcard-text flashcard-answer">{currentCard.back}</div>
          </div>
        </div>
      </div>

      {isFlipped && (
        <div className="rating-section">
          <p className="rating-prompt">How well did you recall this?</p>
          <div className="rating-buttons">
            {QUALITY_BUTTONS.map(({ quality, label, desc, color }) => (
              <button
                key={quality}
                className="rating-btn"
                style={{ '--btn-color': color }}
                onClick={() => handleRate(quality)}
              >
                <span className="rating-btn-label">{label}</span>
                <span className="rating-btn-desc">{desc}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {!isFlipped && (
        <div className="flip-hint">
          <button className="btn-primary" onClick={handleFlip}>Reveal Answer</button>
        </div>
      )}
    </div>
  );
}

function TopicFilter({ selected, onChange }) {
  return (
    <div className="topic-filter">
      <button
        className={`filter-btn ${selected === 'all' ? 'filter-btn--active' : ''}`}
        onClick={() => onChange('all')}
      >All Topics</button>
      {Object.values(TOPICS).map(t => (
        <button
          key={t.id}
          className={`filter-btn ${selected === t.id ? 'filter-btn--active' : ''}`}
          style={selected === t.id ? { background: t.bg, color: t.color, borderColor: t.color } : {}}
          onClick={() => onChange(t.id)}
        >{t.icon} {t.label}</button>
      ))}
    </div>
  );
}
