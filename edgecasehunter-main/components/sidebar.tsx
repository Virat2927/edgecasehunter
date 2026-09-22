'use client'

import { LayoutGrid, Radar, Bug, FileSearch } from 'lucide-react'
import type { Screen } from '@/lib/demo-data'
import { LogoWordmark } from '@/components/logo'
import { StatusDot } from '@/components/primitives'
import { cn } from '@/lib/utils'

const nav: { id: Screen; label: string; icon: typeof LayoutGrid }[] = [
  { id: 'overview', label: 'Overview', icon: LayoutGrid },
  { id: 'exploration', label: 'Exploration', icon: Radar },
  { id: 'findings', label: 'Findings', icon: Bug },
  { id: 'evidence', label: 'Evidence', icon: FileSearch },
]

export function Sidebar({
  active,
  onNavigate,
}: {
  active: Screen
  onNavigate: (s: Screen) => void
}) {
  return (
    <aside className="hidden w-[212px] shrink-0 flex-col border-r border-border bg-surface md:flex">
      <div className="flex h-14 items-center border-b border-border px-4">
        <LogoWordmark />
      </div>

      <nav className="flex flex-1 flex-col gap-0.5 p-2.5">
        <div className="px-2 pt-1 pb-2 font-mono text-[10px] tracking-[0.14em] text-fg-muted uppercase">
          Workspace
        </div>
        {nav.map(({ id, label, icon: Icon }) => {
          const isActive = active === id
          return (
            <button
              key={id}
              type="button"
              onClick={() => onNavigate(id)}
              aria-current={isActive ? 'page' : undefined}
              className={cn(
                'group relative flex items-center gap-2.5 rounded-md px-2.5 py-1.5 text-[13px] transition-colors duration-150',
                isActive
                  ? 'bg-surface-2 text-foreground'
                  : 'text-fg-secondary hover:bg-surface-2/60 hover:text-foreground',
              )}
            >
              {isActive && (
                <span className="absolute left-0 top-1/2 h-4 w-0.5 -translate-y-1/2 rounded-full bg-accent" />
              )}
              <Icon
                className={cn(
                  'size-4 transition-colors',
                  isActive ? 'text-accent' : 'text-fg-muted group-hover:text-fg-secondary',
                )}
              />
              {label}
            </button>
          )
        })}
      </nav>

      <div className="border-t border-border p-3">
        <div className="rounded-md border border-border bg-surface-2 p-3">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[11px] tracking-wide text-fg-muted uppercase">
              Demo target
            </span>
            <span className="flex items-center gap-1.5 font-mono text-[11px] text-green">
              <StatusDot tone="green" live />
              Connected
            </span>
          </div>
          <div className="text-[13px] font-medium text-foreground">Demo Banking App</div>
          <div className="mt-0.5 font-mono text-[11px] text-fg-muted">Prototype build</div>
        </div>
      </div>
    </aside>
  )
}
