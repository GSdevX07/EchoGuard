import {
  Sparkles,
  AlertTriangle,
  HelpCircle,
  Shield,
  Ban,
} from "lucide-react"
import { FormattedText } from "./formatted-text"
import { getStrings } from "@/lib/echoguard-i18n"
import type { ResultLanguage } from "@/lib/echoguard-i18n"

export interface ExplanationData {
  scamType: string
  reason: string
  prevention: string
  consequences: string
}

interface AIExplanationProps {
  explanation: ExplanationData
  language?: ResultLanguage
}

export function AIExplanation({ explanation, language = "auto" }: AIExplanationProps) {
  const t = getStrings(language)
  const sections = [
    {
      icon: AlertTriangle,
      label: t.scamType,
      content: explanation.scamType,
      color: "text-[hsl(38,92%,50%)]",
      bg: "bg-[hsl(38,92%,50%)]/10",
    },
    {
      icon: HelpCircle,
      label: t.whyThisIsAScam,
      content: explanation.reason,
      color: "text-destructive",
      bg: "bg-destructive/10",
    },
    {
      icon: Shield,
      label: t.howToAvoidIt,
      content: explanation.prevention,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      icon: Ban,
      label: t.consequencesIfIgnored,
      content: explanation.consequences,
      color: "text-destructive",
      bg: "bg-destructive/10",
    },
  ]

  return (
    <section className="mx-auto w-full max-w-5xl px-4">
      <div
        className="sleek-card animate-fade-in-up rounded-2xl p-7 md:p-9"
        style={{ animationDelay: "0.5s" }}
      >
        {/* Header */}
        <div className="mb-7 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-foreground">
              {t.geminiAiAnalysis}
            </h2>
            <p className="text-xs text-muted-foreground">
              {t.safetyIntelligence}
            </p>
          </div>
        </div>

        {/* Sections grid */}
        <div className="grid gap-4 md:grid-cols-2">
          {sections.map((section) => (
            <div
              key={section.label}
              className="sleek-card-inner flex gap-3.5 rounded-xl p-5"
            >
              <div
                className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${section.bg}`}
              >
                <section.icon className={`h-4 w-4 ${section.color}`} />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  {section.label}
                </p>
                <div className="mt-2 text-foreground">
                  <FormattedText text={section.content} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
