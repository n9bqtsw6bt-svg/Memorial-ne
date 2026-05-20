// ASA Physical Status Classification — based on ASA 2020 guidelines

export const CONDITION_GROUPS = [
  {
    system: 'Cardiovascular',
    conditions: [
      { key: 'well_controlled_htn', label: 'Hypertension — well controlled', asa: 2 },
      { key: 'poorly_controlled_htn', label: 'Hypertension — poorly controlled (>160/100)', asa: 3 },
      { key: 'well_controlled_hf', label: 'Heart failure / reduced EF 36–50%, compensated', asa: 3 },
      { key: 'moderate_ef', label: 'Reduced EF 26–35%', asa: 3 },
      { key: 'severe_ef', label: 'Severely reduced EF ≤25%', asa: 4 },
      { key: 'history_mi', label: 'Prior MI (>3 months ago)', asa: 3 },
      { key: 'recent_mi', label: 'Recent MI (<3 months ago)', asa: 4 },
      { key: 'history_cad', label: 'CAD / coronary stents, stable', asa: 3 },
      { key: 'ongoing_ischemia', label: 'Ongoing cardiac ischemia / unstable angina', asa: 4 },
      { key: 'moderate_valve', label: 'Moderate valvular dysfunction', asa: 3 },
      { key: 'severe_valve', label: 'Severe valvular dysfunction', asa: 4 },
      { key: 'pacemaker', label: 'Implanted pacemaker or ICD', asa: 3 },
      { key: 'arrhythmia_controlled', label: 'Arrhythmia — stable, rate controlled', asa: 2 },
      { key: 'pulmonary_htn', label: 'Pulmonary hypertension', asa: 3 },
    ],
  },
  {
    system: 'Pulmonary',
    conditions: [
      { key: 'smoker', label: 'Current smoker', asa: 2 },
      { key: 'mild_asthma', label: 'Mild asthma (no recent ER visits)', asa: 2 },
      { key: 'severe_asthma', label: 'Severe / uncontrolled asthma', asa: 3 },
      { key: 'mild_copd', label: 'Mild COPD (on inhalers, no exacerbations)', asa: 2 },
      { key: 'copd', label: 'Moderate–severe COPD', asa: 3 },
      { key: 'mild_osa', label: 'Mild–moderate obstructive sleep apnea', asa: 2 },
      { key: 'severe_osa', label: 'Severe OSA (on CPAP / BIPAP)', asa: 3 },
      { key: 'ards', label: 'Acute respiratory distress syndrome (ARDS)', asa: 4 },
    ],
  },
  {
    system: 'Metabolic / Endocrine',
    conditions: [
      { key: 'well_controlled_dm', label: 'Diabetes — well controlled (HbA1c ≤8%)', asa: 2 },
      { key: 'poorly_controlled_dm', label: 'Diabetes — poorly controlled (HbA1c >8%)', asa: 3 },
      { key: 'hypothyroidism', label: 'Controlled hypothyroidism', asa: 2 },
      { key: 'hyperthyroidism', label: 'Controlled hyperthyroidism', asa: 2 },
      { key: 'obesity', label: 'Obesity (BMI 30–40)', asa: 2 },
    ],
  },
  {
    system: 'Renal',
    conditions: [
      { key: 'mild_ckd', label: 'Mild CKD — GFR 60–90, stable', asa: 2 },
      { key: 'moderate_ckd', label: 'Moderate CKD — GFR 30–59, stable', asa: 2 },
      { key: 'severe_ckd', label: 'Severe CKD — GFR <30, not on dialysis', asa: 3 },
      { key: 'esrd_dialysis', label: 'ESRD on regular scheduled dialysis', asa: 3 },
      { key: 'esrd_no_dialysis', label: 'ESRD not on regular dialysis', asa: 4 },
    ],
  },
  {
    system: 'Hepatic',
    conditions: [
      { key: 'social_alcohol', label: 'Social alcohol use (not dependent)', asa: 2 },
      { key: 'alcohol_dependence', label: 'Alcohol dependence / abuse', asa: 3 },
      { key: 'active_hepatitis', label: 'Active hepatitis', asa: 3 },
      { key: 'cirrhosis', label: 'Hepatic cirrhosis (compensated)', asa: 3 },
    ],
  },
  {
    system: 'Hematologic',
    conditions: [
      { key: 'anticoagulation', label: 'On anticoagulation (warfarin, NOAC, heparin)', asa: 2 },
      { key: 'antiplatelet', label: 'On antiplatelet therapy (aspirin, Plavix, Brilinta)', asa: 2 },
      { key: 'mild_anemia', label: 'Mild anemia (Hgb 9–11)', asa: 2 },
      { key: 'severe_anemia', label: 'Severe anemia (Hgb <8)', asa: 3 },
      { key: 'dic', label: 'Disseminated intravascular coagulation (DIC)', asa: 4 },
    ],
  },
  {
    system: 'Neurological',
    conditions: [
      { key: 'stable_neuro', label: 'Stable neurological condition (seizure d/o, Parkinson\'s, MS)', asa: 2 },
      { key: 'history_cva', label: 'Prior CVA / TIA (>3 months ago)', asa: 3 },
      { key: 'recent_cva', label: 'Recent CVA / TIA (<3 months ago)', asa: 4 },
    ],
  },
  {
    system: 'Other',
    conditions: [
      { key: 'pregnancy', label: 'Pregnancy', asa: 2 },
      { key: 'active_chemo', label: 'Active chemotherapy / immunosuppression', asa: 3 },
      { key: 'chronic_pain_opioids', label: 'Chronic pain on opioids', asa: 2 },
      { key: 'controlled_psych', label: 'Controlled depression / anxiety on medication', asa: 2 },
      { key: 'sepsis', label: 'Active sepsis / septic shock', asa: 4 },
    ],
  },
];

export const ALL_CONDITIONS = CONDITION_GROUPS.flatMap(g => g.conditions);

export const SURGERY_TYPES = [
  // Low risk (<1% MACE)
  { label: 'Cataract / Eye Surgery', risk: 'low' },
  { label: 'Skin / Superficial Procedure', risk: 'low' },
  { label: 'Breast Surgery', risk: 'low' },
  { label: 'Endoscopy / Colonoscopy', risk: 'low' },
  { label: 'Dental Procedure Under Anesthesia', risk: 'low' },
  // Intermediate risk (1–5% MACE)
  { label: 'Abdominal Surgery', risk: 'intermediate' },
  { label: 'Laparoscopic Surgery', risk: 'intermediate' },
  { label: 'Hip or Knee Replacement', risk: 'intermediate' },
  { label: 'Spine Surgery', risk: 'intermediate' },
  { label: 'ENT / Head and Neck Surgery', risk: 'intermediate' },
  { label: 'Urological Surgery', risk: 'intermediate' },
  { label: 'Thoracic Surgery (non-cardiac)', risk: 'intermediate' },
  { label: 'Gynecological Surgery', risk: 'intermediate' },
  { label: 'Carotid Endarterectomy', risk: 'intermediate' },
  { label: 'Neurosurgery (elective)', risk: 'intermediate' },
  // High risk (>5% MACE)
  { label: 'Major Vascular (aortic, peripheral)', risk: 'high' },
  { label: 'Cardiac Surgery', risk: 'high' },
  { label: 'Major GI / Hepatic / Pancreatic Surgery', risk: 'high' },
  { label: 'Liver or Kidney Transplant', risk: 'high' },
  { label: 'Emergency Surgery', risk: 'high' },
];

export function calcBMI(weightLbs, heightFt, heightIn) {
  const totalInches = (parseFloat(heightFt) || 0) * 12 + (parseFloat(heightIn) || 0);
  const weightKg = (parseFloat(weightLbs) || 0) * 0.453592;
  const heightM = totalInches * 0.0254;
  if (!totalInches || !weightKg) return null;
  return weightKg / (heightM * heightM);
}

export function calculateASA(patientData) {
  const { conditions = [], bmi, age } = patientData;

  let level = 1;
  const factors = [];

  conditions.forEach(key => {
    const cond = ALL_CONDITIONS.find(c => c.key === key);
    if (!cond) return;
    if (cond.asa > level) level = cond.asa;
    factors.push(cond);
  });

  // BMI-based (morbid obesity not already checked)
  if (bmi !== null && bmi !== undefined) {
    if (bmi >= 40 && !conditions.includes('morbid_obesity')) {
      const existing = factors.find(f => f.key === 'obesity' || f.key === 'morbid_obesity');
      if (!existing) {
        if (level < 3) level = 3;
        factors.push({ key: 'bmi_morbid', label: `Morbid obesity (BMI ${bmi.toFixed(1)} ≥ 40)`, asa: 3 });
      } else if (existing.asa < 3) {
        existing.label = `Morbid obesity (BMI ${bmi.toFixed(1)} ≥ 40)`;
        existing.asa = 3;
        if (level < 3) level = 3;
      }
    } else if (bmi >= 30 && bmi < 40 && !conditions.includes('obesity')) {
      if (level < 2) level = 2;
      factors.push({ key: 'bmi_obese', label: `Obesity (BMI ${bmi.toFixed(1)})`, asa: 2 });
    }
  }

  // Age
  if ((parseInt(age) || 0) >= 70 && level < 2) {
    level = 2;
    factors.push({ key: 'age_elderly', label: `Age ${age} ≥ 70`, asa: 2 });
  }

  return {
    level,
    factors: factors.slice().sort((a, b) => b.asa - a.asa),
  };
}

export function needsEvaluation(asaResult, surgeryRisk) {
  if (asaResult.level >= 3) return true;
  if (asaResult.level <= 2 && surgeryRisk === 'high') return true;
  return false;
}

export const ASA_DESCRIPTIONS = {
  1: 'Normal healthy patient. No organic, physiologic, or psychiatric disturbance.',
  2: 'Patient with mild systemic disease. No substantive functional limitations.',
  3: 'Patient with severe systemic disease. Substantive functional limitations; one or more moderate-to-severe diseases.',
  4: 'Patient with severe systemic disease that is a constant threat to life.',
  5: 'Moribund patient not expected to survive without the operation.',
};

export const ASA_COLORS = {
  1: '#27ae60',
  2: '#2980b9',
  3: '#e67e22',
  4: '#c0392b',
};
