export type TFItem = {
  statement: string
  answer: boolean
  explanation?: string
}

export const QUICK_CHECKS: Record<string, TFItem[]> = {
  'lezione-01': [
    {
      statement:
        'In Italia un data center è considerato di rilevanza nazionale quando supera 0,5 MW di assorbimento.',
      answer: true,
      explanation:
        'È la soglia indicata dalla legge delega italiana in discussione.',
    },
    {
      statement:
        'Le AI factory hanno reso meno critico il problema dell\'alimentazione perché i nuovi chip consumano meno.',
      answer: false,
      explanation:
        'Al contrario: progetti da 2,5 GW impongono vincoli estremi sulla rete elettrica nazionale.',
    },
    {
      statement:
        'Il polo di San Piero a Pisa oggi opera intorno ai 250–300 kW.',
      answer: true,
    },
  ],
  'lezione-02': [
    {
      statement:
        'Il pavimento flottante è una scelta puramente estetica eredità degli anni \'80.',
      answer: false,
      explanation:
        'Serve a far passare cavi, condotti di aria fredda e pareggiare il piano di rack pesantissimi.',
    },
    {
      statement:
        'Il paradigma "always on" richiede ridondanza su power, cooling e network.',
      answer: true,
    },
    {
      statement:
        'I tier (I–IV) misurano principalmente la potenza del singolo rack.',
      answer: false,
      explanation:
        'I tier misurano la disponibilità: ridondanza dei path power/cooling e tempo di downtime atteso/anno.',
    },
  ],
  'lezione-03': [
    {
      statement:
        'PUE = energia totale del data center / energia consumata dall\'IT.',
      answer: true,
      explanation: 'Un PUE di 1,0 significa zero overhead di cooling e distribuzione.',
    },
    {
      statement: 'Un PUE di 0,8 è il migliore possibile.',
      answer: false,
      explanation:
        'Il limite teorico è 1,0; valori sotto 1 sarebbero violazioni di conservazione dell\'energia (a meno di recuperi).',
    },
    {
      statement:
        'I sistemi CRAC sono progettati per rimuovere calore tramite aria condizionata centralizzata.',
      answer: true,
    },
  ],
  'lezione-04': [
    {
      statement:
        'Il direct-to-chip cooling porta il fluido refrigerante direttamente sul package del processore.',
      answer: true,
    },
    {
      statement:
        'L\'immersion cooling immerge i server in acqua di rubinetto.',
      answer: false,
      explanation:
        'Si usa un fluido dielettrico (mineral oil o fluidi 3M) elettricamente non conduttivo.',
    },
    {
      statement:
        'Il TDP dei chip da AI è cresciuto di un ordine di grandezza nell\'ultimo decennio.',
      answer: true,
    },
  ],
  'lezione-05': [
    {
      statement:
        'La fibra monomodale ha un core più piccolo e raggiunge distanze maggiori della multimodale.',
      answer: true,
    },
    {
      statement:
        'Il principio della riflessione totale interna non vale per la fibra ottica perché la luce è elettromagnetica.',
      answer: false,
      explanation:
        'È esattamente il principio fisico che intrappola la luce nel core della fibra.',
    },
    {
      statement:
        'L\'in-row cooling porta lo scambiatore di calore tra i rack invece che al perimetro della sala.',
      answer: true,
    },
  ],
  'lezione-06': [
    {
      statement:
        'In una topologia fat-tree con k=4, gli switch core sono (k/2)² = 4.',
      answer: true,
    },
    {
      statement:
        'I patch panel servono a fare conversione di protocollo tra porte fibra e rame.',
      answer: false,
      explanation:
        'Sono pannelli di permutazione passivi: estendono e ordinano fisicamente i cablaggi senza logica attiva.',
    },
    {
      statement:
        'Il form factor SFP+ supporta 10 Gbps mentre QSFP28 raggiunge tipicamente 100 Gbps.',
      answer: true,
    },
  ],
  'lezione-07': [
    {
      statement:
        'Negli switch moderni il data plane è realizzato in silicio commodity (es. Broadcom Tomahawk/Trident).',
      answer: true,
    },
    {
      statement:
        'SONiC è un sistema operativo proprietario chiuso sviluppato da Cisco.',
      answer: false,
      explanation:
        'È open-source, originariamente sviluppato da Microsoft e ora ospitato da Linux Foundation.',
    },
    {
      statement:
        'La running configuration è persistente e sopravvive al reboot dello switch.',
      answer: false,
      explanation:
        'La startup configuration è quella persistente; la running è in RAM e va salvata esplicitamente.',
    },
  ],
  'lezione-08': [
    {
      statement:
        'Nei data center moderni il traffico east-west supera tipicamente il traffico north-south.',
      answer: true,
    },
    {
      statement: 'Una VLAN segmenta un dominio di broadcast a livello 2.',
      answer: true,
    },
    {
      statement:
        'VXLAN incapsula frame Ethernet in pacchetti UDP per trasportare overlay layer 2 sopra reti layer 3.',
      answer: true,
    },
  ],
  'lezione-09': [
    {
      statement:
        'RDMA permette ad un nodo di leggere/scrivere memoria di un altro nodo senza coinvolgere la CPU remota.',
      answer: true,
    },
    {
      statement:
        'InfiniBand è progettato per HPC e ha latenze tipicamente più basse di Ethernet tradizionale.',
      answer: true,
    },
    {
      statement:
        'MPI (Message Passing Interface) è uno standard hardware proprietario di NVIDIA.',
      answer: false,
      explanation:
        'È uno standard software (API) per programmazione parallela distribuita, indipendente dal vendor.',
    },
  ],
  'lezione-10': [
    {
      statement:
        'NVMe è un protocollo di accesso allo storage progettato per SSD su PCIe.',
      answer: true,
    },
    {
      statement:
        'Gli HDD hanno tempi di seek dell\'ordine dei microsecondi, paragonabili agli SSD.',
      answer: false,
      explanation:
        'Sono dell\'ordine dei millisecondi (~1000x più lenti di un SSD NVMe).',
    },
    {
      statement:
        'Intel Optane (3D XPoint) si posiziona come livello intermedio fra DRAM e SSD NAND.',
      answer: true,
    },
  ],
  'lezione-11': [
    {
      statement:
        'Il form factor Ruler (EDSFF) è stato pensato per massimizzare densità di SSD nel server.',
      answer: true,
    },
    {
      statement:
        'RAID 5 protegge da due guasti simultanei di dischi.',
      answer: false,
      explanation:
        'RAID 5 tollera UN guasto. Per due guasti serve RAID 6 (doppia parità).',
    },
    {
      statement:
        'La deduplicazione elimina blocchi/file ridondanti per ridurre lo spazio occupato.',
      answer: true,
    },
  ],
  'lezione-12': [
    {
      statement:
        'IOPS misura il numero di operazioni di I/O al secondo che un dispositivo riesce a sostenere.',
      answer: true,
    },
    {
      statement:
        'Backup e replica sono sinonimi: entrambi forniscono protezione da cancellazioni accidentali.',
      answer: false,
      explanation:
        'La replica propaga in tempo reale anche gli errori; il backup è un\'immagine point-in-time che protegge da cancellazioni.',
    },
    {
      statement:
        'I vector database servono a indicizzare embedding per ricerca per similarità (es. RAG).',
      answer: true,
    },
  ],
  'lezione-13': [
    {
      statement:
        'L\'hyperthreading raddoppia il numero di core fisici della CPU.',
      answer: false,
      explanation:
        'Raddoppia i thread hardware logici per core, condividendo le risorse di esecuzione.',
    },
    {
      statement:
        'Il WUE (Water Usage Effectiveness) misura i litri d\'acqua per kWh IT consumati.',
      answer: true,
    },
    {
      statement:
        'Le GPU moderne hanno una crossbar interna di interconnessione che limita le scritture concorrenti dei tile.',
      answer: false,
      explanation:
        'La crossbar permette comunicazione full-mesh; il limite è banda e potenza, non la concorrenza in sé.',
    },
  ],
  'lezione-14': [
    {
      statement:
        'Il BMC (Baseboard Management Controller) è raggiungibile anche a server spento purché alimentato.',
      answer: true,
    },
    {
      statement:
        'I blade server condividono alimentazione, cooling e networking a livello di chassis.',
      answer: true,
    },
    {
      statement:
        'Un container Docker porta con sé l\'intero kernel del sistema operativo.',
      answer: false,
      explanation:
        'I container condividono il kernel dell\'host; portano librerie utente e filesystem, non il kernel.',
    },
  ],
  'lezione-15': [
    {
      statement:
        'I cgroups e i namespace sono i meccanismi del kernel Linux su cui si basano i container.',
      answer: true,
    },
    {
      statement:
        'Kubernetes orchestra container distribuiti su un cluster di nodi.',
      answer: true,
    },
    {
      statement:
        'Un container ha sempre una propria copia del kernel come avviene per le VM.',
      answer: false,
      explanation:
        'Le VM hanno un kernel proprio; i container condividono quello dell\'host (isolamento via namespace).',
    },
  ],
  'lezione-16': [
    {
      statement:
        'Nella live migration "pre-copy" si copiano iterativamente le pagine dirty finché il working set diventa abbastanza piccolo per lo stop-and-copy.',
      answer: true,
    },
    {
      statement:
        'Un dirty rate troppo alto rispetto alla bandwidth può portare alla non convergenza del pre-copy.',
      answer: true,
    },
    {
      statement:
        'La vCPU è esposta come istruzioni di un\'architettura completamente diversa dall\'host.',
      answer: false,
      explanation:
        'La vCPU usa lo stesso ISA dell\'host (es. x86 su x86) con supporto VT-x/AMD-V; istruzioni diverse richiedono emulazione, non virtualizzazione.',
    },
  ],
  'lezione-17': [
    {
      statement:
        'Nella definizione NIST, "rapid elasticity" è una delle cinque caratteristiche essenziali del cloud.',
      answer: true,
    },
    {
      statement:
        'IaaS, PaaS e SaaS si distinguono per quale layer è gestito dal provider.',
      answer: true,
    },
    {
      statement:
        'Il "measured service" del cloud implica fatturazione forfettaria annuale indipendentemente dall\'uso.',
      answer: false,
      explanation:
        'È esattamente il contrario: si misura e si paga in base al consumo (pay-per-use).',
    },
  ],
  'lezione-18': [
    {
      statement:
        'Un Unified Manager coordina più Element Manager per offrire una vista integrata su domini eterogenei.',
      answer: true,
    },
    {
      statement:
        'Il grading delle risorse serve a classificarle per qualità/prezzo nelle pool prima del provisioning.',
      answer: true,
    },
    {
      statement:
        'Un SLA con 99,99% di availability ammette circa 8 ore di downtime all\'anno.',
      answer: false,
      explanation:
        '99,99% = ~52 minuti/anno. 99% sarebbe ~88 ore/anno; 99,9% ~8,8 ore/anno.',
    },
  ],
}

export function getQuickCheck(slug: string): TFItem[] | undefined {
  return QUICK_CHECKS[slug]
}
