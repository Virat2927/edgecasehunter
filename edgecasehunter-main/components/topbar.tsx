'use client'

import { ChevronDown, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import type { Screen } from '@/lib/demo-data'
import { StatusDot } from '@/components/primitives'
import { LogoWordmark } from '@/components/logo'
import { cn } from '@/lib/utils'

const crumbLabel: Record<Screen, string> = {
  overview: 'Overview',
  exploration: 'Exploration \u00b7 #EC-001',
  findings: 'Findings',
  evidence: 'Evidence \u00b7 #001',
}

const nav: { id: Screen; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'exploration', label: 'Exploration' },
  { id: 'findings', label: 'Findings' },
  { id: 'evidence', label: 'Evidence' },
]

export function Topbar({ active, onNavigate }: { active: Screen; onNavigate: (screen: Screen) => void }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 flex min-h-14 shrink-0 items-center justify-between gap-3 border-b border-border bg-surface/95 px-3 backdrop-blur sm:px-5">
      <div className="flex min-w-0 items-center gap-2 text-[13px]">
        <div className="flex shrink-0 items-center gap-2 md:hidden">
          <LogoWordmark />
          <span className="rounded border border-accent/25 bg-accent/10 px-1.5 py-1 font-mono text-[9px] tracking-wide text-accent uppercase">
            Demo Bank
          </span>
        </div>
        <span className="hidden font-mono font-semibold tracking-tight text-foreground sm:inline">EdgeCase Hunter</span>
        <ChevronRight className="hidden size-3.5 text-fg-muted sm:inline" />
        <span className="hidden truncate font-mono text-[11px] text-fg-secondary sm:inline sm:text-[13px]">{crumbLabel[active]}</span>
      </div>

      <div className="relative flex items-center gap-2 sm:gap-4">
        <div className="hidden items-center gap-2 text-[13px] sm:flex">
          <span className="text-fg-muted">Target</span>
          <span className="font-medium text-foreground">Demo Banking App</span>
        </div>
        <span className="hidden h-4 w-px bg-border sm:block" />
        <span className="hidden items-center gap-1.5 rounded-md border border-border bg-surface-2 px-2 py-1 font-mono text-[11px] text-amber sm:flex">
          <StatusDot tone="amber" />
          Demo Environment
        </span>
        <button
          type="button"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
          className="flex min-h-11 items-center gap-2 rounded-md border border-border bg-surface-2 px-3 font-mono text-[11px] text-foreground active:scale-[0.98] md:hidden"
        >
          <span className="size-1.5 rounded-full bg-accent" />
          {nav.find((item) => item.id === active)?.label}
          <ChevronDown className={cn('size-4 text-fg-muted transition-transform', menuOpen && 'rotate-180')} />
        </button>
        {menuOpen && (
          <div className="absolute right-0 top-[calc(100%+0.5rem)] w-48 rounded-lg border border-border bg-surface-2 p-1.5 shadow-2xl md:hidden">
            {nav.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => { onNavigate(item.id); setMenuOpen(false) }}
                className={cn('flex min-h-11 w-full items-center rounded-md px-3 text-left font-mono text-xs active:scale-[0.98]', active === item.id ? 'bg-accent/10 text-accent' : 'text-fg-secondary')}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  )
}
