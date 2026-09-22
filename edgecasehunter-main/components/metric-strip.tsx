import { metrics } from '@/lib/demo-data'

export function MetricStrip() {
  return (
    <div className="grid grid-cols-2 divide-x divide-y divide-border overflow-hidden rounded-lg border border-border bg-surface sm:grid-cols-4 sm:divide-y-0">
      {metrics.map((m) => (
        <div key={m.label} className="px-4 py-3.5">
          <div className="text-[11px] tracking-wide text-fg-muted uppercase">
            {m.label}
          </div>
          <div className="mt-1 font-mono text-2xl font-semibold text-foreground tabular-nums">
            {m.value}
          </div>
        </div>
      ))}
    </div>
  )
}
