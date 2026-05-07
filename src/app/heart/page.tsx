'use client'

import dynamic from 'next/dynamic'

const Heart = dynamic(() => import('@/legacy-pages/Heart'), { ssr: false })

export default function Page() {
  return <Heart />
}
