import type { Question } from './types'

export const QUIZ_POWER_COOLING: Question[] = [
  {
    kind: 'mc',
    question: 'Quale è la formula del PUE?',
    choices: [
      { id: 'a', text: 'IT load / Total facility power' },
      { id: 'b', text: 'Total facility power / IT load' },
      { id: 'c', text: 'Cooling power / IT load' },
      { id: 'd', text: 'IT load / Cooling power' },
    ],
    correctId: 'b',
    explanation: 'Il PUE è il rapporto fra potenza totale dell\'impianto e potenza dell\'IT.',
  },
  {
    kind: 'tf',
    question: 'Un PUE inferiore a 1,0 è fisicamente possibile in regime stazionario senza recuperi energetici.',
    answer: false,
    explanation:
      'Il PUE ha limite teorico 1,0 (zero overhead). Valori sotto 1 violerebbero la conservazione dell\'energia.',
  },
  {
    kind: 'mc',
    question: 'Cosa è un sistema CRAC?',
    choices: [
      { id: 'a', text: 'Un compressore per fluidi dielettrici' },
      { id: 'b', text: 'Un Computer Room Air Conditioner: aria condizionata di sala' },
      { id: 'c', text: 'Un router di top-of-rack' },
      { id: 'd', text: 'Una API per il monitoring' },
    ],
    correctId: 'b',
  },
  {
    kind: 'mc',
    question: 'Qual è il principio del direct-to-chip cooling?',
    choices: [
      { id: 'a', text: 'Immergere l\'intero server in fluido dielettrico' },
      { id: 'b', text: 'Portare un cold plate a contatto con il package del chip' },
      { id: 'c', text: 'Sostituire il dissipatore con un Peltier' },
      { id: 'd', text: 'Sparare aria fredda a 2 m/s sul rack' },
    ],
    correctId: 'b',
  },
  {
    kind: 'tf',
    question: 'Il "muro della frequenza" indica che è sempre più difficile salire in GHz a parità di potenza dissipata.',
    answer: true,
  },
  {
    kind: 'mc',
    question:
      'Quale problema fisico rende critico il surriscaldamento del silicio?',
    choices: [
      { id: 'a', text: 'Errori softerror dovuti ai raggi cosmici' },
      { id: 'b', text: 'Drift dei parametri, errori e degrado accelerato' },
      { id: 'c', text: 'Aumento della tensione di rete' },
      { id: 'd', text: 'Collisione di pacchetti TCP' },
    ],
    correctId: 'b',
  },
  {
    kind: 'tf',
    question:
      'L\'immersion cooling usa acqua semplice del rubinetto come fluido di contatto coi server.',
    answer: false,
    explanation:
      'Usa fluidi dielettrici (mineral oil o 3M Novec) elettricamente isolanti.',
  },
  {
    kind: 'mc',
    question: 'Una "insidia" tipica del PUE come metrica è:',
    choices: [
      { id: 'a', text: 'Non considerare la temperatura dei server' },
      { id: 'b', text: 'Premiare DC con IT meno efficiente (più consumo IT → PUE migliore)' },
      { id: 'c', text: 'Includere il consumo di acqua per il cooling' },
      { id: 'd', text: 'Essere influenzata dalla latenza di rete' },
    ],
    correctId: 'b',
  },
  {
    kind: 'mc',
    question: 'Cosa caratterizza una distribuzione hot/cold aisle containment?',
    choices: [
      { id: 'a', text: 'I rack sono disposti casualmente' },
      { id: 'b', text: 'Si separano fisicamente flussi di aria calda e fredda con barriere' },
      { id: 'c', text: 'Si rimuove completamente il cooling ad aria' },
      { id: 'd', text: 'Si raffredda solo la parte alta dei rack' },
    ],
    correctId: 'b',
  },
  {
    kind: 'tf',
    question:
      'Il TDP dei chip per AI è cresciuto di un ordine di grandezza nell\'ultimo decennio, spingendo verso il liquid cooling.',
    answer: true,
  },
]
