import type { ModuleId, LabSlug } from '@/content/manifest'

export type ModuleMeta = {
  id: ModuleId
  num: number
  title: string
  subtitle: string
  description: string
  color: string
}

export type LabMeta = {
  slug: LabSlug
  title: string
  blurb: string
  lessonSlug: string
}

export const MODULES: readonly ModuleMeta[] = [
  {
    id: 'foundations',
    num: 1,
    title: 'Foundations',
    subtitle: 'Introduzione e architettura',
    description:
      'Cosa è un data center, dalla server room alle gigafactory. Tier, design principles, gestione end-to-end.',
    color: '#5b8def',
  },
  {
    id: 'power-cooling',
    num: 2,
    title: 'Power & Cooling',
    subtitle: 'Energia, raffreddamento, cablaggio fisico',
    description:
      'UPS, distribuzione elettrica, PUE, hot/cold aisle containment, raffreddamento ad aria e a liquido.',
    color: '#f7931a',
  },
  {
    id: 'network',
    num: 3,
    title: 'Network',
    subtitle: 'Cablaggio, fabric, switching',
    description:
      'Trasmissione fisica, fat-tree e leaf-spine, switching layer 2/3, fabric avanzato e routing nei DC.',
    color: '#22a06b',
  },
  {
    id: 'storage',
    num: 4,
    title: 'Storage',
    subtitle: 'Tecnologie, architetture, servizi',
    description:
      'HDD/SSD/NVMe, DAS/NAS/SAN, RAID, file system distribuiti, oggetti e block storage.',
    color: '#ef4444',
  },
  {
    id: 'compute',
    num: 5,
    title: 'Compute',
    subtitle: 'CPU, GPU, NPU, server',
    description:
      'Architetture compute moderne, accelerators, server design, BMC, containerizzazione.',
    color: '#7b3ff2',
  },
  {
    id: 'virt-cloud',
    num: 6,
    title: 'Virtualization & Cloud',
    subtitle: 'Virtualizzazione, cloud, orchestrazione',
    description:
      'Hypervisor, live migration, IaaS/PaaS/SaaS, control plane, orchestrazione e SLA.',
    color: '#06b6d4',
  },
]

export const MODULES_BY_ID: Record<ModuleId, ModuleMeta> = Object.fromEntries(
  MODULES.map((m) => [m.id, m]),
) as Record<ModuleId, ModuleMeta>

export const LABS: readonly LabMeta[] = [
  {
    slug: 'pue-calculator',
    title: 'PUE Calculator',
    blurb:
      'Gioca con il carico IT e gli overhead di cooling/power per capire come si muove il Power Usage Effectiveness.',
    lessonSlug: 'lezione-03',
  },
  {
    slug: 'fat-tree-vis',
    title: 'Fat-tree Visualizer',
    blurb:
      'Genera topologie fat-tree al variare di k e osserva quanti core/aggregation/edge switch servono.',
    lessonSlug: 'lezione-06',
  },
  {
    slug: 'vm-live-migration',
    title: 'VM Live Migration',
    blurb:
      'Simula pre-copy iterativa e stop-and-copy: vedi come dirty rate e bandwidth determinano il downtime.',
    lessonSlug: 'lezione-16',
  },
]

export const LABS_BY_SLUG: Record<string, LabMeta> = Object.fromEntries(
  LABS.map((l) => [l.slug, l]),
)
