"use client"

import { Shield, Activity, Sparkles } from "lucide-react"

const SCROLL_THRESHOLD = 60

export function TopNavbar({ scrolled }: { scrolled: boolean }) {
  return (
    <nav
      className={`sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
        scrolled ? "shadow-sm" : ""
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div
        className={`flex items-center justify-between py-3 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          scrolled ? "mx-auto w-full max-w-[100%] px-4 md:px-6" : "mx-auto max-w-6xl px-4 md:px-6"
        }`}
      >
        {/* Left: Logo + brand */}
        <div className="flex items-center gap-3">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-primary/20 bg-primary/10">
            <Shield className="h-[18px] w-[18px] text-primary" />
            {/* Tiny sound wave accent */}
            <svg
              className="absolute -right-1 -top-1 h-3 w-3 text-primary"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M6 8v8M10 5v14M14 8v8" />
            </svg>
          </div>
          <span className="text-lg font-bold tracking-tight text-foreground">
            EchoGuard
          </span>
        </div>

        {/* Right: Status + badge */}
        <div className="flex items-center gap-4">
          {/* Live status pill */}
          <div className="hidden items-center gap-2 rounded-full border border-border bg-secondary/60 px-3 py-1.5 sm:flex">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            <span className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
              <Activity className="h-3 w-3" />
              System Online
            </span>
          </div>

          {/* Gemini badge */}
          <div className="flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-semibold text-primary">Gemini</span>
          </div>
        </div>
      </div>
    </nav>
  )
}
