'use client'

import dynamic from 'next/dynamic'

const Matching = dynamic(() => import('@/legacy-pages/Matching'), { ssr: false })

export default function Page() {
  return <Matching />
}
