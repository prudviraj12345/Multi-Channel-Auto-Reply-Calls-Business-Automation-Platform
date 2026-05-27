export function AmbientBackground() {
  return (
    <>
      <div className="pointer-events-none fixed left-1/2 top-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 animate-aura" />
      <div className="pointer-events-none fixed -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-amber-glow/5 animate-aura [animation-delay:2s]" />
      <div className="pointer-events-none fixed -bottom-60 left-20 h-[420px] w-[420px] rounded-full bg-accent/5 animate-aura [animation-delay:4s]" />
    </>
  );
}
