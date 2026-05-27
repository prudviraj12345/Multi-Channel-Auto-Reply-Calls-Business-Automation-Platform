import { useEffect, useState } from 'react'
import { AmbientBackground } from '@/components/workspace/AmbientBackground'
import { NavRail } from '@/components/workspace/NavRail'
import { CommandBar } from '@/components/workspace/CommandBar'
import { ConversationCanvas } from '@/components/workspace/ConversationCanvas'
import { LeadPersona } from '@/components/workspace/LeadPersona'
import { InsightsPanel } from '@/components/workspace/InsightsPanel'
import { ActivityTicker } from '@/components/workspace/ActivityTicker'
import { platformContent, type PlatformContent, type PlatformId } from '@/components/workspace/platformData'
import { startIncomingEvents, stopIncomingEvents } from '@/lib/incomingEvents'
import { scenarios, buildScenarioContent, defaultScenario, type ScenarioId } from '@/lib/scenarios'
import { ScenarioSelector } from '@/components/workspace/ScenarioSelector'
import { pushEvent } from '@/lib/activityBus'

type WorkflowUpdate = {
  title: string
  detail: string
  kind: 'thinking' | 'response' | 'automation' | 'crm'
  aiDraft?: string
}

type OrchestrationStage = 'idle' | 'thinking' | 'executing' | 'responding' | 'completed' | 'incoming'

type OrchestrationState = {
  stage: OrchestrationStage
  pulse: number
  activityLabel: string
  leadStatus: string
  sentiment: string
  intent: string
  workflowLabel: string
  workflowTone: 'accent' | 'emerald' | 'sky' | 'amber'
  communicationMix: { value: string; label: string }[]
}

const buildCommunicationMix = (timeline: Record<PlatformId, { id: string; time: string; content: string; kind?: string }[]>) => {
  const entries = Object.values(timeline).flat()
  const counts = {
    DMs: entries.filter((item) => item.kind === 'customer' || item.kind === 'response').length,
    Calls: entries.filter((item) => item.content.toLowerCase().includes('call')).length,
    Threads: entries.filter((item) => item.content.toLowerCase().includes('whatsapp') || item.content.toLowerCase().includes('linkedin') || item.content.toLowerCase().includes('email')).length,
    Workflows: entries.filter((item) => item.kind === 'automation' || item.kind === 'crm').length,
  }

  return Object.entries(counts).map(([label, value]) => ({ label, value: String(Math.max(value, 1)).padStart(2, '0') }))
}

function App() {
  const [activePlatform, setActivePlatform] = useState<PlatformId>('whatsapp')
  const [activeScenario, setActiveScenario] = useState<ScenarioId>(defaultScenario)

  const [liveContent, setLiveContent] = useState<Record<PlatformId, PlatformContent>>(
    () => buildScenarioContent(defaultScenario)
  )
  const [timelines, setTimelines] = useState<Record<PlatformId, { id: string; time: string; content: string; kind?: string }[]>>(
    () => Object.fromEntries(Object.keys(platformContent).map((k) => [k, []])) as unknown as Record<PlatformId, { id: string; time: string; content: string; kind?: string }[]>
  )
  const [orchestration, setOrchestration] = useState<OrchestrationState>({
    stage: 'idle',
    pulse: 42,
    activityLabel: 'System ready',
    leadStatus: 'Ready',
    sentiment: liveContent[activePlatform].conversation.sentiment,
    intent: liveContent[activePlatform].conversation.intent,
    workflowLabel: liveContent[activePlatform].commandSubtitle,
    workflowTone: 'accent',
    communicationMix: buildCommunicationMix(timelines),
  })

  const createEventId = (scope: string) => `${scope}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`

  const handleWorkflowUpdate = (platform: PlatformId, update: WorkflowUpdate) => {
    const time = new Date().toLocaleTimeString()
    const nextStage: OrchestrationStage = update.kind === 'thinking' ? 'thinking' : update.kind === 'response' ? 'responding' : update.kind === 'automation' ? 'executing' : 'completed'

    if (update.aiDraft) {
      setLiveContent((prev) => ({
        ...prev,
        [platform]: {
          ...prev[platform],
          aiDraft: update.aiDraft ?? prev[platform].aiDraft,
        },
      }))
    }

    setOrchestration((prev) => ({
      ...prev,
      stage: nextStage,
      pulse: Math.min(99, Math.max(12, prev.pulse + (update.kind === 'thinking' ? 4 : update.kind === 'response' ? 6 : update.kind === 'automation' ? 9 : 3))),
      activityLabel: update.title,
      leadStatus: update.kind === 'thinking' ? 'Analyzing' : update.kind === 'response' ? 'Replied' : update.kind === 'automation' ? 'Workflow executing' : 'Updated',
      workflowLabel: update.detail,
      workflowTone: update.kind === 'thinking' ? 'amber' : update.kind === 'response' ? 'emerald' : update.kind === 'automation' ? 'sky' : 'accent',
      communicationMix: buildCommunicationMix({
        ...timelines,
        [platform]: [
          {
            id: `${platform}-${update.kind}-${Date.now()}`,
            time,
            content: `${update.title}: ${update.detail}`,
            kind: update.kind,
          },
          ...(timelines[platform] || []),
        ],
      }),
    }))

    setTimelines((prev) => ({
      ...prev,
      [platform]: [
        {
          id: `${platform}-${update.kind}-${Date.now()}`,
          time,
          content: `${update.title}: ${update.detail}`,
          kind: update.kind,
        },
        ...(prev[platform] || []),
      ].slice(0, 8),
    }))
  }

  useEffect(() => {
    const current = liveContent[activePlatform]
    setOrchestration((prev) => ({
      ...prev,
      sentiment: current.conversation.sentiment,
      intent: current.conversation.intent,
      workflowLabel: current.commandSubtitle,
      communicationMix: buildCommunicationMix(timelines),
      activityLabel: current.commandSubtitle,
    }))
  }, [activePlatform, liveContent, timelines])

  useEffect(() => {
    // restart incoming events when scenario changes
    startIncomingEvents(({ platform, message, sentiment, intent }) => {
      setLiveContent((prev) => {
        const curr = prev[platform]
        const updated: PlatformContent = {
          ...curr,
          conversation: {
            ...curr.conversation,
            customer: message,
            sentiment,
            intent,
          },
          aiDraft: `Analyzing: ${message}`,
        }
        return { ...prev, [platform]: updated }
      })

      // add timeline entry and orchestrate auto-response
      setTimelines((prev) => {
        const time = new Date().toLocaleTimeString()
        const entry = { id: `${platform}-incoming-${Date.now()}`, time, content: `Customer: ${message}`, kind: 'customer' }
        return { ...prev, [platform]: [entry, ...(prev[platform] || [])].slice(0, 8) }
      })

      // orchestrate AI: thinking -> analysis -> response -> automation -> CRM update
      setTimeout(() => {
        // AI analysis already pushed by incomingEvents; show thinking in aiDraft
        setLiveContent((prev) => ({
          ...prev,
          [platform]: { ...prev[platform], aiDraft: 'Aether is analyzing…' },
        }))
      }, 200)

      setTimeout(() => {
        const reply = `Auto-reply: Thanks — I recommend adjusting headcount by 4 and reallocating budget to support automation.`
        const time = new Date().toLocaleTimeString()
        setLiveContent((prev) => ({
          ...prev,
          [platform]: { ...prev[platform], aiDraft: reply },
        }))
        setTimelines((prev) => ({
          ...prev,
          [platform]: [
            { id: `${platform}-ai-${Date.now()}`, time, content: `AI: ${reply}`, kind: 'ai' },
            ...(prev[platform] || []),
          ].slice(0, 8),
        }))
      }, 1400)

      setTimeout(() => {
        // automation triggered
        const time = new Date().toLocaleTimeString()
        setTimelines((prev) => ({
          ...prev,
          [platform]: [
            { id: `${platform}-auto-${Date.now()}`, time, content: `Automation: ${platformContent[platform].executionLabel} started`, kind: 'automation' },
            ...(prev[platform] || []),
          ].slice(0, 8),
        }))
      }, 2200)

      setTimeout(() => {
        const time = new Date().toLocaleTimeString()
        setTimelines((prev) => ({
          ...prev,
          [platform]: [
            { id: `${platform}-crm-${Date.now()}`, time, content: `CRM: contact enriched and tasks created`, kind: 'crm' },
            ...(prev[platform] || []),
          ].slice(0, 8),
        }))
      }, 2800)

    }, activeScenario)

    // announce scenario change
    pushEvent({ id: createEventId('scenario'), title: `Scenario: ${activeScenario}`, detail: `Switched to ${activeScenario} demo`, time: new Date().toLocaleTimeString(), tone: 'amber' })

    return () => stopIncomingEvents()
  }, [activeScenario])

  const content = liveContent[activePlatform]

  return (
    <div className="relative min-h-screen overflow-x-hidden overflow-y-auto bg-canvas font-display text-slate-300 selection:bg-accent/30">
      <AmbientBackground />
      <NavRail activePlatform={activePlatform} onSelectPlatform={setActivePlatform} />

      <main className="relative ml-24 mr-6 grid min-h-screen grid-cols-1 gap-6 px-6 pb-8 pt-6 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
        <h1 className="sr-only">Aether — AI communication operating system</h1>

        <div className="flex min-w-0 flex-col gap-6">
          <CommandBar title={content.commandTitle} subtitle={content.commandSubtitle} />
          <div className="mt-4">
            <ScenarioSelector
              active={activeScenario}
              onSelect={(s) => {
                setActiveScenario(s)
                setLiveContent(() => buildScenarioContent(s))
                setTimelines(() => Object.fromEntries(Object.keys(platformContent).map((k) => [k, []])) as unknown as typeof timelines)
                setOrchestration((prev) => ({
                  ...prev,
                  stage: 'incoming',
                  pulse: 48,
                  activityLabel: `Scenario ${s}`,
                  leadStatus: 'Context switching',
                  workflowLabel: `Switched to ${s} demo`,
                }))
              }}
            />
          </div>
          <ConversationCanvas
            content={content}
            timeline={timelines[activePlatform]}
            onWorkflowUpdate={(update) => {
              handleWorkflowUpdate(activePlatform, update)
            }}
          />
        </div>

        <aside className="hidden min-w-0 flex-col gap-6 lg:flex">
          <LeadPersona content={content} orchestration={orchestration} />
          <InsightsPanel content={content} orchestration={orchestration} />
        </aside>

        <ActivityTicker className="lg:col-span-2" content={content} orchestration={orchestration} />
      </main>
    </div>
  )
}

export default App
