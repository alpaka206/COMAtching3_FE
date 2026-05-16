'use client'

import dynamic from 'next/dynamic'

const ChargeClient = dynamic(() => import('./_components/ChargeClient'), { ssr: false })

export default function Page() {
  return <ChargeClient />
}
