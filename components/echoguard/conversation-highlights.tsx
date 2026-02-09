"use client"

import { MessageSquareWarning } from "lucide-react"
import { getStrings } from "@/lib/echoguard-i18n"
import type { ResultLanguage } from "@/lib/echoguard-i18n"

export interface Highlight {
  quote: string
  tag: "Urgency" | "Payment Request" | "Threat" | "Suspicious Claim"
}

interface ConversationHighlightsProps {
  highlights: Highlight[]
  language?: ResultLanguage
}

const tagStyles: Record<Highlight["tag"], { bg: string; text: string }> = {
  Urgency: {
    bg: "bg-[hsl(38,92%,50%)]/15",
    text: "text-[hsl(38,92%,50%)]",
  },
  "Payment Request": {
    bg: "bg-destructive/15",
    text: "text-destructive",
  },
  Threat: {
    bg: "bg-destructive/15",
    text: "text-destructive",
  },
  "Suspicious Claim": {
    bg: "bg-[hsl(200,80%,60%)]/15",
    text: "text-[hsl(200,80%,60%)]",
  },
}

const tagToKey: Record<Highlight["tag"], keyof ReturnType<typeof getStrings>> = {
  Urgency: "urgency",
  "Payment Request": "paymentRequest",
  Threat: "threat",
  "Suspicious Claim": "suspiciousClaim",
}

export function ConversationHighlights({
  highlights,
  language = "auto",
}: ConversationHighlightsProps) {
  const t = getStrings(language)
  return (
    <section className="mx-auto w-full max-w-5xl px-4">
      <div
        className="sleek-card animate-fade-in-up rounded-2xl p-7 md:p-9"
        style={{ animationDelay: "0.65s" }}
      >
        {/* Header */}
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[hsl(38,92%,50%)]/10">
            <MessageSquareWarning className="h-5 w-5 text-[hsl(38,92%,50%)]" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-foreground">
              {t.importantHighlights}
            </h2>
            <p className="text-xs text-muted-foreground">
              {t.keyPhrasesFlagged}
            </p>
          </div>
        </div>

        {/* Highlights list */}
        <div className="flex flex-col gap-3">
          {highlights.map((highlight, i) => {
            const style = tagStyles[highlight.tag]
            return (
              <div
                key={`${highlight.tag}-${i}`}
                className="sleek-card-inner animate-fade-in-up flex items-start gap-4 rounded-xl p-5"
                style={{ animationDelay: `${0.7 + i * 0.08}s` }}
              >
                {/* Accent bar */}
                <div
                  className={`mt-1 h-full w-1 shrink-0 self-stretch rounded-full ${style.bg}`}
                  aria-hidden="true"
                />

                <div className="flex min-w-0 flex-1 flex-col gap-2.5 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                  {/* Quote */}
                  <p className="flex-1 text-sm leading-relaxed text-foreground/90">
                    {'"'}
                    {highlight.quote}
                    {'"'}
                  </p>

                  {/* Tag */}
                  <span
                    className={`inline-flex w-fit shrink-0 items-center rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider ${style.bg} ${style.text}`}
                  >
                    {t[tagToKey[highlight.tag]]}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
