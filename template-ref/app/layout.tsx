import React from "react"
import type { Metadata, Viewport } from 'next'
import { Barlow, Barlow_Condensed, IBM_Plex_Mono } from 'next/font/google'
import './globals.css'

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: '--font-barlow',
})

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  style: ["normal", "italic"],
  variable: '--font-barlow-condensed',
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: '--font-ibm-plex-mono',
})

export const metadata: Metadata = {
  title: 'JARVIS — Agentic AI Platform',
  description: 'The platform to orchestrate, deploy, and scale autonomous AI agents. Build the intelligence layer of your product.',
  keywords: ['AI agents', 'agentic AI', 'autonomous agents', 'AI platform', 'multi-agent orchestration'],
}

export const viewport: Viewport = {
  themeColor: '#050505',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${barlow.variable} ${barlowCondensed.variable} ${ibmPlexMono.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
