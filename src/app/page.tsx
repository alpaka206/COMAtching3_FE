'use client'

import dynamic from 'next/dynamic'

const Mainpage = dynamic(() => import('@/screens/Mainpage'), { ssr: false })

export default function Page() {
  return <Mainpage />
}
