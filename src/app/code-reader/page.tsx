'use client'

import dynamic from 'next/dynamic'

const CodeReader = dynamic(() => import('@/screens/CodeReader'), {
  ssr: false,
})

export default function Page() {
  return <CodeReader />
}
