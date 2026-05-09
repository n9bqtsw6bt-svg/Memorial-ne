import { useState } from 'react';
import { TOPICS, allReferences } from '../data/index.js';

export default function QuickReference() {
  const [selectedTopic, setSelectedTopic] = useState('all');
  const [expandedId, setExpandedId] = useState(null);

  const filtered = selectedTopic === 'all'
    ? allReferences
    : allReferences.filter(r => r.topic === selectedTopic);

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Quick Reference</h1>
        <p className="page-subtitle">Drug tables, dosing guides & protocols — scan in 2 minutes</p>
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

      <div className="reference-list">
        {filtered.map(ref => {
          const topic = TOPICS[ref.topic];
          const isOpen = expandedId === ref.id;
          return (
            <div key={ref.id} className="reference-card" style={{ borderLeft: `4px solid ${topic.color}` }}>
              <button
                className="reference-card-header"
                onClick={() => setExpandedId(isOpen ? null : ref.id)}
              >
                <div className="reference-card-title-row">
                  <span className="topic-pill" style={{ background: topic.bg, color: topic.color }}>
                    {topic.icon} {topic.label}
                  </span>
                  <span className="reference-card-title">{ref.title}</span>
                </div>
                <span className="reference-toggle">{isOpen ? '▲' : '▼'}</span>
              </button>

              {isOpen && (
                <div className="reference-card-content">
                  <pre className="reference-text">{ref.content}</pre>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
