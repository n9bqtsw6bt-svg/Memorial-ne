import { useState, useMemo } from 'react';
import { ASA_COLORS } from '../utils/asaCalculator.js';

const STATUS_LABELS = {
  no_eval:   { label: 'Cleared',        cls: 'status-cleared' },
  awaiting:  { label: 'Awaiting Workup', cls: 'status-awaiting' },
  ready:     { label: 'Ready for Eval', cls: 'status-ready' },
  evaluated: { label: 'Evaluated',      cls: 'status-done' },
};

function getStatus(p) {
  if (p.evaluationComplete)                           return 'evaluated';
  if (!p.needsEvaluation)                             return 'no_eval';
  if (p.isReadyForEval)                               return 'ready';
  return 'awaiting';
}

function formatORTime(orDate, orTime) {
  if (!orDate) return null;
  const today    = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
  let dateStr;
  if (orDate === today)        dateStr = 'Today';
  else if (orDate === tomorrow) dateStr = 'Tomorrow';
  else dateStr = new Date(orDate + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  if (orTime) {
    const [h, m] = orTime.split(':').map(Number);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const h12  = h % 12 || 12;
    return `${dateStr} ${h12}:${m.toString().padStart(2, '0')} ${ampm}`;
  }
  return dateStr;
}

function sortPatients(list) {
  return [...list].sort((a, b) => {
    // Emergency first
    const ae = a.surgeryType?.includes('Emergency') || false;
    const be = b.surgeryType?.includes('Emergency') || false;
    if (ae !== be) return ae ? -1 : 1;
    // Then by OR date+time
    const at = a.orDate && a.orTime ? `${a.orDate}T${a.orTime}` : a.orDate || '9999';
    const bt = b.orDate && b.orTime ? `${b.orDate}T${b.orTime}` : b.orDate || '9999';
    if (at !== bt) return at < bt ? -1 : 1;
    // Then by urgency (higher ASA first, needs eval first)
    if (a.needsEvaluation !== b.needsEvaluation) return a.needsEvaluation ? -1 : 1;
    return (b.asaLevel || 0) - (a.asaLevel || 0);
  });
}

export default function NurseDashboard({ patients, onNewPatient, onSelectPatient, onDeletePatient }) {
  const [search, setSearch]     = useState('');
  const [dateFilter, setDateFilter] = useState('all'); // all | today | needs_eval

  const today = new Date().toISOString().split('T')[0];

  const filtered = useMemo(() => {
    let list = patients;
    if (dateFilter === 'today')     list = list.filter(p => p.orDate === today);
    if (dateFilter === 'needs_eval') list = list.filter(p => p.needsEvaluation && !p.evaluationComplete);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(p =>
        p.name?.toLowerCase().includes(q) ||
        p.surgeryType?.toLowerCase().includes(q) ||
        p.surgeonName?.toLowerCase().includes(q)
      );
    }
    return sortPatients(list);
  }, [patients, search, dateFilter, today]);

  const counts = { 1: 0, 2: 0, 3: 0, 4: 0 };
  patients.forEach(p => { if (p.asaLevel) counts[p.asaLevel] = (counts[p.asaLevel] || 0) + 1; });

  const needsEval    = patients.filter(p => p.needsEvaluation && !p.evaluationComplete).length;
  const readyForEval = patients.filter(p => p.needsEvaluation && !p.evaluationComplete && p.isReadyForEval).length;

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div>
          <h1 className="page-title">Patient List</h1>
          <p className="page-subtitle">Sorted by OR time — click a patient to view triage details</p>
        </div>
        <button className="btn-primary" onClick={onNewPatient}>+ Add New Patient</button>
      </div>

      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-number">{patients.length}</div>
          <div className="stat-label">Total Patients</div>
        </div>
        <div className="stat-card stat-alert">
          <div className="stat-number">{needsEval}</div>
          <div className="stat-label">Need Evaluation</div>
        </div>
        <div className="stat-card stat-ready">
          <div className="stat-number">{readyForEval}</div>
          <div className="stat-label">Ready for Eval</div>
        </div>
        <div className="stat-card asa-stat">
          {[1, 2, 3, 4].map(n => (
            <div key={n} className="asa-count" style={{ '--color': ASA_COLORS[n] }}>
              <span className="asa-count-num">{counts[n] || 0}</span>
              <span className="asa-count-label">ASA {n}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Search + filter bar */}
      <div className="table-toolbar">
        <input
          className="search-input"
          type="search"
          placeholder="Search by name, surgery, or surgeon…"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <div className="filter-tabs">
          {[
            { key: 'all',       label: `All (${patients.length})` },
            { key: 'today',     label: `Today (${patients.filter(p => p.orDate === today).length})` },
            { key: 'needs_eval',label: `Needs Eval (${needsEval})` },
          ].map(f => (
            <button
              key={f.key}
              className={`filter-tab ${dateFilter === f.key ? 'active' : ''}`}
              onClick={() => setDateFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
            </svg>
          </div>
          <p className="empty-title">
            {patients.length === 0 ? 'No patients entered yet' : 'No patients match this filter'}
          </p>
          {patients.length === 0 && (
            <button className="btn-primary" onClick={onNewPatient}>+ Add New Patient</button>
          )}
        </div>
      ) : (
        <div className="patient-table-wrap">
          <table className="patient-table">
            <thead>
              <tr>
                <th>OR Time</th>
                <th>Patient</th>
                <th>Surgery</th>
                <th>ASA</th>
                <th>Status</th>
                <th>Flags</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => {
                const status  = getStatus(p);
                const sl      = STATUS_LABELS[status];
                const orLabel = formatORTime(p.orDate, p.orTime);
                const isEmerg = p.surgeryType?.includes('Emergency');
                return (
                  <tr
                    key={p.id}
                    className={`patient-row ${isEmerg ? 'row-emergency' : ''}`}
                    onClick={() => onSelectPatient(p.id)}
                  >
                    <td>
                      {isEmerg ? (
                        <span className="emergency-chip">🚨 STAT</span>
                      ) : orLabel ? (
                        <div className="or-time-cell">
                          <span className="or-time-value">{orLabel}</span>
                          {p.surgeonName && <span className="or-surgeon">{p.surgeonName}</span>}
                        </div>
                      ) : (
                        <span className="or-time-na">—</span>
                      )}
                    </td>
                    <td>
                      <div className="pt-name">
                        {p.difficultIntubation && <span className="inline-flag" title="Difficult airway history">✈</span>}
                        {p.mhRisk && <span className="inline-flag mh-flag" title="MH risk">MH</span>}
                        {p.name}
                      </div>
                      <div className="pt-meta">{p.age}y {p.gender}
                        {p.bmi ? ` · BMI ${p.bmi}` : ''}
                      </div>
                    </td>
                    <td>
                      <div className="pt-surgery">{p.surgeryType}</div>
                      <span className={`risk-chip risk-${p.surgeryRisk}`}>{p.surgeryRisk} risk</span>
                    </td>
                    <td>
                      <span className="asa-badge" style={{ background: ASA_COLORS[p.asaLevel] || '#999' }}>
                        ASA {p.asaLevel}
                      </span>
                    </td>
                    <td>
                      <span className={`status-chip ${sl.cls}`}>{sl.label}</span>
                    </td>
                    <td>
                      <div className="flags-cell">
                        {p.difficultIntubation && <span className="flag-badge airway-flag" title="Difficult airway">Airway</span>}
                        {p.mhRisk             && <span className="flag-badge mh-badge" title="MH Risk">MH Risk</span>}
                        {p.latexAllergy       && <span className="flag-badge latex-flag" title="Latex allergy">Latex</span>}
                        {p.ponvHistory        && <span className="flag-badge ponv-flag" title="PONV history">PONV</span>}
                      </div>
                    </td>
                    <td onClick={e => e.stopPropagation()}>
                      <button className="btn-sm" onClick={() => onSelectPatient(p.id)}>View</button>
                      <button
                        className="btn-sm btn-danger"
                        onClick={() => {
                          if (confirm(`Remove ${p.name} from list?`)) onDeletePatient(p.id);
                        }}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
