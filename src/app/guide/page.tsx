'use client'

import dynamic from 'next/dynamic'

const Guide = dynamic(() => import('@/screens/Guide'), { ssr: false })

export default function Page() {
  return <Guide />
}
