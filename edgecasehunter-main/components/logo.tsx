import { cn } from '@/lib/utils'

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={cn('size-full', className)}
      aria-hidden="true"
    >
      {/* main path */}
      <path
        d="M4 12h6"
        stroke="var(--fg-secondary)"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <path
        d="M14 12h6"
        stroke="var(--fg-secondary)"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      {/* unexpected branch */}
      <path
        d="M10 12c2 0 2-6 4-6"
        stroke="var(--accent)"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <circle cx="4" cy="12" r="2" fill="var(--surface)" stroke="var(--fg-secondary)" strokeWidth="1.5" />
      <circle cx="20" cy="12" r="2" fill="var(--surface)" stroke="var(--fg-secondary)" strokeWidth="1.5" />
      <circle cx="18" cy="6" r="2" fill="var(--accent)" />
    </svg>
  )
}

export function LogoWordmark({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="flex size-7 items-center justify-center rounded-md border border-border bg-surface-2">
        <LogoMark className="size-4.5" />
      </div>
      {!compact && (
        <div className="leading-[1.05]">
          <div className="font-mono text-[11px] font-semibold tracking-[0.14em] text-foreground">
            EDGECASE
          </div>
          <div className="font-mono text-[11px] font-semibold tracking-[0.14em] text-fg-secondary">
            HUNTER
          </div>
        </div>
      )}
    </div>
  )
}
