'use client'

import dynamic from 'next/dynamic'

const Guide = dynamic(() => import('@/legacy-pages/Guide'), { ssr: false })

export default function Page() {
  return <Guide />
}
