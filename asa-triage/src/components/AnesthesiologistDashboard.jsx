import { useState } from 'react';
import { ASA_COLORS, ASA_DESCRIPTIONS } from '../utils/asaCalculator.js';
import { getPreopRequirements, isReadyForEvaluation, getMedicationWarnings } from '../utils/preopRequirements.js';

function formatORTime(orDate, orTime) {
  if (!orDate) return null;
  const today    = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
  let dateStr;
  if (orDate === today)         dateStr = 'Today';
  else if (orDate === tomorrow) dateStr = 'Tomorrow';
  else dateStr = new Date(orDate + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  if (orTime) {
    const [h, m] = orTime.split(':').map(Number);
    return `${dateStr} ${h % 12 || 12}:${m.toString().padStart(2, '0')} ${h >= 12 ? 'PM' : 'AM'}`;
  }
  return dateStr;
}

function cardPriority(p) {
  if (p.evaluationComplete)       return 4; // done
  if (!p.needsEvaluation)         return 5; // shouldn't appear, safety
  if (p.isReadyForEval)           return 1; // ready to see
  return 2;                                  // awaiting workup
}

function sortQueue(list) {
  return [...list].sort((a, b) => {
    // Emergency always first
    const ae = a.surgeryType?.includes('Emergency') || false;
    const be = b.surgeryType?.includes('Emergency') || false;
    if (ae !== be) return ae ? -1 : 1;
    // Then by readiness
    const pa = cardPriority(a), pb = cardPriority(b);
    if (pa !== pb) return pa - pb;
    // Then by OR time
    const at = a.orDate && a.orTime ? `${a.orDate}T${a.orTime}` : a.orDate || '9999';
    const bt = b.orDate && b.orTime ? `${b.orDate}T${b.orTime}` : b.orDate || '9999';
    if (at !== bt) return at < bt ? -1 : 1;
    // Then by ASA level
    return (b.asaLevel || 0) - (a.asaLevel || 0);
  });
}

export default function AnesthesiologistDashboard({ patients, onSelectPatient, onMarkEvaluated }) {
  const [filter, setFilter] = useState('pending');

  const evalPatients = patients.filter(p => p.needsEvaluation);
  const emergency = evalPatients.filter(p => p.surgeryType?.includes('Emergency') && !p.evaluationComplete);
  const ready   = evalPatients.filter(p => !p.evaluationComplete && p.isReadyForEval && !p.surgeryType?.includes('Emergency'));
  const pending = evalPatients.filter(p => !p.evaluationComplete && !p.isReadyForEval && !p.surgeryType?.includes('Emergency'));
  const done    = evalPatients.filter(p => p.evaluationComplete);

  let displayed;
  switch (filter) {
    case 'ready':   displayed = [...emergency, ...ready];             break;
    case 'pending': displayed = [...emergency, ...ready, ...pending]; break;
    case 'done':    displayed = done;                                  break;
    case 'all':     displayed = evalPatients;                          break;
    default:        displayed = [...emergency, ...ready, ...pending];
  }
  displayed = filter === 'all' ? sortQueue(displayed) : displayed; // already pre-sorted for other filters

  return (
    <div className="anes-dashboard">
      <div className="dashboard-header">
        <div>
          <h1 className="page-title">Evaluation Queue</h1>
          <p className="page-subtitle">Sorted: emergency → ready (by OR time) → awaiting workup</p>
        </div>
      </div>

      {/* Emergency banner */}
      {emergency.length > 0 && (
        <div className="emergency-queue-banner">
          🚨 <strong>{emergency.length} emergency case{emergency.length > 1 ? 's' : ''}</strong> — immediate anesthesiologist presence required
          {emergency.map(p => (
            <span key={p.id} className="emerg-name" onClick={() => onSelectPatient(p.id)}>
              {p.name} ({p.surgeryType})
            </span>
          ))}
        </div>
      )}

      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-number" style={{ color: emergency.length ? 'var(--danger)' : undefined }}>{emergency.length}</div>
          <div className="stat-label">Emergency</div>
        </div>
        <div className="stat-card stat-ready">
          <div className="stat-number">{ready.length}</div>
          <div className="stat-label">Ready for Eval</div>
        </div>
        <div className="stat-card stat-alert">
          <div className="stat-number">{pending.length}</div>
          <div className="stat-label">Awaiting Workup</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{done.length}</div>
          <div className="stat-label">Evaluated</div>
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

      <div className="filter-tabs">
        {[
          { key: 'pending', label: `Queue (${emergency.length + ready.length + pending.length})` },
          { key: 'ready',   label: `Ready (${emergency.length + ready.length})` },
          { key: 'done',    label: `Done (${done.length})` },
          { key: 'all',     label: `All (${evalPatients.length})` },
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
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
          </div>
          <p className="empty-title">{filter === 'done' ? 'No patients evaluated yet' : 'Queue is clear'}</p>
        </div>
      ) : (
        <div className="eval-queue">
          {displayed.map(p => (
            <EvalCard key={p.id} patient={p} onSelect={() => onSelectPatient(p.id)} onMarkEvaluated={() => onMarkEvaluated(p.id)} />
          ))}
        </div>
      )}
    </div>
  );
}

function EvalCard({ patient: p, onSelect, onMarkEvaluated }) {
  const [expanded, setExpanded] = useState(false);

  const preopReqs  = getPreopRequirements(p.conditions || [], p.surgeryRisk, p.asaLevel, p.functionalStatus);
  const missing    = preopReqs.filter(r => r.priority === 'required' && !p.availableItems?.[r.key]);
  const ready      = p.needsEvaluation && missing.length === 0;
  const medWarns   = getMedicationWarnings(p.medications || []);
  const isEmerg    = p.surgeryType?.includes('Emergency');
  const orLabel    = formatORTime(p.orDate, p.orTime);
  const asaColor   = ASA_COLORS[p.asaLevel] || '#999';
  const hasCritical = p.difficultIntubation || p.mhRisk || medWarns.some(w => w.severity === 'critical');

  return (
    <div className={`eval-card ${p.evaluationComplete ? 'card-done' : isEmerg ? 'card-emergency' : ready ? 'card-ready' : 'card-awaiting'}`}>
      <div className="eval-card-main" onClick={() => setExpanded(e => !e)}>

        <div className="eval-card-left">
          <div className="asa-badge lg" style={{ background: asaColor }}>ASA {p.asaLevel}</div>
          {p.evaluationComplete && <div className="eval-badge done">Evaluated</div>}
          {!p.evaluationComplete && isEmerg && <div className="eval-badge emergency">STAT</div>}
          {!p.evaluationComplete && !isEmerg && ready  && <div className="eval-badge ready">Ready</div>}
          {!p.evaluationComplete && !isEmerg && !ready && <div className="eval-badge awaiting">Awaiting</div>}
        </div>

        <div className="eval-card-info">
          <div className="eval-name">
            {hasCritical && <span className="crit-dot" title="Critical safety flags">🚨</span>}
            {p.name}
          </div>
          <div className="eval-meta">
            {p.age}y {p.gender}
            {orLabel && <> · <strong>{orLabel}</strong></>}
            {p.surgeonName && <> · Dr. {p.surgeonName}</>}
            &nbsp;|&nbsp;{p.surgeryType}
            &nbsp;<span className={`risk-chip risk-${p.surgeryRisk} sm`}>{p.surgeryRisk}</span>
          </div>

          <div className="eval-flags-row">
            {p.difficultIntubation && <span className="flag-badge airway-flag">⚠ Difficult Airway</span>}
            {p.mhRisk             && <span className="flag-badge mh-badge">🚨 MH Risk</span>}
            {p.latexAllergy       && <span className="flag-badge latex-flag">Latex</span>}
            {p.ponvHistory        && <span className="flag-badge ponv-flag">PONV</span>}
            {medWarns.filter(w => w.severity === 'critical').map(w => (
              <span key={w.key} className="flag-badge critical-med-flag">🚨 {w.med}</span>
            ))}
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
              <span className="missing-label">Missing</span>
            </div>
          )}
          {!p.evaluationComplete && missing.length === 0 && (
            <div className="all-clear">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              All clear
            </div>
          )}
          <button className="expand-btn">{expanded ? '▲' : '▼'}</button>
        </div>
      </div>

      {expanded && (
        <div className="eval-card-detail">

          {/* Critical warnings inline */}
          {(p.difficultIntubation || p.mhRisk) && (
            <div className="detail-critical-alerts">
              {p.difficultIntubation && (
                <div className="warning-banner severity-critical">
                  <span className="warning-icon">🚨</span>
                  <div className="warning-body">
                    <div className="warning-text">History of difficult intubation / difficult airway — advanced airway plan required before entering OR.</div>
                  </div>
                </div>
              )}
              {p.mhRisk && (
                <div className="warning-banner severity-critical">
                  <span className="warning-icon">🚨</span>
                  <div className="warning-body">
                    <div className="warning-text">Malignant hyperthermia risk — avoid triggering agents. Confirm dantrolene availability. MH protocol required.</div>
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="detail-grid">
            <div className="detail-section">
              <div className="detail-section-title">Conditions — ASA {p.asaLevel}</div>
              <p className="detail-asa-desc">{ASA_DESCRIPTIONS[p.asaLevel]}</p>
              {(p.asaFactors || []).length > 0 ? (
                <ul className="detail-list">
                  {p.asaFactors.map(f => <li key={f.key}>{f.label}</li>)}
                </ul>
              ) : <p className="none-text">No comorbidities documented</p>}
              {p.functionalStatus && p.functionalStatus !== 'unknown' && (
                <div className="detail-func-status">
                  <strong>Functional status:</strong>{' '}
                  {p.functionalStatus === '>=4' ? '≥4 METs (adequate)' : p.functionalStatus === '<4' ? '<4 METs (poor)' : 'Severely limited'}
                </div>
              )}
            </div>

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
                {p.latexAllergy && <span className="latex-alert"> | ⚠ LATEX ALLERGY</span>}
              </div>
              {p.ponvHistory && <div className="ponv-note">⚡ PONV history</div>}
            </div>
          </div>

          {/* Med warnings */}
          {medWarns.length > 0 && (
            <div className="detail-med-warnings">
              {medWarns.map(w => (
                <div key={w.key} className={`warning-banner severity-${w.severity}`}>
                  <span className="warning-icon">{w.severity === 'critical' ? '🚨' : '⚠'}</span>
                  <div className="warning-body">
                    <div className="warning-med">{w.med}</div>
                    <div className="warning-text">{w.text}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Lab values */}
          {p.labValues && Object.values(p.labValues).some(v => v !== '') && (
            <div className="detail-section">
              <div className="detail-section-title">Lab Values</div>
              <div className="mini-lab-row">
                {[
                  { key: 'hgb',        label: 'Hgb',  unit: 'g/dL' },
                  { key: 'kplus',      label: 'K+',   unit: 'mEq/L' },
                  { key: 'creatinine', label: 'Cr',   unit: 'mg/dL' },
                  { key: 'inr',        label: 'INR',  unit: '' },
                  { key: 'hba1c',      label: 'HbA1c',unit: '%' },
                ].filter(lv => p.labValues[lv.key]).map(lv => (
                  <span key={lv.key} className="mini-lab-val">
                    <strong>{lv.label}:</strong> {p.labValues[lv.key]}{lv.unit}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Anesthesia history */}
          {(p.priorAnesProblems || p.notes) && (
            <div className="detail-section">
              <div className="detail-section-title">Anesthesia &amp; Nursing Notes</div>
              {p.priorAnesProblems && <p className="detail-note">{p.priorAnesProblems}</p>}
              {p.notes && <p className="detail-note">{p.notes}</p>}
            </div>
          )}

          {/* Pre-op checklist */}
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

          {/* Anesthesiologist's own notes (read-only here) */}
          {p.anesNotes && (
            <div className="detail-section">
              <div className="detail-section-title">Anesthesiologist Assessment</div>
              <div className="anes-notes-display">{p.anesNotes}</div>
            </div>
          )}

          <div className="detail-actions">
            <button className="btn-secondary" onClick={onSelect}>Open Full Chart</button>
            {ready && !p.evaluationComplete && (
              <button className="btn-evaluate" onClick={onMarkEvaluated}>Mark as Evaluated ✓</button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
