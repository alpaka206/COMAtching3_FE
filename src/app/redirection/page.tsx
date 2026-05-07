'use client'

import dynamic from 'next/dynamic'

const Redirection = dynamic(() => import('@/screens/RedirectionPage'), {
  ssr: false,
})

export default function Page() {
  return <Redirection />
}
