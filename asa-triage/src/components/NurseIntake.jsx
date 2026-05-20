import { useState, useMemo } from 'react';
import {
  CONDITION_GROUPS, SURGERY_TYPES,
  calcBMI, calculateASA, needsEvaluation, ASA_COLORS,
} from '../utils/asaCalculator.js';
import {
  getPreopRequirements, isReadyForEvaluation, AVAILABLE_ITEMS_SCHEMA,
} from '../utils/preopRequirements.js';

const STEPS = ['Patient Info', 'Medical History', 'Medications & Allergies', 'Available Studies'];

const MEDICATIONS = [
  { key: 'warfarin', label: 'Warfarin (Coumadin)' },
  { key: 'apixaban', label: 'Apixaban (Eliquis)' },
  { key: 'rivaroxaban', label: 'Rivaroxaban (Xarelto)' },
  { key: 'dabigatran', label: 'Dabigatran (Pradaxa)' },
  { key: 'heparin_enox', label: 'Heparin / Enoxaparin (Lovenox)' },
  { key: 'aspirin', label: 'Aspirin' },
  { key: 'clopidogrel', label: 'Clopidogrel (Plavix)' },
  { key: 'ticagrelor', label: 'Ticagrelor (Brilinta)' },
  { key: 'insulin', label: 'Insulin' },
  { key: 'metformin', label: 'Metformin' },
  { key: 'sglt2', label: 'SGLT-2 inhibitor (Farxiga, Jardiance, Invokana)' },
  { key: 'glp1', label: 'GLP-1 agonist (Ozempic, Wegovy, Victoza, Mounjaro)' },
  { key: 'beta_blocker', label: 'Beta-blocker' },
  { key: 'ace_arb', label: 'ACE inhibitor / ARB' },
  { key: 'digoxin', label: 'Digoxin' },
  { key: 'amiodarone', label: 'Amiodarone' },
  { key: 'steroids', label: 'Chronic steroids (prednisone, etc.)' },
  { key: 'immunosuppressant', label: 'Immunosuppressants (tacrolimus, cyclosporine, etc.)' },
  { key: 'opioids', label: 'Opioids (hydrocodone, oxycodone, morphine, etc.)' },
  { key: 'maoi', label: 'MAOI antidepressant' },
  { key: 'ssri_snri', label: 'SSRI / SNRI' },
  { key: 'lithium', label: 'Lithium' },
  { key: 'inhaler', label: 'Inhaler(s) — bronchodilator / steroid inhaler' },
  { key: 'cpap', label: 'CPAP / BIPAP (uses at home)' },
];

function initForm() {
  return {
    name: '',
    dob: '',
    age: '',
    gender: '',
    weightLbs: '',
    heightFt: '',
    heightIn: '',
    surgeryType: '',
    surgeryRisk: '',
    anesthesiaType: '',
    conditions: [],
    medications: [],
    otherMedications: '',
    drugAllergies: '',
    latexAllergy: false,
    npoStatus: '',
    lastAteTime: '',
    notes: '',
    availableItems: {},
  };
}

export default function NurseIntake({ onSubmit, onCancel }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(initForm());
  const [errors, setErrors] = useState({});

  const bmi = useMemo(
    () => calcBMI(form.weightLbs, form.heightFt, form.heightIn),
    [form.weightLbs, form.heightFt, form.heightIn]
  );

  const asaResult = useMemo(
    () => calculateASA({ conditions: form.conditions, bmi, age: form.age }),
    [form.conditions, bmi, form.age]
  );

  const selectedSurgery = SURGERY_TYPES.find(s => s.label === form.surgeryType);
  const surgeryRisk = selectedSurgery?.risk || form.surgeryRisk || '';

  const preopReqs = useMemo(
    () => getPreopRequirements(form.conditions, surgeryRisk, asaResult.level),
    [form.conditions, surgeryRisk, asaResult.level]
  );

  function set(field, value) {
    setForm(f => ({ ...f, [field]: value }));
    setErrors(e => ({ ...e, [field]: undefined }));
  }

  function toggleCondition(key) {
    setForm(f => ({
      ...f,
      conditions: f.conditions.includes(key)
        ? f.conditions.filter(c => c !== key)
        : [...f.conditions, key],
    }));
  }

  function toggleMed(key) {
    setForm(f => ({
      ...f,
      medications: f.medications.includes(key)
        ? f.medications.filter(m => m !== key)
        : [...f.medications, key],
    }));
  }

  function toggleAvailable(key) {
    setForm(f => ({
      ...f,
      availableItems: { ...f.availableItems, [key]: !f.availableItems[key] },
    }));
  }

  function validateStep0() {
    const e = {};
    if (!form.name.trim()) e.name = 'Patient name required';
    if (!form.age || isNaN(form.age) || form.age < 1) e.age = 'Valid age required';
    if (!form.gender) e.gender = 'Gender required';
    if (!form.surgeryType) e.surgeryType = 'Surgery type required';
    return e;
  }

  function nextStep() {
    if (step === 0) {
      const e = validateStep0();
      if (Object.keys(e).length) { setErrors(e); return; }
    }
    setStep(s => s + 1);
  }

  function handleSubmit() {
    const evalNeeded = needsEvaluation(asaResult, surgeryRisk);
    const ready = evalNeeded ? isReadyForEvaluation(preopReqs, form.availableItems) : false;

    onSubmit({
      ...form,
      bmi: bmi ? parseFloat(bmi.toFixed(1)) : null,
      surgeryRisk,
      asaLevel: asaResult.level,
      asaFactors: asaResult.factors,
      needsEvaluation: evalNeeded,
      isReadyForEval: ready,
      preopReqs,
    });
  }

  const surgeryRiskDisplay = surgeryRisk ? (
    <span className={`risk-chip risk-${surgeryRisk} inline`}>{surgeryRisk} risk</span>
  ) : null;

  return (
    <div className="intake-container">
      <div className="intake-header">
        <button className="btn-ghost" onClick={onCancel}>← Back</button>
        <h2 className="intake-title">New Patient Intake</h2>
        <div className="asa-live">
          {form.age || form.conditions.length > 0 ? (
            <>
              <span className="asa-live-label">Current ASA</span>
              <span className="asa-badge" style={{ background: ASA_COLORS[asaResult.level] }}>
                {asaResult.level}
              </span>
            </>
          ) : null}
        </div>
      </div>

      {/* Progress bar */}
      <div className="progress-bar">
        {STEPS.map((s, i) => (
          <div
            key={s}
            className={`progress-step ${i === step ? 'active' : ''} ${i < step ? 'done' : ''}`}
            onClick={() => i < step && setStep(i)}
          >
            <div className="progress-dot">{i < step ? '✓' : i + 1}</div>
            <div className="progress-label">{s}</div>
          </div>
        ))}
      </div>

      <div className="intake-body">
        {/* ── STEP 0: Patient Info ─────────────────────────────── */}
        {step === 0 && (
          <div className="step-content">
            <h3 className="step-title">Patient Information &amp; Surgery</h3>

            <div className="form-grid">
              <div className={`form-group span-2 ${errors.name ? 'error' : ''}`}>
                <label>Patient Name *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => set('name', e.target.value)}
                  placeholder="Last, First"
                  autoFocus
                />
                {errors.name && <span className="error-msg">{errors.name}</span>}
              </div>

              <div className={`form-group ${errors.age ? 'error' : ''}`}>
                <label>Age *</label>
                <input
                  type="number"
                  value={form.age}
                  onChange={e => set('age', e.target.value)}
                  min="1" max="120"
                  placeholder="Years"
                />
                {errors.age && <span className="error-msg">{errors.age}</span>}
              </div>

              <div className="form-group">
                <label>Date of Birth</label>
                <input type="date" value={form.dob} onChange={e => set('dob', e.target.value)} />
              </div>

              <div className={`form-group ${errors.gender ? 'error' : ''}`}>
                <label>Sex *</label>
                <select value={form.gender} onChange={e => set('gender', e.target.value)}>
                  <option value="">Select</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
                {errors.gender && <span className="error-msg">{errors.gender}</span>}
              </div>

              <div className="form-group">
                <label>Weight (lbs)</label>
                <input
                  type="number"
                  value={form.weightLbs}
                  onChange={e => set('weightLbs', e.target.value)}
                  placeholder="lbs"
                />
              </div>

              <div className="form-group">
                <label>Height</label>
                <div className="height-inputs">
                  <input
                    type="number"
                    value={form.heightFt}
                    onChange={e => set('heightFt', e.target.value)}
                    placeholder="ft" min="0" max="8"
                  />
                  <input
                    type="number"
                    value={form.heightIn}
                    onChange={e => set('heightIn', e.target.value)}
                    placeholder="in" min="0" max="11"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>BMI</label>
                <div className={`bmi-display ${bmi >= 40 ? 'bmi-morbid' : bmi >= 30 ? 'bmi-obese' : ''}`}>
                  {bmi ? (
                    <>
                      <strong>{bmi.toFixed(1)}</strong>
                      <span>{bmi >= 40 ? ' — Morbid obesity' : bmi >= 30 ? ' — Obese' : bmi >= 25 ? ' — Overweight' : ' — Normal'}</span>
                    </>
                  ) : <span className="bmi-na">Enter height &amp; weight</span>}
                </div>
              </div>
            </div>

            <div className="form-divider" />
            <h4 className="subsection-title">Planned Surgery</h4>

            <div className="form-grid">
              <div className={`form-group span-2 ${errors.surgeryType ? 'error' : ''}`}>
                <label>Surgery / Procedure *</label>
                <select
                  value={form.surgeryType}
                  onChange={e => {
                    const sel = SURGERY_TYPES.find(s => s.label === e.target.value);
                    set('surgeryType', e.target.value);
                    if (sel?.risk) set('surgeryRisk', sel.risk);
                  }}
                >
                  <option value="">Select procedure…</option>
                  {['low', 'intermediate', 'high'].map(risk => (
                    <optgroup key={risk} label={`${risk.charAt(0).toUpperCase() + risk.slice(1)}-Risk Procedures`}>
                      {SURGERY_TYPES.filter(s => s.risk === risk).map(s => (
                        <option key={s.label}>{s.label}</option>
                      ))}
                    </optgroup>
                  ))}
                </select>
                {errors.surgeryType && <span className="error-msg">{errors.surgeryType}</span>}
                {surgeryRiskDisplay && <div className="field-hint">{surgeryRiskDisplay}</div>}
              </div>

              <div className="form-group">
                <label>Anesthesia Type Anticipated</label>
                <select value={form.anesthesiaType} onChange={e => set('anesthesiaType', e.target.value)}>
                  <option value="">Not yet determined</option>
                  <option>General</option>
                  <option>Neuraxial (spinal / epidural)</option>
                  <option>Regional block</option>
                  <option>MAC / Sedation</option>
                  <option>Local only</option>
                </select>
              </div>

              <div className="form-group">
                <label>NPO Status</label>
                <select value={form.npoStatus} onChange={e => set('npoStatus', e.target.value)}>
                  <option value="">Select</option>
                  <option>NPO since midnight</option>
                  <option>NPO — 8+ hours</option>
                  <option>NPO — 6 hours (light meal)</option>
                  <option>NPO — 2 hours (clear liquids)</option>
                  <option>Not NPO — emergency</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* ── STEP 1: Medical History ──────────────────────────── */}
        {step === 1 && (
          <div className="step-content">
            <h3 className="step-title">Medical History</h3>
            <p className="step-note">Check all that apply. The ASA score updates live.</p>

            {CONDITION_GROUPS.map(group => (
              <div key={group.system} className="condition-group">
                <div className="condition-group-title">{group.system}</div>
                <div className="condition-list">
                  {group.conditions.map(cond => {
                    const checked = form.conditions.includes(cond.key);
                    return (
                      <label
                        key={cond.key}
                        className={`condition-item ${checked ? 'checked' : ''} asa-${cond.asa}`}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleCondition(cond.key)}
                        />
                        <span className="cond-label-text">{cond.label}</span>
                        <span className={`cond-asa-dot asa-color-${cond.asa}`} title={`ASA ${cond.asa}`} />
                      </label>
                    );
                  })}
                </div>
              </div>
            ))}

            {asaResult.factors.length > 0 && (
              <div className="asa-summary-box">
                <div className="asa-sum-header">
                  <span>Current ASA Assessment</span>
                  <span className="asa-badge" style={{ background: ASA_COLORS[asaResult.level] }}>
                    ASA {asaResult.level}
                  </span>
                </div>
                <div className="asa-factors">
                  {asaResult.factors.map(f => (
                    <span key={f.key} className={`factor-tag asa-color-${f.asa}-bg`}>{f.label}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── STEP 2: Medications & Allergies ─────────────────── */}
        {step === 2 && (
          <div className="step-content">
            <h3 className="step-title">Medications &amp; Allergies</h3>
            <p className="step-note">Check medications anesthesia must be aware of.</p>

            <div className="med-grid">
              {MEDICATIONS.map(med => {
                const checked = form.medications.includes(med.key);
                return (
                  <label key={med.key} className={`med-item ${checked ? 'checked' : ''}`}>
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleMed(med.key)}
                    />
                    <span>{med.label}</span>
                  </label>
                );
              })}
            </div>

            <div className="form-group mt-4">
              <label>Other Medications (free text)</label>
              <textarea
                value={form.otherMedications}
                onChange={e => set('otherMedications', e.target.value)}
                rows={3}
                placeholder="List any other medications not shown above…"
              />
            </div>

            <div className="form-divider" />
            <h4 className="subsection-title">Allergies</h4>

            <div className="form-grid">
              <div className="form-group span-2">
                <label>Drug Allergies (list with reactions)</label>
                <textarea
                  value={form.drugAllergies}
                  onChange={e => set('drugAllergies', e.target.value)}
                  rows={2}
                  placeholder="e.g., Penicillin — hives; Codeine — nausea / vomiting"
                />
              </div>

              <div className="form-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={form.latexAllergy}
                    onChange={e => set('latexAllergy', e.target.checked)}
                  />
                  <span>Latex allergy</span>
                </label>
              </div>
            </div>

            <div className="form-divider" />
            <div className="form-group">
              <label>Additional Notes for Anesthesiologist</label>
              <textarea
                value={form.notes}
                onChange={e => set('notes', e.target.value)}
                rows={3}
                placeholder="Difficult IV access, previous anesthesia problems, patient concerns, etc."
              />
            </div>
          </div>
        )}

        {/* ── STEP 3: Available Studies ────────────────────────── */}
        {step === 3 && (
          <div className="step-content">
            <h3 className="step-title">Available Studies &amp; Clearances</h3>
            <p className="step-note">
              Check everything already in the chart. Missing <strong>required</strong> items will be flagged.
            </p>

            {preopReqs.length === 0 && (
              <div className="info-box">
                No specific pre-op requirements identified based on this patient&apos;s conditions. Standard nursing pre-op protocol applies.
              </div>
            )}

            {['Labs', 'Tests', 'Clearances'].map(cat => {
              const schema = AVAILABLE_ITEMS_SCHEMA[cat.toLowerCase()];
              const relevant = preopReqs.filter(r => r.category === cat);
              if (relevant.length === 0) return null;

              return (
                <div key={cat} className="available-section">
                  <div className="available-section-title">{cat}</div>
                  {relevant.map(req => {
                    const avail = form.availableItems[req.key];
                    const schemaItem = schema?.find(s => s.key === req.key);
                    return (
                      <label
                        key={req.key}
                        className={`available-item ${avail ? 'available' : ''} priority-${req.priority}`}
                      >
                        <input
                          type="checkbox"
                          checked={!!avail}
                          onChange={() => toggleAvailable(req.key)}
                        />
                        <div className="available-item-info">
                          <span className="available-item-label">
                            {schemaItem?.label || req.label}
                            {req.priority === 'required' && <span className="req-star">*</span>}
                          </span>
                          <span className="available-item-reason">{req.reason}</span>
                        </div>
                        <span className={`avail-status ${avail ? 'yes' : 'no'}`}>
                          {avail ? '✓ In chart' : 'Not yet'}
                        </span>
                      </label>
                    );
                  })}
                </div>
              );
            })}

            <div className="intake-preview-box">
              <div className="preview-asa">
                <span>Final ASA Status:</span>
                <span className="asa-badge" style={{ background: ASA_COLORS[asaResult.level] }}>
                  ASA {asaResult.level}
                </span>
              </div>
              <div className={`preview-triage ${needsEvaluation(asaResult, surgeryRisk) ? 'needs-eval' : 'no-eval'}`}>
                {needsEvaluation(asaResult, surgeryRisk)
                  ? 'Anesthesiologist evaluation required'
                  : 'No anesthesiologist evaluation required'}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer navigation */}
      <div className="intake-footer">
        {step > 0 ? (
          <button className="btn-secondary" onClick={() => setStep(s => s - 1)}>← Back</button>
        ) : (
          <button className="btn-ghost" onClick={onCancel}>Cancel</button>
        )}

        <div className="step-indicator">{step + 1} / {STEPS.length}</div>

        {step < STEPS.length - 1 ? (
          <button className="btn-primary" onClick={nextStep}>Next →</button>
        ) : (
          <button className="btn-submit" onClick={handleSubmit}>
            Save Patient &amp; Generate Triage
          </button>
        )}
      </div>
    </div>
  );
}
