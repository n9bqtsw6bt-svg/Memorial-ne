import { useState, useMemo } from 'react';
import {
  CONDITION_GROUPS, SURGERY_TYPES,
  calcBMI, calculateASA, needsEvaluation, ASA_COLORS,
} from '../utils/asaCalculator.js';
import {
  getPreopRequirements, isReadyForEvaluation, AVAILABLE_ITEMS_SCHEMA,
  getMedicationWarnings, getLabAlerts,
} from '../utils/preopRequirements.js';

const STEPS = ['Patient & Surgery', 'Medical History', 'Medications & History', 'Available Studies'];

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
  { key: 'cpap', label: 'CPAP / BiPAP (uses at home)' },
];

function initForm() {
  return {
    // Step 1
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
    npoStatus: '',
    orDate: '',
    orTime: '',
    surgeonName: '',
    // Step 2
    conditions: [],
    functionalStatus: 'unknown',
    difficultIntubation: false,
    mhRisk: false,
    // Step 3
    medications: [],
    otherMedications: '',
    drugAllergies: '',
    latexAllergy: false,
    ponvHistory: false,
    priorAnesProblems: '',
    notes: '',
    // Step 4
    availableItems: {},
    labValues: { hgb: '', kplus: '', creatinine: '', inr: '', hba1c: '' },
  };
}

const SEVERITY_ICON = { critical: '🚨', high: '⚠', moderate: '⚡', low: 'ℹ', info: 'ℹ' };

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
    () => getPreopRequirements(form.conditions, surgeryRisk, asaResult.level, form.functionalStatus),
    [form.conditions, surgeryRisk, asaResult.level, form.functionalStatus]
  );

  const medWarnings = useMemo(
    () => getMedicationWarnings(form.medications),
    [form.medications]
  );

  const labAlerts = useMemo(
    () => getLabAlerts(form.labValues),
    [form.labValues]
  );

  const isEmergency = form.surgeryType?.includes('Emergency');

  function set(field, value) {
    setForm(f => ({ ...f, [field]: value }));
    setErrors(e => ({ ...e, [field]: undefined }));
  }

  function setLabValue(key, value) {
    setForm(f => ({ ...f, labValues: { ...f.labValues, [key]: value } }));
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
    const evalNeeded = needsEvaluation(asaResult, surgeryRisk)
      || form.difficultIntubation
      || form.mhRisk;
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

  const criticalWarnings = medWarnings.filter(w => w.severity === 'critical');
  const hasSafetyFlags = form.difficultIntubation || form.mhRisk || criticalWarnings.length > 0;

  return (
    <div className="intake-container">
      <div className="intake-header">
        <button className="btn-ghost" onClick={onCancel}>← Back</button>
        <h2 className="intake-title">New Patient Intake</h2>
        <div className="asa-live">
          {(form.age || form.conditions.length > 0) && (
            <>
              <span className="asa-live-label">ASA</span>
              <span className="asa-badge" style={{ background: ASA_COLORS[asaResult.level] }}>
                {asaResult.level}
              </span>
            </>
          )}
          {hasSafetyFlags && (
            <span className="safety-live-flag" title="Safety flags present">🚨</span>
          )}
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
                  min="1" max="120" placeholder="Years"
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
                {surgeryRisk && (
                  <div className="field-hint">
                    <span className={`risk-chip risk-${surgeryRisk} inline`}>{surgeryRisk} risk</span>
                  </div>
                )}
              </div>

              <div className="form-group">
                <label>OR Date</label>
                <input type="date" value={form.orDate} onChange={e => set('orDate', e.target.value)} />
              </div>

              <div className="form-group">
                <label>OR Time</label>
                <input type="time" value={form.orTime} onChange={e => set('orTime', e.target.value)} />
              </div>

              <div className="form-group span-2">
                <label>Surgeon</label>
                <input
                  type="text"
                  value={form.surgeonName}
                  onChange={e => set('surgeonName', e.target.value)}
                  placeholder="Surgeon's name"
                />
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
                  <option>NPO — 2 hours (clear liquids only)</option>
                  <option>Not NPO — emergency</option>
                </select>
              </div>
            </div>

            {isEmergency && (
              <div className="emergency-intake-banner">
                🚨 <strong>Emergency Surgery</strong> — Anesthesiologist notification required immediately.
                Full pre-op workup may not be possible. Escalate to attending anesthesiologist now.
              </div>
            )}
          </div>
        )}

        {/* ── STEP 1: Medical History ──────────────────────────── */}
        {step === 1 && (
          <div className="step-content">
            <h3 className="step-title">Medical History</h3>
            <p className="step-note">Check all that apply. ASA score updates live as you select conditions.</p>

            {CONDITION_GROUPS.map(group => (
              <div key={group.system} className="condition-group">
                <div className="condition-group-title">{group.system}</div>
                <div className="condition-list">
                  {group.conditions.map(cond => {
                    const checked = form.conditions.includes(cond.key);
                    return (
                      <label
                        key={cond.key}
                        className={`condition-item ${checked ? 'checked' : ''}`}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleCondition(cond.key)}
                        />
                        <span className="cond-label-text">{cond.label}</span>
                        <span className={`cond-asa-dot asa-color-${cond.asa}`} title={`ASA ${cond.asa} condition`} />
                      </label>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Functional Status */}
            <div className="condition-group">
              <div className="condition-group-title">Functional Capacity</div>
              <div className="form-group">
                <label>Estimated functional status (affects cardiac risk stratification)</label>
                <select
                  value={form.functionalStatus}
                  onChange={e => set('functionalStatus', e.target.value)}
                  className="func-status-select"
                >
                  <option value="unknown">Unknown / not assessed</option>
                  <option value=">=4">≥4 METs — Can climb a flight of stairs or walk at 4 mph without symptoms</option>
                  <option value="<4">{"<4 METs — Gets short of breath or chest symptoms with mild exertion"}</option>
                  <option value="sedentary">Severely limited — Cannot walk 1–2 blocks or perform light housework</option>
                </select>
              </div>
            </div>

            {/* CRITICAL SAFETY FLAGS */}
            <div className="safety-flags-section">
              <div className="safety-flags-title">⚠ Critical Safety Flags — Check if applicable</div>
              <label className={`safety-item ${form.difficultIntubation ? 'flagged' : ''}`}>
                <input
                  type="checkbox"
                  checked={form.difficultIntubation}
                  onChange={e => set('difficultIntubation', e.target.checked)}
                />
                <div className="safety-item-content">
                  <strong>History of difficult intubation or difficult airway</strong>
                  <span> — prior cannot-intubate / cannot-ventilate, required awake fiberoptic, emergency surgical airway, or documented difficult laryngoscopy</span>
                </div>
              </label>
              <label className={`safety-item ${form.mhRisk ? 'flagged' : ''}`}>
                <input
                  type="checkbox"
                  checked={form.mhRisk}
                  onChange={e => set('mhRisk', e.target.checked)}
                />
                <div className="safety-item-content">
                  <strong>Malignant hyperthermia (MH) risk</strong>
                  <span> — personal or family history of MH, MH-like reaction, or unexpected death under anesthesia</span>
                </div>
              </label>
            </div>

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

        {/* ── STEP 2: Medications & Anesthesia History ─────────── */}
        {step === 2 && (
          <div className="step-content">
            <h3 className="step-title">Medications &amp; Anesthesia History</h3>
            <p className="step-note">Check medications anesthesia must be aware of. Warnings appear automatically.</p>

            <div className="med-grid">
              {MEDICATIONS.map(med => {
                const checked = form.medications.includes(med.key);
                const hasWarning = medWarnings.some(w => w.key === med.key ||
                  (med.key === 'warfarin' && w.key === 'anticoag') ||
                  (med.key === 'apixaban' && w.key === 'anticoag') ||
                  (med.key === 'rivaroxaban' && w.key === 'anticoag') ||
                  (med.key === 'dabigatran' && w.key === 'anticoag') ||
                  (med.key === 'heparin_enox' && w.key === 'anticoag'));
                return (
                  <label key={med.key} className={`med-item ${checked ? 'checked' : ''} ${hasWarning && checked ? 'has-warning' : ''}`}>
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleMed(med.key)}
                    />
                    <span>{med.label}</span>
                    {hasWarning && checked && <span className="med-flag">⚠</span>}
                  </label>
                );
              })}
            </div>

            {/* Medication warnings */}
            {medWarnings.length > 0 && (
              <div className="med-warnings-box">
                <div className="med-warnings-title">Medication Alerts — Action Required</div>
                {medWarnings.map(w => (
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

            <div className="form-group mt-4">
              <label>Other Medications (free text)</label>
              <textarea
                value={form.otherMedications}
                onChange={e => set('otherMedications', e.target.value)}
                rows={2}
                placeholder="List any other medications not shown above…"
              />
            </div>

            <div className="form-divider" />
            <h4 className="subsection-title">Allergies</h4>

            <div className="form-grid">
              <div className="form-group span-2">
                <label>Drug Allergies (list drug and reaction type)</label>
                <textarea
                  value={form.drugAllergies}
                  onChange={e => set('drugAllergies', e.target.value)}
                  rows={2}
                  placeholder="e.g., Penicillin — hives; Sulfa — rash; Codeine — nausea/vomiting; Morphine — anaphylaxis"
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
            <h4 className="subsection-title">Prior Anesthesia History</h4>

            <label className={`anes-hist-item ${form.ponvHistory ? 'checked' : ''}`}>
              <input
                type="checkbox"
                checked={form.ponvHistory}
                onChange={e => set('ponvHistory', e.target.checked)}
              />
              <span>Significant postoperative nausea / vomiting (PONV) history</span>
            </label>

            <div className="form-group mt-4">
              <label>Anesthesia problems or special notes (from prior records or patient report)</label>
              <textarea
                value={form.priorAnesProblems}
                onChange={e => set('priorAnesProblems', e.target.value)}
                rows={2}
                placeholder="e.g., 'Difficult mask ventilation 2019', 'Required awake fiberoptic intubation', 'Reaction to propofol', 'Family member died under anesthesia'"
              />
            </div>

            <div className="form-group">
              <label>Additional Notes for Anesthesiologist</label>
              <textarea
                value={form.notes}
                onChange={e => set('notes', e.target.value)}
                rows={2}
                placeholder="Difficult IV access, patient concerns, interpreter needed, etc."
              />
            </div>
          </div>
        )}

        {/* ── STEP 3: Available Studies ────────────────────────── */}
        {step === 3 && (
          <div className="step-content">
            <h3 className="step-title">Available Studies &amp; Clearances</h3>
            <p className="step-note">
              Check what is already in the chart. Missing <strong>required</strong> items are flagged.
            </p>

            {preopReqs.length === 0 ? (
              <div className="info-box">
                No specific pre-op requirements identified. Standard nursing pre-op protocol applies.
              </div>
            ) : (
              ['Labs', 'Tests', 'Clearances'].map(cat => {
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
                              {req.priority === 'required' && <span className="req-star"> *</span>}
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
              })
            )}

            {/* Key Lab Values */}
            <div className="form-divider" />
            <h4 className="subsection-title">Key Lab Values</h4>
            <p className="step-note small">Enter values for automatic critical-value flagging.</p>

            <div className="lab-values-grid">
              {[
                { key: 'hgb', label: 'Hemoglobin', unit: 'g/dL', placeholder: '12.5', step: '0.1', max: '25' },
                { key: 'kplus', label: 'Potassium (K+)', unit: 'mEq/L', placeholder: '4.2', step: '0.1', max: '10' },
                { key: 'creatinine', label: 'Creatinine', unit: 'mg/dL', placeholder: '1.1', step: '0.1', max: '30' },
                { key: 'inr', label: 'INR', unit: '', placeholder: '1.1', step: '0.01', max: '20' },
                { key: 'hba1c', label: 'HbA1c', unit: '%', placeholder: '7.2', step: '0.1', max: '20' },
              ].map(lv => (
                <div key={lv.key} className="lab-value-item">
                  <label>{lv.label} {lv.unit && <span className="lab-unit">{lv.unit}</span>}</label>
                  <input
                    type="number"
                    step={lv.step}
                    min="0"
                    max={lv.max}
                    value={form.labValues[lv.key]}
                    onChange={e => setLabValue(lv.key, e.target.value)}
                    placeholder={lv.placeholder}
                  />
                </div>
              ))}
            </div>

            {labAlerts.length > 0 && (
              <div className="lab-alerts-preview">
                {labAlerts.map(a => (
                  <div key={a.key} className={`lab-alert-preview severity-${a.severity}`}>
                    {SEVERITY_ICON[a.severity]} {a.text}
                  </div>
                ))}
              </div>
            )}

            <div className="intake-preview-box">
              <div className="preview-asa">
                <span>Final ASA Status:</span>
                <span className="asa-badge" style={{ background: ASA_COLORS[asaResult.level] }}>
                  ASA {asaResult.level}
                </span>
              </div>
              <div className={`preview-triage ${(needsEvaluation(asaResult, surgeryRisk) || form.difficultIntubation || form.mhRisk) ? 'needs-eval' : 'no-eval'}`}>
                {(needsEvaluation(asaResult, surgeryRisk) || form.difficultIntubation || form.mhRisk)
                  ? 'Anesthesiologist evaluation required'
                  : 'No anesthesiologist evaluation required'}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
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
            Save &amp; Generate Triage
          </button>
        )}
      </div>
    </div>
  );
}
