/**
 * EchoGuard – Next.js API route: proxy to Flask backend /analyze.
 * Forwards file (audio/PDF) or JSON text to echoguard Flask app.
 * Set NEXT_PUBLIC_BACKEND_URL to your backend base URL.
 */

import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get("content-type") || ""
    let body: FormData | string
    let headers: HeadersInit = {}

    if (contentType.includes("application/json")) {
      body = await request.text()
      headers = { "Content-Type": "application/json" }
    } else {
      body = await request.formData()
      // FormData doesn't need Content-Type; fetch sets boundary
    }

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000"
    let res: Response
    try {
      res = await fetch(`${backendUrl}/analyze`, {
        method: "POST",
        headers,
        body,
      })
    } catch (fetchError) {
      // Handle network errors (backend not running, connection refused, etc.)
      throw new Error(
        `Cannot connect to backend at ${backendUrl}. Make sure the Flask backend is running.`
      )
    }

    const data = await res.json().catch(() => ({}))
    if (!res.ok) {
      return NextResponse.json(
        { ok: false, error: data.error || res.statusText },
        { status: res.status }
      )
    }
    return NextResponse.json(data)
  } catch (err) {
    let message = "Analysis request failed"
    if (err instanceof Error) {
      // Check for common fetch errors
      if (err.message.includes("fetch failed") || err.message.includes("ECONNREFUSED")) {
        message = "Cannot connect to backend. Make sure the Flask backend is running on http://localhost:5000"
      } else {
        message = err.message
      }
    }
    return NextResponse.json(
      { ok: false, error: message },
      { status: 502 }
    )
  }
}
