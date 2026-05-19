import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { LabShell } from '@/components/LabShell'
import { useProgress } from '@/hooks/useProgress'

function MigrationTheory() {
  return (
    <>
      <p>
        La <strong>live migration</strong> pre-copy itera la copia delle
        pagine dirty da host A ad host B finché il working set residuo è
        abbastanza piccolo da chiudere con uno <em>stop-and-copy</em> finale
        di pochi ms.
      </p>
      <code className="formula">
        Δt_iter = M_dirty / B  &nbsp; · &nbsp; M_next_dirty = D · Δt_iter
      </code>
      <ul>
        <li>
          Se <code>D ≥ B</code>, l'iterazione non converge.
        </li>
        <li>
          Lo <em>stop-and-copy</em> avviene quando le pagine residue stanno
          sotto una soglia (es. 50 MB) o si raggiunge un numero max di
          iterazioni.
        </li>
      </ul>
    </>
  )
}

type Round = { idx: number; remainingMB: number; durationMs: number }

function simulate(
  vmMB: number,
  dirtyRateMBps: number,
  bandwidthMBps: number,
  thresholdMB: number,
  maxRounds: number,
) {
  const rounds: Round[] = []
  let remaining = vmMB
  let converged = false
  for (let i = 0; i < maxRounds; i++) {
    const durationS = remaining / bandwidthMBps
    rounds.push({
      idx: i + 1,
      remainingMB: Number(remaining.toFixed(2)),
      durationMs: Number((durationS * 1000).toFixed(0)),
    })
    const nextDirty = dirtyRateMBps * durationS
    if (nextDirty <= thresholdMB) {
      converged = true
      // last stop-and-copy round
      rounds.push({
        idx: i + 2,
        remainingMB: Number(nextDirty.toFixed(2)),
        durationMs: Number(((nextDirty / bandwidthMBps) * 1000).toFixed(0)),
      })
      remaining = nextDirty
      break
    }
    if (nextDirty >= remaining) {
      // diverging
      converged = false
      break
    }
    remaining = nextDirty
  }
  return { rounds, converged, finalRemainingMB: remaining }
}

export function VmLiveMigration() {
  const { recordLabUse } = useProgress()
  const [vm, setVm] = useState(4096) // MB
  const [dirty, setDirty] = useState(80) // MB/s
  const [bw, setBw] = useState(500) // MB/s
  const [threshold, setThreshold] = useState(50) // MB
  const [running, setRunning] = useState(false)
  const [step, setStep] = useState(0)

  useEffect(() => {
    recordLabUse('vm-live-migration', 'lab-migration', 1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const sim = useMemo(
    () => simulate(vm, dirty, bw, threshold, 16),
    [vm, dirty, bw, threshold],
  )

  useEffect(() => {
    if (!running) return
    if (step >= sim.rounds.length) {
      setRunning(false)
      return
    }
    const t = setTimeout(() => setStep((s) => s + 1), 800)
    return () => clearTimeout(t)
  }, [running, step, sim.rounds.length])

  function start() {
    setStep(0)
    setRunning(true)
  }

  const lastRound = sim.rounds[sim.rounds.length - 1]
  const downtimeMs = sim.converged && lastRound ? lastRound.durationMs : null
  const totalTimeS = (sim.rounds.reduce((acc, r) => acc + r.durationMs, 0) / 1000).toFixed(1)

  return (
    <LabShell
      title="VM Live Migration"
      subtitle="Pre-copy iterativa e stop-and-copy: gioca con dirty rate e bandwidth."
      lessonSlug="lezione-16"
      theory={<MigrationTheory />}
    >
      <div className="lab-shell">
        <div className="lab-controls">
          <SliderControl
            label="VM memory (MB)"
            value={vm}
            min={512}
            max={16384}
            step={256}
            onChange={setVm}
          />
          <SliderControl
            label="Dirty rate (MB/s)"
            value={dirty}
            min={1}
            max={1000}
            step={1}
            onChange={setDirty}
          />
          <SliderControl
            label="Bandwidth (MB/s)"
            value={bw}
            min={50}
            max={2000}
            step={10}
            onChange={setBw}
          />
          <SliderControl
            label="Soglia stop-and-copy (MB)"
            value={threshold}
            min={5}
            max={500}
            step={5}
            onChange={setThreshold}
          />
          <button type="button" className="btn btn--primary" onClick={start}>
            ▶ Avvia simulazione
          </button>
        </div>

        <div className="lab-stats">
          <Stat
            label="Converge?"
            value={sim.converged ? '✓ sì' : '✗ no'}
            color={sim.converged ? '#22a06b' : '#ef4444'}
          />
          <Stat label="Round totali" value={String(sim.rounds.length)} />
          <Stat
            label="Downtime stimato"
            value={downtimeMs !== null ? `${downtimeMs} ms` : '— (non converge)'}
          />
          <Stat label="Tempo totale" value={`${totalTimeS} s`} />
        </div>

        <div className="lab-vis">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
            <strong>Host A (origine)</strong>
            <strong>→ trasferimento →</strong>
            <strong>Host B (destinazione)</strong>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 60px 1fr', alignItems: 'center', gap: 12, height: 80 }}>
            <div style={{ background: 'var(--bg-muted)', height: 60, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              VM ({vm} MB)
            </div>
            <motion.div
              key={step}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              style={{ textAlign: 'center', fontSize: 22 }}
            >
              {running ? '📦→' : '⟷'}
            </motion.div>
            <div style={{ background: 'var(--bg-muted)', height: 60, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {step >= sim.rounds.length ? 'VM live ✓' : 'pronto'}
            </div>
          </div>

          <div style={{ marginTop: 16 }}>
            <div className="muted" style={{ fontSize: 13, marginBottom: 8 }}>
              Iterazioni
            </div>
            <table className="lab-table" style={{ width: '100%', fontSize: 13 }}>
              <thead>
                <tr style={{ textAlign: 'left' }}>
                  <th>#</th>
                  <th>Da trasferire</th>
                  <th>Durata</th>
                  <th>Stato</th>
                </tr>
              </thead>
              <tbody>
                {sim.rounds.map((r, i) => (
                  <tr
                    key={r.idx}
                    style={{
                      background: i < step ? 'var(--accent-soft)' : undefined,
                    }}
                  >
                    <td>{r.idx}</td>
                    <td>{r.remainingMB} MB</td>
                    <td>{r.durationMs} ms</td>
                    <td>
                      {i === sim.rounds.length - 1 && sim.converged
                        ? 'stop-and-copy'
                        : i < step
                          ? 'done'
                          : 'pre-copy'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </LabShell>
  )
}

function SliderControl({
  label,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string
  value: number
  min: number
  max: number
  step: number
  onChange: (n: number) => void
}) {
  return (
    <label className="lab-control">
      <span>
        {label}: <strong>{value}</strong>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </label>
  )
}

function Stat({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <div className="lab-stat">
      <div className="lab-stat__label">{label}</div>
      <div className="lab-stat__value" style={color ? { color } : undefined}>
        {value}
      </div>
    </div>
  )
}
