import { useEffect, useMemo, useState } from 'react'
import { LabShell } from '@/components/LabShell'
import { useProgress } from '@/hooks/useProgress'

function FatTreeTheory() {
  return (
    <>
      <p>
        Una topologia <strong>fat-tree</strong> con parametro <code>k</code>{' '}
        (numero di porte per switch, pari) ha tre livelli:
      </p>
      <ul>
        <li>
          <strong>Core</strong>: <code>(k/2)²</code> switch.
        </li>
        <li>
          <strong>Aggregation + Edge</strong>: <code>k</code> pod, ognuno con
          <code> k/2</code> aggregation + <code>k/2</code> edge switch.
        </li>
        <li>
          <strong>Server</strong>: <code>k³/4</code> nodi totali.
        </li>
      </ul>
      <p>
        Tutti i link hanno la stessa capacità: la rete è <em>non-blocking</em>{' '}
        in ECMP a parità di carico bilanciato.
      </p>
    </>
  )
}

type Node = { x: number; y: number; label: string }
type Edge = { x1: number; y1: number; x2: number; y2: number }

function buildFatTree(k: number): { nodes: Node[]; edges: Edge[]; W: number; H: number } {
  const core = (k / 2) ** 2
  const aggPerPod = k / 2
  const edgePerPod = k / 2
  const serversPerEdge = k / 2

  const W = Math.max(900, k * 110)
  const H = 480

  const nodes: Node[] = []
  const edges: Edge[] = []

  const coreY = 60
  const aggY = 180
  const edgeY = 300
  const serverY = 430

  const coreXs: number[] = []
  for (let i = 0; i < core; i++) {
    const x = ((i + 1) / (core + 1)) * W
    coreXs.push(x)
    nodes.push({ x, y: coreY, label: `C${i}` })
  }

  const podXs: number[] = []
  for (let p = 0; p < k; p++) {
    const podX = ((p + 1) / (k + 1)) * W
    podXs.push(podX)
  }

  for (let p = 0; p < k; p++) {
    const podW = W / (k + 1)
    const podStart = podXs[p] - podW * 0.35
    for (let a = 0; a < aggPerPod; a++) {
      const x = podStart + (a / Math.max(aggPerPod - 1, 1)) * (podW * 0.7)
      nodes.push({ x, y: aggY, label: `A${p}.${a}` })
      // Each aggregation a connects to core switches in stride
      for (let c = 0; c < k / 2; c++) {
        const coreIdx = a * (k / 2) + c
        if (coreIdx < core) edges.push({ x1: x, y1: aggY, x2: coreXs[coreIdx], y2: coreY })
      }
    }
    for (let e = 0; e < edgePerPod; e++) {
      const x = podStart + (e / Math.max(edgePerPod - 1, 1)) * (podW * 0.7)
      nodes.push({ x, y: edgeY, label: `E${p}.${e}` })
      // Edge connects to every aggregation in the pod
      for (let a = 0; a < aggPerPod; a++) {
        const aggX = podStart + (a / Math.max(aggPerPod - 1, 1)) * (podW * 0.7)
        edges.push({ x1: x, y1: edgeY, x2: aggX, y2: aggY })
      }
      // Servers under each edge
      for (let s = 0; s < serversPerEdge; s++) {
        const sx =
          x - 18 + (s / Math.max(serversPerEdge - 1, 1)) * 36
        nodes.push({ x: sx, y: serverY, label: '' })
        edges.push({ x1: x, y1: edgeY, x2: sx, y2: serverY })
      }
    }
  }

  return { nodes, edges, W, H }
}

export function FatTreeVis() {
  const { recordLabUse } = useProgress()
  const [k, setK] = useState(4)
  const tree = useMemo(() => buildFatTree(k), [k])

  useEffect(() => {
    recordLabUse('fat-tree-vis', 'lab-fat-tree', 1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const core = (k / 2) ** 2
  const agg = k * (k / 2)
  const edge = k * (k / 2)
  const servers = k ** 3 / 4
  const switches = core + agg + edge

  return (
    <LabShell
      title="Fat-tree Visualizer"
      subtitle="Genera topologie fat-tree al variare di k e osserva la struttura risultante."
      lessonSlug="lezione-06"
      theory={<FatTreeTheory />}
    >
      <div className="lab-shell">
        <div className="lab-controls">
          <label className="lab-control">
            <span>
              k = <strong>{k}</strong> (porte/switch, pari)
            </span>
            <input
              type="range"
              min={2}
              max={8}
              step={2}
              value={k}
              onChange={(e) => setK(Number(e.target.value))}
            />
          </label>
        </div>

        <div className="lab-stats">
          <Stat label="Core switch" value={String(core)} />
          <Stat label="Aggregation" value={String(agg)} />
          <Stat label="Edge" value={String(edge)} />
          <Stat label="Server" value={String(servers)} />
          <Stat label="Switch totali" value={String(switches)} />
        </div>

        <div className="lab-vis" style={{ overflowX: 'auto' }}>
          <svg
            viewBox={`0 0 ${tree.W} ${tree.H}`}
            style={{ width: '100%', height: 'auto', maxWidth: '100%' }}
          >
            {tree.edges.map((e, i) => (
              <line
                key={i}
                x1={e.x1}
                y1={e.y1}
                x2={e.x2}
                y2={e.y2}
                stroke="var(--border)"
                strokeWidth={1}
              />
            ))}
            {tree.nodes.map((n, i) => {
              const isServer = n.label === ''
              return (
                <g key={i}>
                  {isServer ? (
                    <rect
                      x={n.x - 6}
                      y={n.y - 6}
                      width={12}
                      height={12}
                      rx={2}
                      fill="var(--accent)"
                    />
                  ) : (
                    <>
                      <circle cx={n.x} cy={n.y} r={14} fill="var(--bg-elevated)" stroke="var(--border-strong)" />
                      <text
                        x={n.x}
                        y={n.y + 4}
                        textAnchor="middle"
                        fontSize={10}
                        fill="var(--text)"
                      >
                        {n.label}
                      </text>
                    </>
                  )}
                </g>
              )
            })}
          </svg>
        </div>
      </div>
    </LabShell>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="lab-stat">
      <div className="lab-stat__label">{label}</div>
      <div className="lab-stat__value">{value}</div>
    </div>
  )
}
