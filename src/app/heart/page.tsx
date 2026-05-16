'use client'

import dynamic from 'next/dynamic'

const HeartClient = dynamic(() => import('./_components/HeartClient'), { ssr: false })

export default function Page() {
  return <HeartClient />
}
