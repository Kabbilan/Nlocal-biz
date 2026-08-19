import { formatCurrency } from '@/services/api'

export function PriceRangeBar({
  min,
  max,
  current,
  recommended,
}: {
  min: number
  max: number
  current: number
  recommended: number
}) {
  // Pad the axis so markers outside the market range still show.
  const values = [min, max, current, recommended]
  const lo = Math.min(...values)
  const hi = Math.max(...values)
  const pad = (hi - lo) * 0.12 || 20
  const axisMin = lo - pad
  const axisMax = hi + pad
  const pct = (v: number) => ((v - axisMin) / (axisMax - axisMin)) * 100

  return (
    <div className="pt-8 pb-10">
      <div className="relative h-2.5 rounded-full bg-muted">
        {/* market range band */}
        <div
          className="absolute h-full rounded-full bg-primary/25"
          style={{ left: `${pct(min)}%`, width: `${pct(max) - pct(min)}%` }}
        />
        {/* market range labels */}
        <Marker position={pct(min)} label="Market low" value={formatCurrency(min)} below muted />
        <Marker position={pct(max)} label="Market high" value={formatCurrency(max)} below muted />
        {/* current */}
        <Dot position={pct(current)} className="bg-foreground" />
        <Marker position={pct(current)} label="Your price" value={formatCurrency(current)} />
        {/* recommended */}
        <Dot position={pct(recommended)} className="bg-primary ring-4 ring-primary/20" />
        <Marker
          position={pct(recommended)}
          label="Recommended"
          value={formatCurrency(recommended)}
          accent
        />
      </div>
    </div>
  )
}

function Dot({ position, className }: { position: number; className?: string }) {
  return (
    <span
      className={`absolute top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-card ${className}`}
      style={{ left: `${position}%` }}
    />
  )
}

function Marker({
  position,
  label,
  value,
  accent,
  below,
  muted,
}: {
  position: number
  label: string
  value: string
  accent?: boolean
  below?: boolean
  muted?: boolean
}) {
  return (
    <div
      className={`absolute flex -translate-x-1/2 flex-col items-center ${below ? 'top-4' : 'bottom-4'}`}
      style={{ left: `${position}%` }}
    >
      <span
        className={`whitespace-nowrap text-[0.7rem] font-medium ${
          muted ? 'text-muted-foreground' : accent ? 'text-primary' : 'text-foreground'
        }`}
      >
        {label}
      </span>
      <span
        className={`whitespace-nowrap font-display text-xs font-bold ${accent ? 'text-primary' : muted ? 'text-muted-foreground' : 'text-foreground'}`}
      >
        {value}
      </span>
    </div>
  )
}
