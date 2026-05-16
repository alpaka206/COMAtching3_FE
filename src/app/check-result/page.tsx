'use client'

import dynamic from 'next/dynamic'

const CheckResultClient = dynamic(() => import('./_components/CheckResultClient'), {
  ssr: false,
})

export default function Page() {
  return <CheckResultClient />
}
