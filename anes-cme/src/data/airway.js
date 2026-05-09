export const flashcards = [
  {
    id: 'aw-fc-001',
    topic: 'airway',
    category: 'Assessment',
    front: 'LEMON Difficult Airway Assessment',
    back: `L — Look externally
• Beard, obesity, small mouth, macroglossia, large incisors, micrognathia, facial trauma, prior radiation/surgery

E — Evaluate the 3-3-2 rule
• 3 fingers between upper and lower incisors (mouth opening)
• 3 fingers between hyoid bone and mental symphysis (jaw space)
• 2 fingers between thyroid notch and hyoid bone (anterior neck)

M — Mallampati score (I–IV)
• Assessed sitting, tongue out, no phonation
• Class III-IV → difficult laryngoscopy more likely

O — Obstruction / Obesity
• Epiglottitis, peritonsillar abscess, angioedema, Ludwig's angina
• BMI >35: ↓ FRC, faster desaturation, difficult mask ventilation

N — Neck mobility
• Limited in: RA, ankylosing spondylitis, C-spine trauma, cervical fusion
• Extension required for optimal laryngoscopy

REMEMBER: No single factor predicts difficulty reliably. Multivariate risk is cumulative. Always have a plan B and plan C before intubation.`,
  },
  {
    id: 'aw-fc-002',
    topic: 'airway',
    category: 'Assessment',
    front: 'Mallampati Classification & Cormack-Lehane Grading',
    back: `MALLAMPATI (viewed from in front, patient seated):
• Class I: Soft palate, uvula, fauces, anterior and posterior pillars visible → easy
• Class II: Soft palate, uvula, fauces visible → easy/moderate
• Class III: Soft palate and base of uvula visible → moderate/difficult
• Class IV: Only hard palate visible → difficult

CORMACK-LEHANE (laryngoscopic view):
• Grade 1: Full glottis visible → easy intubation
• Grade 2a: Partial glottis (posterior commissure) visible → moderate
• Grade 2b: Only arytenoids visible → difficult
• Grade 3: Only epiglottis visible → very difficult
• Grade 4: Neither epiglottis nor glottis visible → extremely difficult

CORRELATION: Not perfect — Mallampati III/IV has ~50% positive predictive value for difficult laryngoscopy.

IMPROVING A POOR VIEW:
• BURP maneuver (Backward Upward Rightward Pressure on thyroid cartilage)
• Optimal sniffing position (or ramped in obese)
• Switch to videolaryngoscope
• Use bougie`,
  },
  {
    id: 'aw-fc-003',
    topic: 'airway',
    category: 'Intubation',
    front: 'RSI — Steps, Drugs & Doses (Rapid Sequence Induction)',
    back: `GOAL: Intubate rapidly to minimize aspiration risk in full-stomach/emergent patients

STEPS:
1. PREPARE — equipment (ETT, stylet, laryngoscope, suction, RSI drugs, rescue airway), monitors, large-bore IV
2. PREOXYGENATE — 100% O₂ × 3–5 min (tidal volume OR 8 vital capacity breaths); add HFNC at 60 L/min for apneic oxygenation during laryngoscopy
3. POSITION — sniffing position (flex neck, extend head); ramp obese patients (ear to sternal notch)
4. PRETREAT (optional) — lidocaine 1.5 mg/kg for ↑ICP; atropine for pediatrics; rocuronium 0.06 mg/kg to prevent fasciculations with succinylcholine
5. INDUCTION — give induction agent at true RSI speed (not titrated)
6. PARALYTIC — succinylcholine 1.5 mg/kg OR rocuronium 1.2 mg/kg
7. INTUBATE — after 45–60 s; no BMV (unless SpO₂ drops critically)
8. CONFIRM — EtCO₂ waveform (gold standard), bilateral breath sounds, CXR

CRICOID PRESSURE (Sellick): Applies pressure to cricoid cartilage → occludes esophagus
• Evidence is WEAK — may worsen laryngoscopic view; use clinical judgment
• Apply before induction, release after intubation confirmed

MODIFIED RSI: Gentle BMV if SpO₂ drops during apnea phase — preferred in hypoxic patients`,
  },
  {
    id: 'aw-fc-004',
    topic: 'airway',
    category: 'Intubation',
    front: 'Videolaryngoscopy — Types, Advantages & When to Use',
    back: `TYPES:
1. Standard geometry (C-MAC standard blade, McGrath MAC): Same blade angle as DL; shows monitor view; can use as backup without stylet
2. Hyperangulated (C-MAC D-blade, GlideScope): Better view of anterior larynx; ALWAYS requires stylet; can get a great view but tube delivery is challenging
3. Channeled (Airtraq, King Vision): ETT guided through channel; useful in restricted mouth opening

ADVANTAGES OVER DIRECT LARYNGOSCOPY:
• Improved view (Cormack-Lehane grade 1–2) in most patients
• Shared view with assistant and supervisor
• Reduces cervical spine movement
• Training: shorter learning curve

LIMITATIONS:
• Hyperangulated: paradox of great view but difficult tube passage → need stylet precisely angled
• Soiling (blood/secretions) obscures lens
• Cannot feel tactile feedback of tube passage
• Hyperangulated blades require different technique

INDICATIONS:
• Anticipated or unanticipated difficult laryngoscopy
• Cervical spine immobilization
• Obese patients
• Teaching environments

APHORISM: "Seeing the cords ≠ intubation is complete" — confirm EtCO₂ waveform`,
  },
  {
    id: 'aw-fc-005',
    topic: 'airway',
    category: 'Difficult Airway',
    front: 'Awake Intubation — Indications, Drugs & Technique',
    back: `INDICATIONS (when losing the airway post-induction is unacceptable):
• Predicted very difficult or impossible intubation + difficult mask ventilation
• Unstable cervical spine (need to assess neurology before/after)
• Significant aspiration risk + predicted difficult airway
• Severe respiratory compromise (intubation will be prolonged)
• Obese patient with multiple airway predictors

TECHNIQUE (awake fiberoptic or videolaryngoscopy):
1. Consent and explain to patient
2. Antisialogue: glycopyrrolate 0.2–0.4 mg IV (dries secretions for better scope view)
3. Sedation: dexmedetomidine (0.5–1 mcg/kg load then 0.4–0.7 mcg/kg/h) — maintains airway tone and breathing; OR remifentanil TCI (0.5–1 ng/mL) — careful with apnea
4. Topicalization:
   • Airway: 4% lidocaine nebulized (3–5 mL)
   • Nasal: 4% cocaine or oxymetazoline + 4% lidocaine spray
   • Transtracheal injection: 2–4 mL 4% lidocaine through CTM (cough reflex blunted)
   • Superior laryngeal nerve block (bilateral)
5. Intubate (fiberoptic or VL) while patient is awake and breathing

MAXIMUM LIDOCAINE for topicalization: 8–9 mg/kg (higher threshold when topical due to slower absorption)

CRITICAL RULE: Never cross the rubicon (induce without a secure airway plan) in a predicted very difficult airway`,
  },
  {
    id: 'aw-fc-006',
    topic: 'airway',
    category: 'Difficult Airway',
    front: 'Cannot Intubate, Cannot Oxygenate (CICO) — Recognition & Algorithm',
    back: `CICO = Failed intubation + failed oxygenation (SpO₂ falling despite rescue attempts)
→ TIME-CRITICAL: Brain injury within 4–5 minutes

DAS DIFFICULT AIRWAY ALGORITHM (simplified):
Step 1: Failed intubation → CALL FOR HELP. Maintain oxygenation.
Step 2: Attempt oxygenation:
  a) Face mask BMV (two-hand, two-person, OPA/NPA)
  b) Supraglottic airway (2nd generation: i-gel, ProSeal LMA)
  → If SpO₂ maintained: PAUSE and make a plan (wake up? proceed through SGA? exchange catheter?)

Step 3: If BMV + SGA BOTH fail → DECLARE CICO
→ Emergency Front of Neck Access (eFONA):

SCALPEL CRICOTHYROTOMY (preferred in adults):
1. Identify CTM (below thyroid cartilage, above cricoid)
2. Stabilize larynx (dominant hand)
3. Horizontal stab incision through skin and CTM
4. Hook epiglottis upward (or use tracheal hook)
5. Dilate with finger
6. Insert 6.0 cuffed ETT or Melker dilator kit
7. Inflate cuff, confirm EtCO₂, ventilate

NEEDLE CRICOTHYROTOMY: Temporizing only (jet ventilation required — high barotrauma risk)

NEVER: Attempt >3 intubations total without escalating. "One more try" kills.`,
  },
  {
    id: 'aw-fc-007',
    topic: 'airway',
    category: 'Oxygenation',
    front: 'Apneic Oxygenation — Physiology & Clinical Application',
    back: `PHYSIOLOGY:
• During apnea, oxygen continues to be absorbed into blood from alveoli
• CO₂ accumulates slowly in the alveolus (much slower than O₂ leaves)
• A pressure gradient draws O₂ from nasopharynx into trachea via MASS FLOW
• This allows PaO₂ to remain elevated for minutes beyond safe apnea time

TECHNIQUE:
• High-flow nasal cannula (HFNC): 15–60 L/min via NC during laryngoscopy
• Humidified HFNC (e.g., Optiflow): 60 L/min — clinical studies show extended apnea time
• Maintain patent nasal passages (mouth can be open)

CLINICAL BENEFIT:
• Without apneic oxygenation: SpO₂ drops rapidly, especially in obese/hypoxic patients
• With 15 L/min NC: extends safe apnea time by 2–3 minutes in healthy adults
• Greater benefit in: obesity, pregnancy, pediatrics, ICU patients (already hypoxic)

LIMITATIONS:
• Nasopharyngeal obstruction significantly reduces benefit
• Does NOT eliminate CO₂ (PaCO₂ rises 3–6 mmHg/min during apnea)
• Does NOT replace preoxygenation — both should be used
• Evidence for HFNC in RSI: FELLOW, PREOXI, OPTINIV trials — supports routine use

PRACTICAL PEARL: Leave NC at 15 L/min during entire laryngoscopy attempt. Simple, low risk, high potential benefit.`,
  },
  {
    id: 'aw-fc-008',
    topic: 'airway',
    category: 'Extubation',
    front: 'Safe Extubation — Criteria, Approach & High-Risk Situations',
    back: `EXTUBATION CRITERIA:
✓ Awake, following commands
✓ Adequate respiratory effort (VT > 5–6 mL/kg, RR 12–20)
✓ Sustained head lift × 5 seconds (unreliable alone — use quantitative TOF)
✓ TOF ratio ≥ 0.9 (quantitative monitoring)
✓ SpO₂ acceptable on moderate FiO₂ (no severe V/Q mismatch)
✓ Hemodynamically stable, normothermic
✓ Secretions manageable

HIGH-RISK EXTUBATION SITUATIONS:
• Failed/difficult intubation — use airway exchange catheter (AEC) as a bridge
• Bleeding in airway (ENT, oral surgery)
• Airway edema (prolonged prone, angioedema, massive fluid resuscitation)
• Obese patient with high aspiration risk
• Predicted re-intubation difficulty

AIRWAY EXCHANGE CATHETER (AEC) TECHNIQUE:
1. Thread AEC through ETT (3 cm below cords)
2. Remove ETT over AEC, leaving AEC in trachea
3. Give high-flow O₂ through AEC (NEVER jet ventilate through AEC without proper equipment)
4. If re-intubation needed: railroad ETT over AEC
5. Remove AEC when confident patient does not need re-intubation

AWAKE EXTUBATION vs. DEEP EXTUBATION:
• Awake: patient protective reflexes, ↑ coughing/bucking (raises ICP)
• Deep: smooth but risk of laryngospasm, aspiration — only in selected low-risk cases`,
  },
];

export const questions = [
  {
    id: 'aw-q-001',
    topic: 'airway',
    stem: 'During direct laryngoscopy with a Macintosh blade, you obtain a Cormack-Lehane grade 3 view (only the epiglottis visible). You have applied optimal positioning. What is the most appropriate NEXT step?',
    options: [
      'Proceed with blind intubation using a bougie',
      'Apply BURP maneuver and use a gum-elastic bougie',
      'Immediately perform cricothyrotomy',
      'Call the ENT surgeon for emergency tracheotomy',
    ],
    correctIndex: 1,
    explanation: 'A grade 3 view (epiglottis only) calls for optimization before escalating. BURP (Backward Upward Rightward Pressure on the thyroid cartilage — not the cricoid) optimizes laryngoscopic view and frequently converts a grade 3 to a grade 2 view. Using a bougie blindly through the visible epiglottis is a validated technique. Switching to videolaryngoscopy is another excellent option. Cricothyrotomy and surgical tracheotomy are reserved for CICO (cannot intubate, cannot oxygenate) — not appropriate at this stage when oxygenation is maintained.',
  },
  {
    id: 'aw-q-002',
    topic: 'airway',
    stem: 'A 48-year-old with rheumatoid arthritis and an unstable C1–C2 (atlanto-axial subluxation) requires semi-urgent intubation for elective hip arthroplasty. Airway exam shows Mallampati II, good mouth opening, and adequate thyromental distance. What is the preferred intubation approach?',
    options: [
      'Rapid sequence induction with videolaryngoscopy',
      'Awake flexible bronchoscopic intubation',
      'Standard induction with careful manual in-line stabilization',
      'Spinal anesthesia, avoiding the need for intubation',
    ],
    correctIndex: 1,
    explanation: 'Atlanto-axial instability is a classic indication for awake intubation. With ANY movement-induced compression of the spinal cord possible, maintaining the patient\'s ability to report paresthesias, and avoiding the neck manipulation of post-induction intubation, is essential. Awake flexible bronchoscopic intubation (awake FOI) allows the operator to advance the scope with minimal cervical movement and assess neurological status before and after intubation. MILS (Manual In-Line Stabilization) during RSI is used in trauma for C-spine precautions but does not adequately protect an unstable atlanto-axial joint. Spinal anesthesia avoids tracheal intubation but doesn\'t address the underlying risk if sedation deepens.',
  },
  {
    id: 'aw-q-003',
    topic: 'airway',
    stem: 'After RSI with succinylcholine for a laparoscopic case, you attempt intubation three times with videolaryngoscopy and fail. An i-gel supraglottic airway is inserted but provides inadequate ventilation (SpO₂ now 61%, falling). Which action is immediately indicated?',
    options: [
      'Insert a nasopharyngeal airway and attempt BMV again',
      'Try a different size i-gel or classic LMA',
      'Perform scalpel cricothyrotomy (emergency front of neck access)',
      'Administer sugammadex 16 mg/kg and wake the patient',
    ],
    correctIndex: 2,
    explanation: 'This is a CICO (Cannot Intubate, Cannot Oxygenate) emergency. SpO₂ 61% and falling represents a life-threatening situation. The DAS algorithm directs: failed intubation → attempt BMV/SGA → if BOTH fail → DECLARE CICO → Emergency Front of Neck Access (eFONA). Scalpel cricothyrotomy is the preferred technique in adults. Trying additional SGAs wastes critical time. Sugammadex would reverse the NMB but the patient is still unconscious and apneic from the induction agent — this does not solve the immediate oxygenation crisis and succinylcholine has already been metabolized. Every 30 seconds delay increases the risk of hypoxic brain injury.',
  },
  {
    id: 'aw-q-004',
    topic: 'airway',
    stem: 'Which of the following is the GOLD STANDARD for confirming correct endotracheal tube placement?',
    options: [
      'Bilateral breath sounds auscultated in the axillae',
      'Chest rise with positive pressure ventilation',
      'Continuous waveform capnography (EtCO₂)',
      'SpO₂ improvement after intubation',
    ],
    correctIndex: 2,
    explanation: 'Continuous waveform capnography showing a normal waveform (CO₂ rise and fall) over multiple respiratory cycles is the gold standard for confirming tracheal intubation. It immediately detects esophageal intubation (flat CO₂ waveform) and continues to monitor tube position throughout the case. Bilateral breath sounds can be misleading (transmitted sounds from esophageal intubation, or sounds present with right mainstem intubation). SpO₂ can remain normal for minutes after esophageal intubation (especially after adequate preoxygenation). Chest rise alone is not reliable.',
  },
  {
    id: 'aw-q-005',
    topic: 'airway',
    stem: 'A morbidly obese patient (BMI 48) needs intubation. Before induction, what is the most important positioning modification to maximize safe apnea time and ease laryngoscopy?',
    options: [
      'Trendelenburg position (head-down 15°) to improve FRC',
      'Standard supine position with a shoulder roll',
      'Ramped position (ear to sternal notch level) with 30° head-up tilt',
      'Left lateral decubitus to reduce aortocaval compression',
    ],
    correctIndex: 2,
    explanation: 'The ramped position (ear aligned with sternal notch, achieved with stacked blankets or a commercial ramp device) is essential for obese patients. Benefits: (1) improves laryngoscopic view by aligning oral-pharyngeal-laryngeal axes; (2) increases FRC compared to flat supine position — extends safe apnea time; (3) reduces aspiration risk. Combined with 30° head-up tilt and high-flow preoxygenation, safe apnea time in obese patients can be extended from 2–3 minutes to 4–5 minutes. Trendelenburg position reduces FRC and is harmful.',
  },
];

export const cases = [
  {
    id: 'aw-case-001',
    topic: 'airway',
    title: 'The CICO Emergency — Cannot Intubate, Cannot Oxygenate',
    intro: 'A 55-year-old morbidly obese male (BMI 47, 135 kg) is scheduled for emergency laparotomy for perforated bowel. He has a history of GERD and neck radiation for laryngeal cancer. RSI is performed with ketamine and rocuronium 1.2 mg/kg. Three videolaryngoscopy attempts and one direct laryngoscopy attempt all fail — the epiglottis cannot be lifted. SpO₂ is now 74% and dropping. You have called for help.',
    steps: [
      {
        prompt: 'What is your immediate first action when you recognize failed intubation with dropping SpO₂?',
        options: [
          'Attempt a 5th laryngoscopy with a different blade',
          'Call for fiberoptic bronchoscope — it will provide a definitive view',
          'Attempt two-handed, two-person bag-mask ventilation with oral + nasal airways',
          'Insert a double-lumen tube for airway isolation',
        ],
        correctIndex: 2,
        explanation: 'The DAS algorithm directs: failed intubation → MAINTAIN OXYGENATION as the first priority. Two-handed, two-person BMV with an oral airway (OPA) and nasal airway (NPA) maximizes mask seal and delivered tidal volume. Rescue oxygenation buys time to make a plan. Further laryngoscopy attempts beyond 3 total are rarely successful and cause trauma. Fiberoptic bronchoscopy in an apneic, obese patient with secretions is not the right tool at this moment.',
      },
      {
        prompt: 'BMV provides minimal chest rise with SpO₂ continuing to fall to 60%. You insert an i-gel size 5. Despite correctly placed SGA, SpO₂ continues to fall to 52%. What do you declare and what is the next action?',
        options: [
          'Continue optimizing SGA position — try a different size',
          'Give sugammadex 16 mg/kg — reversing NMB may restore spontaneous breathing',
          'Declare CICO — perform emergency scalpel cricothyrotomy immediately',
          'Administer succinylcholine — the rocuronium must be causing inadequate relaxation',
        ],
        correctIndex: 2,
        explanation: 'This is now a confirmed CICO: failed intubation (×4 attempts) + failed oxygenation (BMV and SGA both inadequate). DECLARE CICO. Emergency front of neck access (eFONA) via scalpel cricothyrotomy is immediately indicated. Every additional second without oxygenation risks brain injury (hypoxic damage begins at SpO₂ < 50–55%). Sugammadex would reverse rocuronium but the patient is still apneic from ketamine — this is not an effective rescue for the oxygenation crisis and wastes critical time.',
      },
      {
        prompt: 'You perform the scalpel-bougie cricothyrotomy. Steps: identify CTM, stab incision, insert bougie, railroad 6.0 ETT, inflate cuff. EtCO₂ waveform confirmed. SpO₂ recovering to 95%. What is the most critical next decision?',
        options: [
          'Proceed with the emergency laparotomy immediately through the cricothyrotomy airway',
          'Notify the surgical team and ENT/thoracic surgery for formal tracheotomy; proceed with laparotomy if life-threatening',
          'Extubate the cricothyrotomy tube and attempt nasal intubation now that patient is oxygenated',
          'Give more succinylcholine and retry oral intubation',
        ],
        correctIndex: 1,
        explanation: 'Cricothyrotomy is a temporizing emergency procedure, not a long-term airway. The cricothyrotomy tube should be converted to a formal surgical tracheotomy within 24–72 hours (risk of subglottic stenosis, tube displacement). For a life-threatening emergency, proceed with surgery through this airway with ENT/thoracic surgery immediately notified and on standby. Attempting re-intubation now — with a compromised, edematous airway and ongoing bleeding — risks losing the only airway secured. Document the event meticulously and debrief the team.',
      },
    ],
  },
];

export const references = [
  {
    id: 'aw-ref-001',
    topic: 'airway',
    title: 'Difficult Airway Algorithm (DAS 2015)',
    content: `DAS UNANTICIPATED DIFFICULT INTUBATION ALGORITHM:

PLAN A: Direct laryngoscopy / Videolaryngoscopy
• Optimize: position, BURP, bougie, change blade
• Maximum 3 intubation attempts (including initial)
• Maintain oxygenation between attempts

→ IF FAILED: Declare failed intubation. Call for help. FOCUS ON OXYGENATION.

PLAN B: Supraglottic Airway (2nd generation preferred)
• i-gel, ProSeal LMA, Supreme LMA
• If successful: pause and decide — wake up / proceed / airway exchange

→ IF FAILED (cannot ventilate via SGA):

PLAN C: Facemask ventilation (two-handed, two-person, OPA + NPA)
• Final attempt to oxygenate

→ IF ALL FAILED: DECLARE CICO
→ PLAN D: Emergency Front of Neck Access (eFONA)

SCALPEL CRICOTHYROTOMY STEPS:
1. Palpate CTM (between thyroid cartilage and cricoid ring)
2. Horizontal stab incision with scalpel (4 cm) through skin + CTM
3. Horizontal traction with finger/tracheal hook (prevent closure)
4. Insert 6.0 cuffed ETT or Melker dilator + tube
5. Inflate cuff, ventilate, confirm EtCO₂
6. Secure tube

GENERAL PRINCIPLES:
• Limit intubation attempts to 3 total
• Oxygenation is the priority — intubation is secondary
• "Cannot intubate" ≠ "Cannot oxygenate" — two separate problems
• Pre-plan before every anesthetic: What is my Plan B? Plan C?`,
  },
  {
    id: 'aw-ref-002',
    topic: 'airway',
    title: 'RSI Drug Doses & Equipment Checklist',
    content: `RSI DRUG DOSES (70 kg adult reference):

INDUCTION AGENTS:
• Etomidate 0.3 mg/kg = 21 mg IV (hemodynamically unstable)
• Ketamine 1.5 mg/kg = 105 mg IV (shock, asthma, agitation)
• Propofol 1.5 mg/kg = 105 mg IV (stable, elective)
• Midazolam 0.1 mg/kg = 7 mg IV (resource-limited, adjunct)

PARALYTIC AGENTS:
• Succinylcholine 1.5 mg/kg = 105 mg IV (onset 60 s)
• Rocuronium 1.2 mg/kg = 84 mg IV (RSI dose, onset 60 s)

REVERSAL (rocuronium RSI):
• Sugammadex 16 mg/kg = 1,120 mg IV (immediate reversal within 15 min)

AIRWAY EQUIPMENT CHECKLIST (SOAPME):
S — Suction (rigid Yankauer, functioning, immediately available)
O — Oxygen (source, mask, HFNC at 15 L/min NC during laryngoscopy)
A — Airway devices (ETT ×2 sizes, stylet, OPA, NPA, SGA)
P — Positioning (ramp for obese, sniffing position)
M — Monitoring (SpO₂, EtCO₂, HR, BP)
E — End-tidal CO₂ (immediately available, waveform)
+ Videolaryngoscope + Bougie + Cricothyrotomy kit

TUBE SIZES (adults): Men: 7.5–8.0 mm ID | Women: 7.0–7.5 mm ID
DEPTH (corner of mouth): 23 cm men | 21 cm women (varies by height)`,
  },
  {
    id: 'aw-ref-003',
    topic: 'airway',
    title: 'Airway Assessment Quick Reference',
    content: `DIFFICULT AIRWAY PREDICTORS:

DIFFICULT MASK VENTILATION (OBESE mnemonic):
O — Obesity (BMI >26)
B — Beard
E — Edentulous
S — Snoring/Sleep apnea
E — Elderly (>55)
+ Limited mandibular protrusion

DIFFICULT INTUBATION:
• Mallampati III/IV
• Thyromental distance < 6 cm (< 3 finger breadths)
• Mouth opening < 3 cm (< 2 finger breadths)
• Neck mobility < 90°
• Short, thick neck
• Obstructing lesion (abscess, tumor, hematoma)
• Radiation changes to neck/pharynx
• History of difficult intubation

DIFFICULT SUPRAGLOTTIC AIRWAY:
• Obstructing lesion below base of tongue
• Fixed elevated airway lesion
• Pharyngeal mass

DIFFICULT CRICOTHYROTOMY:
• Obesity (cannot palpate CTM)
• Pre-tracheal masses
• Previous surgery altering anatomy
• Coagulopathy

RAPID PRE-ANESTHETIC SCREENING:
1. Ask: "Open your mouth as wide as you can"
2. Observe thyromental distance
3. Ask about prior anesthetic issues
4. Check neck mobility
Takes < 60 seconds. Never skip it.`,
  },
];
