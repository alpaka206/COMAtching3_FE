'use client'

import dynamic from 'next/dynamic'

const HobbyClient = dynamic(() => import('./_components/HobbyClient'), {
  ssr: false,
})

export default function Page() {
  return <HobbyClient />
}
