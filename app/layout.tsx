import React from "react"
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'

import './globals.css'

const _inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'EchoGuard - AI Voice & Scam Detection',
  description:
    'AI-powered voice and scam detection using Gemini. Detect AI-generated voices, identify spoken language, and get safety intelligence.',
}

export const viewport: Viewport = {
  themeColor: '#0f1219',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
