import { useState, useCallback } from 'react';
import { TOPICS, allCases } from '../data/index.js';

export default function CaseScenario({ caseProgress, onUpdateCaseProgress }) {
  const [selectedCase, setSelectedCase] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [stepAnswers, setStepAnswers] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [caseComplete, setCaseComplete] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState('all');

  const filteredCases = selectedTopic === 'all'
    ? allCases
    : allCases.filter(c => c.topic === selectedTopic);

  const handleStartCase = (c) => {
    setSelectedCase(c);
    setCurrentStep(0);
    setStepAnswers([]);
    setSelectedOption(null);
    setShowExplanation(false);
    setCaseComplete(false);
  };

  const handleSelectOption = useCallback((idx) => {
    if (selectedOption !== null) return;
    setSelectedOption(idx);
    setShowExplanation(true);
  }, [selectedOption]);

  const handleNextStep = useCallback(() => {
    const step = selectedCase.steps[currentStep];
    const isCorrect = selectedOption === step.correctIndex;
    const newAnswers = [...stepAnswers, { correct: isCorrect }];

    if (currentStep + 1 >= selectedCase.steps.length) {
      const score = newAnswers.filter(a => a.correct).length;
      onUpdateCaseProgress(selectedCase.id, {
        completed: true,
        score,
        total: selectedCase.steps.length,
        date: new Date().toISOString(),
      });
      setStepAnswers(newAnswers);
      setCaseComplete(true);
    } else {
      setStepAnswers(newAnswers);
      setCurrentStep(s => s + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    }
  }, [selectedCase, currentStep, selectedOption, stepAnswers, onUpdateCaseProgress]);

  const handleBackToList = () => {
    setSelectedCase(null);
    setCaseComplete(false);
    setStepAnswers([]);
  };

  if (!selectedCase) {
    return (
      <div className="page">
        <div className="page-header">
          <h1 className="page-title">Clinical Cases</h1>
          <p className="page-subtitle">Interactive branching clinical scenarios</p>
        </div>

        <div className="topic-filter">
          <button className={`filter-btn ${selectedTopic === 'all' ? 'filter-btn--active' : ''}`} onClick={() => setSelectedTopic('all')}>
            All Topics
          </button>
          {Object.values(TOPICS).map(t => (
            <button
              key={t.id}
              className={`filter-btn ${selectedTopic === t.id ? 'filter-btn--active' : ''}`}
              style={selectedTopic === t.id ? { background: t.bg, color: t.color, borderColor: t.color } : {}}
              onClick={() => setSelectedTopic(t.id)}
            >{t.icon} {t.label}</button>
          ))}
        </div>

        <div className="case-list">
          {filteredCases.map(c => {
            const topic = TOPICS[c.topic];
            const progress = caseProgress[c.id];
            return (
              <div key={c.id} className="case-list-item" style={{ borderLeft: `4px solid ${topic.color}` }}>
                <div className="case-list-header">
                  <span className="topic-pill" style={{ background: topic.bg, color: topic.color }}>
                    {topic.icon} {topic.label}
                  </span>
                  {progress?.completed && (
                    <span className="case-score-badge">
                      {progress.score}/{progress.total} correct
                    </span>
                  )}
                </div>
                <h3 className="case-list-title">{c.title}</h3>
                <p className="case-list-intro">{c.intro.substring(0, 140)}…</p>
                <div className="case-list-footer">
                  <span className="case-steps-count">{c.steps.length} decision points</span>
                  <button className="btn-outline" onClick={() => handleStartCase(c)}>
                    {progress?.completed ? 'Retry Case →' : 'Start Case →'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  const topic = TOPICS[selectedCase.topic];

  if (caseComplete) {
    const score = stepAnswers.filter(a => a.correct).length;
    const pct = Math.round((score / selectedCase.steps.length) * 100);
    return (
      <div className="page">
        <div className="page-header">
          <h1 className="page-title">Case Complete</h1>
        </div>
        <div className="session-complete">
          <div className="session-score" style={{ color: pct >= 70 ? '#10B981' : '#EF4444' }}>
            {pct}%
          </div>
          <p className="session-score-label">{score} / {selectedCase.steps.length} correct decisions</p>
          <p className="session-next">
            {pct === 100 ? 'Perfect case management!' : pct >= 67 ? 'Good clinical reasoning.' : 'Review the decision points and explanations.'}
          </p>
          <div className="session-actions">
            <button className="btn-outline" onClick={handleBackToList}>← Back to Cases</button>
            <button className="btn-primary" onClick={() => handleStartCase(selectedCase)}>Retry Case</button>
          </div>
        </div>
      </div>
    );
  }

  const step = selectedCase.steps[currentStep];
  const isCorrect = selectedOption === step.correctIndex;

  return (
    <div className="page">
      <div className="case-header">
        <button className="btn-ghost" onClick={handleBackToList}>← Cases</button>
        <span className="topic-pill" style={{ background: topic.bg, color: topic.color }}>
          {topic.icon} {topic.label}
        </span>
      </div>

      <h1 className="case-title">{selectedCase.title}</h1>

      <div className="case-intro-box">
        <div className="case-intro-label">Clinical Scenario</div>
        <p className="case-intro-text">{selectedCase.intro}</p>
      </div>

      <div className="flashcard-progress" style={{ marginBottom: '1.5rem' }}>
        <div className="flashcard-progress-fill" style={{ width: `${(currentStep / selectedCase.steps.length) * 100}%` }} />
      </div>

      <div className="case-step-label">Decision Point {currentStep + 1} of {selectedCase.steps.length}</div>

      <div className="quiz-card">
        <div className="quiz-stem">{step.prompt}</div>

        <div className="quiz-options">
          {step.options.map((option, idx) => {
            let optClass = 'quiz-option';
            if (selectedOption !== null) {
              if (idx === step.correctIndex) optClass += ' quiz-option--correct';
              else if (idx === selectedOption && !isCorrect) optClass += ' quiz-option--wrong';
            }
            return (
              <button
                key={idx}
                className={optClass}
                onClick={() => handleSelectOption(idx)}
                disabled={selectedOption !== null}
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
            <div className="quiz-explanation-text">{step.explanation}</div>
          </div>
        )}

        {selectedOption !== null && (
          <div className="quiz-next">
            <button className="btn-primary" onClick={handleNextStep}>
              {currentStep + 1 >= selectedCase.steps.length ? 'Finish Case →' : 'Next Decision →'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
