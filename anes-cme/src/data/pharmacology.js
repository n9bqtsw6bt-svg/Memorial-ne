export const flashcards = [
  {
    id: 'ph-fc-001',
    topic: 'pharmacology',
    category: 'Induction Agents',
    front: 'Propofol — Mechanism, Dosing & Key Properties',
    back: `MECHANISM: GABA-A receptor positive allosteric modulator

DOSING:
• Induction: 1–2.5 mg/kg IV (↓ by 30–50% in elderly, ASA III-IV, or premedicated)
• Sedation: 25–75 mcg/kg/min
• TIVA: 100–200 mcg/kg/min

PHARMACOKINETICS: Hepatic + extrahepatic metabolism; highly lipophilic; rapid redistribution

KEY BENEFITS:
• Antiemetic at sub-hypnotic doses
• Bronchodilation, ↓ ICP, ↓ CMRO₂
• Smooth, pleasant induction

WATCH OUT FOR:
• ↓ MAP (↓SVR + ↓myocardial contractility) — caution in hemodynamic instability
• Pain on injection → pretreat with lidocaine 20 mg IV or use antecubital vein
• Propofol infusion syndrome (PRIS): dose >4–5 mg/kg/h × >48 h → metabolic acidosis, cardiac failure, rhabdomyolysis, lipemia`,
  },
  {
    id: 'ph-fc-002',
    topic: 'pharmacology',
    category: 'Induction Agents',
    front: 'Ketamine — Mechanism, Dosing & Clinical Profile',
    back: `MECHANISM: Non-competitive NMDA receptor antagonist (dissociative anesthetic)

DOSING:
• Induction: 1–2 mg/kg IV or 4–6 mg/kg IM
• Analgesic/sub-dissociative: 0.1–0.5 mg/kg IV
• TIVA adjunct: 0.1–0.5 mg/kg/h infusion

UNIQUE PROFILE:
• Sympathomimetic → ↑ HR, ↑ BP, ↑ CO (catecholamine release) — ideal in hemorrhagic shock
• Bronchodilation (useful in reactive airway disease, status asthmaticus)
• Maintains airway reflexes (but NOT reliably — aspiration still possible!)
• Dissociative dose provides profound analgesia

CONSIDERATIONS:
• ↑ secretions → consider glycopyrrolate pretreatment
• Emergence dysphoria → mitigate with midazolam or propofol
• Use cautiously in: known psychosis, uncontrolled HTN, ischemic heart disease
• ↑ ICP — controversial; direct cerebral vasodilation offset by maintained MAP; use with benzodiazepine if concern`,
  },
  {
    id: 'ph-fc-003',
    topic: 'pharmacology',
    category: 'Induction Agents',
    front: 'Etomidate — Why Is It Used in Hemodynamically Unstable Patients?',
    back: `MECHANISM: GABA-A receptor agonist (imidazole structure)

DOSE: 0.3 mg/kg IV (range 0.2–0.4 mg/kg)

HEMODYNAMIC STABILITY: Minimal effect on MAP, HR, and SVR — the safest induction agent when cardiovascular compromise is present

USES: Hemodynamically unstable patients (trauma, sepsis, cardiac tamponade, severe AS)

IMPORTANT LIMITATIONS:
• Adrenocortical suppression: inhibits 11-β-hydroxylase → ↓ cortisol synthesis
  — Single dose: transient (12–24 h), clinically debated
  — Continuous infusion: CONTRAINDICATED (used in ICU historically → ↑ mortality in sepsis)
• Myoclonus (30–40%) → pretreat with midazolam or opioid
• Pain on injection, PONV
• Does NOT provide analgesia

BOTTOM LINE: Best hemodynamic profile of any induction agent. Adrenal concern should not prevent its use in a single RSI dose for critically ill patients.`,
  },
  {
    id: 'ph-fc-004',
    topic: 'pharmacology',
    category: 'Neuromuscular Blockers',
    front: 'Succinylcholine — Mechanism, Dosing & Contraindications',
    back: `MECHANISM: Depolarizing NMB — nicotinic ACh receptor agonist → persistent depolarization → fasciculations → flaccid paralysis

DOSING:
• RSI: 1–1.5 mg/kg IV (onset 45–60 s, duration 10–15 min)
• Infant/neonate: 2 mg/kg IV
• IM (no IV access): 4 mg/kg

METABOLISM: Plasma pseudocholinesterase (dibucaine number)

ABSOLUTE CONTRAINDICATIONS:
• Burns > 24 hours (upregulation of ACh receptors → massive K⁺ efflux → cardiac arrest)
• Denervation injuries > 48–72 h (SCI, stroke, prolonged immobility)
• Crush injuries > 48–72 h
• Muscular dystrophy (Duchenne/Becker → rhabdomyolysis, hyperkalemia, cardiac arrest)
• Personal or family history of malignant hyperthermia
• Known hyperkalemia (K⁺ rises ~0.5 mEq/L normally; >5–6 mEq/L is dangerous)

SIDE EFFECTS: Fasciculations (pretreat with 10% intubating dose of rocuronium), ↑ IOP, ↑ intragastric pressure, bradycardia (especially pediatrics, repeat dosing)`,
  },
  {
    id: 'ph-fc-005',
    topic: 'pharmacology',
    category: 'Neuromuscular Blockers',
    front: 'Rocuronium — Dosing for Intubation vs. RSI, and Reversal',
    back: `CLASS: Non-depolarizing aminosteroid NMB

DOSING:
• Standard intubation: 0.6 mg/kg IV → onset ~90 s, duration 30–60 min
• RSI equivalent: 1.2 mg/kg IV → onset ~60 s (comparable to succinylcholine)
• Maintenance: 0.1–0.2 mg/kg PRN or 0.01–0.012 mg/kg/min infusion

MONITORING: Train-of-four (TOF) — use peripheral nerve stimulator

REVERSAL:
• Sugammadex 2 mg/kg (TOF count ≥2, moderate block)
• Sugammadex 4 mg/kg (deep block, PTC 1–2)
• Sugammadex 16 mg/kg (immediate reversal within 3 min of 1.2 mg/kg dose)

ADVANTAGES OVER SUCCINYLCHOLINE for RSI:
• No hyperkalemia risk
• Can be fully reversed with sugammadex
• No MH trigger

REMEMBER: Rocuronium 1.2 mg/kg + sugammadex 16 mg/kg = "can't intubate, give sugammadex" rescue strategy`,
  },
  {
    id: 'ph-fc-006',
    topic: 'pharmacology',
    category: 'Neuromuscular Blockers',
    front: 'Sugammadex — Dosing, Mechanism & Considerations',
    back: `MECHANISM: Modified γ-cyclodextrin that encapsulates rocuronium (and vecuronium) in a 1:1 complex → rapid elimination via kidneys

DOSING (rocuronium):
• Moderate block (TOF count ≥2): 2 mg/kg IV
• Deep block (PTC 1–2, no TOF response): 4 mg/kg IV
• Immediate reversal (< 3 min after 1.2 mg/kg rocuronium): 16 mg/kg IV

ADVANTAGES:
• Works at any depth of block (unlike neostigmine)
• No muscarinic side effects (no need for anticholinergic)
• Complete, reliable reversal within 3 minutes

CONSIDERATIONS:
• Renal impairment: use with caution — rocuronium-sugammadex complex depends on renal excretion; for severe renal failure, risk of recurrence of NMB
• Hypersensitivity reactions possible (rare but documented)
• Bradycardia reported
• Does NOT reverse cisatracurium, atracurium, or mivacurium (benzylisoquinoliniums)
• Re-paralysis can occur if sugammadex dose is inadequate

COST: Significantly more expensive than neostigmine — worth it for deep blocks, high-risk patients, surgical emergencies`,
  },
  {
    id: 'ph-fc-007',
    topic: 'pharmacology',
    category: 'Neuromuscular Blockers',
    front: 'Neostigmine — Mechanism, Dosing & Limitations',
    back: `MECHANISM: Acetylcholinesterase inhibitor → ↑ ACh at NMJ → competes with NMB for nicotinic receptor

DOSE: 40–70 mcg/kg IV (maximum 5 mg)
ALWAYS CO-ADMINISTER: Glycopyrrolate 0.2 mg per 1 mg neostigmine (blocks muscarinic side effects without crossing BBB)

REQUIREMENTS FOR USE:
• TOF count ≥2 (cannot fully reverse deep block — ceiling effect)
• For optimal reversal: wait for at least 4 twitches with minimal fade

MUSCARINIC SIDE EFFECTS (prevented by glycopyrrolate):
• Bradycardia, increased secretions, bronchospasm, GI hypermotility, ↑ urinary urgency

POSTOPERATIVE RESIDUAL CURARIZATION (PORC):
• TOF ratio 0.7–0.9: subclinical weakness (↓ hypoxic drive, airway obstruction risk)
• TOF ratio < 0.9 at extubation → ↑ pulmonary complications
• Clinical tests (head lift, hand grip) are UNRELIABLE below TOF 0.9
• QUANTITATIVE TOF monitoring is the gold standard

BOTTOM LINE: Neostigmine is acceptable for moderate-deep blocks with ≥2 twitches, but sugammadex is more reliable, especially with deep residual block`,
  },
  {
    id: 'ph-fc-008',
    topic: 'pharmacology',
    category: 'Volatile Agents',
    front: 'Volatile Anesthetic Comparison — MAC Values & Blood:Gas Coefficients',
    back: `AGENT          MAC (O₂)   Blood:Gas   Key Points
─────────────────────────────────────────────────────
Sevoflurane    2.0%        0.65        Non-pungent; inhalation induction; compound A
Desflurane     6.6%        0.42        Fastest onset/offset; pungent/irritating; high GWP
Isoflurane     1.15%       1.46        Slow onset; coronary steal (theoretical); cheapest
Nitrous oxide  104%        0.47        Incomplete anesthetic; expands closed spaces

KEY CONCEPTS:
• LOW blood:gas = faster onset/offset (less soluble in blood)
• Desflurane fastest wake-up time; excellent for long or obese cases
• Desflurane cannot be used for inhalation induction (laryngospasm risk)
• Sevoflurane + dry CO₂ absorbent → Compound A (nephrotoxic — avoid <2 L/min fresh gas)
• N₂O expands: pneumothorax, bowel gas, middle ear, pneumocephalus, ETT cuff
• Diffusion hypoxia: give 100% O₂ for 5 min at emergence when using N₂O
• All halogenated agents are MH triggers

MAC MODIFIERS:
↓ MAC: Age ↑, opioids, hypothermia, hypotension, anemia, sedatives, pregnancy
↑ MAC: Hyperthermia, CNS stimulants, young age, chronic alcohol use, hyperthyroidism`,
  },
  {
    id: 'ph-fc-009',
    topic: 'pharmacology',
    category: 'Opioids',
    front: 'Remifentanil — What Makes It Unique? Key Clinical Pearls',
    back: `CLASS: Ultra-short-acting mu-opioid agonist

UNIQUE PHARMACOKINETICS:
• Metabolism: non-specific plasma and tissue esterases (NOT pseudocholinesterase)
• Half-life: ~4 minutes regardless of infusion duration (no context-sensitive accumulation)
• Renal/hepatic failure: kinetics unchanged

INFUSION DOSE: 0.05–0.5 mcg/kg/min (titrate to effect)

CLINICAL PEARLS:
• Ideal for: neurosurgery (rapid emergence), bariatric (obese), office procedures, TCI
• CRITICAL: At case end, patient will be in SEVERE pain — must transition analgesia BEFORE emergence
  → Morphine 0.1–0.15 mg/kg IV at 20–30 min before emergence
  → Ketamine 0.5 mg/kg + ketorolac 15–30 mg IV
  → Regional block before stopping infusion

OPIOID-INDUCED HYPERALGESIA (OIH):
• High infusion rates (>0.2 mcg/kg/min for prolonged time) can sensitize pain pathways
• Patients may have INCREASED pain sensitivity postoperatively
• Mitigate with: ketamine 0.5 mg/kg/h, low-dose naloxone infusion, multimodal analgesia

CONTEXT-SENSITIVE HALF-TIME: ~4 min regardless of duration — this is what makes it unique vs. all other opioids`,
  },
  {
    id: 'ph-fc-010',
    topic: 'pharmacology',
    category: 'Vasopressors',
    front: 'Vasopressor Selection — Norepinephrine vs. Phenylephrine vs. Vasopressin vs. Epinephrine',
    back: `AGENT           Receptors        Effect           Primary Use
──────────────────────────────────────────────────────────────────
Norepinephrine  α1 >> β1         ↑SVR, ↑MAP       First-line septic/vasodilatory shock
                                 mild ↑HR
Phenylephrine   α1 (pure)        ↑SVR, reflex ↓HR Spinal hypotension (no tachycardia)
                                                   Avoid in ↓CO states (pure vasoconstriction)
Epinephrine     α1, α2, β1, β2   ↑HR, ↑CO, ↑SVR  Anaphylaxis (first-line), cardiac arrest
                                                   Refractory shock (2nd-line)
Vasopressin     V1 (smooth       ↑SVR              Catecholamine-resistant shock
                muscle)          No ↑HR            Fixed dose: 0.03 units/min
Dopamine        D1, β1, α1       Dose-dependent    Largely replaced; ↑ arrhythmia risk

SPINAL HYPOTENSION: Phenylephrine preferred (maintains uteroplacental blood flow in OB)
ANAPHYLAXIS: Epinephrine 10–100 mcg IV (hemodynamically unstable) or 0.3 mg IM (lateral thigh)
DISTRIBUTIVE SHOCK: Norepinephrine + vasopressin for norepinephrine-sparing
VASOPRESSIN CAUTION: Splanchnic vasoconstriction — avoid in mesenteric ischemia risk`,
  },
  {
    id: 'ph-fc-011',
    topic: 'pharmacology',
    category: 'Sedation & Adjuncts',
    front: 'Dexmedetomidine — Mechanism, Properties & Clinical Uses',
    back: `MECHANISM: Selective α-2 adrenergic agonist (8× more selective than clonidine)
Sites: Locus coeruleus (sedation/analgesia), spinal cord, peripheral nerves

PHARMACOLOGICAL PROFILE:
• Sedation WITHOUT respiratory depression (unique — safe in spontaneously breathing patients)
• Analgesia (reduces opioid requirements)
• Anxiolysis with cooperative sedation ("rousable sedation")
• ↓ HR, ↓ BP (dose-dependent)

DOSING:
• Loading dose: 0.5–1 mcg/kg IV over 10 min (omit if hemodynamically unstable)
• Maintenance: 0.2–0.7 mcg/kg/h

CLINICAL USES:
• Awake intubation (topicalization + dex provides ideal sedation without apnea)
• ICU sedation (lighter, cooperative sedation → less delirium vs. propofol/benzodiazepines)
• MAC cases (balanced sedation with LA)
• Pediatric: non-intubating procedures, MRI

SIDE EFFECTS:
• Bradycardia (have atropine/glycopyrrolate ready)
• Hypotension
• Possible hypertension with bolus (α-2B peripheral activation)
• "Dexmedetomidine paradox" — high doses → sedation then hypertension on withdrawal`,
  },
  {
    id: 'ph-fc-012',
    topic: 'pharmacology',
    category: 'Neuromuscular Blockers',
    front: 'Cisatracurium — Why Use It in Hepatic or Renal Failure?',
    back: `CLASS: Non-depolarizing benzylisoquinolinium NMB

DOSE: 0.15–0.2 mg/kg IV (onset 2–3 min, duration 40–60 min)
Maintenance: 1–3 mcg/kg/min infusion

UNIQUE METABOLISM: Hofmann elimination + ester hydrolysis
• Both are spontaneous, non-enzymatic, organ-independent
• Metabolites: laudanosine (CNS stimulant — accumulates in renal failure; rarely clinically significant at usual doses)

ADVANTAGES:
• Ideal for: hepatic failure, renal failure (no dose adjustment needed), ICU infusions
• No histamine release (unlike atracurium at clinical doses)
• Predictable kinetics regardless of organ function

vs. ATRACURIUM:
• Both use Hofmann elimination, but cisatracurium is the isomer with less histamine release
• Cisatracurium: 3–4× more potent → lower doses → less laudanosine

REVERSAL: Neostigmine (or spontaneous recovery) — NOT sugammadex (benzylisoquinolinium, not aminosteroid)

REMEMBER: "CIS" = safe in the ICU setting with organ failure. Use when rocuronium-sugammadex is not available or appropriate.`,
  },
];

export const questions = [
  {
    id: 'ph-q-001',
    topic: 'pharmacology',
    stem: 'A 75 kg male with a full stomach requires emergency RSI for bowel obstruction. He is hemodynamically stable with no contraindications. Which induction agent + NMB combination provides the fastest RSI conditions?',
    options: [
      'Propofol 150 mg + rocuronium 45 mg',
      'Ketamine 150 mg + succinylcholine 113 mg',
      'Etomidate 20 mg + rocuronium 45 mg',
      'Propofol 150 mg + vecuronium 8 mg',
    ],
    correctIndex: 1,
    explanation: 'Ketamine 1.5–2 mg/kg (112 mg) + succinylcholine 1.5 mg/kg (113 mg) provides the fastest RSI. Succinylcholine at 1–1.5 mg/kg delivers intubating conditions in 45–60 seconds. Rocuronium 0.6 mg/kg (option A/C) takes 90 s at standard doses — use 1.2 mg/kg for RSI equivalence. Ketamine is preferred here for its sympathomimetic support. Vecuronium (option D) has a 3–5 min onset — not appropriate for RSI.',
  },
  {
    id: 'ph-q-002',
    topic: 'pharmacology',
    stem: 'After 72 hours of propofol infusion at 6 mg/kg/h in the ICU, a patient develops new-onset metabolic acidosis (pH 7.15), elevated CK (12,000 U/L), lipemia, and reduced cardiac output. What is the most likely diagnosis?',
    options: [
      'Sepsis-related multi-organ failure',
      'Propofol infusion syndrome (PRIS)',
      'Hypertriglyceridemia from TPN',
      'Acute hepatic failure',
    ],
    correctIndex: 1,
    explanation: 'Propofol infusion syndrome (PRIS) presents with the classic triad of: metabolic/lactic acidosis, rhabdomyolysis (elevated CK), and cardiac dysfunction (arrhythmias, heart failure). Lipemia from the propofol vehicle and hypertriglyceridemia are common. Risk factors: dose >4–5 mg/kg/h for >48 hours, concurrent catecholamines or steroids, young age, low carbohydrate intake. Treatment: stop propofol, supportive care including hemodialysis. Consider alternative sedation (dexmedetomidine, midazolam).',
  },
  {
    id: 'ph-q-003',
    topic: 'pharmacology',
    stem: 'A 70 kg patient undergoing laparotomy received rocuronium 1.2 mg/kg for RSI. The case ends 15 minutes after intubation and the TOF shows PTC (post-tetanic count) of 1. What is the appropriate sugammadex dose?',
    options: [
      '2 mg/kg (140 mg)',
      '4 mg/kg (280 mg)',
      '8 mg/kg (560 mg)',
      '16 mg/kg (1,120 mg)',
    ],
    correctIndex: 3,
    explanation: 'PTC of 1 after 1.2 mg/kg rocuronium given only 15 minutes ago indicates profound neuromuscular block. For immediate reversal within approximately 15 minutes of a 1.2 mg/kg rocuronium dose, sugammadex 16 mg/kg is required. Dosing guide: 2 mg/kg = moderate block (TOF count ≥2); 4 mg/kg = deep block (PTC 1–2 with NO TOF response at >3 min); 16 mg/kg = immediate/emergency reversal within 3–15 min of 1.2 mg/kg dose.',
  },
  {
    id: 'ph-q-004',
    topic: 'pharmacology',
    stem: 'A patient with a history of chronic hyperkalemia (baseline K⁺ 6.2 mEq/L) requires emergency intubation for respiratory failure. Which NMB is contraindicated?',
    options: [
      'Rocuronium',
      'Cisatracurium',
      'Succinylcholine',
      'Vecuronium',
    ],
    correctIndex: 2,
    explanation: 'Succinylcholine is absolutely contraindicated in this patient. It causes approximately 0.5 mEq/L rise in serum potassium in normal patients through membrane depolarization. In patients with pre-existing hyperkalemia (K⁺ 6.2 mEq/L), this additional rise can precipitate life-threatening ventricular arrhythmias or cardiac arrest. Use rocuronium 1.2 mg/kg for RSI in this patient — with sugammadex immediately available. All non-depolarizing NMBs (rocuronium, vecuronium, cisatracurium) are safe alternatives.',
  },
  {
    id: 'ph-q-005',
    topic: 'pharmacology',
    stem: 'Which volatile anesthetic has the lowest blood:gas partition coefficient, providing the fastest emergence, and what clinical limitation restricts its use?',
    options: [
      'Sevoflurane — cannot be used with CO₂ absorbents',
      'Isoflurane — causes coronary steal in CAD patients',
      'Desflurane — airway irritant, cannot be used for inhalation induction',
      'Nitrous oxide — expands closed gas spaces',
    ],
    correctIndex: 2,
    explanation: 'Desflurane has the lowest blood:gas partition coefficient (0.42) of any commonly used volatile agent, providing the fastest onset and emergence — particularly valuable in obese patients and long cases. Its major limitation is that it is a potent airway irritant that causes coughing, laryngospasm, and bronchospasm with rapid increases in concentration. It CANNOT be used for inhalation induction (unlike sevoflurane). Additionally, desflurane has the highest global warming potential (~2,500× CO₂) and many institutions are phasing it out for environmental reasons.',
  },
];

export const cases = [
  {
    id: 'ph-case-001',
    topic: 'pharmacology',
    title: 'RSI in a Hemodynamically Unstable Trauma Patient',
    intro: 'A 38-year-old male arrives via EMS after a motor vehicle collision. He is combative (GCS 11), BP 78/50, HR 135, SpO₂ 91% on 15L NRB mask. Massive transfusion protocol has been activated. His abdomen is rigid and FAST exam is positive. You need to secure the airway urgently.',
    steps: [
      {
        prompt: 'Given his hemodynamics, which induction agent is most appropriate?',
        options: [
          'Propofol 2 mg/kg — fast onset and reduces ICP',
          'Etomidate 0.3 mg/kg — hemodynamic stability',
          'Ketamine 1.5 mg/kg — sympathomimetic, maintains BP',
          'Midazolam 0.1 mg/kg — minimal cardiovascular effects',
        ],
        correctIndex: 2,
        explanation: 'Ketamine 1.5 mg/kg is the best choice in hemorrhagic shock. Its sympathomimetic properties (catecholamine release) maintain or increase HR and BP during induction. Note: In patients who are catecholamine-depleted (prolonged shock), ketamine can paradoxically cause hypotension as its own cardiovascular depressant effects predominate. Etomidate is a reasonable second choice. Propofol causes significant hypotension through ↓SVR and ↓contractility — dangerous in this setting.',
      },
      {
        prompt: 'He was in a house fire 10 days ago and has extensive burns to both lower extremities. Which NMB do you choose for RSI?',
        options: [
          'Succinylcholine 1.5 mg/kg — fastest onset',
          'Rocuronium 1.2 mg/kg — RSI dose, no hyperkalemia risk',
          'Vecuronium 0.1 mg/kg — intermediate duration',
          'Cisatracurium 0.2 mg/kg — organ-independent metabolism',
        ],
        correctIndex: 1,
        explanation: 'Burns >24 hours cause upregulation (proliferation) of extrajunctional acetylcholine receptors across the muscle membrane. Succinylcholine activates all these receptors simultaneously → massive potassium efflux → potentially fatal hyperkalemia. This risk appears after 24 hours and can persist for years. Rocuronium 1.2 mg/kg provides equivalent RSI conditions (onset ~60 s) without the hyperkalemia risk. With sugammadex available, this is now the preferred approach for RSI when succinylcholine is contraindicated.',
      },
      {
        prompt: 'Post-intubation, BP drops to 60/35. SpO₂ is now 99% on FiO₂ 1.0. What vasopressor do you start?',
        options: [
          'Phenylephrine 0.3 mcg/kg/min — pure alpha, clean vasoconstriction',
          'Vasopressin 0.03 units/min — catecholamine-resistant shock',
          'Norepinephrine 0.1–0.5 mcg/kg/min — alpha+beta, first-line in shock',
          'Dopamine 10 mcg/kg/min — dopaminergic and adrenergic effects',
        ],
        correctIndex: 2,
        explanation: 'Norepinephrine (alpha-1 + beta-1) is the vasopressor of choice for distributive and hemorrhagic shock. It increases SVR and MAP while maintaining cardiac output via beta-1 stimulation. Phenylephrine (pure alpha) increases afterload without supporting cardiac output — problematic in a patient with compensatory tachycardia and likely reduced preload. Vasopressin is second-line for catecholamine-resistant shock. Remember: vasopressors are a bridge — definitive treatment is hemorrhage control and blood product resuscitation (1:1:1 pRBC:FFP:platelets).',
      },
    ],
  },
  {
    id: 'ph-case-002',
    topic: 'pharmacology',
    title: 'Neuromuscular Blockade Reversal Decision-Making',
    intro: 'A 62-year-old female (75 kg) underwent a 5-hour open colectomy under general anesthesia. She received rocuronium 50 mg for intubation and additional 30 mg 2.5 hours ago. The surgeon closes and you plan to extubate in the OR.',
    steps: [
      {
        prompt: 'Before deciding on reversal, which monitoring approach is the gold standard?',
        options: [
          'Clinical assessment: sustained 5-second head lift and adequate tidal volumes',
          'Qualitative TOF: tactile assessment of fade with peripheral nerve stimulator',
          'Quantitative TOF monitoring (acceleromyography) showing TOF ratio',
          'Forceful grip strength and eye opening to command',
        ],
        correctIndex: 2,
        explanation: 'Quantitative TOF monitoring (acceleromyography or kinemyography) is the gold standard. Clinical tests (head lift, grip) are unreliable — patients can perform a 5-second head lift with a TOF ratio as low as 0.5. Qualitative (tactile) TOF assessment cannot reliably detect fade when the TOF ratio is 0.7–0.9. Only quantitative monitoring confirms TOF ratio ≥0.9, the threshold for safe extubation. Postoperative residual curarization (PORC) at TOF 0.7–0.9 causes subtle but dangerous effects: impaired hypoxic ventilatory response, upper airway obstruction, increased risk of aspiration.',
      },
      {
        prompt: 'Quantitative TOF ratio is 0.35 (TOF count: 4 twitches with fade). Which reversal do you choose?',
        options: [
          'Neostigmine 3.5 mg + glycopyrrolate 0.7 mg IV',
          'Sugammadex 2 mg/kg (150 mg)',
          'Sugammadex 4 mg/kg (300 mg)',
          'Wait for spontaneous recovery to TOF ratio > 0.7, then give neostigmine',
        ],
        correctIndex: 1,
        explanation: 'TOF count 4 with fade and TOF ratio 0.35 represents moderate neuromuscular block. Sugammadex 2 mg/kg is appropriate (TOF count ≥2). It will reliably restore TOF ratio to ≥0.9 within 3 minutes. Neostigmine can be used if TOF count ≥2, but is less reliable with significant fade (TOF 0.35) and has a ceiling effect. Sugammadex 4 mg/kg is for DEEP block (PTC 1–2 with NO twitches on TOF). Waiting risks prolonged apnea and PORC.',
      },
      {
        prompt: 'Three minutes after sugammadex, quantitative TOF ratio is 0.97. The patient is awake, follows commands, sustains head lift × 5 s, EtCO₂ 38 mmHg, SpO₂ 97% on 40% FiO₂. What next?',
        options: [
          'Extubate with suction and RSI equipment immediately available',
          'Wait 30 more minutes to ensure no recurrence of block',
          'Give additional sugammadex 1 mg/kg as a safety margin',
          'Give neostigmine to supplement sugammadex reversal',
        ],
        correctIndex: 0,
        explanation: 'TOF ratio ≥0.9 combined with clinical criteria (awake, cooperative, sustained head lift, adequate ventilatory effort) confirms full reversal. Extubation is safe. No additional pharmacological reversal is needed or appropriate — supplementing sugammadex with neostigmine is pointless (different mechanism) and could cause cholinergic side effects. Sugammadex reversal at these doses is complete and recurrence of NMB is extremely rare. Have suction, bag-mask, and re-intubation equipment ready at all extubations.',
      },
    ],
  },
];

export const references = [
  {
    id: 'ph-ref-001',
    topic: 'pharmacology',
    title: 'Induction Agent Quick Comparison',
    content: `AGENT          | DOSE (mg/kg) | MECHANISM | HEMODYNAMICS | KEY USE CASE
---------------|-------------|-----------|--------------|------------------
Propofol       | 1–2.5       | GABA-A    | ↓BP, ↓HR    | Elective, TIVA, PONV prevention
Ketamine       | 1–2         | NMDA      | ↑BP, ↑HR    | Shock, asthma, pediatric IM
Etomidate      | 0.3         | GABA-A    | Stable       | Hemodynamic instability
Midazolam      | 0.02–0.1    | GABA-A    | Mild ↓BP     | Premedication, procedural sedation
Dexmedetomidine| Loading +   | α-2       | ↓HR, ↓BP    | Awake intubation, cooperative sedation
               | infusion    |           |              |

PEARL: No single induction agent is perfect. Choose based on patient hemodynamics, airway plan, co-morbidities, and PONV risk.

PROPOFOL INFUSION SYNDROME (PRIS):
• Dose: >4–5 mg/kg/h | Duration: >48 h
• Features: Metabolic acidosis, rhabdomyolysis, cardiac failure, lipemia, green urine
• Treatment: STOP propofol, supportive care, consider hemodialysis

KETAMINE CONSIDERATIONS:
• Maintains spontaneous breathing and airway tone (not reflexes!)
• ↑ secretions → pretreat with glycopyrrolate 0.2 mg IV
• Emergence dysphoria → pretreat with midazolam 1–2 mg IV`,
  },
  {
    id: 'ph-ref-002',
    topic: 'pharmacology',
    title: 'Neuromuscular Blocker Comparison & Reversal Guide',
    content: `NEUROMUSCULAR BLOCKERS:

AGENT          | TYPE           | DOSE         | ONSET  | DURATION | REVERSAL
---------------|----------------|--------------|--------|----------|-----------
Succinylcholine| Depolarizing   | 1–1.5 mg/kg  | 45–60s | 10–15 min| Spontaneous (pseudocholinesterase)
Rocuronium     | Aminosteroid   | 0.6 / 1.2*   | 90/60s | 30–60 min| Sugammadex
Vecuronium     | Aminosteroid   | 0.1 mg/kg    | 3–5 min| 25–40 min| Sugammadex or neostigmine
Cisatracurium  | Benzylisoquino.| 0.15–0.2     | 2–3 min| 40–60 min| Neostigmine (NOT sugammadex)
Atracurium     | Benzylisoquino.| 0.5 mg/kg    | 2–3 min| 20–35 min| Neostigmine (NOT sugammadex)

*RSI dose

REVERSAL:
SUGAMMADEX (for aminosteroids — rocuronium, vecuronium):
• 2 mg/kg: moderate block (TOF count ≥2)
• 4 mg/kg: deep block (PTC 1–2, no TOF response)
• 16 mg/kg: immediate/emergency reversal
• Onset: full reversal in 3 minutes
• NO muscarinic side effects

NEOSTIGMINE (for all NMBs except depolarizing):
• Dose: 40–70 mcg/kg (max 5 mg)
• ALWAYS co-administer glycopyrrolate 0.2 mg per 1 mg neostigmine
• Requires TOF count ≥2; ceiling effect — cannot fully reverse deep block
• Risk of PORC — confirm TOF ratio ≥0.9 before extubation

SUCCINYLCHOLINE CONTRAINDICATIONS (hyperkalemia risk >24–48h):
Burns | Denervation (SCI, stroke) | Crush injury | Muscular dystrophy | MH history`,
  },
  {
    id: 'ph-ref-003',
    topic: 'pharmacology',
    title: 'Vasopressor & Inotrope Quick Reference',
    content: `VASOPRESSORS & INOTROPES:

AGENT           | RECEPTORS      | DOSE                    | PRIMARY USE
----------------|----------------|-------------------------|---------------------------
Norepinephrine  | α1 >> β1       | 0.01–3 mcg/kg/min       | First-line: septic shock
Epinephrine     | α + β (all)    | 0.01–1 mcg/kg/min IV    | Anaphylaxis, cardiac arrest
                |                | 0.3 mg IM (anaphylaxis) |
Phenylephrine   | α1 (pure)      | 50–200 mcg bolus        | Spinal hypotension, SVT
                |                | 0.1–0.5 mcg/kg/min      | Avoid if ↓CO
Vasopressin     | V1             | 0.03 units/min (FIXED)  | Catecholamine-resistant shock
Dopamine        | D1, β1, α1     | 1–20 mcg/kg/min         | Largely replaced; arrhythmogenic
Dobutamine      | β1 >> β2       | 2–20 mcg/kg/min         | Cardiogenic shock (↑CO)
Milrinone       | PDE-3 inhibitor| 0.375–0.75 mcg/kg/min   | Right heart failure, cardiac surgery

ANAPHYLAXIS PROTOCOL:
1. Epinephrine FIRST — 0.3 mg IM (lateral thigh) or 10–100 mcg IV if arrest/collapse
2. Remove trigger, 100% O₂, large-bore IV access, supine + legs elevated
3. Fluid bolus 500–1000 mL crystalloid
4. H1 blocker (diphenhydramine 25–50 mg) + H2 blocker (ranitidine 50 mg) — adjuncts
5. Hydrocortisone 200 mg IV — prevents biphasic reaction (not first-line)
6. ICU admission for 6–24 h monitoring (biphasic anaphylaxis risk)

SPINAL HYPOTENSION:
• Phenylephrine preferred in obstetric patients (uteroplacental flow)
• Ephedrine alternative: mixed α+β, crosses placenta less than phenylephrine`,
  },
];
