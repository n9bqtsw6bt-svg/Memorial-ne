import { useState } from 'react';
import { ASA_COLORS, ASA_DESCRIPTIONS } from '../utils/asaCalculator.js';
import { getPreopRequirements, isReadyForEvaluation } from '../utils/preopRequirements.js';

function PatientPriority(p) {
  if (p.evaluationComplete) return 3;
  if (!p.needsEvaluation) return 4;
  if (p.isReadyForEval) return 1;
  return 2;
}

export default function AnesthesiologistDashboard({ patients, onSelectPatient, onMarkEvaluated }) {
  const [filter, setFilter] = useState('pending'); // pending | ready | all | done

  const evalPatients = patients.filter(p => p.needsEvaluation);
  const pending = evalPatients.filter(p => !p.evaluationComplete && !p.isReadyForEval);
  const ready = evalPatients.filter(p => !p.evaluationComplete && p.isReadyForEval);
  const done = evalPatients.filter(p => p.evaluationComplete);

  let displayed;
  switch (filter) {
    case 'ready': displayed = ready; break;
    case 'pending': displayed = [...ready, ...pending]; break;
    case 'done': displayed = done; break;
    case 'all': displayed = evalPatients; break;
    default: displayed = [...ready, ...pending];
  }

  // Sort: ready ASA4 first, then ready ASA3, then awaiting ASA4, etc.
  displayed = displayed.slice().sort((a, b) => {
    const pa = PatientPriority(a), pb = PatientPriority(b);
    if (pa !== pb) return pa - pb;
    return (b.asaLevel || 0) - (a.asaLevel || 0);
  });

  return (
    <div className="anes-dashboard">
      <div className="dashboard-header">
        <div>
          <h1 className="page-title">Evaluation Queue</h1>
          <p className="page-subtitle">Patients requiring anesthesiologist review — sorted by priority</p>
        </div>
      </div>

      {/* Summary stats */}
      <div className="stats-row">
        <div className="stat-card stat-ready">
          <div className="stat-number">{ready.length}</div>
          <div className="stat-label">Ready for Evaluation</div>
        </div>
        <div className="stat-card stat-alert">
          <div className="stat-number">{pending.length}</div>
          <div className="stat-label">Awaiting Workup</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{done.length}</div>
          <div className="stat-label">Evaluated Today</div>
        </div>
        <div className="stat-card asa-stat">
          {[4, 3, 2].map(n => {
            const cnt = evalPatients.filter(p => p.asaLevel === n && !p.evaluationComplete).length;
            return cnt > 0 ? (
              <div key={n} className="asa-count" style={{ '--color': ASA_COLORS[n] }}>
                <span className="asa-count-num">{cnt}</span>
                <span className="asa-count-label">ASA {n}</span>
              </div>
            ) : null;
          })}
        </div>
      </div>

      {/* Filter tabs */}
      <div className="filter-tabs">
        {[
          { key: 'pending', label: `Pending (${ready.length + pending.length})` },
          { key: 'ready', label: `Ready (${ready.length})` },
          { key: 'done', label: `Evaluated (${done.length})` },
          { key: 'all', label: `All (${evalPatients.length})` },
        ].map(tab => (
          <button
            key={tab.key}
            className={`filter-tab ${filter === tab.key ? 'active' : ''}`}
            onClick={() => setFilter(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {displayed.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
          <p className="empty-title">
            {filter === 'done' ? 'No patients evaluated yet' : 'No patients in this queue'}
          </p>
          <p className="empty-sub">
            {filter === 'pending' ? 'All evaluation patients have been seen or none added yet.' : ''}
          </p>
        </div>
      ) : (
        <div className="eval-queue">
          {displayed.map(p => (
            <EvalCard
              key={p.id}
              patient={p}
              onSelect={() => onSelectPatient(p.id)}
              onMarkEvaluated={() => onMarkEvaluated(p.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function EvalCard({ patient: p, onSelect, onMarkEvaluated }) {
  const [expanded, setExpanded] = useState(false);

  const preopReqs = getPreopRequirements(p.conditions || [], p.surgeryRisk, p.asaLevel);
  const missing = preopReqs.filter(r => r.priority === 'required' && !p.availableItems?.[r.key]);
  const ready = p.needsEvaluation && missing.length === 0;

  const asaColor = ASA_COLORS[p.asaLevel] || '#999';

  return (
    <div className={`eval-card ${p.evaluationComplete ? 'card-done' : ready ? 'card-ready' : 'card-awaiting'}`}>
      <div className="eval-card-main" onClick={() => setExpanded(e => !e)}>
        <div className="eval-card-left">
          <div className="asa-badge lg" style={{ background: asaColor }}>
            ASA {p.asaLevel}
          </div>
          {p.evaluationComplete && <div className="eval-badge done">Evaluated</div>}
          {!p.evaluationComplete && ready && <div className="eval-badge ready">Ready</div>}
          {!p.evaluationComplete && !ready && <div className="eval-badge awaiting">Awaiting</div>}
        </div>

        <div className="eval-card-info">
          <div className="eval-name">{p.name}</div>
          <div className="eval-meta">
            {p.age}y {p.gender} &nbsp;|&nbsp; {p.surgeryType}
            &nbsp;<span className={`risk-chip risk-${p.surgeryRisk} sm`}>{p.surgeryRisk} risk</span>
          </div>
          <div className="eval-conditions">
            {(p.asaFactors || []).slice(0, 3).map(f => (
              <span key={f.key} className={`factor-tag sm asa-color-${f.asa}-bg`}>{f.label}</span>
            ))}
            {(p.asaFactors || []).length > 3 && (
              <span className="factor-more">+{p.asaFactors.length - 3} more</span>
            )}
          </div>
        </div>

        <div className="eval-card-right">
          {!p.evaluationComplete && missing.length > 0 && (
            <div className="missing-count">
              <span className="missing-num">{missing.length}</span>
              <span className="missing-label">Missing{'\n'}item{missing.length !== 1 ? 's' : ''}</span>
            </div>
          )}
          {!p.evaluationComplete && missing.length === 0 && (
            <div className="all-clear">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              All clear
            </div>
          )}
          <button className="expand-btn">{expanded ? '▲' : '▼'}</button>
        </div>
      </div>

      {expanded && (
        <div className="eval-card-detail">
          <div className="detail-grid">
            {/* ASA Factors */}
            <div className="detail-section">
              <div className="detail-section-title">ASA {p.asaLevel} — {ASA_DESCRIPTIONS[p.asaLevel]}</div>
              {(p.asaFactors || []).length > 0 ? (
                <ul className="detail-list">
                  {p.asaFactors.map(f => <li key={f.key}>{f.label}</li>)}
                </ul>
              ) : <p className="none-text">No comorbidities documented</p>}
            </div>

            {/* Medications */}
            <div className="detail-section">
              <div className="detail-section-title">Medications &amp; Allergies</div>
              {p.medications?.length > 0 ? (
                <ul className="detail-list">
                  {p.medications.map(m => <li key={m}>{m}</li>)}
                </ul>
              ) : <p className="none-text">None documented</p>}
              {p.otherMedications && <p className="other-meds">{p.otherMedications}</p>}
              <div className="allergy-line">
                <strong>Allergies:</strong> {p.drugAllergies || 'NKDA'}
                {p.latexAllergy && ' | LATEX ALLERGY'}
              </div>
            </div>
          </div>

          {/* Missing / Available items */}
          {preopReqs.length > 0 && (
            <div className="detail-checklist">
              <div className="detail-section-title">Pre-Op Checklist</div>
              <div className="mini-checklist">
                {preopReqs.map(req => {
                  const avail = p.availableItems?.[req.key];
                  return (
                    <div key={req.key} className={`mini-item ${avail ? 'mini-done' : req.priority === 'required' ? 'mini-missing' : 'mini-rec'}`}>
                      <span className="mini-icon">{avail ? '✓' : req.priority === 'required' ? '!' : '○'}</span>
                      <span className="mini-label">{req.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {p.notes && (
            <div className="detail-notes">
              <strong>Notes:</strong> {p.notes}
            </div>
          )}

          <div className="detail-actions">
            <button className="btn-secondary" onClick={onSelect}>
              Open Full Chart
            </button>
            {ready && !p.evaluationComplete && (
              <button className="btn-evaluate" onClick={onMarkEvaluated}>
                Mark as Evaluated ✓
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
