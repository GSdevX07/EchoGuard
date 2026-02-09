import { Bot, Globe, ShieldAlert, Gauge } from "lucide-react"
import { getStrings } from "@/lib/echoguard-i18n"
import type { ResultLanguage } from "@/lib/echoguard-i18n"

export interface AnalysisResult {
  speakerType: "AI-Generated" | "Human"
  detectedLanguage: string
  scamDetected: boolean
  riskLevel: "Low" | "Medium" | "High"
}

interface ResultCardsProps {
  result: AnalysisResult
  language?: ResultLanguage
}

function getRiskStyles(level: string) {
  switch (level) {
    case "Low":
      return { text: "text-primary", bg: "bg-primary/10" }
    case "Medium":
      return {
        text: "text-[hsl(38,92%,50%)]",
        bg: "bg-[hsl(38,92%,50%)]/10",
      }
    case "High":
      return { text: "text-destructive", bg: "bg-destructive/10" }
    default:
      return { text: "text-muted-foreground", bg: "bg-muted" }
  }
}

export function ResultCards({ result, language = "auto" }: ResultCardsProps) {
  const t = getStrings(language)
  const speakerStyles =
    result.speakerType === "AI-Generated"
      ? {
          text: "text-[hsl(38,92%,50%)]",
          bg: "bg-[hsl(38,92%,50%)]/10",
        }
      : { text: "text-primary", bg: "bg-primary/10" }

  const scamStyles = result.scamDetected
    ? { text: "text-destructive", bg: "bg-destructive/10" }
    : { text: "text-primary", bg: "bg-primary/10" }

  const riskStyles = getRiskStyles(result.riskLevel)

  const riskValue =
    result.riskLevel === "High"
      ? t.high
      : result.riskLevel === "Medium"
        ? t.medium
        : t.low
  const speakerValue =
    result.speakerType === "AI-Generated" ? t.aiGenerated : t.human

  const cards = [
    {
      icon: Bot,
      label: t.speakerType,
      value: speakerValue,
      ...speakerStyles,
    },
    {
      icon: Globe,
      label: t.detectedLanguage,
      value: result.detectedLanguage,
      text: "text-[hsl(200,80%,60%)]",
      bg: "bg-[hsl(200,80%,60%)]/10",
    },
    {
      icon: ShieldAlert,
      label: t.scamDetected,
      value: result.scamDetected ? t.yes : t.no,
      ...scamStyles,
    },
    {
      icon: Gauge,
      label: t.riskLevel,
      value: riskValue,
      ...riskStyles,
    },
  ]

  return (
    <section className="mx-auto grid w-full max-w-5xl gap-5 px-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, i) => (
        <div
          key={card.label}
          className="sleek-card animate-fade-in-up flex flex-col items-center gap-4 rounded-2xl p-7 text-center"
          style={{ animationDelay: `${i * 0.12}s` }}
        >
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-xl ${card.bg}`}
          >
            <card.icon className={`h-5 w-5 ${card.text}`} />
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              {card.label}
            </p>
            <p className={`mt-1.5 text-xl font-bold ${card.text}`}>
              {card.value}
            </p>
          </div>
        </div>
      ))}
    </section>
  )
}
