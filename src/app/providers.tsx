'use client'

import type { ReactNode } from 'react'
import { RecoilRoot } from 'recoil'

import OpenExternalBrowser from '@/OpenExternalBrowser'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <RecoilRoot>
      <div className="App">
        <OpenExternalBrowser />
        {children}
      </div>
    </RecoilRoot>
  )
}
