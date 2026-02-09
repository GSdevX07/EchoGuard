"use client"

import { useState, useCallback, useEffect } from "react"
import { Header } from "@/components/echoguard/header"
import { FeatureCards } from "@/components/echoguard/feature-cards"
import { FileUpload, type AnalyzeInput } from "@/components/echoguard/file-upload"
import { AnalyzingState } from "@/components/echoguard/analyzing-state"
import {
  ResultCards,
  type AnalysisResult,
} from "@/components/echoguard/result-cards"
import {
  AIExplanation,
  type ExplanationData,
} from "@/components/echoguard/ai-explanation"
import {
  ConversationHighlights,
  type Highlight,
} from "@/components/echoguard/conversation-highlights"
import { TopNavbar } from "@/components/echoguard/top-navbar"
import { Footer } from "@/components/echoguard/footer"
import { Button } from "@/components/ui/button"
import { RotateCcw } from "lucide-react"
import { getStrings } from "@/lib/echoguard-i18n"
import type { ResultLanguage } from "@/lib/echoguard-i18n"

type AppState = "idle" | "analyzing" | "results"

/** Map EchoGuard backend response to frontend result shape */
function mapToResult(data: {
  speaker_type?: string
  language?: string
  scam_detected?: boolean
  risk_level?: string
}): AnalysisResult {
  const speakerType =
    (data.speaker_type || "").toUpperCase() === "AI"
      ? "AI-Generated"
      : "Human"
  return {
    speakerType,
    detectedLanguage: data.language || "Unknown",
    scamDetected: !!data.scam_detected,
    riskLevel:
      data.risk_level === "High" ||
      data.risk_level === "Medium" ||
      data.risk_level === "Low"
        ? data.risk_level
        : "Low",
  }
}

/** Map backend explanation + how_to_avoid to ExplanationData. Uses lang for fallback labels. */
function mapToExplanation(
  data: {
    explanation?: string
    how_to_avoid?: string
    scam_detected?: boolean
  },
  lang: ResultLanguage
): ExplanationData {
  const t = getStrings(lang)
  return {
    scamType: data.scam_detected ? t.safetyAnalysisSeeExplanation : t.noScamIndicators,
    reason: data.explanation || t.noExplanationProvided,
    prevention: data.how_to_avoid || t.reviewExplanationAbove,
    consequences: data.scam_detected ? t.ignoringScamIndicators : t.contentNotFlagged,
  }
}

const SCROLL_THRESHOLD = 60

export default function Page() {
  const [state, setState] = useState<AppState>("idle")
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [explanation, setExplanation] = useState<ExplanationData | null>(null)
  const [highlights, setHighlights] = useState<Highlight[]>([])
  const [error, setError] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const [resultReady, setResultReady] = useState(false)
  const [responseLanguage, setResponseLanguage] = useState<ResultLanguage>("auto")

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const handleAnalyze = useCallback(async (input: AnalyzeInput) => {
    setState("analyzing")
    setError(null)
    setResult(null)
    setExplanation(null)
    setHighlights([])
    setResultReady(false)

    try {
      let res: Response
      if (input.type === "file") {
        const formData = new FormData()
        formData.append("file", input.file)
        formData.append("response_language", responseLanguage)
        res = await fetch("/api/analyze", {
          method: "POST",
          body: formData,
        })
      } else {
        res = await fetch("/api/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text: input.text,
            response_language: responseLanguage,
          }),
        })
      }

      const errT = getStrings(responseLanguage)
      const text = await res.text()
      let data: any
      try {
        data = text ? JSON.parse(text) : {}
      } catch {
        setError(text || errT.analysisFailed)
        setState("idle")
        return
      }

      if (!res.ok) {
        setError(data.error || errT.analysisFailed)
        setState("idle")
        return
      }

      if (!data.ok) {
        setError(data.error || errT.analysisFailed)
        setState("idle")
        return
      }

      setResult(mapToResult(data))
      setExplanation(mapToExplanation(data, responseLanguage))
      setHighlights(data.highlights ?? [])
      setResultReady(true)
    } catch (e) {
      const errT = getStrings(responseLanguage)
      let errorMessage = errT.requestFailed
      if (e instanceof Error) {
        // Provide more helpful error messages
        if (e.message.includes("fetch failed") || e.message.includes("Failed to fetch")) {
          errorMessage = "Cannot connect to backend. Make sure the Flask backend is running on http://localhost:5000"
        } else {
          errorMessage = e.message
        }
      }
      setError(errorMessage)
      setState("idle")
    }
  }, [responseLanguage])

  const handleReset = useCallback(() => {
    setState("idle")
    setResult(null)
    setExplanation(null)
    setHighlights([])
    setError(null)
    setResultReady(false)
  }, [])

  const dangerTheme =
    state === "results" &&
    result &&
    (result.scamDetected || result.riskLevel === "High")

  return (
    <div
      className={`relative min-h-screen bg-background transition-colors duration-500 ${
        dangerTheme ? "theme-danger" : ""
      }`}
    >
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(160,84%,50%) 1px, transparent 1px), linear-gradient(90deg, hsl(160,84%,50%) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
        aria-hidden="true"
      />

      <TopNavbar scrolled={scrolled} />

      {/* Full-width band when scrolled — syncs with navbar transition */}
      {scrolled && (
        <div
          className="relative z-[1] h-1 w-full shrink-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent"
          aria-hidden="true"
        />
      )}

      <main
        className={`relative z-10 mx-auto flex flex-col gap-12 pb-8 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          scrolled ? "w-full max-w-[100%] px-4 md:px-6" : "max-w-6xl"
        }`}
      >
        <Header />

        {error && (
          <div className="mx-auto w-full max-w-2xl rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </div>
        )}

        {state === "idle" && (
          <>
            <FeatureCards />
            <FileUpload
              onAnalyze={handleAnalyze}
              responseLanguage={responseLanguage}
              onResponseLanguageChange={setResponseLanguage}
            />
          </>
        )}

        {state === "analyzing" && (
          <AnalyzingState
            resultReady={resultReady}
            onComplete={() => {
              setState("results")
              setResultReady(false)
            }}
          />
        )}

        {state === "results" && result && explanation && (
          <>
            <ResultCards result={result} language={responseLanguage} />
            <AIExplanation explanation={explanation} language={responseLanguage} />
            {highlights.length > 0 && (
              <ConversationHighlights highlights={highlights} language={responseLanguage} />
            )}
            <div className="flex justify-center px-4">
              <Button
                variant="outline"
                size="lg"
                onClick={handleReset}
                className="gap-2 border-border bg-transparent text-foreground hover:bg-secondary hover:text-foreground"
              >
                <RotateCcw className="h-4 w-4" />
                {getStrings(responseLanguage).analyzeAnother}
              </Button>
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  )
}
