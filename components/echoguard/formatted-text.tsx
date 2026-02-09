"use client"

/**
 * Renders analysis text with paragraphs and bullet lists instead of a single block.
 */
export function FormattedText({ text }: { text: string }) {
  if (!text?.trim()) return null

  const blocks = text.split(/\n\n+/).filter(Boolean)

  return (
    <div className="space-y-3">
      {blocks.map((block, i) => {
        const trimmed = block.trim()
        const lines = trimmed.split("\n").filter(Boolean)
        const isList = lines.every(
          (line) => /^[\-\*•]\s*/.test(line) || /^\d+\.\s*/.test(line)
        )
        if (isList && lines.length > 0) {
          return (
            <ul key={i} className="list-inside space-y-1.5 text-sm leading-relaxed">
              {lines.map((line, j) => {
                const bullet = line.replace(/^[\-\*•]\s*/, "").replace(/^\d+\.\s*/, "")
                return (
                  <li key={j} className="flex gap-2">
                    <span className="text-primary shrink-0">•</span>
                    <span>{bullet}</span>
                  </li>
                )
              })}
            </ul>
          )
        }
        return (
          <p key={i} className="text-sm leading-relaxed">
            {trimmed}
          </p>
        )
      })}
    </div>
  )
}
