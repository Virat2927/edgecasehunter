'use client'

import { useState } from 'react'
import type { Screen } from '@/lib/demo-data'
import { Sidebar } from '@/components/sidebar'
import { Topbar } from '@/components/topbar'
import { OverviewScreen } from '@/components/screens/overview-screen'
import { ExplorationScreen } from '@/components/screens/exploration-screen'
import { FindingsScreen } from '@/components/screens/findings-screen'
import { EvidenceScreen } from '@/components/screens/evidence-screen'

export default function Page() {
  const [screen, setScreen] = useState<Screen>('overview')

  const openFinding = (_id: string) => {
    setScreen('evidence')
  }

  return (
    <div className="flex h-dvh w-full overflow-hidden bg-background">
      <Sidebar active={screen} onNavigate={setScreen} />

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar active={screen} />

        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-[1180px] px-5 py-6 md:px-8 md:py-8">
            {screen === 'overview' && <OverviewScreen onNavigate={setScreen} />}
            {screen === 'exploration' && <ExplorationScreen onNavigate={setScreen} />}
            {screen === 'findings' && <FindingsScreen onOpenFinding={openFinding} onNavigate={setScreen} />}
            {screen === 'evidence' && <EvidenceScreen onNavigate={setScreen} />}
          </div>
        </main>
      </div>

      {/* Demo mode indicator */}
      <div className="pointer-events-none fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-full border border-border bg-surface/90 px-3 py-1.5 font-mono text-[11px] text-fg-secondary shadow-lg backdrop-blur">
        <span className="inline-block size-1.5 rounded-full bg-amber" />
        Demo mode
      </div>
    </div>
  )
}
