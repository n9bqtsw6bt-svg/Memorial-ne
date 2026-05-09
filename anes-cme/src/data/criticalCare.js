export const flashcards = [
  {
    id: 'cc-fc-001',
    topic: 'criticalCare',
    category: 'Malignant Hyperthermia',
    front: 'Malignant Hyperthermia — Triggers, Pathophysiology & Early Signs',
    back: `PATHOPHYSIOLOGY:
MH is a pharmacogenetic disorder of skeletal muscle calcium regulation. Triggering agents → uncontrolled release of Ca²⁺ from sarcoplasmic reticulum via mutant RYR1 (ryanodine receptor) → sustained muscle contraction → hypermetabolic state

TRIGGERS:
✓ ALL halogenated volatile agents: sevoflurane, desflurane, isoflurane, halothane, enflurane
✓ Succinylcholine
✗ Safe: ALL IV agents (propofol, ketamine, etomidate, opioids, benzodiazepines, NDBs, N₂O, ALL local anesthetics)

EARLY SIGNS (before temperature rise):
1. ↑ EtCO₂ despite adequate ventilation (MOST SENSITIVE EARLY SIGN)
2. Tachycardia (unexplained, often first sign)
3. Masseter muscle rigidity (MMR) after succinylcholine — highly specific
4. Muscle rigidity (generalized)
5. Mottled skin, sweating

LATE SIGNS:
• Hyperthermia (>38.8°C and rising — "hot" is a late sign; don't wait for it)
• Myoglobinuria (dark/cola-colored urine)
• Hyperkalemia (from muscle breakdown)
• Metabolic/respiratory acidosis
• DIC, coagulopathy
• Cardiac arrest

KEY PEARL: MH is a CLINICAL diagnosis. Don't wait for laboratory results. Act on clinical suspicion.`,
  },
  {
    id: 'cc-fc-002',
    topic: 'criticalCare',
    category: 'Malignant Hyperthermia',
    front: 'Malignant Hyperthermia — Treatment Protocol (MHAUS)',
    back: `IMMEDIATE ACTIONS (do simultaneously with help):
1. CALL FOR HELP — call MHAUS hotline: 1-800-MH-HYPER (1-800-644-9737)
2. STOP triggering agents: turn OFF vaporizer, STOP succinylcholine infusion
3. HYPERVENTILATE: 100% O₂ at 10 L/min fresh gas flow (flush volatile from circuit)
   — Do NOT waste time changing circuit; flush with high FGF first
4. DANTROLENE: 2.5 mg/kg IV bolus STAT; repeat every 5 min until EtCO₂ normalizes or max 10 mg/kg
   (Dantrolene 20 mg vials — need large volume of sterile water; start mixing immediately)
5. DISCONTINUE surgery if possible, or proceed with TIVA if life-threatening

SUPPORTIVE TREATMENT:
• Active cooling: ice packs (axillae, groin, neck), cold saline infusion (0.9% NS 15 mL/kg IV, cold), lavage (NG, bladder, rectal)
• Stop cooling when temperature < 38°C (prevent hypothermia)
• Sodium bicarbonate 1–2 mEq/kg for metabolic acidosis
• Glucose + insulin (hyperkalemia)
• Calcium chloride/gluconate for hemodynamically significant hyperkalemia
• Maintain urine output > 1–2 mL/kg/h (Foley, aggressive IVF — myoglobin clearance)
• Treat arrhythmias: amiodarone (avoid calcium channel blockers — interact with dantrolene → hyperkalemia)

DANTROLENE POST-CRISIS:
• Continue 1 mg/kg IV q6h × 24–48 h (prevent recrudescence)
• ICU admission — recurrence rate ~20% if undertreated

DANTROLENE MECHANISM: Inhibits RYR1 calcium release from SR → skeletal muscle relaxation
REMEMBER: 36 vials of dantrolene required for a full 10 mg/kg dose in average adult — prepare enough!`,
  },
  {
    id: 'cc-fc-003',
    topic: 'criticalCare',
    category: 'Anaphylaxis',
    front: 'Anaphylaxis in the OR — Recognition & Treatment',
    back: `COMMON TRIGGERS (perioperative):
• Antibiotics (cephalosporins, penicillins) — most common
• Neuromuscular blockers (especially rocuronium, succinylcholine)
• Latex (latex-free ORs mitigate this)
• Colloids (gelatin, dextran)
• Chlorhexidine (common in surgical prep)
• Protamine (after heparin reversal)
• Blood products

CLINICAL RECOGNITION:
Grade I: Cutaneous only (urticaria, erythema, angioedema)
Grade II: Moderate multisystem (mild hypotension, tachycardia, bronchospasm)
Grade III: Severe (cardiovascular collapse, severe bronchospasm, life-threatening)
Grade IV: Cardiac arrest

PERIOPERATIVE CHALLENGE: Signs may be occult (draped patient — can't see skin; bronchospasm masked by muscle relaxation; hypotension attributed to anesthesia)

TREATMENT:
1. EPINEPHRINE FIRST — always:
   • Grade II–III: 10–100 mcg IV bolus (titrate), repeat as needed; OR 0.3 mg IM (lateral thigh)
   • Grade IV (arrest): 1 mg IV per ACLS + LIPID EMULSION if LA was involved
   • Infusion: start 0.05–0.1 mcg/kg/min if bolus insufficient
2. Remove/stop trigger
3. 100% O₂, maintain/secure airway
4. IV fluid: 1,000–2,000 mL crystalloid rapid bolus
5. ADJUNCTS (NOT first-line):
   • Diphenhydramine 25–50 mg IV (H1 blocker)
   • Ranitidine 50 mg or famotidine (H2 blocker)
   • Hydrocortisone 200 mg IV (prevents biphasic reaction)
6. Observe 6–24 h (biphasic anaphylaxis occurs in ~1–20% of cases)

BIPHASIC ANAPHYLAXIS: Recurrence 1–72 h after apparent resolution (usually 8–10 h)`,
  },
  {
    id: 'cc-fc-004',
    topic: 'criticalCare',
    category: 'Cardiac Arrest',
    front: 'Cardiac Arrest in the OR — Modified ACLS & Reversible Causes',
    back: `OR CARDIAC ARREST IS DIFFERENT from community arrest:
• Witnessed, immediately recognized
• Airway usually controlled (already intubated or easily secured)
• Most causes are REVERSIBLE
• Do NOT assume VF/VT — often PEA or asystole

REVERSIBLE CAUSES: Hs AND Ts
H — Hypovolemia (most common intra-op!) → aggressive fluid/blood resuscitation
H — Hypoxia → confirm ETT position, 100% O₂, check SpO₂
H — Hydrogen ion (acidosis) → bicarb, treat cause
H — Hyperkalemia → calcium, insulin/glucose, bicarb, albuterol
H — Hypothermia → active rewarming
T — Tension pneumothorax → needle decompression
T — Tamponade → pericardiocentesis, emergent sternotomy
T — Toxins (anesthetics, LA, hyperkalemia from succinylcholine, protamine reaction)
T — Thrombosis (PE, AMI) → thrombolytics/PCI/ECMO

MODIFICATIONS TO STANDARD ACLS:
• Ventilation: already controlled — ensure 100% O₂, no hyperventilation
• Epinephrine: usual ACLS doses (1 mg q3–5 min) but consider lower doses if recent epinephrine already given
• Defibrillation: STANDARD ACLS (don't delay for OR-specific concerns)
• Open cardiac massage: indicated if sternotomy already open or in cardiac surgery
• Call cardiac surgery early if tamponade/PE suspected

KEY INTRA-OP CAUSES:
• Vasovagal (common with surgical stimulation, especially ophthalmic)
• High spinal (bradycardia → cardiac arrest)
• Local anesthetic toxicity (LAST)
• PE/air embolism
• Succinylcholine hyperkalemia

AFTER ROSC: Targeted temperature management 32–36°C × 24h, treat underlying cause`,
  },
  {
    id: 'cc-fc-005',
    topic: 'criticalCare',
    category: 'Respiratory',
    front: 'Tension Pneumothorax — Intraoperative Recognition & Treatment',
    back: `ETIOLOGY IN OR:
• Iatrogenic: central line insertion, regional block (supraclavicular, interscalene, paravertebral), barotrauma from high airway pressures
• Trauma (rib fractures, penetrating injury)
• Spontaneous (tall, thin male, blebs)
• Complication of laparoscopy (CO₂ dissection)

CLINICAL SIGNS (positive pressure ventilation masks some classic signs):
• ↑ Peak airway pressure (sudden ↑PIP) — often FIRST sign in ventilated patient
• Hypotension, tachycardia
• Absent/decreased ipsilateral breath sounds
• Hypoxia (SpO₂ ↓)
• ↑ CVP/right heart pressures (JVD equivalent — check on monitor)
• Tracheal deviation (LATE sign — often absent in early tension)
• ↓ EtCO₂ (↓ cardiac output)

CLINICAL DIAGNOSIS — do NOT wait for CXR!

IMMEDIATE TREATMENT:
1. NEEDLE DECOMPRESSION: 14–16G angiocath
   • 2nd intercostal space, midclavicular line (traditional)
   • 4th/5th ICS, anterior axillary line (obese patients — reliably reaches pleura)
2. Disconnect from ventilator (allow passive deflation)
3. Tube thoracostomy (chest tube): 4th/5th ICS anterior axillary line — DEFINITIVE treatment
4. 100% O₂
5. Hemodynamic support (fluids, vasopressors)

BILATERAL TENSION PNEUMOTHORAX: Can occur in trauma. Bilateral breath sounds absent.`,
  },
  {
    id: 'cc-fc-006',
    topic: 'criticalCare',
    category: 'Respiratory',
    front: 'Bronchospasm in the OR — Differential & Management',
    back: `DIFFERENTIAL DIAGNOSIS of ↑ Peak Airway Pressure + Wheezing:
1. Bronchospasm (smooth muscle constriction)
2. ETT obstruction: secretions, kinking, biting, mucus plug
3. ETT malposition: right mainstem intubation (no wheezing, unilateral breath sounds ↓ left)
4. Tension pneumothorax (unilateral ↓ breath sounds, hemodynamic collapse)
5. Anaphylaxis (with cardiovascular signs, urticaria)
6. Pulmonary edema (pink frothy sputum)

MANAGEMENT OF TRUE BRONCHOSPASM:
1. Rule out mechanical causes: manually ventilate, suction ETT, check position (capnograph, bilateral auscultation)
2. Remove trigger: stop NSAIDs/beta-blockers, switch LA if latex reaction
3. DEEPEN ANESTHESIA:
   • ↑ volatile agent (sevoflurane, isoflurane — potent bronchodilators)
   • Ketamine 0.5–1 mg/kg IV (bronchodilator via sympathomimetic effect)
   • Propofol if on TIVA
4. BRONCHODILATORS:
   • Albuterol MDI: 4–8 puffs via ETT adapter (mainstay)
   • Ipratropium bromide: 4–8 puffs (anticholinergic)
   • IV magnesium sulfate 1–2 g IV (smooth muscle relaxation)
   • Epinephrine 10–50 mcg IV (if severe/anaphylaxis component)
   • Aminophylline/theophylline (rarely used — narrow TI, arrhythmias)
5. Heliox: if available and refractory

PREVENTION:
• Avoid intubation in light anesthesia
• Lidocaine 1.5 mg/kg IV 3 min before intubation (attenuates airway reflex)
• Pretreat reactive airway patients: bronchodilators, steroids`,
  },
  {
    id: 'cc-fc-007',
    topic: 'criticalCare',
    category: 'Perioperative',
    front: 'Air Embolism — Venous & Arterial, Recognition & Treatment',
    back: `VENOUS AIR EMBOLISM (VAE):
Most common in: sitting/beach chair procedures (neurosurgery), laparoscopy, CVL insertion, spine surgery (above heart level)

MECHANISM: Air enters open venous channels at operative site → RV outflow obstruction, V/Q mismatch, ↓ CO

MONITORING (most sensitive to least):
1. Transesophageal echocardiography (TEE) — most sensitive
2. Precordial Doppler — highly sensitive, practical
3. ↓ EtCO₂ (↓ CO → ↓ CO₂ delivery to lungs)
4. ↑ PA pressure
5. "Mill-wheel" murmur (auscultation) — classic but late
6. Hypotension, hypoxia, arrhythmias

TREATMENT:
1. Flood surgical field (surgeon) — prevent further air entry
2. STOP N₂O (N₂O expands air volume 3× — worsens embolism)
3. 100% O₂
4. Durant's maneuver: left lateral decubitus + Trendelenburg (air moves away from RV outflow)
5. Aspirate air via CVC (right atrial catheter if placed)
6. Hemodynamic support (fluids, vasopressors)
7. CPR if cardiac arrest

PARADOXICAL EMBOLISM: Air crosses to arterial side via PFO (present in ~25%) → stroke, coronary air embolism

ARTERIAL AIR EMBOLISM: Neurocognitive changes, MI, dysrhythmias, circulatory collapse
Treatment: HYPERBARIC OXYGEN (first-line for cerebral air embolism)`,
  },
  {
    id: 'cc-fc-008',
    topic: 'criticalCare',
    category: 'PONV',
    front: 'PONV — Risk Stratification, Prevention & Treatment',
    back: `APFEL SIMPLIFIED RISK SCORE (one point each):
□ Female sex
□ Non-smoker
□ History of PONV or motion sickness
□ Postoperative opioids planned

RISK:
0 points: 10% PONV risk
1 point: 21%
2 points: 39%
3 points: 61%
4 points: 79%

ERAS/MULTIMODAL PROPHYLAXIS (for moderate-high risk):
• TIVA with propofol (vs. volatile anesthetics) — ↓ baseline PONV risk
• Minimize opioids: regional, NSAIDs, acetaminophen, ketamine
• Adequate hydration (2–3 mL/kg/h IV)
• Ondansetron 4 mg IV (5-HT₃ antagonist) — most common; give at end of case
• Dexamethasone 4–8 mg IV (steroid) — give at induction; caution diabetics
• Droperidol 0.625–1.25 mg IV (D₂ antagonist) — QTc prolongation risk (FDA black box)
• Scopolamine patch (0.33 mg/72h): apply night before; anticholinergic side effects

RESCUE ANTIEMETICS (different class from prophylaxis):
• Prochlorperazine or promethazine (phenothiazines)
• Metoclopramide 10–25 mg IV (prokinetic)
• Haloperidol 0.5–2 mg IV
• NK-1 antagonist: aprepitant (PO premedication) or fosaprepitant IV

TRIPLE THERAPY (high risk): propofol + dexamethasone + ondansetron (+ scopolamine)

REGIONAL ANESTHESIA: Best PONV prophylaxis — avoids all volatile agents and reduces opioid need`,
  },
];

export const questions = [
  {
    id: 'cc-q-001',
    topic: 'criticalCare',
    stem: 'A 24-year-old male undergoing scoliosis repair develops rising EtCO₂ (72 mmHg despite ↑ minute ventilation), unexplained tachycardia (HR 160), and temperature 39.9°C rising rapidly. Malignant hyperthermia is suspected. What is the CORRECT initial dantrolene dose?',
    options: [
      '1 mg/kg IV — start low to assess response',
      '2.5 mg/kg IV — repeat q5min until EtCO₂ normalizes (max 10 mg/kg)',
      '5 mg/kg IV — give a large dose immediately',
      '10 mg/kg IV — the maximum dose should be given upfront in severe MH',
    ],
    correctIndex: 1,
    explanation: 'The MHAUS-recommended initial dose of dantrolene for MH crisis is 2.5 mg/kg IV, given as rapidly as possible, and repeated every 5 minutes until EtCO₂ normalizes or muscle rigidity resolves. Maximum total dose is 10 mg/kg. Dantrolene vials contain only 20 mg (require reconstitution) — many vials are needed. Simultaneously: turn off volatile agent, hyperventilate with 100% O₂ at 10 L/min, call MHAUS hotline (1-800-MH-HYPER), activate cooling measures.',
  },
  {
    id: 'cc-q-002',
    topic: 'criticalCare',
    stem: 'During a hip arthroplasty, a patient receives IV cefazolin. Within 3 minutes, BP drops from 125/80 to 58/35, HR increases to 135, SpO₂ falls to 87%, and you notice erythema on the exposed skin. What is the MOST appropriate immediate treatment?',
    options: [
      'Diphenhydramine 50 mg IV and methylprednisolone 125 mg IV',
      'Epinephrine 10–50 mcg IV bolus with plans for infusion if needed',
      'Norepinephrine infusion 0.1 mcg/kg/min',
      'Normal saline 500 mL IV bolus and trendelenburg positioning',
    ],
    correctIndex: 1,
    explanation: 'This is perioperative anaphylaxis (grade III–IV) — epinephrine is the ONLY first-line treatment. IV epinephrine 10–50 mcg bolus (titrated) is appropriate for hemodynamically unstable anaphylaxis (vs. 0.3 mg IM for grade I–II). Antihistamines (diphenhydramine) and steroids are adjuncts ONLY — they do NOT treat the life-threatening hemodynamic collapse. Norepinephrine lacks the bronchodilatory and mast cell-stabilizing effects of epinephrine. Fluids are important adjuncts. Key: epinephrine first, always, for anaphylaxis.',
  },
  {
    id: 'cc-q-003',
    topic: 'criticalCare',
    stem: 'A patient in the prone position for lumbar spine surgery develops sudden ↑ peak airway pressure, absent breath sounds on the right, blood pressure drops to 65/40, and HR increases to 140. The most likely diagnosis and immediate treatment is:',
    options: [
      'Right mainstem intubation — pull ETT back 2 cm',
      'Tension pneumothorax — immediate needle decompression of the right chest',
      'Anaphylaxis — administer epinephrine 100 mcg IV',
      'Pulmonary embolism — give unfractionated heparin 5,000 units IV',
    ],
    correctIndex: 1,
    explanation: 'The combination of ↑ peak airway pressure + absent ipsilateral breath sounds + hemodynamic collapse in a surgical patient is tension pneumothorax until proven otherwise. Immediate needle decompression (14–16G angiocath at 2nd ICS MCL or 4th/5th ICS AAL) is required without waiting for CXR. In prone position, the 4th/5th ICS AAL approach may be more accessible. Right mainstem intubation would cause absent LEFT breath sounds (ETT in right mainstem = ↓ left sounds). Confirm diagnosis clinically and proceed to tube thoracostomy after needle decompression.',
  },
  {
    id: 'cc-q-004',
    topic: 'criticalCare',
    stem: 'During a craniotomy in the sitting position, EtCO₂ abruptly drops from 35 to 18 mmHg, SpO₂ falls to 82%, HR increases to 155, and you hear a "mill-wheel" murmur. What is the most likely diagnosis and the FIRST action?',
    options: [
      'Tension pneumothorax — immediate needle decompression',
      'Venous air embolism — flood the surgical field and stop nitrous oxide',
      'Anaphylaxis — administer epinephrine and steroids',
      'Pulmonary embolism — start anticoagulation',
    ],
    correctIndex: 1,
    explanation: 'The classic triad of sudden ↓ EtCO₂ (↓ CO reducing CO₂ delivery to lungs), ↑ HR, and "mill-wheel" murmur during sitting craniotomy is pathognomonic for venous air embolism (VAE). IMMEDIATE actions: (1) notify surgeon to flood the field to prevent further air entry; (2) stop N₂O immediately (N₂O expands air volume — worsens embolism); (3) 100% O₂; (4) Durant\'s maneuver (left lateral + Trendelenburg); (5) aspirate air via CVC if placed; (6) hemodynamic support. Precordial Doppler is the most sensitive practical monitor for VAE.',
  },
  {
    id: 'cc-q-005',
    topic: 'criticalCare',
    stem: 'A 35-year-old woman (Apfel score 4) undergoes laparoscopic cholecystectomy under general anesthesia. Which combination provides the most effective PONV prophylaxis?',
    options: [
      'Ondansetron 4 mg IV alone at end of case',
      'Propofol-based TIVA + dexamethasone 8 mg at induction + ondansetron 4 mg at end of case',
      'Desflurane-based anesthesia + dexamethasone 8 mg IV at induction',
      'Droperidol 2.5 mg + ondansetron 4 mg at the end of case',
    ],
    correctIndex: 1,
    explanation: 'For a high-risk patient (Apfel score 4 = ~79% PONV risk), multimodal prophylaxis is essential. TIVA with propofol eliminates the baseline PONV effect of volatile agents and provides antiemetic properties itself. Dexamethasone 8 mg at induction has the best evidence and longest duration of action. Ondansetron at end of case covers the immediate postoperative period. This triple combination (TIVA + steroid + 5-HT₃ antagonist) provides the most robust prevention. Adding scopolamine patch or NK-1 antagonist (aprepitant) can be considered for very high-risk patients. Desflurane-based anesthesia (option C) is itself a risk factor for PONV.',
  },
];

export const cases = [
  {
    id: 'cc-case-001',
    topic: 'criticalCare',
    title: 'Malignant Hyperthermia in an Elective Case',
    intro: 'A 22-year-old male (80 kg, no prior anesthesia) is undergoing elective knee arthroscopy. Anesthesia is maintained with sevoflurane 2% and he received succinylcholine for intubation. Twenty minutes into the case, your capnograph shows EtCO₂ 58 mmHg (was 35). Despite increasing minute ventilation to 12 L/min, EtCO₂ continues to rise to 68 mmHg. HR is 140. Temperature probe reads 38.9°C and rising.',
    steps: [
      {
        prompt: 'You suspect MH. What are your SIMULTANEOUS first actions?',
        options: [
          'Call surgeon to close, turn off sevoflurane, and order an ABG to confirm acidosis',
          'Turn off sevoflurane, hyperventilate 100% O₂ at 10 L/min, call for help/dantrolene, begin mixing dantrolene',
          'Increase FiO₂ to 1.0 and administer propofol to deepen anesthesia and treat the tachycardia',
          'Wait 5 minutes to see if temperature continues to rise before starting treatment',
        ],
        correctIndex: 1,
        explanation: 'MH requires SIMULTANEOUS rapid actions — do not wait for laboratory confirmation. Turn OFF the vaporizer and hyperventilate with 100% O₂ at high fresh gas flow (10 L/min) to flush volatile from the circuit. Call for help and activate your MH protocol — you need many hands: one person for dantrolene reconstitution (mixing 20 mg vials is time-consuming), one for cooling measures, one for drugs. Dantrolene preparation should begin immediately. Do NOT change the circuit before flushing — flush with high FGF first to save time. Call MHAUS hotline: 1-800-MH-HYPER.',
      },
      {
        prompt: 'Dantrolene is brought to the room. The vials contain 20 mg each. For this 80 kg patient, how many vials do you need for the initial 2.5 mg/kg dose?',
        options: [
          '4 vials (80 mg)',
          '10 vials (200 mg)',
          '20 vials (400 mg)',
          '36 vials (720 mg) — must have the maximum available',
        ],
        correctIndex: 1,
        explanation: 'Initial dantrolene dose = 2.5 mg/kg = 2.5 × 80 = 200 mg. At 20 mg per vial = 10 vials for the first dose. Each vial must be reconstituted with 60 mL sterile water (very labor-intensive — this is why you need help). For a full 10 mg/kg course: 10 × 80 = 800 mg = 40 vials. MHAUS recommends stocking 36 vials minimum. Once administered, repeat 2.5 mg/kg boluses every 5 minutes until EtCO₂ normalizes or max 10 mg/kg is reached. If temperature continues to rise, begin active cooling simultaneously.',
      },
      {
        prompt: 'After 3 doses of dantrolene (7.5 mg/kg total), EtCO₂ is 42 mmHg, HR is 92, temperature is 37.8°C and stable. BP is stable. Urine is tea-colored. What is the next priority?',
        options: [
          'Extubate the patient and move to PACU for observation',
          'Discontinue dantrolene since the crisis has resolved',
          'Admit to ICU, continue dantrolene 1 mg/kg q6h × 24–48h, aggressive IVF for myoglobinuria, Foley',
          'Switch to halothane-free anesthetic and complete the arthroscopy',
        ],
        correctIndex: 2,
        explanation: 'MH crisis resolution is NOT treatment completion. Tea-colored urine indicates myoglobinuria from muscle breakdown — acute kidney injury is a real risk. ICU admission is mandatory. Continue dantrolene 1 mg/kg IV q6–12 hours for 24–48 hours to prevent recrudescence (recurrence in ~20% if undertreated). Target urine output >1–2 mL/kg/h with aggressive IV fluids and mannitol if needed. Monitor: CK, electrolytes (especially K⁺), creatinine, coagulation (DIC risk), ABG. Document as MH-susceptible and recommend genetic testing for patient and family. Refer to MHAUS for registry.',
      },
    ],
  },
  {
    id: 'cc-case-002',
    topic: 'criticalCare',
    title: 'Intraoperative Cardiac Arrest — Identifying the Cause',
    intro: 'A 58-year-old male (88 kg) is undergoing laparoscopic right hemicolectomy under general anesthesia. He has a history of hypertension and type 2 diabetes. Thirty minutes into the case, after insufflation of CO₂ into the abdomen, the patient suddenly develops pulseless electrical activity (PEA). BP undetectable, no palpable pulse.',
    steps: [
      {
        prompt: 'CPR is started. What are the FIRST reversible causes to consider and rule out rapidly?',
        options: [
          'Hyperkalemia and hypothermia — check temperature and recent labs',
          'Hypovolemia, tension pneumothorax, and CO₂ embolism from laparoscopy — treat empirically',
          'Pulmonary embolism — give heparin and call for ECMO',
          'Drug overdose from anesthetics — stop all agents and give reversal drugs',
        ],
        correctIndex: 1,
        explanation: 'In PEA during laparoscopy, the most immediately reversible causes are: (1) Hypovolemia — check if bleeding occurred; (2) Tension pneumothorax — insufflation can cause pneumothorax from CO₂ dissection; (3) CO₂ venous embolism — laparoscopic insufflation can entrain CO₂ into the venous system. IMMEDIATE actions: deflate the abdomen (have surgeon release pneumoperitoneum), check bilateral breath sounds, prepare for needle decompression, and consider Durant\'s maneuver. High EtCO₂ just before arrest with a sudden drop may indicate massive CO₂ embolism. Treat the most likely cause while doing high-quality CPR.',
      },
      {
        prompt: 'The surgeon deflates the abdomen. Bilateral breath sounds are equal. EtCO₂ was 38, then suddenly dropped to 5 at the time of arrest, then 0 with no pulse. Precordial Doppler shows "mill-wheel" murmur. What specific treatment is indicated?',
        options: [
          'Immediate thoracotomy and open cardiac massage',
          'Left lateral decubitus + Trendelenburg, aspirate air via CVC, 100% O₂, stop N₂O if in use',
          'Heparin 5,000 units IV and alteplase 100 mg for PE',
          'Calcium gluconate 1 g IV for suspected hyperkalemia',
        ],
        correctIndex: 1,
        explanation: 'Sudden ↓ EtCO₂ + mill-wheel murmur during laparoscopy = CO₂ venous air embolism. Treatment: (1) Durant\'s maneuver: left lateral decubitus + Trendelenburg (air migrates to right atrial apex away from RV outflow tract); (2) Aspirate air via CVC if in place; (3) 100% O₂ (if N₂O in use, stop immediately — N₂O expands gas bubbles); (4) Continue CPR — CO₂ absorbs faster than room air emboli; (5) Vasopressors and ECMO if refractory. CO₂ emboli have better prognosis than air emboli because CO₂ is rapidly absorbed. Keep the patient in Durant\'s position during resuscitation.',
      },
      {
        prompt: 'After 4 minutes of CPR and treatment, ROSC is achieved. BP 95/60, HR 110. EtCO₂ 28 mmHg. Next management priorities?',
        options: [
          'Complete the surgery laparoscopically — the cause is identified and resolved',
          'Extubate in the OR — the patient is awake and cardiovascular collapse has resolved',
          'ICU admission, targeted temperature management 32–36°C × 24h, close monitoring and post-cardiac arrest care',
          'Proceed with laparoscopic case — only if an open approach is used instead',
        ],
        correctIndex: 2,
        explanation: 'Post-ROSC care is critical and complex. Standard post-cardiac arrest care includes: (1) Targeted temperature management (TTM) 32–36°C × 24 hours — reduces neurological injury regardless of initial rhythm; (2) Avoid hypoxia (SpO₂ 94–98%) and hyperoxia; (3) Normocapnia (PaCO₂ 35–45 mmHg); (4) Hemodynamic targets (MAP ≥65 mmHg); (5) ICU admission with neurological monitoring; (6) Coronary angiography if AMI suspected. The surgery must be deferred — reoperating in the immediate post-arrest period significantly increases mortality. Complete investigation of the event is essential.',
      },
    ],
  },
];

export const references = [
  {
    id: 'cc-ref-001',
    topic: 'criticalCare',
    title: 'Malignant Hyperthermia Treatment Protocol',
    content: `MALIGNANT HYPERTHERMIA TREATMENT PROTOCOL (MHAUS):

IMMEDIATE (do simultaneously):
□ STOP all triggering agents (ALL volatile anesthetics, succinylcholine)
□ CALL FOR HELP — activate MH team; call MHAUS hotline 1-800-MH-HYPER
□ HYPERVENTILATE: 100% O₂ at 10 L/min; FiO₂ = 1.0
□ DANTROLENE 2.5 mg/kg IV — repeat q5 min until EtCO₂ < 45 or max 10 mg/kg
   Note: Each 20 mg vial requires 60 mL sterile water to reconstitute
□ Notify surgeon — abort/expedite case if possible

COOLING (target core temp < 38.5°C):
□ Ice packs: axillae, groin, neck
□ Cold saline infusion: 0.9% NaCl 15 mL/kg IV over 10–15 min
□ Cool body cavities: NG lavage, bladder irrigation with cold saline
□ Stop cooling when temp < 38°C (prevent overshoot hypothermia)

TREAT METABOLIC DERANGEMENTS:
□ Metabolic acidosis: NaHCO₃ 1–2 mEq/kg IV
□ Hyperkalemia: Ca gluconate 10 mL 10% IV (membrane stabilization)
              Insulin 10 units + 50% dextrose 50 mL IV
              Sodium bicarbonate 50–100 mEq IV
              Kayexalate (later)
□ Myoglobinuria: Aggressive IVF (urine output > 1–2 mL/kg/h)
□ Arrhythmias: Amiodarone — AVOID calcium channel blockers (+ dantrolene = hyperkalemia)

POST-CRISIS (ICU):
□ Dantrolene 1 mg/kg IV q6h × 24–48 h (prevent recrudescence)
□ Monitor: Core temp, CK (peak 12–18h), electrolytes, renal function, coagulation
□ Recrudescence in ~20% if undertreated
□ Document MH-susceptible; recommend genetic testing (RYR1 mutation screen)
□ Report to NAMHR (North American MH Registry) and MHAUS`,
  },
  {
    id: 'cc-ref-002',
    topic: 'criticalCare',
    title: 'OR Cardiac Arrest — Reversible Causes Checklist',
    content: `INTRAOPERATIVE CARDIAC ARREST — REVERSIBLE CAUSES:

Hs:
□ HYPOVOLEMIA: Most common! Check: blood loss, fluid status, CVP, TEE
   Rx: IVF/blood products, control hemorrhage, vasopressors
□ HYPOXIA: Check: ETT position (EtCO₂ waveform), SpO₂, airway obstruction
   Rx: 100% O₂, reintubate if needed, albuterol if bronchospasm
□ HYDROGEN ION (acidosis): Check: ABG, electrolytes
   Rx: NaHCO₃, treat underlying cause
□ HYPERKALEMIA: Check: recent succinylcholine use, burns/crush/SCI, hemolysis, renal failure
   Rx: Ca gluconate, NaHCO₃, insulin+glucose, albuterol, dialysis
□ HYPOTHERMIA: Check: temperature probe
   Rx: Warm IVF, forced-air warming, warming blankets
Ts:
□ TENSION PNEUMOTHORAX: Check: ↑PIP, absent ipsilateral breath sounds, JVD
   Rx: Immediate needle decompression → chest tube
□ TAMPONADE: Check: TEE (pericardial fluid), ↑CVP, muffled heart sounds
   Rx: Pericardiocentesis, emergent sternotomy if cardiac surgery
□ TOXINS:
   - Local anesthetic → lipid emulsion 1.5 mL/kg bolus
   - Succinylcholine hyperkalemia → calcium, glucose/insulin
   - Protamine reaction (after heparin) → epinephrine, antihistamines
□ THROMBOSIS (PE): Check: sudden ↑PVR, TEE (RV dilation, McConnell's sign)
   Rx: Heparin, systemic thrombolytics (PA catheter-directed), ECMO, surgical embolectomy
□ THROMBOSIS (AMI): Check: ECG changes, TEE regional wall motion abnormality
   Rx: Emergent PCI if ROSC, consider lytics, ECMO

ACLS MODIFICATIONS IN OR:
• Higher quality CPR achievable (full access, immediate defibrillation)
• Open cardiac massage if sternotomy open
• Epinephrine 1 mg q3–5 min (same as standard ACLS)
• Vasopressin: not recommended in current AHA guidelines for cardiac arrest`,
  },
  {
    id: 'cc-ref-003',
    topic: 'criticalCare',
    title: 'Anaphylaxis & PONV — Quick Treatment Guides',
    content: `ANAPHYLAXIS TREATMENT (perioperative):

EPINEPHRINE — ALWAYS FIRST:
• Hemodynamically unstable (grade III–IV): 10–100 mcg IV bolus, titrate; start infusion 0.05–0.1 mcg/kg/min
• Grade I–II (cutaneous/moderate): 0.3 mg IM lateral thigh (or 0.01 mg/kg IM)
• Cardiac arrest: 1 mg IV per ACLS

SIMULTANEOUS ACTIONS:
□ Remove/stop the trigger (stop antibiotic/colloid infusion)
□ 100% O₂, secure airway
□ IV crystalloid bolus 1–2 L
□ Diphenhydramine 25–50 mg IV (H1 blocker — adjunct)
□ Ranitidine 50 mg IV (H2 blocker — adjunct)
□ Hydrocortisone 200 mg IV (prevents biphasic — not first-line)
□ Bronchospasm: albuterol MDI via ETT, epinephrine infusion
□ ICU/monitor ≥6 hours (biphasic anaphylaxis risk: ~5–20%)

COMMON PERIOPERATIVE TRIGGERS:
1. Beta-lactam antibiotics (cefazolin most common)
2. NMBs (rocuronium, succinylcholine)
3. Chlorhexidine (skin prep)
4. Latex (less common in latex-free ORs)
5. Protamine (after heparin reversal)

────────────────────────────────────────

PONV TREATMENT ALGORITHM:

PROPHYLAXIS (by Apfel score):
0–1: Low risk — no prophylaxis or single agent
2: Moderate — 1–2 agents (ondansetron + dexamethasone)
3–4: High risk — ≥3 agents + TIVA

FIRST-LINE RESCUE (if prophylaxis fails):
• Use a DIFFERENT class from prophylaxis given
• Ondansetron 4 mg IV (if not given in last 6h)
• Droperidol 0.625–1.25 mg IV
• Prochlorperazine 5–10 mg IV

REFRACTORY PONV:
• Dexamethasone 4–8 mg IV (if not given at induction)
• Scopolamine patch (if not used)
• NK-1 antagonist (fosaprepitant, netupitant)
• Midazolam 2 mg IV (antiemetic mechanism unknown)`,
  },
];
