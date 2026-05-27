## Plan — Aether: AI Communication OS

Scaffold a TanStack Start web app and build the selected **Command-first cinematic** direction as the main workspace screen.

### Visual system (locked from chosen direction)
- Palette: canvas `#0a0a0b`, surface `#141416`, surface-bright `#1c1c1f`, teal accent `#14b8a6`, warm highlight `#fbbf24`. Matte black with ambient gradient auras.
- Type: Inter (display) + JetBrains Mono (data/labels).
- Surfaces: floating rounded-3xl panels, hairline `white/5` borders, soft shadows, no heavy glass blur.
- Motion: aura pulse, slide-up entry, shimmer on AI-generated text, breathing accent dot.

### Layout (matches prototype exactly)
- Fixed floating left nav rail (icons + avatar).
- Two-column grid: central command surface (1fr) + intelligence rail (320px).
- Central column stacks: command input → adaptive conversation canvas → execution chain footer inside the canvas.
- Right rail stacks: lead persona card → contextual insights panel with signals + comm mix.

### Components to build
- `NavRail` — floating vertical rail with active indicator
- `CommandBar` — large prompt input with breathing accent dot and ⌘K kbd
- `ConversationCanvas` — thread container
  - `IncomingMessage` (WhatsApp/Instagram/LinkedIn variants) with sentiment + intent chips
  - `AIMessage` with shimmer text, action buttons, Aether Intelligence label
- `ExecutionChain` — numbered steps with connector lines and live status text
- `LeadPersona` — avatar with active dot + confidence pips
- `InsightsPanel` — recent signals list + communication mix tiles
- `AmbientBackground` — two animated aura blobs

### Animation system (Framer Motion)
- Staggered slide-up on initial mount for central column and rail
- Hover scale on primary buttons
- Pulse on AI status dot; shimmer on AI text via CSS keyframes
- Cross-fade when switching threads (single static thread for now, structure ready)

### Content seed
- Active thread: Marcus Thorne (WhatsApp) discussing Q3 hiring; AI drafts revised budget.
- Execution chain: 3 steps, step 1 active.
- Signals: LinkedIn engagement, calendar match.
- Comm mix: 42 DMs, 12 Calls.

### Image generation
- Generate one persona portrait for Marcus Thorne (512×512, cinematic dark portrait) via image generation, saved under `src/assets/`.

### Tech
- Artifact: `web_app:aether` (TanStack Start template).
- React + Tailwind + Framer Motion (`motion/react`).
- All design tokens copied verbatim into the project's CSS theme.
- Single route renders the workspace; responsive degrades to single column on small screens (rail collapses to top bar).

### Out of scope
- Real platform integrations, auth, persistence, multi-thread switching logic — this is a visual/UX showcase build.
