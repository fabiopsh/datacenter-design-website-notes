import type { Question } from './types'

export const QUIZ_NETWORK: Question[] = [
  {
    kind: 'mc',
    question: 'Cosa caratterizza la fibra monomodale rispetto alla multimodale?',
    choices: [
      { id: 'a', text: 'Core più grande, distanze brevi' },
      { id: 'b', text: 'Core più piccolo, distanze maggiori e banda elevata' },
      { id: 'c', text: 'Trasporta solo segnali elettrici' },
      { id: 'd', text: 'Funziona solo a 850 nm' },
    ],
    correctId: 'b',
  },
  {
    kind: 'mc',
    question:
      'In una topologia fat-tree con parametro k, quanti switch core ci sono?',
    choices: [
      { id: 'a', text: 'k' },
      { id: 'b', text: '(k/2)²' },
      { id: 'c', text: 'k²' },
      { id: 'd', text: 'k³/4' },
    ],
    correctId: 'b',
  },
  {
    kind: 'tf',
    question: 'Nei data center moderni il traffico east-west supera tipicamente il north-south.',
    answer: true,
  },
  {
    kind: 'mc',
    question:
      'Quale dei seguenti è un sistema operativo di rete open-source per switch white-box?',
    choices: [
      { id: 'a', text: 'iOS' },
      { id: 'b', text: 'SONiC' },
      { id: 'c', text: 'IOS-XE' },
      { id: 'd', text: 'Junos' },
    ],
    correctId: 'b',
  },
  {
    kind: 'mc',
    question: 'A cosa serve VXLAN?',
    choices: [
      { id: 'a', text: 'A criptare il traffico VLAN' },
      { id: 'b', text: 'Ad estendere reti L2 sopra rete L3 incapsulando in UDP' },
      { id: 'c', text: 'A duplicare il traffico per backup' },
      { id: 'd', text: 'A risolvere ARP cross-rack' },
    ],
    correctId: 'b',
  },
  {
    kind: 'tf',
    question:
      'La startup configuration di uno switch è quella in RAM, persa al riavvio.',
    answer: false,
    explanation:
      'È la running configuration ad essere in RAM. La startup è persistente su flash.',
  },
  {
    kind: 'mc',
    question: 'Cosa è RDMA?',
    choices: [
      { id: 'a', text: 'Un protocollo di routing dinamico' },
      { id: 'b', text: 'Accesso diretto alla memoria di un nodo remoto bypassando CPU/OS' },
      { id: 'c', text: 'Un\'estensione di DMA per il bus PCIe' },
      { id: 'd', text: 'Un encoding Manchester' },
    ],
    correctId: 'b',
  },
  {
    kind: 'tf',
    question: 'MPI è uno standard hardware proprietario di NVIDIA.',
    answer: false,
    explanation: 'È uno standard API software per programmazione parallela distribuita.',
  },
  {
    kind: 'mc',
    question: 'Cosa è una porta trunk in una VLAN?',
    choices: [
      { id: 'a', text: 'Una porta che appartiene ad una sola VLAN' },
      { id: 'b', text: 'Una porta che trasporta più VLAN con tagging 802.1Q' },
      { id: 'c', text: 'Una porta esclusivamente in fibra' },
      { id: 'd', text: 'Una porta uplink a 100 Gbps' },
    ],
    correctId: 'b',
  },
  {
    kind: 'mc',
    question: 'I patch panel servono a:',
    choices: [
      { id: 'a', text: 'Convertire pacchetti TCP in UDP' },
      { id: 'b', text: 'Permutare/estendere fisicamente i cablaggi senza logica attiva' },
      { id: 'c', text: 'Effettuare switching layer 3' },
      { id: 'd', text: 'Fornire alimentazione PoE' },
    ],
    correctId: 'b',
  },
]
