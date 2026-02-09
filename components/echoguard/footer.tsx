import { Sparkles } from "lucide-react"

export function Footer() {
  return (
    <footer className="flex items-center justify-center gap-2 border-t border-border py-8 text-sm text-muted-foreground">
      <Sparkles className="h-3.5 w-3.5 text-primary" />
      <span>Powered by Gemini AI</span>
    </footer>
  )
}
