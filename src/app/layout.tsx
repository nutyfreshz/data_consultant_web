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
  title: 'Nutchapong L. (Kendo) — Data & AI Stack Solutions Consultant',
  description: 'Data & AI Stack Solutions Consultant | Analytics Engineer. Bridging executive business strategy and modern AI/Data engineering.',
  keywords: ['Data Analytics', 'AI Consultant', 'Analytics Engineer', 'Power BI', 'Python', 'ETL', 'Business Intelligence'],
}

export const viewport: Viewport = {
  themeColor: '#0F172A',
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
