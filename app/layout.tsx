import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: process.env.URL ? new URL(process.env.URL) : new URL(`http://localhost:${process.env.PORT || 3000}`),
  title: `High Performance Laravel`,
  description: `Learn how to optimize your Laravel application for high performance, and avoid wasting time on pointless performance myths`,
  robots: {
      index: true
  },
  twitter: {
    card: `summary_large_image`
  },
  openGraph: {
    title: `High Performance Laravel`,
    description: `Learn how to optimize your Laravel application for high performance, and avoid wasting time on pointless performance myths`,
    locale: `en_GB`,
    type: 'website'
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#bfdbfe' },
    { media: '(prefers-color-scheme: dark)', color: '#172554' },
  ]
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="">{children}</body>
    </html>
  )
}
