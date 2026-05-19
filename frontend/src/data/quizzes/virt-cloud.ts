import type { Question } from './types'

export const QUIZ_VIRT_CLOUD: Question[] = [
  {
    kind: 'mc',
    question:
      'Quale meccanismo del kernel Linux fornisce isolamento di processo per i container?',
    choices: [
      { id: 'a', text: 'syscall e ioctl' },
      { id: 'b', text: 'cgroups e namespace' },
      { id: 'c', text: 'kvm e qemu' },
      { id: 'd', text: 'iptables e tc' },
    ],
    correctId: 'b',
  },
  {
    kind: 'tf',
    question:
      'Le VM e i container forniscono lo stesso livello di isolamento (entrambi hanno un kernel proprio).',
    answer: false,
    explanation:
      'Le VM hanno kernel proprio (forte isolamento); i container condividono quello dell\'host (più leggeri).',
  },
  {
    kind: 'mc',
    question:
      'Nella live migration "pre-copy", cosa accade nella fase di stop-and-copy finale?',
    choices: [
      { id: 'a', text: 'Si copia il filesystem da zero' },
      { id: 'b', text: 'Si ferma la VM e si trasferiscono le ultime pagine dirty + stato CPU' },
      { id: 'c', text: 'Si spegne il server di destinazione' },
      { id: 'd', text: 'Si esegue uno snapshot iniziale' },
    ],
    correctId: 'b',
  },
  {
    kind: 'mc',
    question: 'Quale modello cloud espone macchine virtuali al cliente?',
    choices: [
      { id: 'a', text: 'SaaS' },
      { id: 'b', text: 'PaaS' },
      { id: 'c', text: 'IaaS' },
      { id: 'd', text: 'FaaS' },
    ],
    correctId: 'c',
  },
  {
    kind: 'mc',
    question:
      'Quali sono le 5 caratteristiche essenziali del cloud secondo il NIST?',
    choices: [
      { id: 'a', text: 'On-prem, off-prem, SaaS, IaaS, PaaS' },
      { id: 'b', text: 'On-demand self-service, broad network access, resource pooling, rapid elasticity, measured service' },
      { id: 'c', text: 'Sicurezza, scalabilità, resilienza, latenza, costo' },
      { id: 'd', text: 'Containers, VM, serverless, edge, fog' },
    ],
    correctId: 'b',
  },
  {
    kind: 'tf',
    question:
      'In un pre-copy con dirty rate ≥ bandwidth, l\'algoritmo non converge e va forzato lo stop-and-copy.',
    answer: true,
  },
  {
    kind: 'mc',
    question:
      'Cosa distingue un Unified Manager da un Element Manager?',
    choices: [
      { id: 'a', text: 'È più piccolo' },
      { id: 'b', text: 'Coordina più Element Manager offrendo una vista integrata fra domini eterogenei' },
      { id: 'c', text: 'Gestisce solo lo storage' },
      { id: 'd', text: 'È un\'estensione del BMC' },
    ],
    correctId: 'b',
  },
  {
    kind: 'mc',
    question:
      'Un SLA con disponibilità 99,99% ammette circa quanto downtime annuo?',
    choices: [
      { id: 'a', text: '~5 minuti' },
      { id: 'b', text: '~52 minuti' },
      { id: 'c', text: '~8,8 ore' },
      { id: 'd', text: '~3,65 giorni' },
    ],
    correctId: 'b',
    explanation: '99,99% ≈ 52 minuti/anno (10⁻⁴ × 8760 h).',
  },
  {
    kind: 'tf',
    question:
      'La virtualizzazione x86 hardware (VT-x/AMD-V) consente alla vCPU di eseguire l\'ISA dell\'host nativamente, senza emulazione.',
    answer: true,
  },
  {
    kind: 'mc',
    question:
      'Cosa rappresenta il "grading" delle risorse nelle pool del control layer?',
    choices: [
      { id: 'a', text: 'La promozione del personale IT' },
      { id: 'b', text: 'Classificare le risorse per qualità/SKU/prezzo per facilitare il provisioning' },
      { id: 'c', text: 'L\'overclock dei server' },
      { id: 'd', text: 'Una metrica di latenza di rete' },
    ],
    correctId: 'b',
  },
]
