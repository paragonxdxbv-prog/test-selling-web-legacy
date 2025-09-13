import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/next'
import { FirebaseProvider } from '@/components/firebase-provider'
import './globals.css'

export const metadata: Metadata = {
  title: 'LEGACY',
  description: 'LEGACY - Premium Fashion Experience',
  generator: 'LEGACY',
  icons: {
    icon: '/acme-logo.png',
    shortcut: '/acme-logo.png',
    apple: '/acme-logo.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <FirebaseProvider>
          {children}
          <Analytics />
        </FirebaseProvider>
      </body>
    </html>
  )
}
