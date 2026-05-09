import * as pharmacology from './pharmacology.js';
import * as airway from './airway.js';
import * as regional from './regional.js';
import * as criticalCare from './criticalCare.js';

export const TOPICS = {
  pharmacology: {
    id: 'pharmacology',
    label: 'Pharmacology',
    color: '#3B82F6',
    bg: '#EFF6FF',
    icon: '💊',
  },
  airway: {
    id: 'airway',
    label: 'Airway',
    color: '#F59E0B',
    bg: '#FFFBEB',
    icon: '🫁',
  },
  regional: {
    id: 'regional',
    label: 'Regional',
    color: '#10B981',
    bg: '#ECFDF5',
    icon: '💉',
  },
  criticalCare: {
    id: 'criticalCare',
    label: 'Critical Care',
    color: '#EF4444',
    bg: '#FEF2F2',
    icon: '🚨',
  },
};

export const allFlashcards = [
  ...pharmacology.flashcards,
  ...airway.flashcards,
  ...regional.flashcards,
  ...criticalCare.flashcards,
];

export const allQuestions = [
  ...pharmacology.questions,
  ...airway.questions,
  ...regional.questions,
  ...criticalCare.questions,
];

export const allCases = [
  ...pharmacology.cases,
  ...airway.cases,
  ...regional.cases,
  ...criticalCare.cases,
];

export const allReferences = [
  ...pharmacology.references,
  ...airway.references,
  ...regional.references,
  ...criticalCare.references,
];

export function flashcardsByTopic(topic) {
  return allFlashcards.filter(c => c.topic === topic);
}

export function questionsByTopic(topic) {
  return allQuestions.filter(q => q.topic === topic);
}

export function casesByTopic(topic) {
  return allCases.filter(c => c.topic === topic);
}

export function referencesByTopic(topic) {
  return allReferences.filter(r => r.topic === topic);
}
