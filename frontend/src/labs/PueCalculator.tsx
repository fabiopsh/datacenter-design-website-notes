import { useEffect, useMemo, useState } from 'react'
import { LabShell } from '@/components/LabShell'
import { useProgress } from '@/hooks/useProgress'

function PueTheory() {
  return (
    <>
      <p>
        Il <strong>Power Usage Effectiveness (PUE)</strong> misura quanta
        energia di un data center va effettivamente all'IT, rispetto al totale
        in ingresso.
      </p>
      <code className="formula">PUE = (IT + cooling + power overhead + altro) / IT</code>
      <ul>
        <li>PUE = 1,0 — limite ideale (zero overhead).</li>
        <li>1,1 – 1,3 — data center moderni efficienti, spesso con liquid cooling.</li>
        <li>1,4 – 1,8 — data center tradizionali ad aria.</li>
        <li>&gt; 2,0 — molto inefficiente (server room non specializzata).</li>
      </ul>
      <p>
        Aumentare il carico IT a parità di overhead riduce il PUE: un effetto
        controintuitivo ma corretto, che è anche una delle "insidie" della
        metrica.
      </p>
    </>
  )
}

function ratingFor(pue: number): { label: string; color: string } {
  if (pue < 1.15) return { label: 'Eccellente', color: '#22a06b' }
  if (pue < 1.4) return { label: 'Buono', color: '#5b8def' }
  if (pue < 1.8) return { label: 'Discreto', color: '#f7931a' }
  return { label: 'Critico', color: '#ef4444' }
}

export function PueCalculator() {
  const { recordLabUse } = useProgress()
  const [it, setIt] = useState(500) // kW
  const [cooling, setCooling] = useState(150) // kW
  const [power, setPower] = useState(40) // kW
  const [other, setOther] = useState(20) // kW

  useEffect(() => {
    recordLabUse('pue-calculator', 'lab-pue', 1)
    // intentionally run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const total = it + cooling + power + other
  const pue = useMemo(() => (it > 0 ? total / it : 0), [it, total])
  const rating = ratingFor(pue)

  return (
    <LabShell
      title="PUE Calculator"
      subtitle="Esplora come carichi e overhead muovono il Power Usage Effectiveness."
      lessonSlug="lezione-03"
      theory={<PueTheory />}
    >
      <div className="lab-shell">
        <div className="lab-controls">
          <SliderControl
            label="IT load (kW)"
            value={it}
            min={50}
            max={2000}
            step={10}
            onChange={setIt}
          />
          <SliderControl
            label="Cooling overhead (kW)"
            value={cooling}
            min={0}
            max={1500}
            step={10}
            onChange={setCooling}
          />
          <SliderControl
            label="Power overhead (kW)"
            value={power}
            min={0}
            max={500}
            step={5}
            onChange={setPower}
          />
          <SliderControl
            label="Altro (lighting, etc, kW)"
            value={other}
            min={0}
            max={200}
            step={1}
            onChange={setOther}
          />
        </div>

        <div className="lab-vis" style={{ textAlign: 'center', padding: 24 }}>
          <div className="muted" style={{ fontSize: 13 }}>PUE risultante</div>
          <div
            style={{ fontSize: 72, fontWeight: 700, color: rating.color, lineHeight: 1 }}
          >
            {pue.toFixed(2)}
          </div>
          <div style={{ fontWeight: 600, color: rating.color, marginTop: 4 }}>
            {rating.label}
          </div>
          <div className="muted" style={{ marginTop: 8, fontSize: 13 }}>
            Total facility power: {total} kW · IT: {it} kW · Overhead: {total - it} kW
          </div>
        </div>

        <div className="lab-stats">
          <Stat label="IT load" value={`${it} kW`} />
          <Stat label="Cooling" value={`${cooling} kW`} pct={cooling / total} />
          <Stat label="Power" value={`${power} kW`} pct={power / total} />
          <Stat label="Altro" value={`${other} kW`} pct={other / total} />
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

function Stat({ label, value, pct }: { label: string; value: string; pct?: number }) {
  return (
    <div className="lab-stat">
      <div className="lab-stat__label">{label}</div>
      <div className="lab-stat__value">{value}</div>
      {pct !== undefined && (
        <div className="muted" style={{ fontSize: 12 }}>
          {(pct * 100).toFixed(1)}% del totale
        </div>
      )}
    </div>
  )
}
