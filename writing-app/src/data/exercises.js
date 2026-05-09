// ─── Grammar Fix Exercises ────────────────────────────────────────────────────
// Each exercise targets a specific, named grammar concept.
// Research basis: "noticing" hypothesis (Schmidt 1990) — spotting errors in
// context makes rules salient and accelerates acquisition.

export const grammarExercises = [
  {
    type: 'grammarFix',
    id: 'g1',
    concept: 'Subject-Verb Agreement',
    instruction: 'Select the option that correctly identifies and fixes the error.',
    sentence: 'Each of the patients were given a pre-operative assessment.',
    options: [
      'No error — the sentence is correct.',
      'Change "were" to "was" — "each" is singular and governs the verb.',
      'Change "given" to "gave".',
      'Change "pre-operative" to "preoperative".',
    ],
    correctIndex: 1,
    fixedSentence: 'Each of the patients was given a pre-operative assessment.',
    explanation:
      '"Each" is a singular indefinite pronoun and takes a singular verb ("was"), even when the prepositional phrase that follows it ("of the patients") contains a plural noun. The true subject is "each," not "patients."',
  },
  {
    type: 'grammarFix',
    id: 'g2',
    concept: 'Fewer vs. Less',
    instruction: 'Select the option that correctly identifies and fixes the error.',
    sentence: 'Less patients reported post-operative pain under the new protocol.',
    options: [
      'No error — the sentence is correct.',
      'Change "Less" to "Fewer" — use "fewer" with countable nouns.',
      'Change "reported" to "have reported".',
      'Add a comma after "pain".',
    ],
    correctIndex: 1,
    fixedSentence: 'Fewer patients reported post-operative pain under the new protocol.',
    explanation:
      'Use "fewer" with countable nouns (people, items, cases). Use "less" with uncountable quantities (time, fluid, effort). Because patients can be individually counted, "fewer" is the correct choice.',
  },
  {
    type: 'grammarFix',
    id: 'g3',
    concept: 'Affect vs. Effect',
    instruction: 'Select the option that correctly identifies and fixes the error.',
    sentence: "The medication effected the patient's blood pressure within minutes.",
    options: [
      'No error — the sentence is correct.',
      'Change "effected" to "affected" — "affect" is the verb meaning to influence.',
      'Change "within" to "in".',
      'Change "medication" to "drug".',
    ],
    correctIndex: 1,
    fixedSentence: "The medication affected the patient's blood pressure within minutes.",
    explanation:
      '"Affect" is almost always a verb meaning to influence or have an impact on. "Effect" is almost always a noun meaning the result. The medication influenced blood pressure, so use the verb "affected." (Exception: "to effect a change" means to bring it about — a rare usage.)',
  },
  {
    type: 'grammarFix',
    id: 'g4',
    concept: 'Pronoun Case',
    instruction: 'Select the option that correctly identifies and fixes the error.',
    sentence: 'Between you and I, the revised dosing schedule is much safer.',
    options: [
      'No error — the sentence is correct.',
      'Change "I" to "me" — object pronouns follow prepositions.',
      'Change "Between" to "Among".',
      'Change "much" to "far".',
    ],
    correctIndex: 1,
    fixedSentence: 'Between you and me, the revised dosing schedule is much safer.',
    explanation:
      'Prepositions (between, for, to, with) require object pronouns: me, him, her, us, them. "Between you and me" is always correct — never "between you and I." A quick test: say the pronoun alone ("between I" sounds wrong; "between me" sounds right).',
  },
  {
    type: 'grammarFix',
    id: 'g5',
    concept: 'Dangling Modifier',
    instruction: 'Select the option that correctly identifies and fixes the error.',
    sentence: 'Having reviewed the chart, the surgery was scheduled for Tuesday.',
    options: [
      'No error — the sentence is correct.',
      'Rewrite: "Having reviewed the chart, the team scheduled the surgery for Tuesday."',
      'Add a comma after "Tuesday".',
      'Change "Having reviewed" to "After reviewing".',
    ],
    correctIndex: 1,
    fixedSentence: 'Having reviewed the chart, the team scheduled the surgery for Tuesday.',
    explanation:
      'A participial phrase must describe the subject of the main clause. As written, "Having reviewed the chart" dangles — it grammatically modifies "surgery," which cannot review a chart. The subject of the main clause must be the one who did the reviewing.',
  },
  {
    type: 'grammarFix',
    id: 'g6',
    concept: 'Parallel Structure',
    instruction: 'Select the option that correctly identifies and fixes the error.',
    sentence:
      'The attending was responsible for intubating the patient, monitoring vital signs, and to document the procedure.',
    options: [
      'No error — the sentence is correct.',
      'Change "to document" to "documenting" — all list items must share the same form.',
      'Change "intubating" to "intubate".',
      'Remove the comma after "signs".',
    ],
    correctIndex: 1,
    fixedSentence:
      'The attending was responsible for intubating the patient, monitoring vital signs, and documenting the procedure.',
    explanation:
      'Items in a series must be grammatically parallel. Because the list begins with gerunds ("intubating," "monitoring"), the final item must also be a gerund: "documenting." Mixing a gerund and an infinitive ("to document") breaks the parallel.',
  },
  {
    type: 'grammarFix',
    id: 'g7',
    concept: "Its vs. It's",
    instruction: 'Select the option that correctly identifies and fixes the error.',
    sentence: "Its critical to verify the patient's allergies before administering any agent.",
    options: [
      'No error — the sentence is correct.',
      "Change \"Its\" to \"It's\" — the contraction of \"it is\" requires an apostrophe.",
      'Change "verify" to "verified".',
      'Change "administering" to "administration of".',
    ],
    correctIndex: 1,
    fixedSentence: "It's critical to verify the patient's allergies before administering any agent.",
    explanation:
      '"It\'s" (apostrophe) is the contraction of "it is." "Its" (no apostrophe) is the possessive pronoun. A reliable test: substitute "it is" — if the sentence still makes sense, use the apostrophe.',
  },
  {
    type: 'grammarFix',
    id: 'g8',
    concept: 'Comma Splice',
    instruction: 'Select the option that correctly identifies and fixes the error.',
    sentence: "The patient's oxygen saturation dropped, we immediately adjusted the airway.",
    options: [
      'No error — the sentence is correct.',
      'Replace the comma with a semicolon, OR add "so" after the comma.',
      'Add "and" before "we" only.',
      'Both B and the option with "and" are correct fixes.',
    ],
    correctIndex: 3,
    fixedSentence:
      "The patient's oxygen saturation dropped, so we immediately adjusted the airway.",
    explanation:
      'A comma splice joins two independent clauses with only a comma. Fix it by: (1) replacing the comma with a semicolon, (2) adding a coordinating conjunction (so, and, but), or (3) making one clause subordinate. Multiple correct fixes exist.',
  },
  {
    type: 'grammarFix',
    id: 'g9',
    concept: 'Who vs. Whom',
    instruction: 'Select the option that correctly identifies and fixes the error.',
    sentence: 'The resident who I mentored last year is now practicing independently.',
    options: [
      'No error — the sentence is correct.',
      'Change "who" to "whom" — it functions as the object of "mentored."',
      'Change "who" to "that".',
      'Change "mentored" to "have mentored".',
    ],
    correctIndex: 1,
    fixedSentence: 'The resident whom I mentored last year is now practicing independently.',
    explanation:
      '"Whom" is an object pronoun (like him, her, them). Substitution test: "I mentored him" → "him" → use "whom." "Who" is a subject pronoun used when it performs the action: "The resident who performed the procedure."',
  },
  {
    type: 'grammarFix',
    id: 'g10',
    concept: 'Then vs. Than',
    instruction: 'Select the option that correctly identifies and fixes the error.',
    sentence: 'The propofol induction was faster then we anticipated.',
    options: [
      'No error — the sentence is correct.',
      'Change "then" to "than" — use "than" for comparisons.',
      'Change "faster" to "more fast".',
      'Change "anticipated" to "expected".',
    ],
    correctIndex: 1,
    fixedSentence: 'The propofol induction was faster than we anticipated.',
    explanation:
      '"Than" is used for comparisons (faster than, more than, rather than). "Then" relates to time or sequence (first do this, then that). Any time you are comparing two things, use "than."',
  },
  {
    type: 'grammarFix',
    id: 'g11',
    concept: 'Active vs. Passive Voice',
    instruction: 'Which revision makes this sentence more direct and clear?',
    sentence: 'The anesthesia was administered by the attending physician before the first incision.',
    options: [
      'No change needed — passive voice is appropriate here.',
      '"The attending physician administered the anesthesia before the first incision."',
      '"Before the first incision, anesthesia was being administered."',
      '"Anesthesia administration occurred prior to the first incision."',
    ],
    correctIndex: 1,
    fixedSentence: 'The attending physician administered the anesthesia before the first incision.',
    explanation:
      'Active voice places the agent (who did the action) at the front and is generally shorter and more direct. Passive voice is appropriate when the agent is unknown or less important than the recipient — but when you know who acted, active voice is usually stronger.',
  },
  {
    type: 'grammarFix',
    id: 'g12',
    concept: 'Misplaced Modifier',
    instruction: 'Select the option that correctly identifies and fixes the error.',
    sentence: 'We only treated three patients with that complication last quarter.',
    options: [
      'No error — "only" is correctly placed.',
      '"We treated only three patients with that complication last quarter." — place "only" next to what it modifies.',
      'Change "last quarter" to "in the last quarter".',
      'Change "treated" to "had treated".',
    ],
    correctIndex: 1,
    fixedSentence: 'We treated only three patients with that complication last quarter.',
    explanation:
      '"Only" should appear immediately before the word or phrase it limits. "We only treated" implies treating was the only thing we did with those patients. "Treated only three patients" correctly restricts the number of patients.',
  },
  {
    type: 'grammarFix',
    id: 'g13',
    concept: 'Redundancy',
    instruction: 'Which revision eliminates the wordiness most effectively?',
    sentence: 'In my personal opinion, I believe that the new protocol is an improvement.',
    options: [
      'No change needed.',
      '"I believe the new protocol is an improvement."',
      '"In my opinion, the new protocol is an improvement."',
      'Both B and C correctly eliminate the redundancy.',
    ],
    correctIndex: 3,
    fixedSentence: 'I believe the new protocol is an improvement.',
    explanation:
      '"In my personal opinion, I believe that" stacks three redundant elements: "opinion" is personal by definition; "I believe" already signals a personal view; "that" is often optional. Either version B or C removes the clutter — both are correct revisions.',
  },
  {
    type: 'grammarFix',
    id: 'g14',
    concept: 'Apostrophes in Plurals',
    instruction: 'Select the option that correctly identifies and fixes the error.',
    sentence: "The attending's reviewed all chart's before morning rounds.",
    options: [
      'No error — the sentence is correct.',
      '"The attendings reviewed all charts before morning rounds." — no apostrophes for simple plurals.',
      '"The attendings\' reviewed all charts before morning rounds."',
      '"The attendings reviewed all chart\'s before morning rounds."',
    ],
    correctIndex: 1,
    fixedSentence: 'The attendings reviewed all charts before morning rounds.',
    explanation:
      "Apostrophes mark possession or contraction — never plain plurals. To pluralize, simply add -s or -es. \"Attendings\" and \"charts\" are straightforward plurals. The apostrophe in \"attending's\" suggests possession; the apostrophe in \"chart's\" is just wrong.",
  },
  {
    type: 'grammarFix',
    id: 'g15',
    concept: 'Neither…Nor Agreement',
    instruction: 'Select the option that correctly identifies and fixes the error.',
    sentence: 'Neither the surgeon nor the nurses was prepared for the unexpected complication.',
    options: [
      'No error — the sentence is correct.',
      'Change "was" to "were" — the verb agrees with the nearer subject ("nurses").',
      'Change "nor" to "or".',
      'Change "unexpected" to "unforeseen".',
    ],
    correctIndex: 1,
    fixedSentence:
      'Neither the surgeon nor the nurses were prepared for the unexpected complication.',
    explanation:
      'With "neither…nor" and "either…or," the verb agrees with the subject closest to it (the proximity rule). "Nurses" is plural and is the nearer subject, so the verb must be plural: "were."',
  },
]

// ─── Word Choice Exercises ────────────────────────────────────────────────────
// Targets commonly confused pairs that trip up professional writers.
// Research basis: explicit vocabulary instruction (Nation 2001) — direct
// instruction on confusable pairs yields faster, more durable learning than
// exposure alone.

export const wordChoiceExercises = [
  {
    type: 'wordChoice',
    id: 'w1',
    concept: 'Ensure / Insure / Assure',
    instruction: 'Choose the word that correctly completes the sentence.',
    before: 'Before the procedure, I took time to ',
    after: ' the patient that the risks were minimal.',
    options: ['ensure', 'insure', 'assure'],
    correctIndex: 2,
    explanation:
      '"Assure" is used with a person as its object — to give someone confidence or relieve their doubts. "Ensure" means to make certain something happens (no person object). "Insure" relates to financial coverage.',
  },
  {
    type: 'wordChoice',
    id: 'w2',
    concept: 'Imply / Infer',
    instruction: 'Choose the word that correctly completes the sentence.',
    before: 'The chart notes seemed to ',
    after: ' that the previous team had overlooked the drug interaction.',
    options: ['imply', 'infer'],
    correctIndex: 0,
    explanation:
      'Speakers and writers imply (suggest indirectly). Readers and listeners infer (draw a conclusion). The chart notes are doing the suggesting, so "imply" is correct. A reader of the notes would "infer" the oversight.',
  },
  {
    type: 'wordChoice',
    id: 'w3',
    concept: 'Compose / Comprise',
    instruction: 'Choose the word that correctly completes the sentence.',
    before: 'The anesthesia care team is ',
    after: ' of an attending, a CRNA, and two residents.',
    options: ['composed', 'comprised'],
    correctIndex: 0,
    explanation:
      'The whole comprises its parts ("The team comprises an attending, a CRNA, and two residents"). "Is composed of" is always safe. "Is comprised of" — the phrase that sounds natural here — is widely considered incorrect because "comprise" already means to include or consist of.',
  },
  {
    type: 'wordChoice',
    id: 'w4',
    concept: 'Further / Farther',
    instruction: 'Choose the word that correctly completes the sentence.',
    before: "We need to look ",
    after: " into the patient's medication history before proceeding.",
    options: ['further', 'farther'],
    correctIndex: 0,
    explanation:
      '"Further" refers to degree, extent, or abstract distance ("look further into a question"). "Farther" refers to measurable physical distance ("the ICU is farther down the hall"). When in doubt with figurative distance, use "further."',
  },
  {
    type: 'wordChoice',
    id: 'w5',
    concept: 'Principal / Principle',
    instruction: 'Choose the word that correctly completes the sentence.',
    before: 'The ',
    after: ' concern in any anesthetic plan is patient safety.',
    options: ['principal', 'principle'],
    correctIndex: 0,
    explanation:
      '"Principal" as an adjective means main or most important. As a noun, it refers to a key person or a financial term. "Principle" is always a noun meaning a rule, belief, or fundamental truth ("the principle of informed consent").',
  },
  {
    type: 'wordChoice',
    id: 'w6',
    concept: 'That / Which',
    instruction: 'Choose the word that correctly completes the sentence.',
    before: 'The drug ',
    after: ' caused the allergic reaction had been administered the previous day.',
    options: ['that', 'which'],
    correctIndex: 0,
    explanation:
      '"That" introduces a restrictive clause — essential information that identifies which noun you mean (no commas). "Which" introduces a non-restrictive clause — bonus information you could remove (use commas). Here the clause identifies which specific drug, so "that" is correct.',
  },
  {
    type: 'wordChoice',
    id: 'w7',
    concept: 'Lie / Lay',
    instruction: 'Choose the correct verb form to complete the sentence.',
    before: 'After the procedure, the patient should ',
    after: ' still for at least thirty minutes.',
    options: ['lie', 'lay'],
    correctIndex: 0,
    explanation:
      '"Lie" (lie – lay – lain) means to recline and needs no object. "Lay" (lay – laid – laid) means to place something and always needs an object. "The patient should lie still" (no object). "Please lay the chart on the desk" (chart = object).',
  },
  {
    type: 'wordChoice',
    id: 'w8',
    concept: 'Among / Between',
    instruction: 'Choose the word that correctly completes the sentence.',
    before: 'The decision was divided ',
    after: ' the three members of the surgical team.',
    options: ['among', 'between'],
    correctIndex: 0,
    explanation:
      'Traditionally, "between" applies to exactly two parties; "among" applies to three or more. Since there are three team members here, "among" is correct.',
  },
  {
    type: 'wordChoice',
    id: 'w9',
    concept: 'Adverse / Averse',
    instruction: 'Choose the word that correctly completes the sentence.',
    before: 'We documented the ',
    after: " reaction in the patient's permanent record.",
    options: ['adverse', 'averse'],
    correctIndex: 0,
    explanation:
      '"Adverse" means harmful or unfavorable — used with events, conditions, and reactions. "Averse" means having a strong dislike or reluctance — used with people ("risk-averse," "not averse to change"). A reaction is adverse; a person is averse.',
  },
  {
    type: 'wordChoice',
    id: 'w10',
    concept: 'Whether / Weather',
    instruction: 'Choose the word that correctly completes the sentence.',
    before: 'The team debated ',
    after: " to proceed with the operation given the patient's condition.",
    options: ['whether', 'weather'],
    correctIndex: 0,
    explanation:
      '"Whether" introduces alternatives or indirect questions (whether to do X or not). "Weather" refers to atmospheric conditions. In formal writing, prefer "whether" over "if" when presenting alternatives.',
  },
  {
    type: 'wordChoice',
    id: 'w11',
    concept: 'Continuous / Continual',
    instruction: 'Choose the word that correctly completes the sentence.',
    before: 'The monitor provided ',
    after: " feedback on the patient's oxygen saturation throughout the procedure.",
    options: ['continuous', 'continual'],
    correctIndex: 0,
    explanation:
      '"Continuous" means uninterrupted, without pause. "Continual" means recurring regularly but with intervals in between. A pulse oximeter provides an unbroken stream of data, so "continuous" is correct.',
  },
  {
    type: 'wordChoice',
    id: 'w12',
    concept: 'Disinterested / Uninterested',
    instruction: 'Choose the word that correctly completes the sentence.',
    before: 'We need a ',
    after: ' party to review the outcome data objectively.',
    options: ['disinterested', 'uninterested'],
    correctIndex: 0,
    explanation:
      '"Disinterested" means impartial — having no personal stake in the outcome. A good quality in a reviewer. "Uninterested" means bored or lacking curiosity. Here, you want someone objective, not someone who is merely indifferent.',
  },
  {
    type: 'wordChoice',
    id: 'w13',
    concept: 'Nauseated / Nauseous',
    instruction: 'Choose the word that correctly completes the sentence.',
    before: 'Several patients reported feeling ',
    after: ' after receiving the opioid analgesic.',
    options: ['nauseated', 'nauseous'],
    correctIndex: 0,
    explanation:
      'Strictly, "nauseous" means causing nausea; "nauseated" means experiencing nausea. In clinical writing, "nauseated" is the precise choice for a patient experiencing the sensation. ("The smell was nauseous" vs. "The patient felt nauseated.")',
  },
  {
    type: 'wordChoice',
    id: 'w14',
    concept: 'Precede / Proceed',
    instruction: 'Choose the word that correctly completes the sentence.',
    before: 'Informed consent must ',
    after: ' the administration of any anesthetic agent.',
    options: ['precede', 'proceed'],
    correctIndex: 0,
    explanation:
      '"Precede" means to come before in time or order. "Proceed" means to continue or move forward. Consent comes before anesthesia, so "precede" is correct.',
  },
  {
    type: 'wordChoice',
    id: 'w15',
    concept: 'Formerly / Formally',
    instruction: 'Choose the word that correctly completes the sentence.',
    before: 'The new resident was ',
    after: ' a Navy flight surgeon before joining our program.',
    options: ['formerly', 'formally'],
    correctIndex: 0,
    explanation:
      '"Formerly" means previously, in the past. "Formally" means in a formal or official manner. The resident was previously a flight surgeon — "formerly" is correct.',
  },
]

// ─── Sentence Combining Exercises ────────────────────────────────────────────
// Research basis: O'Hare (1973), Hillocks (1986) — sentence combining is among
// the most effective writing instructional techniques, producing measurable
// gains in syntactic maturity and overall writing quality.

export const sentenceCombineExercises = [
  {
    type: 'sentenceCombine',
    id: 's1',
    concept: 'Participial Phrase',
    instruction: 'Combine these three sentences into one smooth, well-constructed sentence.',
    sentences: [
      'The patient arrived at 6:45 AM.',
      'She had fasted since midnight.',
      'She appeared anxious about the upcoming procedure.',
    ],
    hint: 'Open with a participial phrase based on one of the details, then state the subject with the remaining information.',
    exampleAnswer:
      'Having fasted since midnight, the patient arrived at 6:45 AM appearing anxious about the upcoming procedure.',
  },
  {
    type: 'sentenceCombine',
    id: 's2',
    concept: 'Relative Clause',
    instruction: 'Combine these sentences into one using a relative clause.',
    sentences: [
      'The new monitoring system detects arrhythmias in real time.',
      'The system was installed last month.',
      'It has already prevented two adverse events.',
    ],
    hint: 'Use "which" to embed one fact about the system mid-sentence.',
    exampleAnswer:
      'The new monitoring system, which was installed last month, detects arrhythmias in real time and has already prevented two adverse events.',
  },
  {
    type: 'sentenceCombine',
    id: 's3',
    concept: 'Eliminating Redundancy',
    instruction: 'Combine these into one concise sentence, eliminating repeated ideas.',
    sentences: [
      'The pre-op checklist was completed.',
      'All items on the checklist were reviewed.',
      'The surgical team signed off on the checklist.',
    ],
    hint: '"Completed," "reviewed," and "signed off" overlap — consolidate into one clear action.',
    exampleAnswer:
      'The surgical team completed and signed off on the pre-op checklist.',
  },
  {
    type: 'sentenceCombine',
    id: 's4',
    concept: 'Cause and Effect',
    instruction: 'Combine these into one sentence that clearly shows the cause-and-effect relationship.',
    sentences: [
      'The patient had a predicted difficult airway.',
      'We prepared a video laryngoscope.',
      'We also requested backup from a colleague.',
    ],
    hint: 'Use "because" or "given that" to show why the team took action.',
    exampleAnswer:
      "Because the patient had a predicted difficult airway, we prepared a video laryngoscope and requested backup from a colleague.",
  },
  {
    type: 'sentenceCombine',
    id: 's5',
    concept: 'Contrast and Concession',
    instruction: 'Combine these into one sentence that highlights the contrast.',
    sentences: [
      'The morning rounds were uneventful.',
      'The afternoon brought a series of unexpected complications.',
    ],
    hint: 'Use "while," "although," or "whereas" to set up the contrast.',
    exampleAnswer:
      'While the morning rounds were uneventful, the afternoon brought a series of unexpected complications.',
  },
  {
    type: 'sentenceCombine',
    id: 's6',
    concept: 'Adverbial Detail',
    instruction: 'Combine these into one rich sentence by embedding the descriptive details naturally.',
    sentences: [
      'The attending explained the risks.',
      'She spoke clearly and used plain language.',
      'The patient nodded with understanding.',
    ],
    hint: 'Use an adverb or adverbial phrase to describe how she spoke, then show the result.',
    exampleAnswer:
      'The attending explained the risks clearly and in plain language, and the patient nodded with understanding.',
  },
  {
    type: 'sentenceCombine',
    id: 's7',
    concept: 'Appositive Phrase',
    instruction: 'Combine these sentences using an appositive phrase.',
    sentences: [
      'Dr. Reyes is the chief of anesthesiology.',
      'Dr. Reyes presented the new protocol at grand rounds.',
    ],
    hint: 'An appositive renames the subject in a noun phrase set off by commas.',
    exampleAnswer:
      'Dr. Reyes, the chief of anesthesiology, presented the new protocol at grand rounds.',
  },
  {
    type: 'sentenceCombine',
    id: 's8',
    concept: 'Temporal Subordination',
    instruction: 'Combine these to show a clear sequence of events.',
    sentences: [
      "We reviewed the patient's allergies.",
      'We confirmed the dosage with the pharmacist.',
      'Then we proceeded with induction.',
    ],
    hint: 'Use "after" or "once" to connect the preparatory steps to the final action.',
    exampleAnswer:
      "After reviewing the patient's allergies and confirming the dosage with the pharmacist, we proceeded with induction.",
  },
  {
    type: 'sentenceCombine',
    id: 's9',
    concept: 'Concession',
    instruction: 'Combine these to show the second fact is surprising given the first.',
    sentences: [
      'The patient had a BMI of 44.',
      'The intubation was entirely uncomplicated.',
    ],
    hint: 'Use "despite," "although," or "even though" to set up the concession.',
    exampleAnswer:
      'Although the patient had a BMI of 44, the intubation was entirely uncomplicated.',
  },
  {
    type: 'sentenceCombine',
    id: 's10',
    concept: 'Infinitive of Purpose',
    instruction: 'Combine these to show that one action was done for a specific purpose.',
    sentences: [
      'The team called a time-out.',
      'They wanted to confirm the correct patient, procedure, and surgical site.',
    ],
    hint: 'Use "to" or "in order to" to express purpose.',
    exampleAnswer:
      'The team called a time-out to confirm the correct patient, procedure, and surgical site.',
  },
]

// ─── Writing Prompts ──────────────────────────────────────────────────────────
// Research basis: fluency writing (Krashen 1994), reflective practice (Schön 1983).
// Short daily writing builds automaticity and compositional confidence.

export const writingPrompts = [
  {
    type: 'writingPrompt',
    id: 'p1',
    concept: 'Professional Reflection',
    instruction: 'Write 3–5 complete sentences in response to this prompt.',
    prompt: 'Describe a moment in your career when clear communication made a real difference in patient care.',
    tip: 'Start with a specific detail — a place, a sound, a name — to ground your reader before you explain the significance.',
    minWords: 40,
  },
  {
    type: 'writingPrompt',
    id: 'p2',
    concept: 'Plain-Language Writing',
    instruction: 'Write 3–5 complete sentences in response to this prompt.',
    prompt: 'Explain what general anesthesia feels like to a nervous 12-year-old, using no medical jargon.',
    tip: 'Use a simple analogy (like pressing pause on a movie) and keep your tone calm and reassuring.',
    minWords: 40,
  },
  {
    type: 'writingPrompt',
    id: 'p3',
    concept: 'Descriptive Writing',
    instruction: 'Write 3–5 complete sentences in response to this prompt.',
    prompt: 'Describe the atmosphere of an operating room at 6 AM — the sights, sounds, and feeling in the room.',
    tip: 'Engage at least two senses. Choose specific, concrete details over vague generalizations.',
    minWords: 40,
  },
  {
    type: 'writingPrompt',
    id: 'p4',
    concept: 'Persuasive Writing',
    instruction: 'Write 3–5 complete sentences in response to this prompt.',
    prompt: 'Make the case for one change to your workplace that would improve team communication or patient safety.',
    tip: 'State your recommendation clearly in the first sentence, then give your two strongest supporting reasons.',
    minWords: 40,
  },
  {
    type: 'writingPrompt',
    id: 'p5',
    concept: 'Narrative Writing',
    instruction: 'Write 3–5 complete sentences in response to this prompt.',
    prompt: 'Describe a time when something did not go as planned at work, and what you did next.',
    tip: 'Good narratives have three beats: situation → complication → response. Try to touch all three.',
    minWords: 40,
  },
  {
    type: 'writingPrompt',
    id: 'p6',
    concept: 'Explanatory Writing',
    instruction: 'Write 3–5 complete sentences in response to this prompt.',
    prompt: 'Explain why you chose anesthesiology as your specialty, as if writing a brief column for a medical school newsletter.',
    tip: 'Avoid generic phrases like "I like helping people." What specific, unique aspect drew you to this field?',
    minWords: 40,
  },
  {
    type: 'writingPrompt',
    id: 'p7',
    concept: 'Reflective Writing',
    instruction: 'Write 3–5 complete sentences in response to this prompt.',
    prompt: 'Reflect on one thing you learned this week — at work, from a patient, or from something you read.',
    tip: 'Reflective writing has two parts: what happened, and what it means. Include both.',
    minWords: 40,
  },
  {
    type: 'writingPrompt',
    id: 'p8',
    concept: 'Audience Awareness',
    instruction: 'Write 2–3 sentences for each version.',
    prompt: 'Describe your job to two different audiences: first to a colleague, then to someone who has never been inside a hospital.',
    tip: 'Notice how your vocabulary, sentence length, and analogies shift depending on who is reading.',
    minWords: 50,
  },
]

// ─── Session Generator ────────────────────────────────────────────────────────
// Builds a 7-exercise session: 2 grammar, 2 word choice, 2 sentence combine, 1 prompt.
// Interleaved to vary the cognitive demand and keep engagement high.

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5)
}

export function generateSession() {
  const [g1, g2] = shuffle(grammarExercises)
  const [w1, w2] = shuffle(wordChoiceExercises)
  const [s1, s2] = shuffle(sentenceCombineExercises)
  const [p1] = shuffle(writingPrompts)

  return [g1, w1, s1, g2, w2, s2, p1]
}

// Points per exercise type
export const POINTS = {
  grammarFix: 10,
  wordChoice: 10,
  sentenceCombine: 15,
  writingPrompt: 25,
}

export const MAX_SCORE =
  grammarExercises.length > 0
    ? 2 * POINTS.grammarFix + 2 * POINTS.wordChoice + 2 * POINTS.sentenceCombine + POINTS.writingPrompt
    : 0
// = 20 + 20 + 30 + 25 = 95
