import type { Metadata, Viewport } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

export const metadata: Metadata = {
  title: 'EatSure Always-On BOGO · Case study prototype',
  description:
    'A clickable prototype of an always-on Buy 1 Get 1 journey for the EatSure app, with a cuisine theme for every day. An unofficial interview case study by Omkar Patil.',
}

export const viewport: Viewport = {
  themeColor: '#5B2B91',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased ${GeistSans.variable} ${GeistMono.variable}`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
