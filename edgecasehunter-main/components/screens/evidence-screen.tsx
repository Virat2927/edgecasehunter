'use client'

import { useState } from 'react'
import { Download, Copy, RotateCcw, ArrowDown, Check } from 'lucide-react'
import type { Screen } from '@/lib/demo-data'
import { evidenceTimeline } from '@/lib/demo-data'
import { Button } from '@/components/ui/button'
import { TargetAppPreview } from '@/components/target-app-preview'
import { Panel, PanelHeader, Pill, Field } from '@/components/primitives'
import { cn } from '@/lib/utils'

const toneStyles = {
  ok: 'border-green/30 bg-green/10 text-green',
  bad: 'border-red/30 bg-red/10 text-red',
  neutral: 'border-border bg-surface-2 text-fg-secondary',
}

export function EvidenceScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [copied, setCopied] = useState(false)

  const copySteps = () => {
    const text = [
      'EdgeCase Hunter — Reproduction #001',
      'Trigger: Lock → Resume',
      '1. Open Demo Banking App (Dashboard, authenticated)',
      '2. Lock the device',
      '3. Resume the application',
      '4. Observe: returned to Login (authentication lost)',
      'Reproduced: 3 / 3 runs',
    ].join('\n')
    navigator.clipboard?.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  return (
    <div className="ec-fade-up flex flex-col gap-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-lg font-semibold tracking-tight text-foreground">Evidence</h1>
          <p className="mt-1 text-[13px] text-fg-secondary">
            Reproduce the finding without guessing.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="lg">
            <Download className="size-4" />
            Export report
          </Button>
          <Button variant="outline" size="lg" onClick={copySteps}>
            {copied ? <Check className="size-4 text-green" /> : <Copy className="size-4" />}
            {copied ? 'Copied' : 'Copy reproduction steps'}
          </Button>
          <Button className="bg-accent text-white hover:bg-accent/90" size="lg" onClick={() => onNavigate('exploration')}>
            <RotateCcw className="size-4" />
            Run again
          </Button>
        </div>
      </div>

      {/* bug summary bar */}
      <Panel>
        <div className="flex flex-wrap items-center gap-x-8 gap-y-3 px-4 py-3.5">
          <div className="flex flex-col">
            <span className="text-[10.5px] tracking-wide text-fg-muted uppercase">Bug</span>
            <span className="font-mono text-[13px] font-medium text-red">State Regression #001</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10.5px] tracking-wide text-fg-muted uppercase">Trigger</span>
            <span className="font-mono text-[13px] text-foreground">Lock {'\u2192'} Resume</span>
          </div>
          <div className="flex items-center gap-2 sm:ml-auto">
            <Pill tone="green">Verified</Pill>
            <Pill tone="red">High</Pill>
          </div>
        </div>
      </Panel>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_1.1fr]">
        {/* timeline */}
        <Panel>
          <PanelHeader title="Reproduction timeline" />
          <div className="p-4">
            <ol className="flex flex-col gap-2">
              {evidenceTimeline.map((step, i) => (
                <li key={i} className="flex flex-col">
                  <div
                    className={cn(
                      'flex items-center justify-between rounded-md border px-3 py-2.5',
                      toneStyles[step.tone],
                    )}
                  >
                    <div className="flex flex-col">
                      <span className="text-[13px] font-medium text-foreground">{step.label}</span>
                      <span className="text-[11px] opacity-80">{step.sub}</span>
                    </div>
                    <span className="font-mono text-[11px] text-fg-muted">{step.time}</span>
                  </div>
                  {i < evidenceTimeline.length - 1 && (
                    <ArrowDown className="my-0.5 ml-4 size-3.5 text-fg-muted" />
                  )}
                </li>
              ))}
            </ol>

            <div className="mt-4 grid grid-cols-2 gap-3 border-t border-border pt-4">
              <Field label="Reproduction" value="3 / 3" tone="green" />
              <Field label="Device state" value="Online · Portrait · Foreground" />
            </div>
          </div>
        </Panel>

        {/* before / after screenshots */}
        <Panel>
          <PanelHeader title="State comparison" right={<span className="font-mono text-[11px] text-fg-muted">Captured frames</span>} />
          <div className="grid grid-cols-1 gap-6 p-4 sm:grid-cols-2 sm:gap-4">
            <div className="flex flex-col items-center gap-2">
              <span className="flex items-center gap-1.5 font-mono text-[11px] tracking-wide text-green uppercase">
                <span className="size-1.5 rounded-full bg-green" />
                Before
              </span>
              <TargetAppPreview state="dashboard" className="max-w-[200px]" />
              <span className="font-mono text-[11px] text-fg-muted">Dashboard · Authenticated</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="flex items-center gap-1.5 font-mono text-[11px] tracking-wide text-red uppercase">
                <span className="size-1.5 rounded-full bg-red" />
                After
              </span>
              <TargetAppPreview state="login" className="max-w-[200px]" />
              <span className="font-mono text-[11px] text-fg-muted">Login · Unauthenticated</span>
            </div>
          </div>
        </Panel>
      </div>
    </div>
  )
}
