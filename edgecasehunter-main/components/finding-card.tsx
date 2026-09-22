'use client'

import { ChevronRight, CircleCheck, CircleDashed, Loader } from 'lucide-react'
import type { Finding } from '@/lib/demo-data'
import { Pill, type Tone } from '@/components/primitives'
import { cn } from '@/lib/utils'

const statusMeta: Record<
  Finding['status'],
  { tone: Tone; icon: typeof CircleCheck }
> = {
  Verified: { tone: 'green', icon: CircleCheck },
  'Not reproduced': { tone: 'neutral', icon: CircleDashed },
  Investigating: { tone: 'amber', icon: Loader },
}

const severityTone: Record<Finding['severity'], Tone> = {
  High: 'red',
  Medium: 'amber',
  Low: 'neutral',
}

export function FindingCard({
  finding,
  onOpen,
  primary = false,
}: {
  finding: Finding
  onOpen: (id: string) => void
  primary?: boolean
}) {
  const { tone, icon: Icon } = statusMeta[finding.status]
  return (
    <button
      type="button"
      onClick={() => onOpen(finding.id)}
      className={cn(
        'group flex w-full items-center gap-4 rounded-lg border bg-surface px-4 py-3.5 text-left transition-all duration-150 hover:border-border-strong hover:bg-surface-2',
        primary ? 'border-border-strong' : 'border-border',
      )}
    >
      <div
        className={cn(
          'flex size-9 shrink-0 items-center justify-center rounded-md border',
          primary
            ? 'border-red/25 bg-red/10 text-red'
            : 'border-border bg-surface-2 text-fg-muted',
        )}
      >
        <Icon className={cn('size-4', tone === 'amber' && 'animate-spin [animation-duration:3s]')} />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px] tracking-wide text-fg-muted uppercase">
            {finding.kind} regression {finding.code}
          </span>
        </div>
        <div className="mt-0.5 truncate text-[13.5px] font-medium text-foreground">
          {finding.title}
        </div>
      </div>

      <div className="hidden items-center gap-6 md:flex">
        <div className="flex flex-col items-end">
          <span className="text-[10.5px] tracking-wide text-fg-muted uppercase">Reproduced</span>
          <span className="font-mono text-[12px] text-foreground">{finding.reproduced}</span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[10.5px] tracking-wide text-fg-muted uppercase">Found</span>
          <span className="font-mono text-[12px] text-foreground">{finding.found}</span>
        </div>
        <Pill tone={severityTone[finding.severity]}>{finding.severity}</Pill>
        <Pill tone={tone}>{finding.status}</Pill>
      </div>

      <ChevronRight className="size-4 shrink-0 text-fg-muted transition-transform duration-150 group-hover:translate-x-0.5 group-hover:text-fg-secondary" />
    </button>
  )
}
