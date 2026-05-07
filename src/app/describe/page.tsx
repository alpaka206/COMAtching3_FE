'use client'

import dynamic from 'next/dynamic'

const Describe = dynamic(() => import('@/legacy-pages/Describe'), { ssr: false })

export default function Page() {
  return <Describe />
}
