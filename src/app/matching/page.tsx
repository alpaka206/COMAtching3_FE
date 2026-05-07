'use client'

import dynamic from 'next/dynamic'

const Matching = dynamic(() => import('@/screens/Matching'), { ssr: false })

export default function Page() {
  return <Matching />
}
