import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { pushEvent } from '@/lib/activityBus'
import { sendChat } from '@/lib/api'
import { ExecutionChain } from './ExecutionChain'
import type { PlatformContent } from './platformData'
import Timeline from '@/components/Timeline'

type ConversationCanvasProps = {
  content: PlatformContent
  timeline?: { id: string; time: string; content: string; kind?: string }[]
  onWorkflowUpdate?: (entry: { title: string; detail: string; kind: 'thinking' | 'response' | 'automation' | 'crm'; aiDraft?: string }) => void
}

const createEventId = (scope: string) => `${scope}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`

function IncomingMessage({ content }: ConversationCanvasProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="flex max-w-[80%] flex-col gap-3"
    >
      <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.18em] text-white/30">
        <span>{content.conversation.channel}</span>
        <span className="size-1 rounded-full bg-white/20" />
        <span>{content.conversation.contact}</span>
        <span className="size-1 rounded-full bg-white/20" />
        <span className="text-accent">{content.conversation.status}</span>
      </div>
      <div className="rounded-2xl rounded-tl-none border border-white/5 bg-surface/80 p-5 leading-relaxed text-slate-200">
        {content.conversation.customer}
      </div>
      <div className="flex flex-wrap gap-2">
        <span className="rounded-full border border-accent/20 bg-accent/10 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-accent">
          Sentiment · {content.conversation.sentiment}
        </span>
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-white/40">
          Intent · {content.conversation.intent}
        </span>
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-white/40">
          Urgency · {content.conversation.urgency}
        </span>
      </div>
    </motion.div>
  )
}

function AIMessage({ content, onWorkflowUpdate }: ConversationCanvasProps) {
  const [state, setState] = useState<'idle' | 'thinking' | 'executing' | 'done' | 'error'>('idle')
  const [aiText, setAiText] = useState(content.aiDraft)
  const [steps, setSteps] = useState(
    [
      { n: 1, label: 'Parse', status: 'active' },
      { n: 2, label: 'Draft', status: 'pending' },
      { n: 3, label: 'Sync CRM', status: 'pending' },
      { n: 4, label: 'Notify', status: 'pending' },
    ] as { n: number; label: string; status: 'active' | 'pending' | 'done' }[]
  )

  useEffect(() => {
    setAiText(content.aiDraft)
    setState('idle')
    setSteps([
      { n: 1, label: 'Parse', status: 'active' },
      { n: 2, label: 'Draft', status: 'pending' },
      { n: 3, label: 'Sync CRM', status: 'pending' },
      { n: 4, label: 'Notify', status: 'pending' },
    ])
  }, [content])

  const execute = async () => {
    setState('thinking')
    onWorkflowUpdate?.({ title: 'AI thinking', detail: `${content.label} — composing response`, kind: 'thinking' })
    pushEvent({ id: createEventId('evt-thinking'), title: 'AI thinking', detail: `${content.label} — composing response`, time: new Date().toLocaleTimeString(), tone: 'accent' })

    const pulse = window.setInterval(() => {
      setSteps((current) =>
        current.map((step, index) => {
          const activeIndex = current.findIndex((item) => item.status === 'active')
          if (index < activeIndex) return { ...step, status: 'done' }
          if (index === activeIndex) return { ...step, status: 'active' }
          return step
        })
      )
    }, 700)

    await new Promise((r) => setTimeout(r, 900))
    setState('executing')
    pushEvent({ id: createEventId('evt-workflow-start'), title: 'Workflow execution', detail: `${content.executionLabel} started`, time: new Date().toLocaleTimeString(), tone: 'sky' })
    onWorkflowUpdate?.({ title: 'Workflow execution', detail: `${content.executionLabel} started`, kind: 'automation' })

    try {
      const prompt = [
        `Scenario: ${content.commandSubtitle}`,
        `Platform: ${content.label}`,
        `Customer message: ${content.conversation.customer}`,
        `Current intent: ${content.conversation.intent}`,
        `Current sentiment: ${content.conversation.sentiment}`,
        `Respond professionally and clearly.`,
      ].join('\n')

      const replyPromise = sendChat(prompt)

      for (let i = 0; i < 4; i += 1) {
        await new Promise((r) => setTimeout(r, 350))
        setSteps((current) =>
          current.map((step, index) => ({
            ...step,
            status: index <= i ? 'done' : index === i + 1 ? 'active' : 'pending',
          }))
        )
      }

      const reply = await replyPromise
      window.clearInterval(pulse)
      setSteps((current) => current.map((step, index) => ({ ...step, status: index < current.length - 1 ? 'done' : 'active' })))
      setState('done')
      setAiText(reply)
      onWorkflowUpdate?.({ title: 'AI response received', detail: reply, kind: 'response', aiDraft: reply })
      pushEvent({ id: createEventId('evt-ai-reply'), title: 'AI response received', detail: reply, time: new Date().toLocaleTimeString(), tone: 'emerald' })
      pushEvent({ id: createEventId('evt-workflow-complete'), title: 'Workflow execution', detail: `${content.executionLabel} completed`, time: new Date().toLocaleTimeString(), tone: 'sky' })
      pushEvent({ id: createEventId('evt-automation-complete'), title: content.executionLabel, detail: `Completed — ${content.executionNote}`, time: new Date().toLocaleTimeString(), tone: 'emerald' })
      onWorkflowUpdate?.({ title: 'Workflow completed', detail: content.executionNote, kind: 'crm' })
    } catch (error) {
      window.clearInterval(pulse)
      setState('error')
      const message = error instanceof Error ? error.message : 'Unexpected backend error'
      setAiText(`Backend response failed: ${message}`)
      onWorkflowUpdate?.({ title: 'AI response failed', detail: message, kind: 'crm' })
      pushEvent({ id: createEventId('evt-ai-failed'), title: 'AI response failed', detail: message, time: new Date().toLocaleTimeString(), tone: 'amber' })
    }
  }

  const modify = async () => {
    setState('thinking')
    pushEvent({ id: createEventId('evt-modify'), title: 'Modify parameters', detail: `Adjusting parameters for ${content.label}`, time: new Date().toLocaleTimeString(), tone: 'accent' })
    await new Promise((r) => setTimeout(r, 900))
    setAiText((t) => `${t}\n\n✏️ Modified parameters applied`)
    setState('idle')
    pushEvent({ id: createEventId('evt-crm-update'), title: 'CRM updated', detail: `Parameters saved to CRM`, time: new Date().toLocaleTimeString(), tone: 'sky' })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="flex max-w-[80%] flex-col items-end gap-4 self-end"
    >
      <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.18em] text-amber-glow">
        <span>Aether Intelligence</span>
        <span className="size-1.5 rounded-full bg-amber-glow animate-pulse-dot" />
        <span className="text-white/30">{content.commandSubtitle}</span>
      </div>

      <div className="relative rounded-3xl rounded-tr-none border border-accent/20 bg-accent/[0.06] p-6 shadow-[0_0_60px_rgba(20,184,166,0.06)] w-full">
        <p className="shimmer-text text-xl font-medium leading-snug whitespace-pre-wrap">{aiText}</p>
        {state === 'thinking' && (
          <div className="absolute right-4 top-4 flex items-center gap-2">
            <div className="h-2 w-8 rounded-full bg-white/10 animate-pulse" />
            <div className="text-xs text-white/40">Thinking…</div>
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <button
          onClick={execute}
          disabled={state === 'thinking' || state === 'executing'}
          className="rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-canvas transition-transform hover:scale-[1.02] disabled:opacity-50"
        >
            {state === 'executing' ? 'Executing…' : state === 'thinking' ? 'Thinking…' : content.executionLabel}
        </button>
        <button
          onClick={modify}
          disabled={state === 'thinking' || state === 'executing'}
          className="rounded-xl border border-white/10 bg-surface px-4 py-2 text-sm font-medium text-white/80 transition-colors hover:bg-white/5 disabled:opacity-50"
        >
          Modify parameters
        </button>
      </div>

      <div className="mt-2 w-full">
        <ExecutionChain label={content.commandSubtitle} note={content.executionNote} steps={steps} />
      </div>
    </motion.div>
  )
}

export function ConversationCanvas({ content, timeline, onWorkflowUpdate }: ConversationCanvasProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex min-h-0 flex-col gap-10 overflow-visible rounded-3xl border border-white/5 bg-surface/30 p-8"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={content.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-1 flex-col gap-10"
        >
          <IncomingMessage content={content} />
          <AIMessage content={content} onWorkflowUpdate={onWorkflowUpdate} />
          <div className="mt-auto pt-8">
            <div className="border-t border-white/5 pt-6">
              <ExecutionChain label={content.commandSubtitle} note={content.executionNote} steps={undefined} />
            </div>
            {timeline && timeline.length > 0 && (
              <div className="mt-6">
                <Timeline entries={timeline} />
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}
