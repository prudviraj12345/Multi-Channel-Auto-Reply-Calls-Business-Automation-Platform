import { platformContent, type PlatformContent, type PlatformId } from '@/components/workspace/platformData'

export type ScenarioId = 'sales' | 'support' | 'booking' | 'enterprise'

export type Scenario = {
  id: ScenarioId
  label: string
  description: string
  // per-platform overrides
  overrides?: Partial<Record<PlatformId, Partial<PlatformContent>>> 
}

export const scenarios: Scenario[] = [
  {
    id: 'sales',
    label: 'Sales Automation',
    description: 'High-touch outreach and automated follow-ups for pipeline acceleration',
    overrides: {
      whatsapp: { commandSubtitle: 'Sales outreach thread', aiDraft: 'Drafting outreach with proof points and CTA', executionLabel: 'Send outreach', executionNote: 'Sequencing follow-ups' },
      linkedin: { commandSubtitle: 'Enterprise prospecting', aiDraft: 'Composing enterprise POV and next steps', executionLabel: 'Publish follow-up note', executionNote: 'Aligning sales motion' },
    },
  },
  {
    id: 'support',
    label: 'Customer Support',
    description: 'Triage and escalate customer issues with SLA-aware routing',
    overrides: {
      voice: { commandSubtitle: 'Support call automation', aiDraft: 'Summarizing call with escalation steps', executionLabel: 'Create support ticket', executionNote: 'Enqueue escalation' },
      email: { commandSubtitle: 'Support inbox', aiDraft: 'Composing troubleshooting steps and SLAs', executionLabel: 'Send support plan', executionNote: 'Attach diagnostics' },
    },
  },
  {
    id: 'booking',
    label: 'Booking Management',
    description: 'Automate booking flows, calendar invites and confirmation sequences',
    overrides: {
      instagram: { commandSubtitle: 'Booking DMs', aiDraft: 'Preparing booking confirmation and calendar invite', executionLabel: 'Schedule meeting', executionNote: 'Sync calendar and reminders' },
      email: { commandSubtitle: 'Booking email flow', aiDraft: 'Creating invite with time options', executionLabel: 'Send invites', executionNote: 'Track RSVPs' },
    },
  },
  {
    id: 'enterprise',
    label: 'Enterprise Lead Handling',
    description: 'Coordinate complex enterprise deals and tailored proof-of-value workflows',
    overrides: {
      linkedin: { commandSubtitle: 'Enterprise lead motion', aiDraft: 'Preparing POC overview and team handoff', executionLabel: 'Initiate POC', executionNote: 'Assign owners and timeline' },
      whatsapp: { commandSubtitle: 'Enterprise follow-up', aiDraft: 'Drafting executive summary and next steps', executionLabel: 'Share summary', executionNote: 'Capture approvals' },
    },
  },
]

export function buildScenarioContent(scenarioId: ScenarioId) {
  const base = JSON.parse(JSON.stringify(platformContent)) as Record<PlatformId, PlatformContent>
  const s = scenarios.find((x) => x.id === scenarioId)
  if (!s || !s.overrides) return base
  Object.keys(s.overrides).forEach((k) => {
    const pid = k as PlatformId
    const override = s.overrides?.[pid]
    if (override) {
      base[pid] = { ...base[pid], ...override }
    }
  })
  return base
}

export const defaultScenario: ScenarioId = 'sales'
