import { useState, useCallback } from 'react';
import Navigation from './components/Navigation.jsx';
import Dashboard from './components/Dashboard.jsx';
import FlashcardMode from './components/FlashcardMode.jsx';
import QuizMode from './components/QuizMode.jsx';
import CaseScenario from './components/CaseScenario.jsx';
import QuickReference from './components/QuickReference.jsx';
import MasteryView from './components/MasteryView.jsx';
import { useLocalStorage } from './hooks/useLocalStorage.js';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [cardStates, setCardStates] = useLocalStorage('anes-cme-cards', {});
  const [quizHistory, setQuizHistory] = useLocalStorage('anes-cme-quizzes', []);
  const [caseProgress, setCaseProgress] = useLocalStorage('anes-cme-cases', {});
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleUpdateCardState = useCallback((cardId, state) => {
    setCardStates(prev => ({ ...prev, [cardId]: state }));
  }, [setCardStates]);

  const handleRecordQuiz = useCallback((result) => {
    setQuizHistory(prev => [...prev.slice(-49), result]);
  }, [setQuizHistory]);

  const handleUpdateCaseProgress = useCallback((caseId, progress) => {
    setCaseProgress(prev => ({ ...prev, [caseId]: progress }));
  }, [setCaseProgress]);

  const handleTabChange = useCallback((tab) => {
    setActiveTab(tab);
    setSidebarOpen(false);
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <Dashboard
            cardStates={cardStates}
            quizHistory={quizHistory}
            caseProgress={caseProgress}
            onTabChange={handleTabChange}
          />
        );
      case 'flashcards':
        return (
          <FlashcardMode
            cardStates={cardStates}
            onUpdateCardState={handleUpdateCardState}
          />
        );
      case 'quiz':
        return <QuizMode onRecordQuiz={handleRecordQuiz} />;
      case 'cases':
        return (
          <CaseScenario
            caseProgress={caseProgress}
            onUpdateCaseProgress={handleUpdateCaseProgress}
          />
        );
      case 'reference':
        return <QuickReference />;
      case 'mastery':
        return <MasteryView cardStates={cardStates} />;
      default:
        return null;
    }
  };

  return (
    <div className="app-layout">
      <button
        className="mobile-menu-btn"
        onClick={() => setSidebarOpen(o => !o)}
        aria-label="Toggle menu"
      >
        ☰
      </button>

      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />
      )}

      <div className={`sidebar-wrapper ${sidebarOpen ? 'sidebar-wrapper--open' : ''}`}>
        <Navigation activeTab={activeTab} onTabChange={handleTabChange} />
      </div>

      <main className="app-main">
        {renderContent()}
      </main>
    </div>
  );
}
