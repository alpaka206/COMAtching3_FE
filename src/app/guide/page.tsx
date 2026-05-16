'use client'

import dynamic from 'next/dynamic'

const GuideClient = dynamic(() => import('./_components/GuideClient'), { ssr: false })

export default function Page() {
  return <GuideClient />
}
