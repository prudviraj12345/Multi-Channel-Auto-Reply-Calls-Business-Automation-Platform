import { createFileRoute } from "@tanstack/react-router";
import { AmbientBackground } from "@/components/workspace/AmbientBackground";
import { NavRail } from "@/components/workspace/NavRail";
import { CommandBar } from "@/components/workspace/CommandBar";
import { ConversationCanvas } from "@/components/workspace/ConversationCanvas";
import { LeadPersona } from "@/components/workspace/LeadPersona";
import { InsightsPanel } from "@/components/workspace/InsightsPanel";
import { ActivityTicker } from "@/components/workspace/ActivityTicker";

export const Route = createFileRoute("/")({
  component: Workspace,
});

function Workspace() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-canvas font-display text-slate-300 selection:bg-accent/30">
      <AmbientBackground />
      <NavRail />

      <main className="relative ml-24 mr-6 grid h-screen grid-cols-1 gap-6 p-6 lg:grid-cols-[1fr_340px]">
        <h1 className="sr-only">Aether — AI communication operating system</h1>

        <div className="flex h-full min-h-0 flex-col gap-6">
          <CommandBar />
          <ConversationCanvas />
        </div>

        <aside className="hidden flex-col gap-6 lg:flex">
          <LeadPersona />
          <InsightsPanel />
        </aside>
      </main>

      <ActivityTicker />
    </div>
  );
}
