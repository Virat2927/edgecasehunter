export type Screen = 'overview' | 'exploration' | 'findings' | 'evidence'

export type Severity = 'High' | 'Medium' | 'Low'
export type FindingStatus = 'Verified' | 'Not reproduced' | 'Investigating'
export type FindingKind = 'State' | 'Navigation' | 'Input' | 'Lifecycle'

export interface Finding {
  id: string
  code: string
  kind: FindingKind
  title: string
  severity: Severity
  reproduced: string
  found: string
  status: FindingStatus
  trigger: string
}

export const metrics = [
  { label: 'States explored', value: '24' },
  { label: 'Transitions', value: '37' },
  { label: 'Findings', value: '1' },
  { label: 'Coverage gaps', value: '4' },
]

export const explorationLog = [
  { time: '09:41:02', from: 'Dashboard', to: 'Transfer' },
  { time: '09:41:08', from: 'Transfer', to: 'Background' },
  { time: '09:41:14', from: 'Background', to: 'Resume' },
  { time: '09:41:19', from: 'Resume', to: 'Dashboard' },
  { time: '09:41:24', from: 'Dashboard', to: 'Lock' },
  { time: '09:41:31', from: 'Lock', to: 'Resume', warning: true },
]

export const findings: Finding[] = [
  {
    id: 'ec-001',
    code: '#001',
    kind: 'State',
    title: 'Authentication lost after Lock \u2192 Resume',
    severity: 'High',
    reproduced: '3 / 3',
    found: '14:32',
    status: 'Verified',
    trigger: 'Lock \u2192 Resume',
  },
  {
    id: 'ec-002',
    code: '#002',
    kind: 'Input',
    title: 'Input state changed after rotation',
    severity: 'Medium',
    reproduced: '0 / 3',
    found: '14:19',
    status: 'Not reproduced',
    trigger: 'Portrait \u2192 Landscape',
  },
  {
    id: 'ec-003',
    code: '#003',
    kind: 'Navigation',
    title: 'Unexpected navigation after back',
    severity: 'Low',
    reproduced: '1 / 3',
    found: '13:58',
    status: 'Investigating',
    trigger: 'Transfer \u2192 Back',
  },
]

export const evidenceTimeline = [
  { time: '14:32:01', label: 'Dashboard', sub: 'Authenticated', tone: 'ok' as const },
  { time: '14:32:03', label: 'Lock screen', sub: 'State captured', tone: 'neutral' as const },
  { time: '14:32:07', label: 'Resume', sub: 'Lifecycle restored', tone: 'neutral' as const },
  { time: '14:32:08', label: 'Login screen', sub: 'Authentication lost', tone: 'bad' as const },
]

export const memory = {
  explored: 24,
  candidates: 11,
  duplicates: 18,
}

export const productFlow = ['Observe', 'Choose', 'Execute', 'Observe', 'Learn']
