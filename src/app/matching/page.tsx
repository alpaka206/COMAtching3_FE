'use client'

import dynamic from 'next/dynamic'

const MatchingClient = dynamic(() => import('./_components/MatchingClient'), { ssr: false })

export default function Page() {
  return <MatchingClient />
}
