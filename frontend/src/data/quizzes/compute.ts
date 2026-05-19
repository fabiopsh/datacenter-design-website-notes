import type { Question } from './types'

export const QUIZ_COMPUTE: Question[] = [
  {
    kind: 'mc',
    question: 'Cosa è il BMC di un server?',
    choices: [
      { id: 'a', text: 'Un sensore di temperatura della CPU' },
      { id: 'b', text: 'Un controller di gestione out-of-band raggiungibile anche a server spento (ma alimentato)' },
      { id: 'c', text: 'Un firmware del BIOS' },
      { id: 'd', text: 'Un\'API REST della macchina virtuale' },
    ],
    correctId: 'b',
  },
  {
    kind: 'tf',
    question: 'L\'hyperthreading raddoppia il numero di core fisici della CPU.',
    answer: false,
    explanation: 'Raddoppia i thread hardware logici per core (SMT), non i core fisici.',
  },
  {
    kind: 'mc',
    question: 'Cosa misura il WUE?',
    choices: [
      { id: 'a', text: 'Watt utili equivalenti' },
      { id: 'b', text: 'Litri d\'acqua consumati per kWh IT' },
      { id: 'c', text: 'Velocità della ventola in RPM' },
      { id: 'd', text: 'Tempo di rampa di scale-up' },
    ],
    correctId: 'b',
  },
  {
    kind: 'mc',
    question:
      'Quale è il vantaggio principale dei blade server rispetto ai server 1U tradizionali?',
    choices: [
      { id: 'a', text: 'Sono più economici al singolo nodo' },
      { id: 'b', text: 'Condividono cooling, power e networking dello chassis con maggiore densità' },
      { id: 'c', text: 'Hanno sempre più RAM' },
      { id: 'd', text: 'Sono compatibili solo con Intel' },
    ],
    correctId: 'b',
  },
  {
    kind: 'mc',
    question: 'Cosa caratterizza un\'NPU rispetto a una GPU?',
    choices: [
      { id: 'a', text: 'È un\'unità di rete dedicata' },
      { id: 'b', text: 'È un acceleratore specializzato per workload neural network (es. inference)' },
      { id: 'c', text: 'È un disco a stato solido' },
      { id: 'd', text: 'È un\'estensione del BMC' },
    ],
    correctId: 'b',
  },
  {
    kind: 'tf',
    question: 'Un container Docker porta con sé l\'intero kernel del SO ospite.',
    answer: false,
    explanation:
      'I container condividono il kernel dell\'host: portano solo librerie utente e filesystem.',
  },
  {
    kind: 'mc',
    question: 'Cosa è la "tile architecture" nei chip moderni?',
    choices: [
      { id: 'a', text: 'Disposizione random dei core' },
      { id: 'b', text: 'Modularizzazione del silicio in chiplet/tile interconnessi' },
      { id: 'c', text: 'Tecnologia di overclock' },
      { id: 'd', text: 'Layout dei rack nel DC' },
    ],
    correctId: 'b',
  },
  {
    kind: 'tf',
    question: 'La crossbar interconnessione fra core/tile permette comunicazioni full-mesh.',
    answer: true,
  },
  {
    kind: 'mc',
    question: 'Quale dei seguenti è un compromesso tipico di un design "twin server"?',
    choices: [
      { id: 'a', text: 'Doppio della RAM ma metà CPU' },
      { id: 'b', text: 'Alta densità di nodi senza networking integrato di chassis' },
      { id: 'c', text: 'Liquid cooling obbligatorio' },
      { id: 'd', text: 'Server senza alimentazione ridondante' },
    ],
    correctId: 'b',
  },
  {
    kind: 'mc',
    question: 'In che senso il server è "Lego" nella filosofia moderna?',
    choices: [
      { id: 'a', text: 'È giocattolo' },
      { id: 'b', text: 'Si compone scegliendo trade-off (densità, networking, RAM, GPU) per il workload' },
      { id: 'c', text: 'È costruito da bambini' },
      { id: 'd', text: 'Si vende a peso' },
    ],
    correctId: 'b',
  },
]
