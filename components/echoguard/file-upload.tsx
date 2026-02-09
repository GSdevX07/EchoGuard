"use client"

import React from "react"
import { useCallback, useState } from "react"
import { Button } from "@/components/ui/button"
import { Upload, FileAudio, FileText, X } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { ResultLanguage } from "@/lib/echoguard-i18n"
import { getStrings } from "@/lib/echoguard-i18n"

export type AnalyzeInput = { type: "file"; file: File } | { type: "text"; text: string }

interface FileUploadProps {
  onAnalyze: (input: AnalyzeInput) => void
  responseLanguage: ResultLanguage
  onResponseLanguageChange: (value: ResultLanguage) => void
}

function isValidFile(f: File): boolean {
  const audio =
    f.type === "audio/mpeg" ||
    f.type === "audio/wav" ||
    f.name.toLowerCase().endsWith(".mp3") ||
    f.name.toLowerCase().endsWith(".wav")
  const pdf =
    f.type === "application/pdf" || f.name.toLowerCase().endsWith(".pdf")
  return !!(audio || pdf)
}

export function FileUpload({
  onAnalyze,
  responseLanguage,
  onResponseLanguageChange,
}: FileUploadProps) {
  const t = getStrings(responseLanguage)
  const [file, setFile] = useState<File | null>(null)
  const [text, setText] = useState("")
  const [isDragging, setIsDragging] = useState(false)

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile && isValidFile(droppedFile)) {
      setFile(droppedFile)
    }
  }, [])

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0]
      if (selectedFile && isValidFile(selectedFile)) {
        setFile(selectedFile)
      }
    },
    [],
  )

  const removeFile = () => setFile(null)

  const canAnalyze = !!(file || text.trim())
  const handleSubmit = () => {
    if (file) {
      onAnalyze({ type: "file", file })
    } else if (text.trim()) {
      onAnalyze({ type: "text", text: text.trim() })
    }
  }

  return (
    <section className="mx-auto w-full max-w-2xl px-4">
      <div className="sleek-card flex flex-col items-center gap-6 rounded-2xl p-8">
        <div
          role="button"
          tabIndex={0}
          onDrop={handleDrop}
          onDragOver={(e) => {
            e.preventDefault()
            setIsDragging(true)
          }}
          onDragLeave={() => setIsDragging(false)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              document.getElementById("file-upload")?.click()
            }
          }}
          onClick={() => document.getElementById("file-upload")?.click()}
          className={`flex w-full cursor-pointer flex-col items-center gap-4 rounded-xl border-2 border-dashed p-10 transition-all duration-300 ${
            isDragging
              ? "border-primary/60 bg-primary/5"
              : "border-border/50 hover:border-primary/30 hover:bg-secondary/30"
          }`}
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary/80">
            <Upload className="h-6 w-6 text-primary" />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-foreground">
              Drop your audio or PDF here, or click to browse
            </p>
            <p className="mt-1.5 text-xs text-muted-foreground">
              Supports .mp3, .wav, and .pdf files
            </p>
          </div>
          <input
            id="file-upload"
            type="file"
            accept=".mp3,.wav,.pdf,audio/mpeg,audio/wav,application/pdf"
            className="sr-only"
            onChange={handleFileChange}
            aria-label="Upload audio or PDF file"
          />
        </div>

        {file && (
          <div className="sleek-card-inner flex w-full items-center gap-3 rounded-xl px-4 py-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              {file.name.toLowerCase().endsWith(".pdf") ? (
                <FileText className="h-5 w-5 text-primary" />
              ) : (
                <FileAudio className="h-5 w-5 text-primary" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-foreground">
                {file.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                removeFile()
              }}
              className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="Remove file"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Result language: above the text box so dropdown opens upward and does not overlap textarea */}
        <div className="w-full">
          <label className="mb-2 block text-xs font-medium text-muted-foreground">
            {t.resultLanguage}
          </label>
          <Select
            value={responseLanguage}
            onValueChange={(v) => onResponseLanguageChange(v as ResultLanguage)}
          >
            <SelectTrigger className="w-full max-w-xs rounded-lg border-border bg-secondary/60 text-foreground focus:border-primary focus:ring-primary">
              <SelectValue placeholder="Auto (same as input)" />
            </SelectTrigger>
            <SelectContent
              className="border-border bg-popover text-popover-foreground"
              side="top"
              sideOffset={4}
            >
              <SelectItem value="auto" className="focus:bg-secondary focus:text-foreground">
                Auto (same as input)
              </SelectItem>
              <SelectItem value="English" className="focus:bg-secondary focus:text-foreground">
                English
              </SelectItem>
              <SelectItem value="Hindi" className="focus:bg-secondary focus:text-foreground">
                हिन्दी (Hindi)
              </SelectItem>
              <SelectItem value="Telugu" className="focus:bg-secondary focus:text-foreground">
                తెలుగు (Telugu)
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="w-full">
          <p className="mb-2 text-center text-xs text-muted-foreground">
            Or paste text to analyze
          </p>
          <Textarea
            placeholder="Paste or type content to analyze..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="min-h-[100px] w-full resize-y"
            disabled={!!file}
          />
        </div>

        <Button
          size="lg"
          className="w-full max-w-xs font-semibold"
          disabled={!canAnalyze}
          onClick={handleSubmit}
        >
          Analyze
        </Button>
      </div>
    </section>
  )
}
