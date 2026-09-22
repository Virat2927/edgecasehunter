'use client'

type Node = { id: string; label: string; x: number; y: number }

const nodes: Node[] = [
  { id: 'dashboard', label: 'Dashboard', x: 70, y: 60 },
  { id: 'transfer', label: 'Transfer', x: 230, y: 40 },
  { id: 'background', label: 'Background', x: 350, y: 120 },
  { id: 'resume', label: 'Resume', x: 230, y: 175 },
  { id: 'lock', label: 'Lock', x: 70, y: 175 },
  { id: 'login', label: 'Login', x: 350, y: 220 },
]

const pos = Object.fromEntries(nodes.map((n) => [n.id, n])) as Record<string, Node>

// explored (solid) edges
const explored: [string, string][] = [
  ['dashboard', 'transfer'],
  ['transfer', 'background'],
  ['background', 'resume'],
  ['resume', 'dashboard'],
  ['dashboard', 'lock'],
]

// the key unexplored transition
const unexplored: [string, string] = ['lock', 'resume']

export function StateGraph() {
  const [ux1, ux2] = unexplored
  return (
    <div className="relative">
      <svg viewBox="0 0 420 260" className="w-full" role="img" aria-label="State exploration graph">
        {/* explored edges */}
        {explored.map(([a, b]) => (
          <line
            key={`${a}-${b}`}
            x1={pos[a].x}
            y1={pos[a].y}
            x2={pos[b].x}
            y2={pos[b].y}
            stroke="var(--border-strong)"
            strokeWidth="1.25"
          />
        ))}

        {/* unexplored edge */}
        <line
          x1={pos[ux1].x}
          y1={pos[ux1].y}
          x2={pos[ux2].x}
          y2={pos[ux2].y}
          stroke="var(--accent)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
        <circle
          cx={(pos[ux1].x + pos[ux2].x) / 2}
          cy={(pos[ux1].y + pos[ux2].y) / 2}
          r="3"
          fill="var(--accent)"
        />

        {/* nodes */}
        {nodes.map((n) => {
          const isUnexploredEnd = n.id === ux1 || n.id === ux2
          return (
            <g key={n.id}>
              <circle
                cx={n.x}
                cy={n.y}
                r="6"
                fill="var(--surface-2)"
                stroke={isUnexploredEnd ? 'var(--accent)' : 'var(--border-strong)'}
                strokeWidth="1.5"
              />
              <text
                x={n.x}
                y={n.y - 12}
                textAnchor="middle"
                className="fill-[var(--fg-secondary)] font-mono"
                fontSize="10"
              >
                {n.label}
              </text>
            </g>
          )
        })}
      </svg>

      <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5 border-t border-border pt-3 text-[11px]">
        <span className="flex items-center gap-1.5 text-fg-secondary">
          <span className="inline-block h-px w-4 bg-border-strong" />
          Explored path
        </span>
        <span className="flex items-center gap-1.5 text-accent">
          <span className="inline-block h-px w-4 border-t border-dashed border-accent" />
          Unexplored transition
        </span>
        <span className="ml-auto font-mono text-fg-muted">Lock {'\u2192'} Resume</span>
      </div>
    </div>
  )
}
