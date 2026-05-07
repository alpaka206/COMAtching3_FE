'use client'

import dynamic from 'next/dynamic'

const Checkresult = dynamic(() => import('@/legacy-pages/Checkresult'), {
  ssr: false,
})

export default function Page() {
  return <Checkresult />
}
