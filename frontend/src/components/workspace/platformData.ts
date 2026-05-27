export type PlatformId = 'whatsapp' | 'instagram' | 'linkedin' | 'email' | 'voice'

export type ConversationLine = {
  channel: string
  contact: string
  status: string
  customer: string
  ai: string
  sentiment: string
  intent: string
  urgency: string
}

export type TimelineEvent = {
  title: string
  detail: string
  tone: 'accent' | 'emerald' | 'sky' | 'amber'
}

export type PlatformContent = {
  id: PlatformId
  label: string
  icon: string
  railLabel: string
  commandTitle: string
  commandSubtitle: string
  conversation: ConversationLine
  aiDraft: string
  executionLabel: string
  executionNote: string
  personaName: string
  personaTitle: string
  personaConfidence: string
  recentSignalsTitle: string
  signals: { title: string; detail: string }[]
  metrics: { value: string; label: string }[]
  closeProbability: string
  ticker: { color: string; label: string; time: string; live?: boolean }[]
}

export const platformOrder: PlatformId[] = ['whatsapp', 'instagram', 'linkedin', 'email', 'voice']

export const platformContent: Record<PlatformId, PlatformContent> = {
  whatsapp: {
    id: 'whatsapp',
    label: 'WhatsApp',
    icon: '✉',
    railLabel: 'Inbox',
    commandTitle: 'What should we prioritize today?',
    commandSubtitle: 'WhatsApp live thread',
    conversation: {
      channel: 'WhatsApp',
      contact: 'Marcus Thorne',
      status: 'Live thread',
      customer:
        'The quarterly roadmap looks solid. Can we adjust the Q3 hiring targets to reflect the new AI core team expansion?',
      ai: "I've drafted a revised budget for Q3. Total headcount increased by 4, offset by automation efficiencies in support. Shall I commit to the workflow?",
      sentiment: 'positive 0.94',
      intent: 'resource allocation',
      urgency: 'medium',
    },
    aiDraft: "I've drafted a revised budget for Q3. Total headcount increased by 4, offset by automation efficiencies in support. Shall I commit to the workflow?",
    executionLabel: 'Draft budget revision',
    executionNote: 'Parsing contract clauses',
    personaName: 'Marcus Thorne',
    personaTitle: 'CEO · Zenith Labs',
    personaConfidence: '62%',
    recentSignalsTitle: 'Recent signals',
    signals: [
      { title: 'LinkedIn engagement', detail: 'Liked “The Future of AI Core” post 2m ago' },
      { title: 'Calendar match', detail: 'Free tomorrow at 14:00 EST' },
      { title: 'Voice intent detected', detail: 'Discussed Q3 budget on call 4h ago' },
    ],
    metrics: [
      { value: '42', label: 'DMs' },
      { value: '12', label: 'Calls' },
      { value: '8', label: 'Threads' },
      { value: '3', label: 'Workflows' },
    ],
    closeProbability: '84%',
    ticker: [
      { color: 'bg-sky-400', label: 'LinkedIn message received', time: '2m' },
      { color: 'bg-emerald-500', label: 'WhatsApp quote approved', time: '10m' },
      { color: 'bg-accent', label: 'Drafting automation chain', time: 'now', live: true },
    ],
  },
  instagram: {
    id: 'instagram',
    label: 'Instagram',
    icon: '◌',
    railLabel: 'DMs',
    commandTitle: 'What should we prioritize today?',
    commandSubtitle: 'Instagram lead DM',
    conversation: {
      channel: 'Instagram',
      contact: 'Ava Stone',
      status: 'Reel comment thread',
      customer:
        'Saw the demo reel. Can you send a quick breakdown of how your AI handles product recommendations?',
      ai: 'Absolutely — I prepared a concise carousel response with personalization logic, usage examples, and a booking link for a live walkthrough.',
      sentiment: 'positive 0.89',
      intent: 'product education',
      urgency: 'medium',
    },
    aiDraft: 'I prepared a concise carousel response with personalization logic, usage examples, and a booking link for a live walkthrough.',
    executionLabel: 'Prepare DM follow-up',
    executionNote: 'Mapping reel engagement to offer',
    personaName: 'Ava Stone',
    personaTitle: 'Growth Lead · Northstar Studio',
    personaConfidence: '71%',
    recentSignalsTitle: 'Recent signals',
    signals: [
      { title: 'Reel engagement spike', detail: 'Saved the product demo reel 5m ago' },
      { title: 'Story tap-through', detail: 'Clicked the feature highlight story' },
      { title: 'Profile visit', detail: 'Viewed pricing profile from bio link' },
    ],
    metrics: [
      { value: '58', label: 'DMs' },
      { value: '19', label: 'Reels' },
      { value: '11', label: 'Stories' },
      { value: '5', label: 'Bookings' },
    ],
    closeProbability: '77%',
    ticker: [
      { color: 'bg-fuchsia-400', label: 'Story reply received', time: '5m' },
      { color: 'bg-sky-400', label: 'Reel bookmarked', time: '9m' },
      { color: 'bg-accent', label: 'Carousel draft queued', time: 'now', live: true },
    ],
  },
  linkedin: {
    id: 'linkedin',
    label: 'LinkedIn',
    icon: '◉',
    railLabel: 'Leads',
    commandTitle: 'What should we prioritize today?',
    commandSubtitle: 'LinkedIn lead conversation',
    conversation: {
      channel: 'LinkedIn',
      contact: 'Noah Bennett',
      status: 'InMail thread',
      customer:
        'Your post on AI-assisted sales ops was strong. I\'d like to see if this could help our enterprise pipeline team.',
      ai: 'I drafted a proof-of-value note showing how we reduce response time by 46% and improve outbound handoff quality for enterprise teams.',
      sentiment: 'positive 0.91',
      intent: 'enterprise evaluation',
      urgency: 'high',
    },
    aiDraft: 'I drafted a proof-of-value note showing how we reduce response time by 46% and improve outbound handoff quality for enterprise teams.',
    executionLabel: 'Publish follow-up note',
    executionNote: 'Aligning proof points with enterprise motion',
    personaName: 'Noah Bennett',
    personaTitle: 'VP Sales Operations · Orion Systems',
    personaConfidence: '68%',
    recentSignalsTitle: 'Recent signals',
    signals: [
      { title: 'Post engagement', detail: 'Commented on AI pipeline strategy 11m ago' },
      { title: 'Team growth', detail: 'New RevOps director joined yesterday' },
      { title: 'Profile intent', detail: 'Visited pricing and case studies twice' },
    ],
    metrics: [
      { value: '31', label: 'InMails' },
      { value: '14', label: 'Replies' },
      { value: '7', label: 'Calls' },
      { value: '4', label: 'Deals' },
    ],
    closeProbability: '88%',
    ticker: [
      { color: 'bg-emerald-400', label: 'InMail opened', time: '1m' },
      { color: 'bg-sky-400', label: 'Post saved', time: '8m' },
      { color: 'bg-accent', label: 'Enterprise note drafting', time: 'now', live: true },
    ],
  },
  email: {
    id: 'email',
    label: 'Email',
    icon: '✦',
    railLabel: 'Mail',
    commandTitle: 'What should we prioritize today?',
    commandSubtitle: 'Email nurture sequence',
    conversation: {
      channel: 'Email',
      contact: 'Priya Kapoor',
      status: 'Reply-ready thread',
      customer:
        'We reviewed the pricing breakdown. Could you include a simple onboarding timeline and implementation plan?',
      ai: 'I created a concise email response with onboarding milestones, implementation owners, and a clear next-step calendar invite.',
      sentiment: 'neutral 0.81',
      intent: 'implementation planning',
      urgency: 'medium',
    },
    aiDraft: 'I created a concise email response with onboarding milestones, implementation owners, and a clear next-step calendar invite.',
    executionLabel: 'Send implementation plan',
    executionNote: 'Sequencing onboarding milestones',
    personaName: 'Priya Kapoor',
    personaTitle: 'Operations Director · Meridian Health',
    personaConfidence: '74%',
    recentSignalsTitle: 'Recent signals',
    signals: [
      { title: 'Proposal forwarded', detail: 'Shared pricing sheet with procurement 14m ago' },
      { title: 'Compliance note', detail: 'Asked for security summary' },
      { title: 'Calendar interest', detail: 'Requested onboarding slot next week' },
    ],
    metrics: [
      { value: '64', label: 'Emails' },
      { value: '21', label: 'Replies' },
      { value: '9', label: 'Approvals' },
      { value: '6', label: 'Tasks' },
    ],
    closeProbability: '73%',
    ticker: [
      { color: 'bg-amber-400', label: 'Email opened', time: '3m' },
      { color: 'bg-emerald-500', label: 'Implementation request received', time: '13m' },
      { color: 'bg-accent', label: 'Sequence draft ready', time: 'now', live: true },
    ],
  },
  voice: {
    id: 'voice',
    label: 'Voice Calls',
    icon: '◉',
    railLabel: 'Voice',
    commandTitle: 'What should we prioritize today?',
    commandSubtitle: 'Voice call intelligence',
    conversation: {
      channel: 'Voice',
      contact: 'Daniel Reed',
      status: 'Call summary',
      customer:
        'We liked the demo. Can you recap how the AI assistant would route urgent requests during after-hours support?',
      ai: 'I drafted a concise call summary with escalation rules, after-hours routing, and a handoff checklist for support.',
      sentiment: 'positive 0.88',
      intent: 'support routing',
      urgency: 'high',
    },
    aiDraft: 'I drafted a concise call summary with escalation rules, after-hours routing, and a handoff checklist for support.',
    executionLabel: 'Generate call recap',
    executionNote: 'Routing urgent support events',
    personaName: 'Daniel Reed',
    personaTitle: 'Head of Support · Nova Retail',
    personaConfidence: '66%',
    recentSignalsTitle: 'Recent signals',
    signals: [
      { title: 'Call duration', detail: '17m discovery call completed' },
      { title: 'Escalation risk', detail: 'Asked about weekend coverage' },
      { title: 'Support lead', detail: 'Requested SLA summary by email' },
    ],
    metrics: [
      { value: '28', label: 'Calls' },
      { value: '9', label: 'Recaps' },
      { value: '5', label: 'Escalations' },
      { value: '2', label: 'SLA docs' },
    ],
    closeProbability: '81%',
    ticker: [
      { color: 'bg-sky-400', label: 'Call transcribed', time: '4m' },
      { color: 'bg-emerald-500', label: 'Escalation queued', time: '12m' },
      { color: 'bg-accent', label: 'Recap drafting', time: 'now', live: true },
    ],
  },
}