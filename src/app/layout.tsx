import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'

import './legacy-global.css'
import { Providers } from './providers'

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://comatching.com',
  ),
  title: 'COMAtching',
  description: 'University matching service for festival events',
  openGraph: {
    title: 'COMAtching',
    description: 'University matching service for festival events',
    images: ['/assets/ogimage.png'],
  },
  icons: {
    icon: '/assets/favicon.svg',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="ko">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
