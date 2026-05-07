'use client'

import dynamic from 'next/dynamic'

const Hobbyform = dynamic(() => import('@/screens/Hobbyform'), {
  ssr: false,
})

export default function Page() {
  return <Hobbyform />
}
