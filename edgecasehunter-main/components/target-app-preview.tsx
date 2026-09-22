'use client'

import {
  ArrowUpRight,
  CreditCard,
  Clock,
  Lock,
  Wifi,
  BatteryFull,
  Fingerprint,
} from 'lucide-react'
import { cn } from '@/lib/utils'

export type AppState = 'dashboard' | 'locked' | 'login'

function StatusBar({ dark = false }: { dark?: boolean }) {
  return (
    <div
      className={cn(
        'flex items-center justify-between px-5 pt-3 pb-1 font-mono text-[10px]',
        dark ? 'text-white/70' : 'text-fg-secondary',
      )}
    >
      <span>9:41</span>
      <div className="flex items-center gap-1.5">
        <Wifi className="size-3" />
        <BatteryFull className="size-3.5" />
      </div>
    </div>
  )
}

function Dashboard() {
  const activity = [
    { name: 'Netflix', amount: '- \u20b9649', tag: 'Subscription' },
    { name: 'Swiggy', amount: '- \u20b9382', tag: 'Food' },
    { name: 'Salary', amount: '+ \u20b968,000', tag: 'Credit', credit: true },
  ]
  const actions = [
    { label: 'Transfer', icon: ArrowUpRight },
    { label: 'Pay', icon: CreditCard },
    { label: 'History', icon: Clock },
  ]
  return (
    <div className="flex h-full flex-col px-5 pt-3">
      <div className="text-[13px] text-fg-secondary">Good morning, Virat</div>
      <div className="mt-4 rounded-xl border border-border bg-surface-2 p-4">
        <div className="text-[11px] tracking-wide text-fg-muted uppercase">
          Available balance
        </div>
        <div className="mt-1 font-mono text-2xl font-semibold text-foreground">
          {'\u20b9'}24,520.00
        </div>
        <div className="mt-1 flex items-center gap-1 text-[11px] text-green">
          <span className="inline-block size-1.5 rounded-full bg-green" />
          Savings •••• 4521
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2">
        {actions.map(({ label, icon: Icon }) => (
          <button
            key={label}
            type="button"
            className="flex flex-col items-center gap-1.5 rounded-lg border border-border bg-surface-2 py-3 text-[11px] text-fg-secondary transition-colors hover:border-border-strong hover:text-foreground"
          >
            <Icon className="size-4 text-accent" />
            {label}
          </button>
        ))}
      </div>

      <div className="mt-5 mb-1 flex items-center justify-between">
        <span className="text-[11px] tracking-wide text-fg-muted uppercase">
          Recent activity
        </span>
      </div>
      <div className="flex flex-col divide-y divide-border">
        {activity.map((a) => (
          <div key={a.name} className="flex items-center justify-between py-2.5">
            <div className="flex items-center gap-2.5">
              <div className="flex size-8 items-center justify-center rounded-full border border-border bg-surface text-[11px] font-medium text-fg-secondary">
                {a.name[0]}
              </div>
              <div className="leading-tight">
                <div className="text-[13px] text-foreground">{a.name}</div>
                <div className="text-[11px] text-fg-muted">{a.tag}</div>
              </div>
            </div>
            <span
              className={cn(
                'font-mono text-[12px]',
                a.credit ? 'text-green' : 'text-foreground',
              )}
            >
              {a.amount}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function Locked() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 bg-black/40">
      <div className="text-center font-mono text-4xl font-medium text-white/90">
        9:41
      </div>
      <div className="text-[12px] text-white/50">Monday, 22 September</div>
      <div className="mt-6 flex size-12 items-center justify-center rounded-full border border-white/15 bg-white/5">
        <Lock className="size-5 text-white/70" />
      </div>
      <div className="font-mono text-[11px] tracking-wide text-white/40 uppercase">
        Device locked
      </div>
    </div>
  )
}

function Login() {
  return (
    <div className="flex h-full flex-col px-6 pt-10">
      <div className="mb-8 flex items-center gap-2">
        <div className="flex size-8 items-center justify-center rounded-md bg-accent/15">
          <CreditCard className="size-4 text-accent" />
        </div>
        <span className="text-[13px] font-semibold text-foreground">Demo Bank</span>
      </div>
      <div className="text-lg font-semibold text-foreground">Sign in</div>
      <div className="mt-1 text-[12px] text-fg-secondary">
        Session expired. Please authenticate again.
      </div>

      <div className="mt-6 flex flex-col gap-3">
        <div className="rounded-lg border border-border bg-surface-2 px-3 py-2.5 text-[12px] text-fg-muted">
          virat@demo.app
        </div>
        <div className="flex items-center justify-between rounded-lg border border-border bg-surface-2 px-3 py-2.5 text-[12px] text-fg-muted">
          <span>••••••••</span>
        </div>
        <button
          type="button"
          className="mt-1 rounded-lg bg-accent py-2.5 text-[13px] font-medium text-white"
        >
          Sign in
        </button>
      </div>

      <button
        type="button"
        className="mt-6 flex items-center justify-center gap-2 text-[12px] text-fg-secondary"
      >
        <Fingerprint className="size-4 text-accent" />
        Use biometrics
      </button>
    </div>
  )
}

export function TargetAppPreview({
  state = 'dashboard',
  className,
  scanning = false,
}: {
  state?: AppState
  className?: string
  scanning?: boolean
}) {
  return (
    <div
      className={cn(
        'relative mx-auto w-full max-w-[280px] rounded-[2.25rem] border border-border-strong bg-black p-2 shadow-[0_0_0_1px_rgba(0,0,0,0.6),0_24px_60px_-20px_rgba(0,0,0,0.8)]',
        className,
      )}
    >
      {/* screen */}
      <div className="relative aspect-[9/19] overflow-hidden rounded-[1.75rem] bg-background">
        {/* notch */}
        <div className="absolute left-1/2 top-2 z-20 h-4 w-20 -translate-x-1/2 rounded-full bg-black" />

        <StatusBar dark={state === 'locked'} />

        <div className="h-[calc(100%-1.75rem)]">
          {state === 'dashboard' && <Dashboard />}
          {state === 'locked' && <Locked />}
          {state === 'login' && <Login />}
        </div>

        {/* scan overlay during exploration */}
        {scanning && (
          <div className="pointer-events-none absolute inset-0 z-30 overflow-hidden">
            <div
              className="absolute inset-x-0 h-16 bg-gradient-to-b from-transparent via-accent/15 to-transparent"
              style={{ animation: 'ec-scan 1.6s linear infinite' }}
            />
            <div className="absolute inset-0 border border-accent/25" />
          </div>
        )}
      </div>
    </div>
  )
}
