'use client'

import dynamic from 'next/dynamic'

const MatchResultClient = dynamic(() => import('./_components/MatchResultClient'), {
  ssr: false,
})

export default function Page() {
  return <MatchResultClient />
}
