'use client'

import dynamic from 'next/dynamic'

const Charge = dynamic(() => import('@/legacy-pages/Charge'), { ssr: false })

export default function Page() {
  return <Charge />
}
