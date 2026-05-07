'use client'

import dynamic from 'next/dynamic'

const Heart = dynamic(() => import('@/screens/Heart'), { ssr: false })

export default function Page() {
  return <Heart />
}
