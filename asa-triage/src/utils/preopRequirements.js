// Pre-operative requirements per ASA Practice Advisory (2012, updated guidelines)
// and ACC/AHA Perioperative Cardiovascular Evaluation Guidelines

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

export function getPreopRequirements(conditions, surgeryRisk, asaLevel) {
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
    add('stress_test', 'Stress Test / Cardiac Imaging', 'Tests',
      'Functional capacity assessment — consider if planned surgery is elective');
  }

  if (conditions.includes('poorly_controlled_htn')) {
    add('bmp', 'BMP', 'Labs', 'Electrolytes and renal function in uncontrolled HTN');
    add('ekg', 'EKG', 'Tests', 'LVH / cardiac effects of uncontrolled HTN');
    add('cardiology', 'Cardiology Clearance', 'Clearances', 'BP optimization required pre-operatively');
  }

  if (conditions.includes('pacemaker')) {
    add('pacemaker_check', 'Pacemaker / ICD Interrogation', 'Tests',
      'Device check within 6 months required; perioperative programming plan');
    add('ekg', 'EKG (12-lead)', 'Tests', 'Baseline with device');
    add('cardiology', 'Cardiology Clearance', 'Clearances',
      'Device management and programming plan for surgery/EMI exposure');
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
      'Pulmonary hypertension — high-risk situation requiring specialist input');
    add('cardiology', 'Cardiology Clearance', 'Clearances',
      'RV function and perioperative hemodynamic management plan');
  }

  if (conditions.includes('severe_osa')) {
    add('pulmonology', 'Pulmonology Clearance', 'Clearances',
      'Severe OSA — perioperative CPAP plan, extubation strategy');
  }

  // ── Diabetes ─────────────────────────────────────────────────────
  if (conditions.includes('well_controlled_dm') || conditions.includes('poorly_controlled_dm')) {
    add('hba1c', 'HbA1c', 'Labs', 'Glycemic control assessment (target <8% for elective surgery)');
    add('glucose', 'Fasting Glucose', 'Labs', 'Day-of-surgery glucose baseline');
    add('bmp', 'BMP', 'Labs', 'Renal function — diabetes-related nephropathy screen');
  }
  if (conditions.includes('poorly_controlled_dm')) {
    add('endocrine', 'Endocrinology Clearance', 'Clearances',
      'Poorly controlled DM: optimization required; HbA1c >8% increases surgical risk');
  }

  // ── Renal ────────────────────────────────────────────────────────
  if (['moderate_ckd', 'severe_ckd', 'esrd_dialysis', 'esrd_no_dialysis'].some(c => conditions.includes(c))) {
    add('bmp', 'BMP with creatinine / GFR', 'Labs', 'Renal function and electrolytes');
  }
  if (conditions.includes('esrd_dialysis')) {
    add('nephrology', 'Nephrology Clearance — last dialysis date', 'Clearances',
      'ESRD: confirm recent dialysis, K+ level, volume status, AVF/graft plan');
  }
  if (conditions.includes('esrd_no_dialysis')) {
    add('nephrology', 'Nephrology Clearance — URGENT', 'Clearances',
      'ESRD not on dialysis — ASA 4 condition; urgent nephrology involvement required');
  }

  // ── Hepatic ──────────────────────────────────────────────────────
  if (['active_hepatitis', 'cirrhosis', 'alcohol_dependence'].some(c => conditions.includes(c))) {
    add('lfts', 'LFTs (Liver Function Tests)', 'Labs', 'Hepatic synthetic function assessment');
    add('coag', 'Coagulation Studies (PT/INR, PTT)', 'Labs',
      'Hepatic coagulopathy — coagulation factor synthesis impaired');
    add('cbc', 'CBC', 'Labs', 'Thrombocytopenia from portal hypertension / hypersplenism');
  }
  if (conditions.includes('active_hepatitis') || conditions.includes('cirrhosis')) {
    add('hepatology', 'Hepatology / GI Clearance', 'Clearances',
      'Liver disease — MELD score, encephalopathy risk, variceal status');
  }

  // ── Hematologic ──────────────────────────────────────────────────
  if (conditions.includes('anticoagulation')) {
    add('coag', 'Coagulation Studies (PT/INR, PTT)', 'Labs',
      'Anticoagulation level and baseline before procedure');
    add('anticoag_plan', 'Anticoagulation Management Plan', 'Clearances',
      'Bridging / hold strategy and restart timing — coordinate with prescribing physician');
  }
  if (conditions.includes('antiplatelet')) {
    add('anticoag_plan', 'Antiplatelet Management Plan', 'Clearances',
      'Hold vs. continue strategy (aspirin vs. P2Y12 inhibitors differs by indication)');
  }
  if (conditions.includes('severe_anemia')) {
    add('cbc', 'CBC with differential', 'Labs', 'Severe anemia workup and severity confirmation');
    add('hematology', 'Hematology Clearance', 'Clearances',
      'Severe anemia: etiology workup, transfusion threshold, iron/EPO optimization');
  }
  if (conditions.includes('mild_anemia')) {
    add('cbc', 'CBC', 'Labs', 'Anemia baseline and trend', 'recommended');
  }
  if (conditions.includes('dic')) {
    add('coag', 'Coagulation Studies — STAT', 'Labs', 'DIC: fibrinogen, D-dimer, PT/INR, PTT');
    add('cbc', 'CBC — STAT', 'Labs', 'Platelet count in DIC');
    add('hematology', 'Hematology Clearance — URGENT', 'Clearances',
      'DIC is ASA 4 — urgent hematology consultation required');
  }

  return reqs;
}

export function getMissingItems(requirements, availableItems) {
  return requirements.filter(req => !availableItems[req.key]);
}

export function isReadyForEvaluation(requirements, availableItems) {
  const required = requirements.filter(r => r.priority === 'required');
  return required.every(r => availableItems[r.key]);
}
