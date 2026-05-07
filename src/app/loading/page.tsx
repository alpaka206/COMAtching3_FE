'use client'

import dynamic from 'next/dynamic'

const Loading = dynamic(() => import('@/screens/Loading'), { ssr: false })

export default function Page() {
  return <Loading />
}
