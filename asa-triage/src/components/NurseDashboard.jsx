import { ASA_COLORS } from '../utils/asaCalculator.js';

const STATUS_LABELS = {
  no_eval: { label: 'No Eval Needed', cls: 'status-cleared' },
  awaiting: { label: 'Awaiting Workup', cls: 'status-awaiting' },
  ready: { label: 'Ready for Eval', cls: 'status-ready' },
  evaluated: { label: 'Evaluated', cls: 'status-done' },
};

function getPatientStatus(p) {
  if (p.evaluationComplete) return 'evaluated';
  if (!p.needsEvaluation) return 'no_eval';
  if (p.isReadyForEval) return 'ready';
  return 'awaiting';
}

export default function NurseDashboard({ patients, onNewPatient, onSelectPatient, onDeletePatient }) {
  const counts = { 1: 0, 2: 0, 3: 0, 4: 0 };
  patients.forEach(p => { if (p.asaLevel) counts[p.asaLevel] = (counts[p.asaLevel] || 0) + 1; });

  const needsEval = patients.filter(p => p.needsEvaluation && !p.evaluationComplete).length;
  const readyForEval = patients.filter(p => p.needsEvaluation && !p.evaluationComplete && p.isReadyForEval).length;

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div>
          <h1 className="page-title">Today&apos;s Patients</h1>
          <p className="page-subtitle">Pre-operative triage status</p>
        </div>
        <button className="btn-primary" onClick={onNewPatient}>
          + Add New Patient
        </button>
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

      {patients.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <p className="empty-title">No patients entered yet</p>
          <p className="empty-sub">Click &ldquo;Add New Patient&rdquo; to begin pre-op triage</p>
          <button className="btn-primary" onClick={onNewPatient}>+ Add New Patient</button>
        </div>
      ) : (
        <div className="patient-table-wrap">
          <table className="patient-table">
            <thead>
              <tr>
                <th>Patient</th>
                <th>Surgery</th>
                <th>ASA</th>
                <th>Status</th>
                <th>Key Conditions</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {patients.map(p => {
                const status = getPatientStatus(p);
                const sl = STATUS_LABELS[status];
                return (
                  <tr key={p.id} className="patient-row" onClick={() => onSelectPatient(p.id)}>
                    <td>
                      <div className="pt-name">{p.name}</div>
                      <div className="pt-meta">{p.age}y {p.gender}</div>
                    </td>
                    <td>
                      <div className="pt-surgery">{p.surgeryType}</div>
                      <div className={`risk-chip risk-${p.surgeryRisk}`}>{p.surgeryRisk} risk</div>
                    </td>
                    <td>
                      <span
                        className="asa-badge"
                        style={{ background: ASA_COLORS[p.asaLevel] || '#999' }}
                      >
                        ASA {p.asaLevel}
                      </span>
                    </td>
                    <td>
                      <span className={`status-chip ${sl.cls}`}>{sl.label}</span>
                    </td>
                    <td>
                      <div className="conditions-preview">
                        {(p.asaFactors || []).slice(0, 2).map(f => (
                          <span key={f.key} className="cond-tag">{f.label}</span>
                        ))}
                        {(p.asaFactors || []).length > 2 && (
                          <span className="cond-more">+{p.asaFactors.length - 2} more</span>
                        )}
                        {(p.asaFactors || []).length === 0 && (
                          <span className="cond-none">None documented</span>
                        )}
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
