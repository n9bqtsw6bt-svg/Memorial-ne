import { useState, useMemo } from 'react';
import {
  ASA_COLORS, ASA_DESCRIPTIONS, calculateASA, needsEvaluation,
} from '../utils/asaCalculator.js';
import {
  getPreopRequirements, isReadyForEvaluation, AVAILABLE_ITEMS_SCHEMA,
} from '../utils/preopRequirements.js';

export default function TriageResult({ patient, onBack, onUpdateAvailable, onMarkEvaluated, userRole }) {
  const [localAvail, setLocalAvail] = useState(patient.availableItems || {});
  const [saved, setSaved] = useState(false);

  const preopReqs = useMemo(
    () => getPreopRequirements(patient.conditions || [], patient.surgeryRisk, patient.asaLevel),
    [patient.conditions, patient.surgeryRisk, patient.asaLevel]
  );

  const missingRequired = preopReqs.filter(r => r.priority === 'required' && !localAvail[r.key]);
  const readyForEval = patient.needsEvaluation ? isReadyForEvaluation(preopReqs, localAvail) : false;

  function toggleAvail(key) {
    const updated = { ...localAvail, [key]: !localAvail[key] };
    setLocalAvail(updated);
    onUpdateAvailable(patient.id, updated);
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  }

  const asaColor = ASA_COLORS[patient.asaLevel] || '#999';
  const bmiStr = patient.bmi ? `${patient.bmi} (${patient.bmi >= 40 ? 'Morbid obesity' : patient.bmi >= 30 ? 'Obese' : patient.bmi >= 25 ? 'Overweight' : 'Normal'})` : 'Not recorded';

  const evalResult = patient.needsEvaluation;

  return (
    <div className="result-container">
      <div className="result-header">
        <button className="btn-ghost" onClick={onBack}>← Back</button>
        <div className="result-patient-info">
          <h2 className="result-name">{patient.name}</h2>
          <span className="result-meta">
            {patient.age}y &nbsp;{patient.gender} &nbsp;|&nbsp; {patient.surgeryType}
            &nbsp;<span className={`risk-chip risk-${patient.surgeryRisk}`}>{patient.surgeryRisk} risk</span>
          </span>
        </div>
        {saved && <span className="save-toast">Saved ✓</span>}
      </div>

      {/* ASA Status Card */}
      <div className="asa-result-card" style={{ borderColor: asaColor }}>
        <div className="asa-result-left" style={{ background: asaColor }}>
          <div className="asa-result-label">ASA Physical Status</div>
          <div className="asa-result-number">{patient.asaLevel}</div>
        </div>
        <div className="asa-result-right">
          <p className="asa-result-desc">{ASA_DESCRIPTIONS[patient.asaLevel]}</p>
          {(patient.asaFactors || []).length > 0 && (
            <div className="asa-result-factors">
              <strong>Contributing factors:</strong>
              <div className="factor-chips">
                {patient.asaFactors.map(f => (
                  <span key={f.key} className={`factor-tag asa-color-${f.asa}-bg`}>{f.label}</span>
                ))}
              </div>
            </div>
          )}
          {(patient.asaFactors || []).length === 0 && (
            <p className="no-factors">No comorbidities documented — healthy patient</p>
          )}
        </div>
      </div>

      {/* Triage Decision */}
      <div className={`triage-decision ${evalResult ? 'eval-needed' : 'eval-clear'}`}>
        <div className="triage-icon">
          {evalResult ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          )}
        </div>
        <div className="triage-text">
          {evalResult ? (
            <>
              <div className="triage-headline">Anesthesiologist Evaluation Required</div>
              <div className="triage-subline">
                {patient.asaLevel >= 3
                  ? `ASA ${patient.asaLevel} patient — pre-operative evaluation by anesthesiologist is indicated.`
                  : `High-risk surgery in ASA ${patient.asaLevel} patient — evaluation recommended.`}
                {readyForEval
                  ? ' All required studies are available.'
                  : ` ${missingRequired.length} required item${missingRequired.length > 1 ? 's' : ''} still needed before evaluation.`}
              </div>
            </>
          ) : (
            <>
              <div className="triage-headline">No Anesthesiologist Evaluation Required</div>
              <div className="triage-subline">
                ASA {patient.asaLevel} patient with {patient.surgeryRisk}-risk surgery. Cleared per nursing protocol.
                Standard pre-op nursing assessment complete.
              </div>
            </>
          )}
        </div>
        {evalResult && readyForEval && !patient.evaluationComplete && userRole === 'anesthesiologist' && (
          <button className="btn-evaluate" onClick={() => onMarkEvaluated(patient.id)}>
            Mark as Evaluated ✓
          </button>
        )}
        {patient.evaluationComplete && (
          <div className="eval-done-badge">
            Evaluated ✓
            {patient.evaluatedAt && (
              <span> &nbsp;{new Date(patient.evaluatedAt).toLocaleString()}</span>
            )}
          </div>
        )}
      </div>

      {/* Patient Summary */}
      <div className="result-grid">
        <div className="result-section">
          <h3 className="section-title">Patient Summary</h3>
          <table className="summary-table">
            <tbody>
              <tr><td>Name</td><td>{patient.name}</td></tr>
              <tr><td>Age / Sex</td><td>{patient.age} years / {patient.gender}</td></tr>
              {patient.dob && <tr><td>DOB</td><td>{patient.dob}</td></tr>}
              <tr><td>BMI</td><td>{bmiStr}</td></tr>
              <tr><td>Surgery</td><td>{patient.surgeryType}</td></tr>
              <tr><td>Surgical Risk</td><td className={`risk-text risk-${patient.surgeryRisk}`}>{patient.surgeryRisk}</td></tr>
              {patient.anesthesiaType && <tr><td>Anesthesia Plan</td><td>{patient.anesthesiaType}</td></tr>}
              {patient.npoStatus && <tr><td>NPO Status</td><td>{patient.npoStatus}</td></tr>}
            </tbody>
          </table>
        </div>

        <div className="result-section">
          <h3 className="section-title">Medications</h3>
          {patient.medications?.length > 0 ? (
            <ul className="med-list">
              {patient.medications.map(m => <li key={m}>{m}</li>)}
            </ul>
          ) : <p className="none-text">None documented</p>}
          {patient.otherMedications && (
            <p className="other-meds">{patient.otherMedications}</p>
          )}

          <div className="mt-3">
            <strong>Allergies:</strong>
            <p className="allergy-text">
              {patient.drugAllergies || 'NKDA'}
              {patient.latexAllergy && ' | LATEX ALLERGY'}
            </p>
          </div>
        </div>
      </div>

      {patient.notes && (
        <div className="notes-box">
          <strong>Notes:</strong> {patient.notes}
        </div>
      )}

      {/* Pre-op Checklist */}
      {evalResult && (
        <div className="checklist-section">
          <div className="checklist-header">
            <h3 className="section-title">Pre-Op Requirements Checklist</h3>
            <div className={`checklist-status ${readyForEval ? 'ready' : 'incomplete'}`}>
              {readyForEval ? 'All required items complete' : `${missingRequired.length} required item${missingRequired.length !== 1 ? 's' : ''} outstanding`}
            </div>
          </div>

          {preopReqs.length === 0 ? (
            <p className="none-text">No specific pre-op requirements for this patient.</p>
          ) : (
            ['Labs', 'Tests', 'Clearances'].map(cat => {
              const catReqs = preopReqs.filter(r => r.category === cat);
              if (catReqs.length === 0) return null;
              const schema = AVAILABLE_ITEMS_SCHEMA[cat.toLowerCase()];

              return (
                <div key={cat} className="checklist-cat">
                  <div className="checklist-cat-title">{cat}</div>
                  {catReqs.map(req => {
                    const avail = localAvail[req.key];
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
    </div>
  );
}
