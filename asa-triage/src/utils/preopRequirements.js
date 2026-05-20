// Pre-operative requirements per ASA Practice Advisory (2012) and ACC/AHA Perioperative Guidelines

export const AVAILABLE_ITEMS_SCHEMA = {
  labs: [
    { key: 'cbc', label: 'CBC (Complete Blood Count)' },
    { key: 'bmp', label: 'BMP (Basic Metabolic Panel)' },
    { key: 'lfts', label: 'LFTs (Liver Function Tests)' },
    { key: 'coag', label: 'Coagulation Studies (PT/INR, PTT)' },
    { key: 'hba1c', label: 'HbA1c' },
    { key: 'glucose', label: 'Fasting Glucose' },
    { key: 'type_screen', label: 'Type & Screen' },
  ],
  tests: [
    { key: 'ekg', label: 'EKG (12-lead)' },
    { key: 'echo', label: 'Echocardiogram (within 12 months)' },
    { key: 'stress_test', label: 'Stress Test / Myocardial Perfusion Imaging' },
    { key: 'pfts', label: 'Pulmonary Function Tests (PFTs)' },
    { key: 'cxr', label: 'Chest X-Ray' },
    { key: 'pacemaker_check', label: 'Pacemaker / ICD Interrogation (within 6 months)' },
  ],
  clearances: [
    { key: 'cardiology', label: 'Cardiology Clearance / Consultation' },
    { key: 'pulmonology', label: 'Pulmonology Clearance / Consultation' },
    { key: 'endocrine', label: 'Endocrinology Clearance / Consultation' },
    { key: 'nephrology', label: 'Nephrology Clearance (last dialysis date if applicable)' },
    { key: 'hepatology', label: 'Hepatology / GI Clearance' },
    { key: 'hematology', label: 'Hematology Clearance' },
    { key: 'anticoag_plan', label: 'Anticoagulation Management Plan (bridging / hold strategy)' },
  ],
};

export function getPreopRequirements(conditions, surgeryRisk, asaLevel, functionalStatus) {
  const reqs = [];
  const added = new Set();

  function add(key, label, category, reason, priority = 'required') {
    if (added.has(key)) return;
    added.add(key);
    reqs.push({ key, label, category, reason, priority });
  }

  // Standard ASA 3+ workup
  if (asaLevel >= 3) {
    add('cbc', 'CBC', 'Labs', 'Standard pre-op screen for ASA ≥3');
    add('bmp', 'BMP', 'Labs', 'Electrolytes and renal function for ASA ≥3');
    add('ekg', 'EKG (12-lead)', 'Tests', 'Cardiac baseline for ASA ≥3');
  } else if (asaLevel === 2) {
    add('cbc', 'CBC', 'Labs', 'Recommended for ASA 2', 'recommended');
    add('bmp', 'BMP', 'Labs', 'Recommended for ASA 2', 'recommended');
  }

  // High-risk surgery extras
  if (surgeryRisk === 'high') {
    add('cbc', 'CBC', 'Labs', 'Baseline Hgb for major surgery');
    add('bmp', 'BMP', 'Labs', 'Metabolic baseline for high-risk surgery');
    add('coag', 'Coagulation Studies (PT/INR, PTT)', 'Labs', 'High-risk surgery coagulation baseline');
    add('type_screen', 'Type & Screen', 'Labs', 'Blood product preparation for major surgery');
    add('ekg', 'EKG (12-lead)', 'Tests', 'Cardiac baseline for high-risk surgery');
    add('cardiology', 'Cardiology Risk Assessment', 'Clearances',
      'ACC/AHA perioperative cardiac risk evaluation required for high-risk surgery');
  }

  // ── Functional Status ────────────────────────────────────────
  // Per ACC/AHA: if <4 METs + intermediate/high-risk surgery + cardiac conditions → stress test
  const cardiacCondsPresentForStress = [
    'history_mi', 'history_cad', 'moderate_ef', 'well_controlled_hf',
    'moderate_valve', 'poorly_controlled_htn', 'well_controlled_htn',
  ];
  const poorFunctionalStatus = functionalStatus === '<4' || functionalStatus === 'sedentary';
  const intermediateOrHighRisk = surgeryRisk === 'intermediate' || surgeryRisk === 'high';
  if (poorFunctionalStatus && intermediateOrHighRisk &&
      cardiacCondsPresentForStress.some(c => conditions.includes(c))) {
    add('stress_test', 'Stress Test / Myocardial Perfusion Imaging', 'Tests',
      'Functional capacity <4 METs + cardiac conditions + intermediate/high-risk surgery (ACC/AHA Class IIa)');
  }

  // ── Cardiovascular ──────────────────────────────────────────────
  const cardiacConds = [
    'history_mi', 'recent_mi', 'history_cad', 'ongoing_ischemia',
    'moderate_ef', 'severe_ef', 'well_controlled_hf',
    'severe_valve', 'moderate_valve',
    'pulmonary_htn', 'well_controlled_htn', 'poorly_controlled_htn',
    'arrhythmia_controlled',
  ];
  if (cardiacConds.some(c => conditions.includes(c))) {
    add('ekg', 'EKG (12-lead)', 'Tests', 'Cardiac condition present');
    add('echo', 'Echocardiogram', 'Tests', 'Assess cardiac function / ejection fraction');
    add('cardiology', 'Cardiology Clearance', 'Clearances', 'Cardiac optimization before surgery');
  }

  if (conditions.includes('recent_mi') || conditions.includes('ongoing_ischemia')) {
    add('cardiology', 'Cardiology Clearance — URGENT', 'Clearances',
      'Recent MI or active ischemia: surgery should be deferred until cleared');
    add('echo', 'Echocardiogram', 'Tests', 'Assess current LV function after recent event');
  }

  if (conditions.includes('poorly_controlled_htn')) {
    add('bmp', 'BMP', 'Labs', 'Electrolytes and renal function in uncontrolled HTN');
    add('ekg', 'EKG', 'Tests', 'LVH / cardiac effects of uncontrolled HTN');
    add('cardiology', 'Cardiology Clearance', 'Clearances', 'BP optimization required pre-operatively');
  }

  if (conditions.includes('pacemaker')) {
    add('pacemaker_check', 'Pacemaker / ICD Interrogation', 'Tests',
      'Device check within 6 months required; perioperative programming plan');
    add('ekg', 'EKG (12-lead)', 'Tests', 'Baseline rhythm with device');
    add('cardiology', 'Cardiology Clearance', 'Clearances',
      'Device management and EMI plan for OR');
  }

  // ── Pulmonary ────────────────────────────────────────────────────
  if (conditions.includes('copd') || conditions.includes('severe_asthma')) {
    add('pfts', 'Pulmonary Function Tests', 'Tests', 'Quantify degree of obstruction / restriction');
    add('cxr', 'Chest X-Ray', 'Tests', 'Baseline chest imaging');
    add('pulmonology', 'Pulmonology Clearance', 'Clearances',
      'Pulmonary optimization and perioperative inhaler/steroid plan');
  }

  if (conditions.includes('pulmonary_htn')) {
    add('echo', 'Echocardiogram', 'Tests', 'Assess RV function and pulmonary pressures (RVSP)');
    add('pulmonology', 'Pulmonology Clearance', 'Clearances',
      'Pulmonary hypertension — high-risk: specialist input required');
    add('cardiology', 'Cardiology Clearance', 'Clearances',
      'RV function and perioperative hemodynamic management plan');
  }

  if (conditions.includes('severe_osa')) {
    add('pulmonology', 'Pulmonology Clearance', 'Clearances',
      'Severe OSA — perioperative CPAP plan, extubation strategy');
  }

  // ── Diabetes ─────────────────────────────────────────────────────
  if (conditions.includes('well_controlled_dm') || conditions.includes('poorly_controlled_dm')) {
    add('hba1c', 'HbA1c', 'Labs', 'Glycemic control (target <8% for elective surgery)');
    add('glucose', 'Fasting Glucose', 'Labs', 'Day-of-surgery glucose baseline');
    add('bmp', 'BMP', 'Labs', 'Renal function — diabetic nephropathy screen');
  }
  if (conditions.includes('poorly_controlled_dm')) {
    add('endocrine', 'Endocrinology Clearance', 'Clearances',
      'Poorly controlled DM: HbA1c >8% — optimization required before elective surgery');
  }

  // ── Renal ────────────────────────────────────────────────────────
  if (['moderate_ckd', 'severe_ckd', 'esrd_dialysis', 'esrd_no_dialysis'].some(c => conditions.includes(c))) {
    add('bmp', 'BMP with creatinine / GFR', 'Labs', 'Renal function and electrolytes');
  }
  if (conditions.includes('esrd_dialysis')) {
    add('nephrology', 'Nephrology Clearance — confirm last dialysis date + K+', 'Clearances',
      'ESRD: recent dialysis, electrolytes, volume status, AVF/graft plan');
  }
  if (conditions.includes('esrd_no_dialysis')) {
    add('nephrology', 'Nephrology Clearance — URGENT', 'Clearances',
      'ESRD not on dialysis — ASA 4 condition; urgent nephrology required');
  }

  // ── Hepatic ──────────────────────────────────────────────────────
  if (['active_hepatitis', 'cirrhosis', 'alcohol_dependence'].some(c => conditions.includes(c))) {
    add('lfts', 'LFTs (Liver Function Tests)', 'Labs', 'Hepatic synthetic function assessment');
    add('coag', 'Coagulation Studies (PT/INR, PTT)', 'Labs',
      'Hepatic coagulopathy — factor synthesis impaired in liver disease');
    add('cbc', 'CBC', 'Labs', 'Thrombocytopenia from portal hypertension / hypersplenism');
  }
  if (conditions.includes('active_hepatitis') || conditions.includes('cirrhosis')) {
    add('hepatology', 'Hepatology / GI Clearance', 'Clearances',
      'Liver disease — MELD score, encephalopathy risk, variceal status');
  }

  // ── Hematologic ──────────────────────────────────────────────────
  if (conditions.includes('anticoagulation')) {
    add('coag', 'Coagulation Studies (PT/INR, PTT)', 'Labs',
      'Anticoagulation level before procedure');
    add('anticoag_plan', 'Anticoagulation Management Plan', 'Clearances',
      'Bridging / hold strategy — coordinate with prescribing physician');
  }
  if (conditions.includes('antiplatelet')) {
    add('anticoag_plan', 'Antiplatelet Management Plan', 'Clearances',
      'Hold vs. continue decision — aspirin vs. P2Y12 inhibitors differ by indication');
  }
  if (conditions.includes('severe_anemia')) {
    add('cbc', 'CBC with differential', 'Labs', 'Severe anemia — confirm severity and etiology');
    add('hematology', 'Hematology Clearance', 'Clearances',
      'Severe anemia: optimize Hgb before elective surgery (consider iron/EPO/transfusion)');
  }
  if (conditions.includes('mild_anemia')) {
    add('cbc', 'CBC', 'Labs', 'Anemia baseline and trend', 'recommended');
  }
  if (conditions.includes('dic')) {
    add('coag', 'Coagulation Studies — STAT (fibrinogen, D-dimer, PT/INR, PTT)', 'Labs',
      'DIC — active coagulopathy');
    add('cbc', 'CBC — STAT', 'Labs', 'Platelet count in DIC');
    add('hematology', 'Hematology Clearance — URGENT', 'Clearances',
      'DIC is ASA 4 — urgent hematology consultation required');
  }

  return reqs;
}

export function getMedicationWarnings(medications = []) {
  const warnings = [];

  if (medications.includes('maoi')) {
    warnings.push({
      key: 'maoi',
      severity: 'critical',
      med: 'MAOI Antidepressant',
      text: 'Life-threatening interactions with opioids (serotonin syndrome) and meperidine (hypertensive crisis). Usually requires 2-week washout before elective surgery.',
      action: 'Notify anesthesiologist IMMEDIATELY. Do not schedule without anesthesiologist awareness.',
    });
  }

  if (medications.includes('sglt2')) {
    warnings.push({
      key: 'sglt2',
      severity: 'high',
      med: 'SGLT-2 Inhibitor',
      text: 'Must be held 3 days before surgery. Risk of euglycemic DKA — can occur even with normal blood glucose.',
      action: 'Confirm medication hold is documented. Notify prescribing physician.',
    });
  }

  if (medications.includes('glp1')) {
    warnings.push({
      key: 'glp1',
      severity: 'high',
      med: 'GLP-1 Agonist (Ozempic / Wegovy / Mounjaro)',
      text: 'Hold 1 week before surgery (ADA 2023). Causes delayed gastric emptying — aspiration risk persists even with standard NPO. Extended NPO or altered anesthetic approach may be required.',
      action: 'Alert anesthesiologist. Confirm hold. Patient may need upper GI ultrasound to confirm empty stomach.',
    });
  }

  if (['warfarin', 'apixaban', 'rivaroxaban', 'dabigatran', 'heparin_enox'].some(m => medications.includes(m))) {
    warnings.push({
      key: 'anticoag',
      severity: 'moderate',
      med: 'Anticoagulation',
      text: 'Perioperative management plan required. Bridging vs. hold strategy depends on thromboembolic risk and surgical bleeding risk.',
      action: 'Anticoagulation plan must be documented in chart before surgery.',
    });
  }

  if (medications.includes('steroids')) {
    warnings.push({
      key: 'steroids',
      severity: 'moderate',
      med: 'Chronic Steroids',
      text: 'Adrenal suppression possible after >3 weeks of systemic steroids. Stress dose steroids may be required perioperatively.',
      action: 'Confirm stress dose steroid protocol with anesthesiologist and prescribing physician.',
    });
  }

  if (medications.includes('lithium')) {
    warnings.push({
      key: 'lithium',
      severity: 'moderate',
      med: 'Lithium',
      text: 'Narrow therapeutic index. NSAIDs increase toxicity. Renal function affects clearance. Typically hold morning of surgery.',
      action: 'Check lithium level and creatinine. Confirm perioperative plan with psychiatry.',
    });
  }

  if (medications.includes('metformin')) {
    warnings.push({
      key: 'metformin',
      severity: 'low',
      med: 'Metformin',
      text: 'Hold day of surgery if GFR <60 or if iodinated contrast will be used. Risk of lactic acidosis.',
      action: 'Check creatinine/GFR. Hold if indicated.',
    });
  }

  if (medications.includes('cpap')) {
    warnings.push({
      key: 'cpap',
      severity: 'info',
      med: 'CPAP / BiPAP User',
      text: 'Patient uses home positive airway pressure therapy.',
      action: 'Confirm patient will bring machine to hospital. Document OSA management plan.',
    });
  }

  return warnings;
}

export function getLabAlerts(labValues = {}) {
  const alerts = [];

  const hgb = parseFloat(labValues.hgb);
  if (!isNaN(hgb)) {
    if (hgb < 7)
      alerts.push({ key: 'hgb_critical', severity: 'critical', text: `Hgb ${hgb} g/dL — Critical anemia. Elective surgery should be deferred. Anesthesiologist notification required.` });
    else if (hgb < 8)
      alerts.push({ key: 'hgb_severe', severity: 'high', text: `Hgb ${hgb} g/dL — Severe anemia. Pre-operative optimization strongly recommended. Discuss transfusion threshold with surgical team.` });
    else if (hgb < 10)
      alerts.push({ key: 'hgb_moderate', severity: 'moderate', text: `Hgb ${hgb} g/dL — Moderate anemia. Consider pre-operative optimization and blood product availability.` });
  }

  const kplus = parseFloat(labValues.kplus);
  if (!isNaN(kplus)) {
    if (kplus >= 6.0)
      alerts.push({ key: 'k_critical', severity: 'critical', text: `K+ ${kplus} mEq/L — Critical hyperkalemia. Defer elective surgery. Urgent nephrology consultation.` });
    else if (kplus > 5.5)
      alerts.push({ key: 'k_high', severity: 'high', text: `K+ ${kplus} mEq/L — Hyperkalemia. Postpone elective surgery until corrected. Cardiac arrhythmia risk.` });
    else if (kplus < 3.0)
      alerts.push({ key: 'k_low', severity: 'high', text: `K+ ${kplus} mEq/L — Significant hypokalemia. Correct before surgery. Arrhythmia risk with anesthetic agents.` });
    else if (kplus < 3.5)
      alerts.push({ key: 'k_low_mod', severity: 'moderate', text: `K+ ${kplus} mEq/L — Mild hypokalemia. Consider potassium supplementation. Discuss with team.` });
  }

  const cr = parseFloat(labValues.creatinine);
  if (!isNaN(cr)) {
    if (cr > 3.0)
      alerts.push({ key: 'cr_critical', severity: 'high', text: `Creatinine ${cr} mg/dL — Severe renal impairment. Anesthetic drug dosing must be adjusted. Nephrology input required.` });
    else if (cr > 2.0)
      alerts.push({ key: 'cr_high', severity: 'moderate', text: `Creatinine ${cr} mg/dL — Significant renal impairment. Adjust anesthetic drug selection.` });
  }

  const inr = parseFloat(labValues.inr);
  if (!isNaN(inr)) {
    if (inr > 2.0)
      alerts.push({ key: 'inr_high', severity: 'high', text: `INR ${inr} — Significantly elevated. Contraindication to neuraxial/regional anesthesia. Coagulopathy must be addressed.` });
    else if (inr > 1.5)
      alerts.push({ key: 'inr_mod', severity: 'moderate', text: `INR ${inr} — Mildly elevated. Caution with neuraxial anesthesia. Discuss with anesthesiologist.` });
  }

  const hba1c = parseFloat(labValues.hba1c);
  if (!isNaN(hba1c)) {
    if (hba1c > 9)
      alerts.push({ key: 'hba1c_high', severity: 'high', text: `HbA1c ${hba1c}% — Poorly controlled diabetes. Consider delaying elective surgery for glycemic optimization. Endocrinology consultation strongly recommended.` });
    else if (hba1c > 8)
      alerts.push({ key: 'hba1c_mod', severity: 'moderate', text: `HbA1c ${hba1c}% — Suboptimal glycemic control. Perioperative glucose management plan required.` });
  }

  return alerts;
}

export function getMissingItems(requirements, availableItems) {
  return requirements.filter(r => !availableItems[r.key]);
}

export function isReadyForEvaluation(requirements, availableItems) {
  return requirements.filter(r => r.priority === 'required').every(r => availableItems[r.key]);
}
