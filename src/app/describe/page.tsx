'use client'

import dynamic from 'next/dynamic'

const Describe = dynamic(() => import('@/screens/Describe'), { ssr: false })

export default function Page() {
  return <Describe />
}
