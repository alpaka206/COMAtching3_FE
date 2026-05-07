'use client'

import dynamic from 'next/dynamic'

const Matchresult = dynamic(() => import('@/screens/Matchresult'), {
  ssr: false,
})

export default function Page() {
  return <Matchresult />
}
