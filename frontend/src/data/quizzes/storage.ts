import type { Question } from './types'

export const QUIZ_STORAGE: Question[] = [
  {
    kind: 'mc',
    question: 'NVMe è:',
    choices: [
      { id: 'a', text: 'Un form factor fisico per SSD' },
      { id: 'b', text: 'Un protocollo di accesso a storage non volatile su PCIe' },
      { id: 'c', text: 'Una tecnologia di cella di memoria' },
      { id: 'd', text: 'Un file system distribuito' },
    ],
    correctId: 'b',
  },
  {
    kind: 'tf',
    question: 'Un HDD enterprise ha tempi di seek tipicamente nell\'ordine dei microsecondi.',
    answer: false,
    explanation: 'Sono dell\'ordine dei millisecondi, ~1000x più lenti di un SSD NVMe.',
  },
  {
    kind: 'mc',
    question: 'Cosa tollera RAID 6?',
    choices: [
      { id: 'a', text: 'Un guasto disco' },
      { id: 'b', text: 'Due guasti disco simultanei (doppia parità)' },
      { id: 'c', text: 'Quattro guasti simultanei' },
      { id: 'd', text: 'Nessun guasto (è solo stripe)' },
    ],
    correctId: 'b',
  },
  {
    kind: 'mc',
    question: 'Cosa misura IOPS?',
    choices: [
      { id: 'a', text: 'Watt consumati per operazione' },
      { id: 'b', text: 'Operazioni di I/O al secondo' },
      { id: 'c', text: 'Latenza media in millisecondi' },
      { id: 'd', text: 'Byte/sec utili' },
    ],
    correctId: 'b',
  },
  {
    kind: 'tf',
    question:
      'La replica sincrona protegge da cancellazioni accidentali al pari di un backup point-in-time.',
    answer: false,
    explanation:
      'La replica propaga in tempo reale anche gli errori; serve un backup per recuperare uno stato precedente.',
  },
  {
    kind: 'mc',
    question:
      'Il form factor EDSFF "Ruler" è stato progettato per:',
    choices: [
      { id: 'a', text: 'Sostituire i CD-ROM' },
      { id: 'b', text: 'Massimizzare densità di SSD nei server, con migliore termica' },
      { id: 'c', text: 'Sostituire RAM DIMM' },
      { id: 'd', text: 'Connessione USB-C' },
    ],
    correctId: 'b',
  },
  {
    kind: 'tf',
    question:
      'La deduplicazione individua e rimuove blocchi/oggetti uguali per ridurre lo storage.',
    answer: true,
  },
  {
    kind: 'mc',
    question:
      'Cosa rappresentano i database vettoriali rispetto allo storage classico?',
    choices: [
      { id: 'a', text: 'Storage solo su SSD' },
      { id: 'b', text: 'Indici per ricerca per similarità su embedding (es. RAG)' },
      { id: 'c', text: 'Sistemi di backup incrementale' },
      { id: 'd', text: 'File system POSIX' },
    ],
    correctId: 'b',
  },
  {
    kind: 'mc',
    question:
      'Quale architettura espone lo storage al server tramite block protocol (es. iSCSI / FC)?',
    choices: [
      { id: 'a', text: 'NAS' },
      { id: 'b', text: 'SAN' },
      { id: 'c', text: 'Object storage' },
      { id: 'd', text: 'File system locale' },
    ],
    correctId: 'b',
  },
  {
    kind: 'tf',
    question: 'Intel Optane (3D XPoint) si colloca fra DRAM e SSD NAND nella gerarchia di memoria.',
    answer: true,
  },
]
