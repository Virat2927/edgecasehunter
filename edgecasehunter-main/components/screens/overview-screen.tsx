'use client'

import { ArrowRight, Boxes, GitBranch, Copy } from 'lucide-react'
import type { Screen } from '@/lib/demo-data'
import { memory } from '@/lib/demo-data'
import { Button } from '@/components/ui/button'
import { MetricStrip } from '@/components/metric-strip'
import { ExplorationTimeline } from '@/components/exploration-timeline'
import { ProductFlow } from '@/components/product-flow'
import { Panel, PanelHeader, StatusDot, Field } from '@/components/primitives'

function MemoryStat({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Boxes
  label: string
  value: number
}) {
  return (
    <div className="flex items-center gap-2.5 rounded-md border border-border bg-surface-2 px-3 py-2.5">
      <Icon className="size-4 text-fg-muted" />
      <div className="leading-tight">
        <div className="font-mono text-[15px] font-semibold text-foreground tabular-nums">
          {value}
        </div>
        <div className="text-[11px] text-fg-muted">{label}</div>
      </div>
    </div>
  )
}

export function OverviewScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  return (
    <div className="ec-fade-up flex flex-col gap-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-lg font-semibold tracking-tight text-foreground">
            Exploration overview
          </h1>
          <p className="mt-1 text-[13px] text-fg-secondary">
            Find the states your test suite doesn&apos;t cover.
          </p>
        </div>
        <ProductFlow className="rounded-md border border-border bg-surface px-3 py-2" />
      </div>

      <MetricStrip />

      <div className="grid grid-cols-1 gap-4 md:gap-5 lg:grid-cols-[1.4fr_1fr]">
        {/* current exploration */}
        <Panel>
          <PanelHeader
            title="Current exploration"
            right={
              <span className="flex items-center gap-1.5 font-mono text-[11px] text-accent">
                <StatusDot tone="accent" live />
                Live
              </span>
            }
          />
          <div className="p-4">
            <ExplorationTimeline />
          </div>
        </Panel>

        {/* explorer status */}
        <div className="flex flex-col gap-5">
          <Panel>
            <PanelHeader
              title="Explorer"
              right={
                <span className="flex items-center gap-1.5 font-mono text-[11px] tracking-wide text-green uppercase">
                  <StatusDot tone="green" live />
                  Active
                </span>
              }
            />
            <div className="grid grid-cols-2 gap-4 p-4">
              <Field label="Current state" value="Dashboard" />
              <Field label="Last action" value="Lock → Resume" />
              <Field label="Next candidate" value="Permission interrupt" tone="accent" />
              <Field label="Priority" value="High" tone="red" />
            </div>
            <div className="border-t border-border p-3">
              <Button
                className="w-full bg-accent text-white hover:bg-accent/90"
                size="lg"
                onClick={() => onNavigate('exploration')}
              >
                Continue exploration
                <ArrowRight className="size-4" />
              </Button>
            </div>
          </Panel>

          <Panel>
            <PanelHeader title="Exploration memory" />
            <div className="grid grid-cols-1 gap-2 p-3">
              <MemoryStat icon={Boxes} label="Already explored" value={memory.explored} />
              <MemoryStat icon={GitBranch} label="Unexplored candidates" value={memory.candidates} />
              <MemoryStat icon={Copy} label="Avoided duplicates" value={memory.duplicates} />
            </div>
          </Panel>
        </div>
      </div>
    </div>
  )
}
