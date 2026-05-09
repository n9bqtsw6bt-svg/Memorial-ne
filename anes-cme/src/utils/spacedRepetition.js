const DEFAULT_EASINESS = 2.5;
const MIN_EASINESS = 1.3;

export function createCardState() {
  return {
    easiness: DEFAULT_EASINESS,
    interval: 0,
    repetitions: 0,
    nextReview: Date.now(),
    lastQuality: null,
  };
}

// quality: 0=Again, 2=Hard, 4=Good, 5=Easy (SM-2 inspired)
export function computeNextReview(state, quality) {
  let { easiness, interval, repetitions } = state;

  if (quality >= 3) {
    if (repetitions === 0) interval = 1;
    else if (repetitions === 1) interval = 6;
    else interval = Math.round(interval * easiness);
    repetitions += 1;
    easiness = easiness + 0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02);
    easiness = Math.max(MIN_EASINESS, easiness);
  } else {
    repetitions = 0;
    interval = 1;
  }

  const nextReview = Date.now() + interval * 24 * 60 * 60 * 1000;
  return { easiness, interval, repetitions, nextReview, lastQuality: quality };
}

export function isDue(state) {
  return Date.now() >= (state.nextReview ?? 0);
}

// 0–4 mastery level based on repetitions
export function masteryLevel(state) {
  if (!state) return 0;
  return Math.min(state.repetitions, 4);
}

export function isMastered(state) {
  return state && state.repetitions >= 3;
}
