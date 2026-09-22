import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type Tone = 'accent' | 'green' | 'amber' | 'red' | 'neutral'

const toneText: Record<Tone, string> = {
  accent: 'text-accent',
  green: 'text-green',
  amber: 'text-amber',
  red: 'text-red',
  neutral: 'text-fg-secondary',
}

const toneDot: Record<Tone, string> = {
  accent: 'bg-accent',
  green: 'bg-green',
  amber: 'bg-amber',
  red: 'bg-red',
  neutral: 'bg-fg-muted',
}

export function Panel({
  className,
  children,
  ...props
}: React.ComponentProps<'section'>) {
  return (
    <section
      className={cn(
        'rounded-lg border border-border bg-surface',
        className,
      )}
      {...props}
    >
      {children}
    </section>
  )
}

export function PanelHeader({
  title,
  right,
  className,
}: {
  title: ReactNode
  right?: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'flex items-center justify-between gap-3 border-b border-border px-4 py-2.5',
        className,
      )}
    >
      <span className="text-[13px] font-medium text-foreground">{title}</span>
      {right}
    </div>
  )
}

export function StatusDot({
  tone = 'neutral',
  live = false,
  className,
}: {
  tone?: Tone
  live?: boolean
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-block size-1.5 rounded-full',
        toneDot[tone],
        live && 'ec-live-dot',
        className,
      )}
    />
  )
}

export function Pill({
  tone = 'neutral',
  children,
  className,
}: {
  tone?: Tone
  children: ReactNode
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 font-mono text-[10.5px] font-medium tracking-wide uppercase',
        'border-border bg-surface-2',
        toneText[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}

/** small stacked key/value used across cards */
export function Field({
  label,
  value,
  tone = 'neutral',
  mono = true,
}: {
  label: string
  value: ReactNode
  tone?: Tone
  mono?: boolean
}) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[11px] tracking-wide text-fg-muted uppercase">
        {label}
      </span>
      <span
        className={cn(
          'text-[13px] font-medium',
          mono && 'font-mono',
          tone === 'neutral' ? 'text-foreground' : toneText[tone],
        )}
      >
        {value}
      </span>
    </div>
  )
}

export { toneText, toneDot }
export type { Tone }
