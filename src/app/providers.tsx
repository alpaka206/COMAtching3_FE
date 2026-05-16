'use client'

import type { ReactNode } from 'react'

import InAppBrowserRedirect from '@/components/InAppBrowserRedirect'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <div className="App">
      <InAppBrowserRedirect />
      {children}
    </div>
  )
}
