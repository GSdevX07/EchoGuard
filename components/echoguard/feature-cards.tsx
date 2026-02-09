"use client"

import { useState } from "react"
import { Bot, Globe, ShieldAlert, X, ChevronDown } from "lucide-react"

const features = [
  {
    id: "voice",
    icon: Bot,
    title: "Voice Detection",
    description:
      "Identify AI-synthesized voices with deep learning analysis in real time.",
    detail:
      "Our deep-learning model compares vocal patterns, micro-tremors, and spectral signatures against a database of known AI voice generators including ElevenLabs, VALL-E, and Bark.",
    iconColor: "text-primary",
    glowActive: "shadow-[0_0_50px_hsl(160_84%_50%/0.12)]",
    borderActive: "border-primary/30",
  },
  {
    id: "language",
    icon: Globe,
    title: "Language ID",
    description:
      "Automatically detect the spoken language from any audio recording.",
    detail:
      "Supports 120+ languages and dialects with 98.6% accuracy. Detects code-switching and multilingual conversations in a single pass.",
    iconColor: "text-[hsl(200,80%,60%)]",
    glowActive: "shadow-[0_0_50px_hsl(200_80%_60%/0.12)]",
    borderActive: "border-[hsl(200,80%,60%)]/30",
  },
  {
    id: "scam",
    icon: ShieldAlert,
    title: "Scam Detection",
    description:
      "Get AI-powered risk assessments and scam prevention intelligence.",
    detail:
      "Analyzes conversational patterns, urgency markers, and social engineering tactics. Cross-references against live scam databases updated in real time.",
    iconColor: "text-destructive",
    glowActive: "shadow-[0_0_50px_hsl(0_72%_56%/0.12)]",
    borderActive: "border-destructive/30",
  },
]

export function FeatureCards() {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  return (
    <section className="mx-auto grid w-full max-w-5xl gap-5 px-4 md:grid-cols-3">
      {features.map((feature, i) => {
        const isExpanded = expandedId === feature.id

        return (
          <button
            type="button"
            key={feature.id}
            onClick={() =>
              setExpandedId(isExpanded ? null : feature.id)
            }
            className={`
              sleek-card group animate-fade-in-up flex cursor-pointer flex-col gap-4 rounded-2xl p-7 text-left
              transition-all duration-500 ease-out
              ${isExpanded
                ? `scale-[1.04] ${feature.glowActive} ${feature.borderActive}`
                : "scale-100"
              }
            `}
            style={{ animationDelay: `${i * 0.1}s` }}
            aria-expanded={isExpanded}
          >
            {/* Top row: icon + close indicator */}
            <div className="flex items-start justify-between">
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl bg-secondary/80 transition-all duration-500 ${
                  isExpanded ? "scale-110" : "group-hover:scale-105"
                }`}
              >
                <feature.icon
                  className={`h-5 w-5 ${feature.iconColor} transition-transform duration-300`}
                />
              </div>
              <div
                className={`flex h-7 w-7 items-center justify-center rounded-full transition-all duration-300 ${
                  isExpanded
                    ? "rotate-0 bg-secondary/80 opacity-100"
                    : "rotate-90 opacity-0"
                }`}
              >
                <X className="h-3.5 w-3.5 text-muted-foreground" />
              </div>
            </div>

            {/* Title + description */}
            <div className="flex flex-col gap-2">
              <h3 className="text-base font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
              <p className="flex items-center gap-1.5 text-xs font-medium text-primary/90">
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
                />
                {isExpanded ? "Hide details" : "Tap for more info"}
              </p>
            </div>

            {/* Expanded detail panel */}
            <div
              className={`overflow-hidden transition-all duration-500 ease-out ${
                isExpanded ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="sleek-card-inner mt-1 rounded-xl p-4">
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {feature.detail}
                </p>
              </div>
            </div>
          </button>
        )
      })}
    </section>
  )
}
