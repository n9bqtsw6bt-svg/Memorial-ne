import { useState, useMemo, useCallback } from 'react';
import { TOPICS, allQuestions } from '../data/index.js';

export default function QuizMode({ onRecordQuiz }) {
  const [selectedTopic, setSelectedTopic] = useState('all');
  const [phase, setPhase] = useState('setup'); // setup | quiz | results
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [answers, setAnswers] = useState([]);

  const questionPool = useMemo(() => {
    const base = selectedTopic === 'all'
      ? allQuestions
      : allQuestions.filter(q => q.topic === selectedTopic);
    return shuffle(base).slice(0, 10);
  }, [selectedTopic]);

  const currentQ = questionPool[currentIndex];
  const isCorrect = selectedAnswer === currentQ?.correctIndex;

  const handleSelect = useCallback((idx) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(idx);
    setShowExplanation(true);
  }, [selectedAnswer]);

  const handleNext = useCallback(() => {
    const newAnswers = [...answers, { correct: isCorrect }];
    if (currentIndex + 1 >= questionPool.length) {
      const score = newAnswers.filter(a => a.correct).length;
      onRecordQuiz({ topic: selectedTopic, score, total: questionPool.length, date: new Date().toISOString() });
      setAnswers(newAnswers);
      setPhase('results');
    } else {
      setAnswers(newAnswers);
      setCurrentIndex(i => i + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  }, [answers, currentIndex, isCorrect, questionPool.length, selectedTopic, onRecordQuiz]);

  const handleRestart = () => {
    setPhase('setup');
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setAnswers([]);
  };

  if (phase === 'setup') {
    return (
      <div className="page">
        <div className="page-header">
          <h1 className="page-title">Practice Quiz</h1>
          <p className="page-subtitle">Board-style MCQs with detailed explanations</p>
        </div>
        <div className="quiz-setup">
          <h2 className="section-title">Select Topic</h2>
          <div className="topic-filter">
            <button
              className={`filter-btn ${selectedTopic === 'all' ? 'filter-btn--active' : ''}`}
              onClick={() => setSelectedTopic('all')}
            >All Topics ({allQuestions.length} questions)</button>
            {Object.values(TOPICS).map(t => {
              const count = allQuestions.filter(q => q.topic === t.id).length;
              return (
                <button
                  key={t.id}
                  className={`filter-btn ${selectedTopic === t.id ? 'filter-btn--active' : ''}`}
                  style={selectedTopic === t.id ? { background: t.bg, color: t.color, borderColor: t.color } : {}}
                  onClick={() => setSelectedTopic(t.id)}
                >{t.icon} {t.label} ({count})</button>
              );
            })}
          </div>
          <div className="quiz-start-card">
            <div className="quiz-start-info">
              <strong>10 random questions</strong> from {selectedTopic === 'all' ? 'all topics' : TOPICS[selectedTopic].label}
              <br /><span>Each question shows the correct answer and a detailed explanation.</span>
            </div>
            <button className="btn-primary btn-large" onClick={() => setPhase('quiz')}>
              Start Quiz →
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (phase === 'results') {
    const score = answers.filter(a => a.correct).length;
    const pct = Math.round((score / answers.length) * 100);
    return (
      <div className="page">
        <div className="page-header">
          <h1 className="page-title">Quiz Results</h1>
        </div>
        <div className="session-complete">
          <div className="session-score" style={{ color: pct >= 70 ? '#10B981' : '#EF4444' }}>
            {pct}%
          </div>
          <p className="session-score-label">{score} / {answers.length} correct</p>
          <div className="result-breakdown">
            {answers.map((a, i) => (
              <span
                key={i}
                className="result-dot"
                style={{ background: a.correct ? '#10B981' : '#EF4444' }}
                title={`Q${i + 1}: ${a.correct ? 'Correct' : 'Incorrect'}`}
              />
            ))}
          </div>
          <p className="session-next">
            {pct >= 80 ? 'Excellent work!' : pct >= 60 ? 'Good effort — review the explanations.' : 'Review the relevant flashcards and reference cards.'}
          </p>
          <div className="session-actions">
            <button className="btn-primary" onClick={handleRestart}>New Quiz</button>
          </div>
        </div>
      </div>
    );
  }

  const topic = TOPICS[currentQ.topic];

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Quiz</h1>
        <p className="page-subtitle">Question {currentIndex + 1} of {questionPool.length}</p>
      </div>

      <div className="flashcard-progress">
        <div className="flashcard-progress-fill" style={{ width: `${(currentIndex / questionPool.length) * 100}%` }} />
      </div>

      <div className="quiz-answer-track">
        {answers.map((a, i) => (
          <span key={i} className="quiz-track-dot" style={{ background: a.correct ? '#10B981' : '#EF4444' }} />
        ))}
        {questionPool.slice(answers.length).map((_, i) => (
          <span key={`p-${i}`} className="quiz-track-dot quiz-track-dot--pending" />
        ))}
      </div>

      <div className="quiz-card">
        <div className="quiz-topic-pill">
          <span className="topic-pill" style={{ background: topic.bg, color: topic.color }}>
            {topic.icon} {topic.label}
          </span>
        </div>
        <div className="quiz-stem">{currentQ.stem}</div>

        <div className="quiz-options">
          {currentQ.options.map((option, idx) => {
            let optClass = 'quiz-option';
            if (selectedAnswer !== null) {
              if (idx === currentQ.correctIndex) optClass += ' quiz-option--correct';
              else if (idx === selectedAnswer && !isCorrect) optClass += ' quiz-option--wrong';
            }
            return (
              <button
                key={idx}
                className={optClass}
                onClick={() => handleSelect(idx)}
                disabled={selectedAnswer !== null}
              >
                <span className="quiz-option-letter">{String.fromCharCode(65 + idx)}</span>
                <span>{option}</span>
              </button>
            );
          })}
        </div>

        {showExplanation && (
          <div className={`quiz-explanation ${isCorrect ? 'quiz-explanation--correct' : 'quiz-explanation--wrong'}`}>
            <div className="quiz-explanation-header">
              {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
            </div>
            <div className="quiz-explanation-text">{currentQ.explanation}</div>
          </div>
        )}

        {selectedAnswer !== null && (
          <div className="quiz-next">
            <button className="btn-primary" onClick={handleNext}>
              {currentIndex + 1 >= questionPool.length ? 'See Results' : 'Next Question →'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
