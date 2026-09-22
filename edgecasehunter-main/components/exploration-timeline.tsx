import { TriangleAlert } from 'lucide-react'
import { explorationLog } from '@/lib/demo-data'
import { cn } from '@/lib/utils'

export function ExplorationTimeline() {
  return (
    <ol className="relative flex flex-col">
      {explorationLog.map((entry, i) => {
        const last = i === explorationLog.length - 1
        return (
          <li key={i} className="relative flex gap-3 pb-4 last:pb-0">
            {/* rail */}
            <div className="relative flex flex-col items-center">
              <span
                className={cn(
                  'mt-1 size-2 rounded-full ring-2 ring-surface',
                  entry.warning ? 'bg-amber' : 'bg-border-strong',
                )}
              />
              {!last && <span className="w-px flex-1 bg-border" />}
            </div>

            <div className="-mt-0.5 flex flex-1 items-center justify-between gap-3">
              <div className="flex flex-col">
                <span className="font-mono text-[11px] text-fg-muted">{entry.time}</span>
                <span className="font-mono text-[12.5px] text-foreground">
                  {entry.from} <span className="text-fg-muted">{'\u2192'}</span> {entry.to}
                </span>
              </div>
              {entry.warning && (
                <span className="flex items-center gap-1 rounded border border-amber/25 bg-amber/10 px-1.5 py-0.5 font-mono text-[10px] tracking-wide text-amber uppercase">
                  <TriangleAlert className="size-3" />
                  Warning
                </span>
              )}
            </div>
          </li>
        )
      })}
    </ol>
  )
}
