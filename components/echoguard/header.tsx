export function Header() {
  return (
    <header className="relative flex flex-col items-center gap-5 px-4 pb-2 pt-12 text-center md:pt-16">
      {/* Glow backdrop */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full opacity-15 blur-[120px]"
        style={{ background: "hsl(160, 84%, 50%)" }}
        aria-hidden="true"
      />

      {/* Pill tag */}
      <div className="relative flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
        </span>
        <span className="text-xs font-medium tracking-wide text-primary">
          AI-Powered Voice Security
        </span>
      </div>

      <h1 className="relative text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
        Detect. Identify.{" "}
        <span className="text-primary">Protect.</span>
      </h1>

      <p className="relative max-w-md text-pretty text-base text-muted-foreground leading-relaxed md:max-w-lg">
        Upload a voice call and let Gemini analyse it for AI-generated speech,
        language identification, and scam detection in seconds.
      </p>
    </header>
  )
}
