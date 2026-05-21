import { useState, useMemo } from 'react';
import {
  ASA_COLORS, ASA_DESCRIPTIONS,
} from '../utils/asaCalculator.js';
import {
  getPreopRequirements, isReadyForEvaluation, AVAILABLE_ITEMS_SCHEMA,
  getMedicationWarnings, getLabAlerts, medLabel,
} from '../utils/preopRequirements.js';

const SEVERITY_ICON = { critical: '🚨', high: '⚠', moderate: '⚡', low: 'ℹ', info: 'ℹ' };

function formatORTime(orDate, orTime) {
  if (!orDate) return null;
  const today    = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
  let dateStr;
  if (orDate === today)         dateStr = 'Today';
  else if (orDate === tomorrow) dateStr = 'Tomorrow';
  else dateStr = new Date(orDate + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  if (orTime) {
    const [h, m] = orTime.split(':').map(Number);
    const ampm = h >= 12 ? 'PM' : 'AM';
    return `${dateStr} at ${h % 12 || 12}:${m.toString().padStart(2, '0')} ${ampm}`;
  }
  return dateStr;
}

const FUNCTIONAL_LABELS = {
  '>=4':     '≥4 METs — Can climb stairs / walk briskly without symptoms',
  '<4':      '<4 METs — Symptomatic with mild exertion',
  'sedentary':'Severely limited — Cannot walk 1–2 blocks',
  'unknown': 'Not assessed',
};

export default function TriageResult({ patient, onBack, onUpdateAvailable, onMarkEvaluated, onUpdateAnesNotes, userRole }) {
  const [localAvail, setLocalAvail] = useState(patient.availableItems || {});
  const [anesNotes, setAnesNotes]   = useState(patient.anesNotes || '');
  const [saved, setSaved]           = useState(false);

  const preopReqs = useMemo(
    () => getPreopRequirements(patient.conditions || [], patient.surgeryRisk, patient.asaLevel, patient.functionalStatus),
    [patient.conditions, patient.surgeryRisk, patient.asaLevel, patient.functionalStatus]
  );

  const medWarnings = useMemo(() => getMedicationWarnings(patient.medications || []), [patient.medications]);
  const labAlerts   = useMemo(() => getLabAlerts(patient.labValues || {}),             [patient.labValues]);

  const missingRequired = preopReqs.filter(r => r.priority === 'required' && !localAvail[r.key]);
  const readyForEval    = patient.needsEvaluation ? isReadyForEvaluation(preopReqs, localAvail) : false;

  // Build critical alerts list for top-of-page banner
  const criticalAlerts = [
    ...(patient.difficultIntubation ? [{
      key: 'diffiult_airway',
      severity: 'critical',
      text: 'History of difficult intubation / difficult airway — advanced airway management plan required.',
    }] : []),
    ...(patient.mhRisk ? [{
      key: 'mh_risk',
      severity: 'critical',
      text: 'Malignant hyperthermia (MH) risk — avoid triggering agents. Dantrolene must be available. MH protocol required.',
    }] : []),
    ...medWarnings.filter(w => w.severity === 'critical').map(w => ({
      key: w.key,
      severity: 'critical',
      text: `${w.med}: ${w.text}`,
    })),
    ...labAlerts.filter(a => a.severity === 'critical'),
  ];

  function toggleAvail(key) {
    const updated = { ...localAvail, [key]: !localAvail[key] };
    setLocalAvail(updated);
    onUpdateAvailable(patient.id, updated);
    flash();
  }

  function flash() {
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  }

  function saveAnesNotes(value) {
    setAnesNotes(value);
    onUpdateAnesNotes(patient.id, value);
    flash();
  }

  const asaColor  = ASA_COLORS[patient.asaLevel] || '#999';
  const orLabel   = formatORTime(patient.orDate, patient.orTime);
  const isEmerg   = patient.surgeryType?.includes('Emergency');
  const hasLabVals = patient.labValues && Object.values(patient.labValues).some(v => v !== '');

  return (
    <div className="result-container">

      {/* Header */}
      <div className="result-header">
        <button className="btn-ghost" onClick={onBack}>← Back</button>
        <div className="result-patient-info">
          <div className="result-name-row">
            <h2 className="result-name">{patient.name}</h2>
            {patient.difficultIntubation && <span className="alert-chip airway">⚠ Difficult Airway</span>}
            {patient.mhRisk             && <span className="alert-chip mh">🚨 MH Risk</span>}
            {patient.latexAllergy       && <span className="alert-chip latex">Latex Allergy</span>}
          </div>
          <div className="result-meta">
            {patient.age}y {patient.gender}
            {patient.bmi ? ` · BMI ${patient.bmi}` : ''}
            &nbsp;|&nbsp;{patient.surgeryType}
            &nbsp;<span className={`risk-chip risk-${patient.surgeryRisk}`}>{patient.surgeryRisk} risk</span>
            {orLabel && <>&nbsp;|&nbsp;<strong>{orLabel}</strong></>}
            {patient.surgeonName && <>&nbsp;· Dr. {patient.surgeonName}</>}
          </div>
        </div>
        {saved && <span className="save-toast">Saved ✓</span>}
      </div>

      {/* Emergency banner */}
      {isEmerg && (
        <div className="emergency-top-banner">
          🚨 EMERGENCY SURGERY — Contact attending anesthesiologist immediately. Pre-op workup may not be possible.
        </div>
      )}

      {/* Critical safety alerts */}
      {criticalAlerts.length > 0 && (
        <div className="critical-alerts-block">
          <div className="critical-alerts-title">🚨 Critical Alerts — Anesthesiologist Must See Before Evaluation</div>
          {criticalAlerts.map(a => (
            <div key={a.key} className={`warning-banner severity-${a.severity}`}>
              <div className="warning-icon">{SEVERITY_ICON[a.severity]}</div>
              <div className="warning-body">
                <div className="warning-text">{a.text}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ASA Status Card */}
      <div className="asa-result-card" style={{ borderColor: asaColor }}>
        <div className="asa-result-left" style={{ background: asaColor }}>
          <div className="asa-result-label">ASA Physical Status</div>
          <div className="asa-result-number">{patient.asaLevel}</div>
        </div>
        <div className="asa-result-right">
          <p className="asa-result-desc">{ASA_DESCRIPTIONS[patient.asaLevel]}</p>
          {(patient.asaFactors || []).length > 0 ? (
            <div className="asa-result-factors">
              <strong>Contributing factors:</strong>
              <div className="factor-chips">
                {patient.asaFactors.map(f => (
                  <span key={f.key} className={`factor-tag asa-color-${f.asa}-bg`}>{f.label}</span>
                ))}
              </div>
            </div>
          ) : (
            <p className="no-factors">No comorbidities documented — healthy patient</p>
          )}
        </div>
      </div>

      {/* Triage Decision */}
      <div className={`triage-decision ${patient.needsEvaluation ? 'eval-needed' : 'eval-clear'}`}>
        <div className="triage-icon">
          {patient.needsEvaluation ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
          )}
        </div>
        <div className="triage-text">
          {patient.needsEvaluation ? (
            <>
              <div className="triage-headline">Anesthesiologist Evaluation Required</div>
              <div className="triage-subline">
                {patient.difficultIntubation || patient.mhRisk
                  ? 'Safety flag (difficult airway / MH risk) requires anesthesiologist evaluation regardless of ASA status.'
                  : patient.asaLevel >= 3
                    ? `ASA ${patient.asaLevel} — direct anesthesiologist evaluation indicated.`
                    : `High-risk surgery in ASA ${patient.asaLevel} patient.`}
                {' '}
                {readyForEval
                  ? 'All required studies available — ready for evaluation.'
                  : `${missingRequired.length} required item${missingRequired.length !== 1 ? 's' : ''} still outstanding.`}
              </div>
            </>
          ) : (
            <>
              <div className="triage-headline">No Anesthesiologist Evaluation Required</div>
              <div className="triage-subline">
                ASA {patient.asaLevel} with {patient.surgeryRisk}-risk surgery. Cleared by nursing protocol.
              </div>
            </>
          )}
        </div>
        {patient.needsEvaluation && readyForEval && !patient.evaluationComplete && userRole === 'anesthesiologist' && (
          <button className="btn-evaluate" onClick={() => onMarkEvaluated(patient.id)}>
            Mark as Evaluated ✓
          </button>
        )}
        {patient.evaluationComplete && (
          <div className="eval-done-badge">
            Evaluated ✓{patient.evaluatedAt && <span> {new Date(patient.evaluatedAt).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}</span>}
          </div>
        )}
      </div>

      {/* Main content grid */}
      <div className="result-grid">
        {/* Patient Summary */}
        <div className="result-section">
          <h3 className="section-title">Patient Summary</h3>
          <table className="summary-table">
            <tbody>
              <tr><td>Name</td><td>{patient.name}</td></tr>
              <tr><td>Age / Sex</td><td>{patient.age} yrs / {patient.gender}</td></tr>
              {patient.dob && <tr><td>DOB</td><td>{patient.dob}</td></tr>}
              <tr><td>BMI</td><td>
                {patient.bmi
                  ? `${patient.bmi} — ${patient.bmi >= 40 ? 'Morbid obesity' : patient.bmi >= 30 ? 'Obese' : patient.bmi >= 25 ? 'Overweight' : 'Normal'}`
                  : 'Not recorded'}
              </td></tr>
              <tr><td>Surgery</td><td>{patient.surgeryType}</td></tr>
              <tr><td>Surgical Risk</td><td className={`risk-text risk-${patient.surgeryRisk}`}>{patient.surgeryRisk}</td></tr>
              {orLabel && <tr><td>OR Scheduled</td><td><strong>{orLabel}</strong></td></tr>}
              {patient.surgeonName && <tr><td>Surgeon</td><td>{patient.surgeonName}</td></tr>}
              {patient.anesthesiaType && <tr><td>Anesthesia Plan</td><td>{patient.anesthesiaType}</td></tr>}
              {patient.npoStatus && <tr><td>NPO Status</td><td>{patient.npoStatus}</td></tr>}
              {patient.functionalStatus && patient.functionalStatus !== 'unknown' && (
                <tr><td>Functional Status</td><td>{FUNCTIONAL_LABELS[patient.functionalStatus]}</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Medications & Allergies */}
        <div className="result-section">
          <h3 className="section-title">Medications &amp; Allergies</h3>
          {patient.medications?.length > 0 ? (
            <ul className="med-list">
              {patient.medications.map(m => <li key={m}>{medLabel(m)}</li>)}
            </ul>
          ) : <p className="none-text">None documented</p>}
          {patient.otherMedications && <p className="other-meds">{patient.otherMedications}</p>}

          <div className="mt-3">
            <strong>Allergies:</strong>
            <p className={`allergy-text ${patient.latexAllergy ? 'has-latex' : ''}`}>
              {patient.drugAllergies || 'NKDA'}
              {patient.latexAllergy && <span className="latex-alert"> | ⚠ LATEX ALLERGY</span>}
            </p>
          </div>

          {patient.ponvHistory && (
            <div className="ponv-note">
              ⚡ Significant PONV history — prophylaxis recommended
            </div>
          )}
        </div>
      </div>

      {/* Medication Warnings (non-critical) */}
      {medWarnings.filter(w => w.severity !== 'critical').length > 0 && (
        <div className="result-section">
          <h3 className="section-title">Medication Alerts</h3>
          {medWarnings.filter(w => w.severity !== 'critical').map(w => (
            <div key={w.key} className={`warning-banner severity-${w.severity}`}>
              <div className="warning-icon">{SEVERITY_ICON[w.severity]}</div>
              <div className="warning-body">
                <div className="warning-med">{w.med}</div>
                <div className="warning-text">{w.text}</div>
                <div className="warning-action">→ {w.action}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lab Values */}
      {(hasLabVals || labAlerts.length > 0) && (
        <div className="result-section">
          <h3 className="section-title">Lab Values</h3>
          <div className="lab-display-grid">
            {[
              { key: 'hgb',        label: 'Hgb',        unit: 'g/dL' },
              { key: 'kplus',      label: 'K+',         unit: 'mEq/L' },
              { key: 'creatinine', label: 'Creatinine', unit: 'mg/dL' },
              { key: 'inr',        label: 'INR',        unit: '' },
              { key: 'hba1c',      label: 'HbA1c',      unit: '%' },
            ].map(lv => {
              const val = patient.labValues?.[lv.key];
              if (!val) return null;
              const alert = labAlerts.find(a => a.key.startsWith(lv.key === 'kplus' ? 'k_' : lv.key === 'creatinine' ? 'cr_' : lv.key === 'inr' ? 'inr' : lv.key === 'hba1c' ? 'hba1c' : 'hgb'));
              return (
                <div key={lv.key} className={`lab-display-item ${alert ? `alert-${alert.severity}` : ''}`}>
                  <div className="lab-display-label">{lv.label}</div>
                  <div className="lab-display-value">{val}{lv.unit && ` ${lv.unit}`}</div>
                  {alert && <div className="lab-display-flag">{SEVERITY_ICON[alert.severity]}</div>}
                </div>
              );
            })}
          </div>
          {labAlerts.length > 0 && (
            <div className="lab-alerts-list">
              {labAlerts.map(a => (
                <div key={a.key} className={`warning-banner severity-${a.severity}`}>
                  <div className="warning-icon">{SEVERITY_ICON[a.severity]}</div>
                  <div className="warning-body"><div className="warning-text">{a.text}</div></div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Anesthesia notes */}
      {(patient.priorAnesProblems || patient.notes) && (
        <div className="notes-box">
          {patient.priorAnesProblems && (
            <p><strong>Prior anesthesia notes:</strong> {patient.priorAnesProblems}</p>
          )}
          {patient.notes && (
            <p><strong>Nursing notes:</strong> {patient.notes}</p>
          )}
        </div>
      )}

      {/* Pre-op Checklist */}
      {patient.needsEvaluation && (
        <div className="checklist-section">
          <div className="checklist-header">
            <h3 className="section-title">Pre-Op Requirements Checklist</h3>
            <div className={`checklist-status ${readyForEval ? 'ready' : 'incomplete'}`}>
              {readyForEval ? 'All required items complete' : `${missingRequired.length} required item${missingRequired.length !== 1 ? 's' : ''} outstanding`}
            </div>
          </div>

          {preopReqs.length === 0 ? (
            <p className="none-text">No specific requirements identified.</p>
          ) : (
            ['Labs', 'Tests', 'Clearances'].map(cat => {
              const catReqs = preopReqs.filter(r => r.category === cat);
              if (catReqs.length === 0) return null;
              const schema = AVAILABLE_ITEMS_SCHEMA[cat.toLowerCase()];
              return (
                <div key={cat} className="checklist-cat">
                  <div className="checklist-cat-title">{cat}</div>
                  {catReqs.map(req => {
                    const avail     = localAvail[req.key];
                    const schemaItem = schema?.find(s => s.key === req.key);
                    return (
                      <div key={req.key} className={`checklist-item ${avail ? 'complete' : req.priority === 'required' ? 'missing-required' : 'missing-rec'}`}>
                        <label className="checklist-checkbox">
                          <input
                            type="checkbox"
                            checked={!!avail}
                            onChange={() => toggleAvail(req.key)}
                          />
                          <div className="checklist-item-body">
                            <span className="checklist-item-name">
                              {schemaItem?.label || req.label}
                              {req.priority === 'required' && !avail && <span className="req-badge">REQUIRED</span>}
                              {req.priority === 'recommended' && !avail && <span className="rec-badge">Recommended</span>}
                            </span>
                            <span className="checklist-item-reason">{req.reason}</span>
                          </div>
                          <span className={`checklist-status-icon ${avail ? 'done' : 'pending'}`}>
                            {avail ? '✓' : req.priority === 'required' ? '!' : '○'}
                          </span>
                        </label>
                      </div>
                    );
                  })}
                </div>
              );
            })
          )}
        </div>
      )}

      {/* Anesthesiologist Notes */}
      {userRole === 'anesthesiologist' && (
        <div className="result-section anes-notes-section">
          <h3 className="section-title">Anesthesiologist Assessment &amp; Plan</h3>
          <textarea
            className="anes-notes-input"
            value={anesNotes}
            onChange={e => saveAnesNotes(e.target.value)}
            placeholder="Enter anesthetic plan, concerns, additional workup ordered, consent notes, or instructions for nursing…"
            rows={4}
          />
          {patient.needsEvaluation && !patient.evaluationComplete && (
            <div className="anes-notes-actions">
              <button
                className="btn-evaluate"
                onClick={() => onMarkEvaluated(patient.id)}
              >
                Mark Evaluation Complete ✓
              </button>
            </div>
          )}
        </div>
      )}

      {/* Show anesthesiologist notes to nurses if they exist */}
      {userRole === 'nurse' && patient.anesNotes && (
        <div className="result-section">
          <h3 className="section-title">Anesthesiologist Notes</h3>
          <div className="anes-notes-display">{patient.anesNotes}</div>
        </div>
      )}
    </div>
  );
}
