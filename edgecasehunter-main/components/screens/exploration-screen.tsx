'use client'

import { useEffect, useRef, useState } from 'react'
import {
  Play,
  RotateCcw,
  ArrowRight,
  Camera,
  Lock,
  RefreshCw,
  ScanSearch,
  TriangleAlert,
  Check,
} from 'lucide-react'
import type { Screen } from '@/lib/demo-data'
import { Button } from '@/components/ui/button'
import { TargetAppPreview, type AppState } from '@/components/target-app-preview'
import { StateGraph } from '@/components/state-graph'
import { ProductFlow } from '@/components/product-flow'
import { Panel, PanelHeader, StatusDot, Field, Pill } from '@/components/primitives'
import { cn } from '@/lib/utils'

type Phase = 'idle' | 'capture' | 'lock' | 'resume' | 'observe' | 'found'

const steps: {
  phase: Phase
  status: string
  label: string
  icon: typeof Camera
  app: AppState
  flow: number
}[] = [
  { phase: 'capture', status: 'Exploring', label: 'Capturing current state\u2026', icon: Camera, app: 'dashboard', flow: 0 },
  { phase: 'lock', status: 'Executing', label: 'Locking application state', icon: Lock, app: 'locked', flow: 2 },
  { phase: 'resume', status: 'Executing', label: 'Resuming application', icon: RefreshCw, app: 'locked', flow: 2 },
  { phase: 'observe', status: 'Observing', label: 'Comparing resulting state', icon: ScanSearch, app: 'login', flow: 3 },
]

const STEP_MS = 1400

export function ExplorationScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [phase, setPhase] = useState<Phase>('idle')
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  const clearTimers = () => {
    timers.current.forEach(clearTimeout)
    timers.current = []
  }

  useEffect(() => clearTimers, [])

  const run = () => {
    clearTimers()
    const order: Phase[] = ['capture', 'lock', 'resume', 'observe', 'found']
    order.forEach((p, i) => {
      timers.current.push(setTimeout(() => setPhase(p), i * STEP_MS))
    })
  }

  const reset = () => {
    clearTimers()
    setPhase('idle')
  }

  const isRunning = phase !== 'idle' && phase !== 'found'
  const activeStep = steps.find((s) => s.phase === phase)
  const appState: AppState =
    phase === 'found' ? 'login' : activeStep ? activeStep.app : 'dashboard'
  const flowIndex = phase === 'found' ? 4 : activeStep ? activeStep.flow : -1

  return (
    <div className="ec-fade-up flex flex-col gap-5">
      {/* header */}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-lg font-semibold tracking-tight text-foreground">
              Live exploration
            </h1>
            <span
              className={cn(
                'flex items-center gap-1.5 rounded-full border px-2 py-0.5 font-mono text-[10.5px] tracking-wide uppercase',
                isRunning
                  ? 'border-accent/30 bg-accent/10 text-accent'
                  : phase === 'found'
                    ? 'border-red/30 bg-red/10 text-red'
                    : 'border-border bg-surface-2 text-fg-secondary',
              )}
            >
              <StatusDot
                tone={isRunning ? 'accent' : phase === 'found' ? 'red' : 'neutral'}
                live={isRunning}
              />
              {isRunning ? 'Exploring' : phase === 'found' ? 'Bug found' : 'Idle'}
            </span>
          </div>
          <p className="mt-1 flex items-center gap-3 font-mono text-[12px] text-fg-muted">
            <span>Target: Demo Banking App</span>
            <span className="text-border-strong">|</span>
            <span>Session: EC-001</span>
          </p>
        </div>
        <ProductFlow
          activeIndex={flowIndex}
          className="rounded-md border border-border bg-surface px-3 py-2"
        />
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.15fr_1fr]">
        {/* target preview */}
        <Panel className="overflow-hidden">
          <PanelHeader
            title="Target application"
            right={
              <span className="font-mono text-[11px] text-fg-muted">9:41 · Portrait</span>
            }
          />
          <div className="relative flex items-center justify-center bg-[radial-gradient(circle_at_50%_0%,rgba(124,108,255,0.05),transparent_60%)] px-6 py-8">
            <TargetAppPreview state={appState} scanning={phase === 'capture' || phase === 'observe'} />
          </div>
        </Panel>

        {/* control column */}
        <div className="flex flex-col gap-5">
          {/* current state */}
          <Panel>
            <PanelHeader title="Current state" />
            <div className="grid grid-cols-3 gap-3 p-4">
              <Field
                label="Auth"
                value={appState === 'login' ? 'Unauthed' : 'Authed'}
                tone={appState === 'login' ? 'red' : 'green'}
              />
              <Field
                label="Screen"
                value={appState === 'login' ? 'Login' : appState === 'locked' ? 'Lock' : 'Dashboard'}
              />
              <Field label="Network" value="Online" tone="green" />
            </div>
          </Panel>

          {/* dynamic panel: next edge case / progress / found */}
          {phase === 'idle' && <NextEdgeCase onRun={run} />}
          {isRunning && <RunProgress phase={phase} />}
          {phase === 'found' && (
            <BugPanel onViewEvidence={() => onNavigate('evidence')} onRunAgain={run} onReset={reset} />
          )}
        </div>
      </div>

      {/* exploration memory / graph */}
      <Panel>
        <PanelHeader
          title="Exploration memory"
          right={<span className="font-mono text-[11px] text-fg-muted">State space · 24 nodes</span>}
        />
        <div className="grid grid-cols-1 gap-6 p-4 md:grid-cols-[1.5fr_1fr]">
          <StateGraph />
          <div className="flex flex-col justify-center gap-3 border-t border-border pt-4 md:border-t-0 md:border-l md:pt-0 md:pl-6">
            <p className="text-[13px] leading-relaxed text-fg-secondary">
              EdgeCase Hunter isn&apos;t running a fixed script. It maps the state space and
              chooses transitions it hasn&apos;t seen yet.
            </p>
            <div className="flex flex-col gap-2">
              <Field label="Selected candidate" value="Lock → Resume" tone="accent" />
              <Field label="Why" value="Auth may not survive lifecycle" mono={false} />
            </div>
          </div>
        </div>
      </Panel>
    </div>
  )
}

function NextEdgeCase({ onRun }: { onRun: () => void }) {
  const signals: { label: string; value: string; tone: 'red' | 'accent' | 'neutral' }[] = [
    { label: 'Risk', value: 'High', tone: 'red' },
    { label: 'Novelty', value: '0.87', tone: 'accent' },
    { label: 'Previously tested', value: 'No', tone: 'neutral' },
  ]
  return (
    <Panel className="ec-fade">
      <PanelHeader
        title="Next edge case"
        right={<Pill tone="accent">Candidate</Pill>}
      />
      <div className="p-4">
        <div className="flex items-center gap-2 font-mono text-[15px] font-semibold text-foreground">
          Lock <ArrowRight className="size-4 text-accent" /> Resume
        </div>
        <p className="mt-2 text-[13px] leading-relaxed text-fg-secondary">
          Authentication state may not survive a lifecycle interruption.
        </p>

        <div className="mt-4 grid grid-cols-3 divide-x divide-border overflow-hidden rounded-md border border-border bg-surface-2">
          {signals.map((s) => (
            <div key={s.label} className="px-3 py-2.5">
              <div className="text-[10.5px] tracking-wide text-fg-muted uppercase">{s.label}</div>
              <div
                className={cn(
                  'mt-0.5 font-mono text-[13px] font-medium',
                  s.tone === 'red' && 'text-red',
                  s.tone === 'accent' && 'text-accent',
                  s.tone === 'neutral' && 'text-foreground',
                )}
              >
                {s.value}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-border p-3">
        <Button
          size="lg"
          className="w-full bg-accent text-white hover:bg-accent/90"
          onClick={onRun}
        >
          <Play className="size-4" />
          Run edge case
        </Button>
      </div>
    </Panel>
  )
}

function RunProgress({ phase }: { phase: Phase }) {
  const currentIndex = steps.findIndex((s) => s.phase === phase)
  return (
    <Panel className="ec-fade">
      <PanelHeader
        title="Running edge case"
        right={
          <span className="font-mono text-[11px] text-accent">
            {currentIndex + 1} / {steps.length}
          </span>
        }
      />
      <div className="flex flex-col gap-1 p-3">
        {steps.map((s, i) => {
          const done = i < currentIndex
          const active = i === currentIndex
          const Icon = s.icon
          return (
            <div
              key={s.phase}
              className={cn(
                'flex items-center gap-3 rounded-md px-2.5 py-2 transition-colors duration-200',
                active && 'bg-surface-2',
              )}
            >
              <span
                className={cn(
                  'flex size-6 items-center justify-center rounded-md border transition-colors',
                  done && 'border-green/30 bg-green/10 text-green',
                  active && 'border-accent/30 bg-accent/10 text-accent',
                  !done && !active && 'border-border bg-surface text-fg-muted',
                )}
              >
                {done ? (
                  <Check className="size-3.5" />
                ) : (
                  <Icon className={cn('size-3.5', active && 'animate-pulse')} />
                )}
              </span>
              <div className="flex-1">
                <div
                  className={cn(
                    'font-mono text-[10px] tracking-wide uppercase',
                    active ? 'text-accent' : done ? 'text-green' : 'text-fg-muted',
                  )}
                >
                  {s.status}
                </div>
                <div
                  className={cn(
                    'text-[13px]',
                    active || done ? 'text-foreground' : 'text-fg-muted',
                  )}
                >
                  {s.label}
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <div className="border-t border-border px-3 py-2.5">
        <div className="h-1 overflow-hidden rounded-full bg-surface-2">
          <div
            className="h-full rounded-full bg-accent transition-all duration-500 ease-out"
            style={{ width: `${((currentIndex + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>
    </Panel>
  )
}

function BugPanel({
  onViewEvidence,
  onRunAgain,
  onReset,
}: {
  onViewEvidence: () => void
  onRunAgain: () => void
  onReset: () => void
}) {
  return (
    <Panel className="ec-fade-up border-red/30">
      <div className="flex items-center justify-between border-b border-red/20 bg-red/[0.06] px-4 py-2.5">
        <span className="flex items-center gap-2 font-mono text-[11px] font-semibold tracking-wide text-red uppercase">
          <TriangleAlert className="size-3.5" />
          State regression
        </span>
        <Pill tone="red">Detected</Pill>
      </div>
      <div className="p-4">
        <p className="text-[13.5px] font-medium text-foreground">
          Application returned to an unexpected state.
        </p>

        <div className="mt-4 grid grid-cols-[1fr_auto_1fr] items-stretch gap-3">
          <div className="rounded-md border border-border bg-surface-2 p-3">
            <div className="text-[10.5px] tracking-wide text-fg-muted uppercase">Expected</div>
            <div className="mt-1.5 font-mono text-[13px] text-foreground">Dashboard</div>
            <div className="font-mono text-[11px] text-green">Authenticated</div>
          </div>
          <div className="flex items-center font-mono text-[11px] text-fg-muted">vs</div>
          <div className="rounded-md border border-red/25 bg-red/[0.06] p-3">
            <div className="text-[10.5px] tracking-wide text-fg-muted uppercase">Observed</div>
            <div className="mt-1.5 font-mono text-[13px] text-red">Login</div>
            <div className="font-mono text-[11px] text-red/80">Unauthenticated</div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-3">
          <Field label="Trigger" value="Lock → Resume" />
          <Field label="Reproduced" value="3 / 3 runs" tone="green" />
          <Field label="Detection" value="Verified" tone="green" />
        </div>

        <p className="mt-4 rounded-md border border-border bg-surface-2 px-3 py-2.5 text-[12.5px] leading-relaxed text-fg-secondary">
          Authentication state was lost after resuming the application.
        </p>
      </div>
      <div className="flex gap-2 border-t border-border p-3">
        <Button className="flex-1 bg-accent text-white hover:bg-accent/90" size="lg" onClick={onViewEvidence}>
          View evidence
          <ArrowRight className="size-4" />
        </Button>
        <Button variant="outline" size="lg" onClick={onRunAgain}>
          <RotateCcw className="size-4" />
          Run again
        </Button>
      </div>
    </Panel>
  )
}
