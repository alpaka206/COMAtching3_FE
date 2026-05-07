'use client'

import type { ReactNode } from 'react'

import OpenExternalBrowser from '@/OpenExternalBrowser'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <div className="App">
      <OpenExternalBrowser />
      {children}
    </div>
  )
}
