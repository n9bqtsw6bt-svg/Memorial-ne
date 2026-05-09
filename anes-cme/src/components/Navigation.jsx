import { TOPICS } from '../data/index.js';

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: '⊞' },
  { id: 'flashcards', label: 'Flashcards', icon: '🗂' },
  { id: 'quiz', label: 'Quiz', icon: '✓' },
  { id: 'cases', label: 'Cases', icon: '🏥' },
  { id: 'reference', label: 'Reference', icon: '📋' },
  { id: 'mastery', label: 'Mastery', icon: '📊' },
];

export default function Navigation({ activeTab, onTabChange }) {
  return (
    <nav className="nav-sidebar">
      <div className="nav-brand">
        <span className="nav-brand-icon">Rx</span>
        <div>
          <div className="nav-brand-title">AnesCME</div>
          <div className="nav-brand-sub">Anesthesiology CME</div>
        </div>
      </div>

      <div className="nav-section-label">LEARNING MODES</div>
      <ul className="nav-list">
        {NAV_ITEMS.map(item => (
          <li key={item.id}>
            <button
              className={`nav-item ${activeTab === item.id ? 'nav-item--active' : ''}`}
              onClick={() => onTabChange(item.id)}
            >
              <span className="nav-item-icon">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          </li>
        ))}
      </ul>

      <div className="nav-section-label" style={{ marginTop: '1.5rem' }}>TOPICS</div>
      <ul className="nav-list">
        {Object.values(TOPICS).map(topic => (
          <li key={topic.id}>
            <div className="nav-topic">
              <span
                className="nav-topic-dot"
                style={{ background: topic.color }}
              />
              <span>{topic.label}</span>
            </div>
          </li>
        ))}
      </ul>
    </nav>
  );
}
