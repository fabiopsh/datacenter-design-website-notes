import type { Question } from './types'

export const QUIZ_FOUNDATIONS: Question[] = [
  {
    kind: 'mc',
    question:
      'In Italia, qual è la soglia di assorbimento elettrico che rende un data center "di rilevanza nazionale" secondo la legge delega in discussione?',
    choices: [
      { id: 'a', text: '100 kW' },
      { id: 'b', text: '500 kW' },
      { id: 'c', text: '5 MW' },
      { id: 'd', text: '50 MW' },
    ],
    correctId: 'b',
    explanation: 'La soglia è 0,5 MW (500 kW).',
  },
  {
    kind: 'mc',
    question: 'Cosa caratterizza il paradigma "Always On" nei data center?',
    choices: [
      { id: 'a', text: 'Funzionamento solo nelle ore di picco' },
      { id: 'b', text: 'Disponibilità continua basata su ridondanza di power, cooling e network' },
      { id: 'c', text: 'Spegnimento programmato notturno per risparmio' },
      { id: 'd', text: 'Uso esclusivo di rinnovabili' },
    ],
    correctId: 'b',
  },
  {
    kind: 'tf',
    question: 'I tier (I–IV) classificano i data center principalmente in base alla potenza per rack.',
    answer: false,
    explanation:
      'Classificano la disponibilità: ridondanza dei path di power/cooling e downtime atteso/anno.',
  },
  {
    kind: 'mc',
    question:
      'Quale dei seguenti è un vincolo "hard threshold" tipico di progettazione di un data center?',
    choices: [
      { id: 'a', text: 'Numero massimo di amministratori IT' },
      { id: 'b', text: 'Limite fisico di carico statico al pavimento' },
      { id: 'c', text: 'Numero massimo di rack rosa' },
      { id: 'd', text: 'Velocità della CPU degli switch' },
    ],
    correctId: 'b',
  },
  {
    kind: 'mc',
    question:
      'Cosa rappresentano le "gigafactory" del calcolo nell\'era AI?',
    choices: [
      { id: 'a', text: 'Fabbriche di chip da 1 GHz' },
      { id: 'b', text: 'Data center con potenze nell\'ordine dei gigawatt' },
      { id: 'c', text: 'Server farm interamente alimentate a idrogeno' },
      { id: 'd', text: 'Edifici regolati da normative ISO 9001' },
    ],
    correctId: 'b',
  },
  {
    kind: 'tf',
    question:
      'Il pavimento flottante è una scelta architetturale obsoleta priva di funzione tecnica nei DC moderni.',
    answer: false,
    explanation:
      'Continua ad ospitare cablaggi, condotti di mandata aria fredda e a distribuire i carichi dei rack.',
  },
  {
    kind: 'mc',
    question:
      'Quale concetto sintetizza la tensione progettuale fondamentale tra utente e fornitore?',
    choices: [
      { id: 'a', text: 'Velocità contro latenza' },
      { id: 'b', text: 'Ridondanza contro efficienza' },
      { id: 'c', text: 'On-prem contro cloud' },
      { id: 'd', text: 'Aria contro liquido' },
    ],
    correctId: 'b',
  },
  {
    kind: 'mc',
    question: 'Quali sono i "tre pilastri" di un data center moderno?',
    choices: [
      { id: 'a', text: 'CPU, RAM, GPU' },
      { id: 'b', text: 'Compute, storage, network' },
      { id: 'c', text: 'Cooling, lighting, security' },
      { id: 'd', text: 'Frontend, backend, database' },
    ],
    correctId: 'b',
  },
  {
    kind: 'tf',
    question:
      'L\'impatto dell\'AI ha reso meno rilevante il problema della distribuzione dell\'energia in input al data center.',
    answer: false,
    explanation:
      'Lo ha amplificato: i nuovi cluster GPU spingono oltre i MW per singolo cluster.',
  },
  {
    kind: 'mc',
    question:
      'Cosa intende il docente con "always on": vincoli normativi geografici?',
    choices: [
      { id: 'a', text: 'Obbligo che ogni regione abbia almeno un data center pubblico' },
      { id: 'b', text: 'Restrizioni alla collocazione dei DC vicino a faglie sismiche, esondazioni, ecc.' },
      { id: 'c', text: 'Obbligo di backup magnetico su nastro' },
      { id: 'd', text: 'Esclusiva nazionale dei provider' },
    ],
    correctId: 'b',
  },
]
