'use client'

import { ChevronRight } from 'lucide-react'
import type { Screen } from '@/lib/demo-data'
import { StatusDot } from '@/components/primitives'

const crumbLabel: Record<Screen, string> = {
  overview: 'Overview',
  exploration: 'Exploration \u00b7 #EC-001',
  findings: 'Findings',
  evidence: 'Evidence \u00b7 #001',
}

export function Topbar({ active }: { active: Screen }) {
  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-border bg-surface/60 px-5 backdrop-blur">
      <div className="flex items-center gap-2 text-[13px]">
        <span className="font-medium text-foreground">EdgeCase Hunter</span>
        <ChevronRight className="size-3.5 text-fg-muted" />
        <span className="font-mono text-fg-secondary">{crumbLabel[active]}</span>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden items-center gap-2 text-[13px] sm:flex">
          <span className="text-fg-muted">Target</span>
          <span className="font-medium text-foreground">Demo Banking App</span>
        </div>
        <span className="h-4 w-px bg-border" />
        <span className="flex items-center gap-1.5 rounded-md border border-border bg-surface-2 px-2 py-1 font-mono text-[11px] text-amber">
          <StatusDot tone="amber" />
          Demo Environment
        </span>
      </div>
    </header>
  )
}
