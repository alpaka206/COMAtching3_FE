'use client'

import dynamic from 'next/dynamic'

const Charge = dynamic(() => import('@/screens/Charge'), { ssr: false })

export default function Page() {
  return <Charge />
}
