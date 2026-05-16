'use client'

import dynamic from 'next/dynamic'

const RedirectionClient = dynamic(() => import('./_components/RedirectionClient'), {
  ssr: false,
})

export default function Page() {
  return <RedirectionClient />
}
