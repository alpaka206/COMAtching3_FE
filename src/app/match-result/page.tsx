'use client'

import dynamic from 'next/dynamic'

const Matchresult = dynamic(() => import('@/legacy-pages/Matchresult'), {
  ssr: false,
})

export default function Page() {
  return <Matchresult />
}
