'use client'

import { useState } from 'react'
import type { Screen, FindingKind } from '@/lib/demo-data'
import { findings } from '@/lib/demo-data'
import { FindingCard } from '@/components/finding-card'
import { cn } from '@/lib/utils'

const filters: ('All' | FindingKind)[] = ['All', 'State', 'Navigation', 'Input', 'Lifecycle']

export function FindingsScreen({
  onOpenFinding,
}: {
  onOpenFinding: (id: string) => void
  onNavigate?: (s: Screen) => void
}) {
  const [filter, setFilter] = useState<(typeof filters)[number]>('All')

  const visible = findings.filter((f) => filter === 'All' || f.kind === filter)

  return (
    <div className="ec-fade-up flex flex-col gap-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-lg font-semibold tracking-tight text-foreground">Findings</h1>
          <p className="mt-1 text-[13px] text-fg-secondary">
            One unusual transition found across this session.
          </p>
        </div>

        <div className="flex items-center gap-1 rounded-md border border-border bg-surface p-1">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={cn(
                'rounded px-2.5 py-1 text-[12px] transition-colors duration-150',
                filter === f
                  ? 'bg-surface-2 text-foreground'
                  : 'text-fg-secondary hover:text-foreground',
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2.5">
        {visible.map((f, i) => (
          <FindingCard
            key={f.id}
            finding={f}
            onOpen={onOpenFinding}
            primary={i === 0 && f.status === 'Verified'}
          />
        ))}
        {visible.length === 0 && (
          <div className="rounded-lg border border-dashed border-border bg-surface px-4 py-10 text-center text-[13px] text-fg-muted">
            No findings in this category.
          </div>
        )}
      </div>
    </div>
  )
}
