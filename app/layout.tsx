import Header from '@/components/Header';
import './globals.css'
import type { Metadata } from 'next'
import Script from 'next/script'
import Footer from '@/components/Footer';

const baseUrl = process.env.URL ? new URL(process.env.URL) : new URL(`http://localhost:${process.env.PORT || 3000}`);

  export const metadata: Metadata = {
  metadataBase: baseUrl,
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
        locale: `en`,
      type: 'website'
    },
    themeColor: [
      { media: '(prefers-color-scheme: light)', color: '#3b0764' },
      { media: '(prefers-color-scheme: dark)', color: '#3b0764' },
    ],
    alternates: {
      canonical: baseUrl,
      languages: {
        'en': baseUrl
      },
      types: {
        'application/rss+xml': `${baseUrl}rss.xml`,
        'application/atom+xml': `${baseUrl}atom.xml`,
        'application/json': `${baseUrl}feed.json`
      },
    },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Script src="https://identity.netlify.com/v1/netlify-identity-widget.js" />
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-94BFP0QTN0" />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-94BFP0QTN0');
          `}
      </Script>
      <body>
        <Header />
        <main>
          <hr />
          {children}
          <hr />
        </main>
        <Footer />
      </body>
    </html>
  )
}
