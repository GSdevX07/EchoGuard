"use client"

import React from "react"

import { useEffect, useState } from "react"

const STEPS = [
  "Initializing Gemini AI...",
  "Extracting audio features...",
  "Analyzing voice patterns...",
  "Running scam detection...",
  "Generating safety report...",
]

const MAX_PROGRESS = 95

interface AnalyzingStateProps {
  resultReady?: boolean
  onComplete?: () => void
}

export function AnalyzingState({ resultReady, onComplete }: AnalyzingStateProps) {
  const [stepIndex, setStepIndex] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setStepIndex((prev) => (prev + 1) % STEPS.length)
    }, 700)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (resultReady && onComplete) {
      setProgress(100)
      const t = setTimeout(onComplete, 600)
      return () => clearTimeout(t)
    }
  }, [resultReady, onComplete])

  useEffect(() => {
    if (resultReady) return
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= MAX_PROGRESS) return prev
        return Math.min(prev + 2 + Math.floor(Math.random() * 3), MAX_PROGRESS)
      })
    }, 400)
    return () => clearInterval(progressInterval)
  }, [resultReady])

  return (
    <section className="flex flex-col items-center gap-10 px-4 py-20">
      {/* Circular waveform visualizer with progress */}
      <div className="relative flex h-48 w-48 items-center justify-center">
        {/* Outer spinning ring */}
        <div className="absolute inset-0 animate-ring-spin rounded-full border-2 border-transparent border-t-primary border-r-primary/30" />
        {/* Middle pulsing ring */}
        <div className="absolute inset-4 animate-ring-pulse rounded-full border border-primary/30" />
        {/* Inner glow ring */}
        <div className="absolute inset-8 rounded-full border border-primary/20 animate-glow-breathe" />

        {/* Center: progress percentage */}
        <div className="relative z-10 flex flex-col items-center justify-center gap-1">
          <span className="text-3xl font-bold tabular-nums text-primary" aria-live="polite">
            {progress}%
          </span>
          <div className="flex items-center gap-0.5">
            {[28, 40, 20, 48, 32, 44, 24, 36, 28].map((h, i) => (
              <div
                key={i}
                className="w-0.5 rounded-full bg-primary/60 animate-bar-dance"
                style={
                  {
                    "--bar-height": `${h}px`,
                    animationDelay: `${i * 0.1}s`,
                  } as React.CSSProperties
                }
              />
            ))}
          </div>
        </div>
      </div>

      {/* Step text */}
      <div className="flex flex-col items-center gap-3">
        <p className="text-lg font-semibold text-foreground">{STEPS[stepIndex]}</p>
        <div className="flex gap-1.5">
          {STEPS.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                i === stepIndex ? "w-6 bg-primary" : "bg-muted-foreground/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
