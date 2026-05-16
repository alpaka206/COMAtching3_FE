'use client'

import dynamic from 'next/dynamic'

const MainPageClient = dynamic(() => import('./_components/MainPageClient'), { ssr: false })

export default function Page() {
  return <MainPageClient />
}
