'use client'

import dynamic from 'next/dynamic'

const LoadingClient = dynamic(() => import('./_components/LoadingClient'), { ssr: false })

export default function Page() {
  return <LoadingClient />
}
