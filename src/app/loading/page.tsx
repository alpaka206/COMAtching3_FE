'use client'

import dynamic from 'next/dynamic'

const Loading = dynamic(() => import('@/legacy-pages/Loading'), { ssr: false })

export default function Page() {
  return <Loading />
}
